import os
import json
import re
import traceback
import io
from flask import Flask, request, jsonify, Response, stream_with_context, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq
import difflib
load_dotenv()

# Voice cloning removed as requested for faster, instant browser TTS.
tts_engine = None

# Point to your custom uploaded audio track
VOICE_REF_FILE = "cmrl_shereen_training_audio.wav" 

def normalize_station(name):
    name = name.upper().strip()
    name = name.replace("PURATCHI THALAIVAR DR.M.G.RAMACHANDRAN ", "")
    name = name.replace("PURATCHI THALAIVAR DR.M.G.RAMACHANDRA N ", "")
    name = name.replace("PURATCHI THALAIVI DR.J.JAYALALITHA ", "")
    name = name.replace("ARIGNAR ANNA ", "")
    name = name.replace("MGR ", "")
    name = name.replace(" METRO", "")
    name = name.replace(" STATION", "")
    name = name.replace(".", "").strip()
    name = name.replace("'", "")
    return name

# Load and Process Fares Data
fares_data = {}
try:
    if os.path.exists('fares.txt'):
        with open('fares.txt', 'r') as f:
            for line in f:
                line = line.strip()
                if not line: continue
                match = re.search(r"(.+?) to (.+?) Rs\. (\d+)", line, re.IGNORECASE)
                if match:
                    start, end, price = match.groups()
                    n_start = normalize_station(start)
                    n_end = normalize_station(end)
                    fares_data[f"{n_start}-{n_end}"] = int(price)
                    fares_data[f"{n_end}-{n_start}"] = int(price)
        
        with open('fares.json', 'w') as f:
            json.dump(fares_data, f)
        print(f"Successfully loaded {len(fares_data)//2} routes from fares.txt")
except Exception as e:
    print(f"Error processing fares: {e}")

# Build Station Graph for Shortest Path (Number of Stations)
station_graph = {}
def add_edge(u, v):
    u = normalize_station(u)
    v = normalize_station(v)
    if u not in station_graph: station_graph[u] = set()
    if v not in station_graph: station_graph[v] = set()
    station_graph[u].add(v)
    station_graph[v].add(u)

green_line_stations = ["Central", "Egmore", "Nehru Park", "Kilpauk", "Pachaiyappa's College", "Shenoy Nagar", "Anna Nagar East", "Anna Nagar Tower", "Thirumangalam", "Koyambedu", "CMBT", "Arumbakkam", "Vadapalani", "Ashok Nagar", "Ekkattuthangal", "Alandur", "St. Thomas Mount"]
blue_line_stations = ["Wimco Nagar Depot", "Wimco Nagar", "Thiruvottriyur", "Thiruvottriyur Theredi", "Kaladipet", "Tollgate", "Tondiarpet", "New Washermenpet", "Sir Theagaraya College", "Washermenpet", "Mannadi", "High Court", "Central", "Government Estate", "LIC", "Thousand Lights", "AG-DMS", "Teynampet", "Nandanam", "Saidapet", "Little Mount", "Guindy", "Alandur", "Nanganallur Road", "Meenambakkam", "Airport"]

for i in range(len(green_line_stations)-1):
    add_edge(green_line_stations[i], green_line_stations[i+1])
for i in range(len(blue_line_stations)-1):
    add_edge(blue_line_stations[i], blue_line_stations[i+1])

def get_shortest_path(s1, s2):
    s1, s2 = normalize_station(s1), normalize_station(s2)
    if s1 not in station_graph or s2 not in station_graph: return None
    queue = [(s1, 0)]
    visited = {s1}
    while queue:
        curr, dist = queue.pop(0)
        if curr == s2: return dist
        for neighbor in station_graph[curr]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    return None

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index2.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# Initialize Groq client
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY not found in .env file")
client = Groq(api_key=api_key)

GROQ_MODEL = "llama-3.3-70b-versatile"

CMRL_SYSTEM_PROMPT = """Helpful CMRL support assistant.
- Tone: Extremely warm, friendly, and helpful. You are a polite Chennai Metro station assistant. Use plenty of emojis (🚇, ✨, 😊, 🚉).
- Tone: Extremely warm, friendly, and helpful. You are a polite Chennai Metro station assistant. Use plenty of emojis (🚇, ✨, 😊, 🚉).
- Mode 1: FARE QUERY. If the user asks for fare/price, provide the fare in a full sentence, and ALSO include the number of stations in the journey. Example: "The fare from Central to Nandanam is Rs.40 and your journey will cover 10 stations. 😊✨"
- Mode 2: ROUTE QUERY. If the user asks for a route or how to go, provide the route in NUMBERED STEPS using full sentences. Include the total number of stations in the journey. Example:
  "1. Please board the Green Line at Central going towards St. Thomas Mount.
   2. Transfer at Alandur to the Blue Line towards Airport.
   3. Get off at Meenambakkam. Your journey will cover a total of 15 stations. 🚇✨"
- STRICT RULES: DO NOT provide route info for fare queries. DO NOT provide fare info for route queries. DO NOT use arrows (→).
- Greetings: Start your response with a friendly greeting like "Hello! I'd be happy to help you today! 🚇✨".
- LINE DATA (INTERNAL):
  * 🟢 Green Line: Central(1), Egmore(2), Nehru Park(3), Kilpauk(4), Pachaiyappa's College(5), Shenoy Nagar(6), Anna Nagar East(7), Anna Nagar Tower(8), Thirumangalam(9), Koyambedu(10), CMBT(11), Arumbakkam(12), Vadapalani(13), Ashok Nagar(14), Ekkattuthangal(15), Alandur(16), St. Thomas Mount(17).
  * 🔵 Blue Line: Wimco Nagar Depot(1), Wimco Nagar(2), Thiruvottriyur(3), Thiruvottriyur Theredi(4), Kaladipet(5), Tollgate(6), Tondiarpet(7), New Washermenpet(8), Sir Theagaraya College(9), Washermenpet(10), Mannadi(11), High Court(12), Central(13), Government Estate(14), LIC(15), Thousand Lights(16), AG-DMS(17), Teynampet(18), Nandanam(19), Saidapet(20), Little Mount(21), Guindy(22), Alandur(23), Nanganallur Road(24), Meenambakkam(25), Airport(26).
- INTERCHANGES: Central (🟢1, 🔵13) and Alandur (🟢16, 🔵23).
- MISSING STATIONS: If the user provides only a destination or only an origin, ask: "From which station?" or "To which station?".
- UNRELATED QUERIES: If the user asks anything unrelated to Chennai Metro, say: "I can only assist with Chennai Metro (CMRL) related queries. Is there something else I can help you with?"
- Helpline (1860-425-1515) ONLY for complaints.
- Booking link (https://tickets.chennaimetrorail.org/onlineticket) ONLY for ticket queries."""

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_msg = data.get('message', "")
    history = data.get('history', [])
    current_user_msg = user_msg.lower()

    dynamic_context = ""
    
    clean_user_msg = current_user_msg.replace("'", "").replace(".", "")
    msg_words = clean_user_msg.split()
    
    matched_stations = []
    # 1. Exact match
    for station in station_graph.keys():
        if station.lower() in clean_user_msg and station not in matched_stations:
            matched_stations.append(station)
            
    # 2. Fuzzy match for typos
    for station in station_graph.keys():
        if station in matched_stations: continue
        # Ignore generic words for fuzzy matching
        generic_words = {"college", "depot", "road", "estate", "mount", "park", "nagar", "east", "tower"}
        station_words = [w.lower() for w in station.split() if len(w) > 3 and w.lower() not in generic_words]
        for sw in station_words:
            matches = difflib.get_close_matches(sw, msg_words, n=1, cutoff=0.8)
            if matches and station not in matched_stations:
                matched_stations.append(station)
                break
                
    if any(kw in current_user_msg for kw in ["fare", "price", "cost", "how much", "rs", "ticket"]) and len(matched_stations) >= 2:
        s1, s2 = matched_stations[0], matched_stations[1]
        target_k1 = f"{s1}-{s2}"
        target_k2 = f"{s2}-{s1}"
        fare_keys = list(fares_data.keys())
        
        if target_k1 in fares_data:
            dynamic_context += f"\n\nFARES (MUST USE THESE):\n{s1} to {s2}: Rs.{fares_data[target_k1]}"
        elif target_k2 in fares_data:
            dynamic_context += f"\n\nFARES (MUST USE THESE):\n{s1} to {s2}: Rs.{fares_data[target_k2]}"
        else:
            matches = difflib.get_close_matches(target_k1, fare_keys, n=1, cutoff=0.6)
            if not matches:
                matches = difflib.get_close_matches(target_k2, fare_keys, n=1, cutoff=0.6)
            if matches:
                dynamic_context += f"\n\nFARES (MUST USE THESE):\n{s1} to {s2}: Rs.{fares_data[matches[0]]}"
                
    if len(matched_stations) >= 2:
        s1, s2 = matched_stations[0], matched_stations[1]
        
        dist = get_shortest_path(s1, s2)
        if dist is not None:
            dynamic_context += f"\n\nROUTE FACT: The shortest number of stations between {s1} and {s2} is {dist}. You MUST state that the journey covers {dist} stations. DO NOT calculate this yourself."

    history.append({"role": "user", "content": user_msg})
    full_messages = [{"role": "system", "content": CMRL_SYSTEM_PROMPT + dynamic_context}] + history

    def generate():
        try:
            completion = client.chat.completions.create(
                model=GROQ_MODEL,
                messages=full_messages,
                max_tokens=512,
                temperature=0.4,
                stream=True
            )

            for chunk in completion:
                if chunk.choices[0].delta.content:
                    word = chunk.choices[0].delta.content
                    yield f"data: {json.dumps({'reply': word})}\n\n"

        except Exception as e:
            traceback.print_exc()
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return Response(stream_with_context(generate()), mimetype='text/event-stream')


if __name__ == '__main__':
    print(">>> METRO BOT SERVER STARTING ON PORT 8080 <<<")
    app.run(host="0.0.0.0", port=8080, debug=True)