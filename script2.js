// CHATBOT START
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    chatBox = document.getElementById("chatBox");
    chatContainer = document.getElementById("chatContainer");
    toggleBtn = document.getElementById("chatToggle");
    closeBtn = document.getElementById("closeChat");
    sendBtn = document.getElementById("sendBtn");
    userInput = document.getElementById("userInput");
    if (!chatBox || !sendBtn || !userInput) {
        console.error("Missing elements!");
        return;
    }
    toggleBtn?.addEventListener("click", () => {
        chatContainer.classList.toggle("show");
    });
    closeBtn?.addEventListener("click", () => {
        chatContainer.classList.remove("show");
    });
    sendBtn.addEventListener("click", handleMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleMessage();
    });
});
const metroData = {
route: [
"wimco nagar depot", "wimco nagar", "tiruvottiyur", "tiruvottiyur theradi",
"kaladipet", "tollgate", "new washermenpet", "Tondiarpet",
"Theagaraya college", "Washermenpet", "Mannadi", "High Court",
"Central", "Government estate", "LIC", "Thousand Lights",
"AG-DMS", "Teynampet", "Nandanam", "Saidapet", "Little mount",
"Guindy", "Alandur", "OTA-Nanganallur Road",
"Meenambakkam", "Airport"
],

fare: {
"wimco nagar depot-Airport": 50,
"wimco nagar depot-Meenambakkam": 50,
"wimco nagar depot-OTA-Nanganallur Road": 50,
"wimco nagar depot-Alandur": 50,
"wimco nagar depot-Guindy": 50,
"wimco nagar depot-Little mount": 50,
"wimco nagar depot-Saidapet": 50,
"wimco nagar depot-Nandanam": 40,
"wimco nagar depot-Teynampet": 40,
"wimco nagar depot-AG-DMS": 40,
"wimco nagar depot-Thousand Lights": 40,
"wimco nagar depot-LIC": 40,
"wimco nagar depot-Government estate": 40,
"wimco nagar depot-Central": 40,
"wimco nagar depot-High Court": 30,
"wimco nagar depot-Mannadi": 30,
"wimco nagar depot-Washermenpet": 30,
"wimco nagar depot-Theagaraya College": 30,
"wimco nagar depot-Tondiarpet": 30,
"wimco nagar depot-new washermenpet": 30,
"wimco nagar depot-tollgate": 20,
"wimco nagar depot-kaladipet": 20,
"wimco nagar depot-tiruvottiyur theradi": 20,
"wimco nagar depot-tiruvottiyur": 10,
"wimco nagar depot-Wimco Nagar": 10,

"Airport-wimco nagar depot": 50,
"Airport-Wimco nagar": 50,
"Airport-tiruvottiyur": 50,
"Airport-tiruvottiyur theradi": 50,
"Airport-kaladipet": 50,
"Airport-tollgate": 50,
"Airport-new washermenpet": 50,
"Airport-Tondiarpet": 50,
"Airport-Theagaraya College": 50,
"Airport-Washermenpet": 50,
"Airport-Mannadi": 40,
"Airport-High Court": 40,
"Airport-Central metro": 40,
"Airport-Government estate": 40,
"Airport-LIC": 40,
"Airport-Thousand Lights": 40,
"Airport-AG-DMS": 40,
"Airport-Teynampet": 30,
"Airport-Nandanam": 30,
"Airport-Saidapet": 30,
"Airport-Little mount": 30,
"Airport-Guindy": 30,
"Airport-Alandur": 20,
"Airport-OTA-Nanganallur Road": 20,
"Airport-Meenambakkam": 10
},

duration : {
"wimco nagar depot-Airport": 64,
"wimco nagar depot-Meenambakkam": 60,
"wimco nagar depot-OTA-Nanganallur Road": 56,
"wimco nagar depot-Alandur": 54,
"wimco nagar depot-Guindy": 51,
"wimco nagar depot-Little mount": 48,
"wimco nagar depot-Saidapet": 46,
"wimco nagar depot-Nandanam": 42,
"wimco nagar depot-Teynampet": 41,
"wimco nagar depot-AG-DMS": 39,
"wimco nagar depot-Thousand Lights": 35,
"wimco nagar depot-LIC": 33,
"wimco nagar depot-Government estate": 31,
"wimco nagar depot-Central": 27,
"wimco nagar depot-High Court": 24,
"wimco nagar depot-Mannadi": 22,
"wimco nagar depot-Washermenpet": 19,
"wimco nagar depot-Theagaraya College": 17,
"wimco nagar depot-Tondiarpet": 15,
"wimco nagar depot-new washermenpet": 12,
"wimco nagar depot-tollgate": 10,
"wimco nagar depot-kaladipet": 9,
"wimco nagar depot-tiruvottiyur theradi": 11,
"wimco nagar depot-tiruvottiyur": 4,
"wimco nagar depot-Wimco Nagar": 2
},



distance: {
"wimco nagar depot-Airport": 31.3,
"wimco nagar depot-Meenambakkam": 29.74,
"wimco nagar depot-OTA-Nanganallur Road": 27.41,
"wimco nagar depot-Alandur": 26.35,
"wimco nagar depot-Guindy": 24.92,
"wimco nagar depot-Little mount": 23.6,
"wimco nagar depot-Saidapet": 22.37,
"wimco nagar depot-Nandanam": 20.73,
"wimco nagar depot-Teynampet": 19.84,
"wimco nagar depot-AG-DMS": 18.93,
"wimco nagar depot-Thousand Lights": 17.02,
"wimco nagar depot-LIC": 15.96,
"wimco nagar depot-Government estate": 15.02,
"wimco nagar depot-Central": 13,
"wimco nagar depot-High Court": 11.54,
"wimco nagar depot-Mannadi": 10.62,
"wimco nagar depot-Washermenpet": 8.97,
"wimco nagar depot-Theagaraya College": 7.92,
"wimco nagar depot-Tondiarpet": 6,
"wimco nagar depot-new washermenpet": 5.74,
"wimco nagar depot-tollgate": 4.69,
"wimco nagar depot-kaladipet": 3.78,
"wimco nagar depot-tiruvottiyur theradi": 2.73,
"wimco nagar depot-tiruvottiyur": 1.37,
"wimco nagar depot-Wimco Nagar": 0.51
}
};
const stations = [
  { name:"mgr central", full:"MGR Central Metro", phone:"04423792267", address:"Periamet, Chennai 600003" },
  { name:"egmore", full:"Egmore Metro", phone:"04423792266", address:"Egmore, Chennai 600008" },
  { name:"nehru park", full:"Nehru Park Metro", phone:"04423792265", address:"Chetpet, Chennai 600031" },
  { name:"kilpauk", full:"Kilpauk Metro", phone:"04423792264", address:"Kilpauk, Chennai 600010" },
  { name:"pachaiyappa college", full:"Pachaiyappa College Metro", phone:"04423792263", address:"Shenoy Nagar, Chennai 600030" },
  { name:"shenoy nagar", full:"Shenoy Nagar Metro", phone:"04423792262", address:"Chennai 600030" },
  { name:"anna nagar east", full:"Anna Nagar East Metro", phone:"04423792261", address:"Chennai 600102" },
  { name:"thirumangalam", full:"Thirumangalam Metro", phone:"04423792159", address:"Anna Nagar, Chennai 600040" },
  { name:"anna nagar tower", full:"Anna Nagar Tower Metro", phone:"04423792160", address:"Chennai 600040" },
  { name:"koyambedu", full:"Koyambedu Metro", phone:"04423792280", address:"Chennai 600107" },
  { name:"cmbt", full:"CMBT Metro", phone:"04423792270", address:"Chennai 600107" },
  { name:"arumbakkam", full:"Arumbakkam Metro", phone:"04423792260", address:"Chennai 600026" },
  { name:"vadapalani", full:"Vadapalani Metro", phone:"04423792250", address:"Chennai 600026" },
  { name:"ashok nagar", full:"Ashok Nagar Metro", phone:"04423792240", address:"Chennai 600083" },
  { name:"ekkattuthangal", full:"Ekkattuthangal Metro", phone:"04423792230", address:"Guindy 600032" },
  { name:"st thomas mount", full:"St. Thomas Mount Metro", phone:"04423792051", address:"Alandur 600016" },
  { name:"wimco nagar depot", full:"Wimco Nagar Depot", phone:"04423792100", address:"Tiruvottiyur 600057" },
  { name:"wimco nagar", full:"Wimco Nagar Metro", phone:"04423792098", address:"Chennai 600019" },
  { name:"thiruvotriyur", full:"Thiruvotriyur Metro", phone:"04423792097", address:"Chennai 600019" },
  { name:"thiruvotriyur theradi", full:"Thiruvotriyur Theradi Metro", phone:"04423792096", address:"Chennai 600019" },
  { name:"kaladipet", full:"Kaladipet Metro", phone:"04423792000", address:"Chennai 600019" },
  { name:"tollgate", full:"Tollgate Metro", phone:"04423792094", address:"Tondiarpet 600081" },
  { name:"new washermenpet", full:"New Washermenpet Metro", phone:"04423792093", address:"Chennai 600081" },
  { name:"tondiarpet", full:"Tondiarpet Metro", phone:"04423792092", address:"Chennai 600081" },
  { name:"washermenpet", full:"Washermanpet Metro", phone:"04423792047", address:"Chennai 600021" },
  { name:"high court", full:"High Court Metro", phone:"04423792045", address:"Parrys, Chennai" },
  { name:"central", full:"MGR Central Metro", phone:"04423792267", address:"Periamet, Chennai" },
  { name:"ag dms", full:"AG-DMS Metro", phone:"04423792040", address:"Teynampet 600018" },
  { name:"thousand lights", full:"Thousand Lights Metro", phone:"04423792041", address:"Royapettah 600014" },
  { name:"teynampet", full:"Teynampet Metro", phone:"04423792039", address:"Chennai 600018" },
  { name:"nandanam", full:"Nandanam Metro", phone:"04424378000", address:"Chennai 600035" },
  { name:"saidapet", full:"Saidapet Metro", phone:"04423792137", address:"Chennai 600015" },
  { name:"little mount", full:"Little Mount Metro", phone:"04423792036", address:"Chennai 600015" },
  { name:"guindy", full:"Guindy Metro", phone:"04423792035", address:"Chennai 600032" },
  { name:"alandur", full:"Alandur Metro", phone:"04423792220", address:"Chennai 600016" },
  { name:"nanganallur", full:"OTA Nanganallur Road Metro", phone:"04423792030", address:"Chennai 600016" },
  { name:"meenambakkam", full:"Meenambakkam Metro", phone:"04423792032", address:"Chennai 600016" },
  { name:"airport", full:"Chennai Airport Metro", phone:"04423792031", address:"Chennai 600016" }
];
  const data = [
  { routeNo: "S51", from: "Koyambedu Metro", via: "Nerkundram, Mogappair West", to: "Nolambur Sakthi Nagar", minibuses: 2 },
  { routeNo: "S60", from: "CMBT Metro", via: "Koyambedu Metro Station", to: "Maduravoyal Erikarai", minibuses: 2 },
  { routeNo: "S70K", from: "Thirumangalam Metro", via: "Anna Nagar West Depot", to: "Korattur Water Canal", minibuses: 2 },
  { routeNo: "S82", from: "Alandur Metro", via: "Nanganallur Road", to: "Madipakkam Bus Stand", minibuses: 1 },
  { routeNo: "S83", from: "Alandur Metro", via: "Adambakkam, Velachery MRTS", to: "Gurunanak College", minibuses: 2 },
  { routeNo: "S84", from: "Alandur Metro", via: "DLF", to: "Porur Junction", minibuses: 2 },
  { routeNo: "S69", from: "Airport Metro", via: "Pammal", to: "Kundrathur Bus Stand", minibuses: 3 },
  { routeNo: "S56", from: "Wimco Nagar Metro", via: "Jothi Nagar", to: "Manali", minibuses: 2 },
  { routeNo: "S97", from: "Guindy Metro", via: "Phoenix Mall", to: "Velachery Bus Stand", minibuses: 2 },
  { routeNo: "S98", from: "Little Mount Metro", via: "Anna University", to: "Taramani", minibuses: 2 },
  { routeNo: "S100", from: "Airport Metro", via: "Pallavaram, Chrompet", to: "Tambaram East", minibuses: 2 }
];
const images = [
    "https://chennaimetrorail.org/wp-content/uploads/2023/12/cmrl-1.jpg",
    "https://chennaimetrorail.org/wp-content/uploads/2024/03/cmrl-banner.jpg",
    "https://chennaimetrorail.org/wp-content/uploads/2023/12/cmrl-12.jpg",
];
let currentImage = 0;
const slider = document.getElementById("sliderImg");
if (slider) {
    setInterval(() => {
        currentImage++;
        if (currentImage >= images.length) {
            currentImage = 0;
        }
        slider.src = images[currentImage];
    }, 3000); 
}
const blueLine = metroData.route;
const greenLine = [
    "Chennai Central","Egmore","Nehru Park","Kilpauk",
    "Pachaiyappas College","Shenoy Nagar","Anna Nagar East",
    "Anna Nagar Tower","Thirumangalam","Koyambedu",
    "CMBT","Arumbakkam","Vadapalani","Ashok Nagar",
    "Ekkattuthangal","Alandur","St. Thomas Mount"
];
const interchange = "Alandur";
let chatBox, chatContainer, toggleBtn, closeBtn, sendBtn, userInput;
let mode = "";
let currentUser = null;
let ncmcStep = "";
let voiceMode = false;
function processBot(message) {
    let originalMessage = message.trim();
message = message.toLowerCase().trim();
    if (message === "hi" || message === "hello" || message === "hey") {
    let existingMenu = document.querySelector(".menu-grid");
    if (!existingMenu) {
        addMessage(
        "👋 Hi! I am CMRL Metro Bot 🚇. Please choose an option below.",
        "bot"
        );
        addOptions();
    } else {
        addMessage(
        "👋 Hello! How can I help you?",
        "bot"
        );
    }
    return;
}
if (mode === "ncmc") {
    if (!currentUser) {
        if (users[originalMessage]) {
            currentUser = users[originalMessage];
            showNCMCResult();
        } else {
            addMessage("❌ No user found. Enter valid mobile number.", "bot");
        }
        return;
    }
    showNCMCResult();
    return;
}

// leave empty for unknown messages
return;
}
window.showHelp = function () {
    let html = `
    <div class="scroll-box">
        <h3>📞 Helpline Details</h3>
        <div class="route-station">
            ☎️ 24/7 Helpline <br>
            <b class="call-number"
            onclick="window.location.href='tel:18604251515'">
            1860-425-1515
            </b>
        </div>
        <div class="route-station">
            📧 Email <br>
            <b>chennaimetrorail@cmrl.in</b>
        </div>
        <div class="route-station">
            🚺 Women’s Helpline <br>
            <b class="call-number"
            onclick="window.location.href='tel:155370'">
            155370
            </b>
        </div>
    </div>
    `;
    addHTMLMessage(html, "bot");
};
window.showStation = function(){
    addMessage("🚉 Showing all stations...", "bot");
} ; 
window.showLocation = function () {
    let stations = [
        ...new Set([
            ...blueLine,
            ...greenLine
        ])
    ];
    let html = `
    <div class="scroll-box">
        <h3>📍 Metro Locations</h3>
        <div class="station-card">
            <label>🚉 Select Station</label>
            <select id="stationSelect">
                <option value="">
                    Select Station
                </option>
                ${stations.map(st => `
                    <option value="${st}">
                        ${st}
                    </option>
                `).join("")}
            </select>
        </div>
        <button onclick="goToMap()"
        class="metro-btn">
            Open Map
        </button>
    </div>
    `;
    addHTMLMessage(html, "bot");
};
window.goToMap = function () {
    let station = document.getElementById("stationSelect").value;
    if (!station) {
        alert("Select a station");
        return;
    }
    window.location.href = "mapp.html?station=" + station;
};
window.showStationCount = function () {
    let total = [...new Set([...blueLine, ...greenLine])].length;
    addMessage(`🚉 Total Metro Stations: ${total}`, "bot");
};   
const users = {
        "9843529233": {
            name: "Deepa",
            cardNumber: "NCMC111222333",
            userType: "Normal",
            balance: 180,
            validity: "15-08-2027",
            history: [
                {route:"Central → Airport", fare:30, date:"28-04-2026"},
                {route:"Egmore → Koyambedu", fare:20, date:"27-04-2026"}
            ]
        },
        "7401046786": {
            name: "Shereen",
            cardNumber: "NCMC444555666",
            userType: "SV Pass",
            balance: 320,
            validity: "10-12-2027",
            history: [
                {route:"Koyambedu → Airport", fare:40, date:"28-04-2026"},
                {route:"Alandur → Central", fare:30, date:"27-04-2026"}
            ]
        }
};   
function addOptions() {
    let div = document.createElement("div");
    div.className = "bot-msg";
    div.innerHTML = `
    <div class="menu-grid">
        <!-- 🎟️ FULL WIDTH TOP -->
        <div class="menu-card full-width" onclick="selectOption('ticket')">
            🎟️ <p>Book Your Ticket</p>
        </div>
        <div class="menu-card" onclick="selectOption('trip')">
            🗺️ <p>Trip Planner</p>
        </div>
        <div class="menu-card" onclick="selectOption('ncmc')">
            💳 <p>NCMC</p>
        </div>
        <div class="menu-card" onclick="showTiming()">
            🚇 <p>Metro Connectivity</p>
        </div>
        <div class="menu-card" onclick="showFeeder()">
            🚐 <p>Feeder Service</p>
        </div>
        <div class="menu-card" onclick="selectOption('help')">
            🆘 <p>Help</p>
        </div>
        <div class="menu-card" onclick="showStation()">
            🚉 <p>Stations</p>
        </div>
    </div>
    `;
    chatBox.appendChild(div);
}
    window.selectOption = function(choice) {
if (choice === "ncmc") {
    mode = "ncmc";
    ncmcStep = "choose";
    addMessage("NCMC Services", "user");
    let div = document.createElement("div");
    div.className = "bot-msg";
    div.innerHTML = `
        <div class="option-container">
            <div class="option-card" onclick="selectNCMC('details')">📄 Card Details</div>
            <div class="option-card" onclick="selectNCMC('history')">🕒 Last 2 History</div>
        </div>
    `;
    chatBox.appendChild(div);
}        else if (choice === "ticket") {
            addMessage("Opening ticket booking...", "bot");
            window.open("https://tickets.chennaimetrorail.org/onlineticket","_blank");
        }
	else if (choice === "trip") {
    addMessage("🗺️ Trip Planner opened", "bot");
    showTripPlannerUI();
}
        else if (choice === "help") {
    addMessage("Help Services", "user");
    let div = document.createElement("div");
    div.className = "bot-msg";
    div.innerHTML = `
        <div class="option-container">
            <div class="option-card" onclick="showLocation()">
                📍 Metro Locations
            </div>
            <div class="option-card" onclick="showStationContact()">
                🚉 Station Contact
            </div>
            <div class="option-card" onclick="showHelp()">
                📞 Helpline
            </div>
        </div>
    `;
    chatBox.appendChild(div);
}
};
window.selectNCMC = function(type) {
    ncmcStep = type;
    if (currentUser) {
        showNCMCResult();
    } else {
        addMessage("Enter mobile number", "bot");
    }
};
function handleMessage() {
    let msg = userInput.value.trim();
    if (!msg) return;
    addMessage(msg, "user");
    userInput.value = "";
    if (typeof processBot === "function") {
        processBot(msg);
    }
}
   function showNCMCResult() {
    if (ncmcStep === "details") {
        addHTMLMessage(`
        <div class="ncmc-details">
            <p>👤 Name: ${currentUser.name}</p>
            <p>💳 Card No: ${currentUser.cardNumber}</p>
            <p>🪪 Type: ${currentUser.userType}</p>
            <p>💰 Balance: ₹${currentUser.balance}</p>
            <p>📅 Valid Till: ${currentUser.validity}</p>
        </div>
        `, "bot");
    } 
    else if (ncmcStep === "history") {
        if (currentUser.history && currentUser.history.length > 0) {
            let html = `
            <div class="ncmc-details">
                <p><b>🕒 Last 2 Transactions:</b></p>
            `;
            currentUser.history.slice(0,2).forEach(h => {
                html += `
                <p>
                🚇 ${h.route}<br>
                💰 ₹${h.fare}<br>
                📅 ${h.date}
                </p>
                `;
            });
            html += `</div>`;
            addHTMLMessage(html, "bot");
        } else {
            addMessage("No history available", "bot");
        }
    }
}
    window.showTripPlannerUI = function () {
    let stations = [
        ...new Set([
            ...blueLine,
            ...greenLine
        ])
    ];
    let html = `
    <div class="scroll-box">
        <h3>🗺️ Trip Planner</h3>
        <div class="station-card">
            <label>📍 From Station</label>
            <select id="fromStation">
                <option value="">
                    Select From Station
                </option>
                ${stations.map(st => `
                    <option value="${st}">
                        ${st}
                    </option>
                `).join("")}
            </select>
        </div>
        <div class="station-card">
            <label>📍 To Station</label>
            <select id="toStation">
                <option value="">
                    Select To Station
                </option>
                ${stations.map(st => `
                    <option value="${st}">
                        ${st}
                    </option>
                `).join("")}
            </select>
        </div>
        <button onclick="calculateTrip()"
        class="metro-btn">
            Check Route
        </button>
    </div>
    `;
    addHTMLMessage(html, "bot");
};
function findDirectRoute(line, from, to) {
    let start = line.indexOf(from);
    let end = line.indexOf(to);
    if (start === -1 || end === -1) {
        return null;
    }
    if (start < end) {
        return line.slice(start, end + 1);
    }
    return line
        .slice(end, start + 1)
        .reverse();
}
function findShortestRoute(from, to) {
    let bestRoute = null;
    let routeType = "";
    let interchangePoint = "No Interchange";
    let shortest = Infinity;
    // 🔵 BLUE LINE
    let blueRoute =
        findDirectRoute(blueLine, from, to);
    if (blueRoute) {
        bestRoute = blueRoute;
        shortest = blueRoute.length;
        routeType = "🔵 Blue Line";
    }
    // 🟢 GREEN LINE
    let greenRoute =
        findDirectRoute(greenLine, from, to);
    if (
        greenRoute &&
        greenRoute.length < shortest
    ) {
        bestRoute = greenRoute;
        shortest = greenRoute.length;
        routeType = "🟢 Green Line";
    }
    let changes = ["Central", "Alandur"];
    changes.forEach(change => {
        let part1 =
            findDirectRoute(blueLine, from, change) ||
            findDirectRoute(greenLine, from, change);
        let part2 =
            findDirectRoute(blueLine, change, to) ||
            findDirectRoute(greenLine, change, to);
        if (part1 && part2) {
            let fullRoute = [
                ...part1,
                ...part2.slice(1)
            ];
            if (fullRoute.length < shortest) {
                bestRoute = fullRoute;
                shortest = fullRoute.length;
                routeType = "🔁 Interchange Route";
                interchangePoint =
                    `Change at ${change}`;
            }
        }
    });
    if (!bestRoute) {
        return null;
    }
    return {
        route: bestRoute,
        routeType: routeType,
        interchange: interchangePoint
    };
}
window.calculateTrip = function () {
    let from =
        document.getElementById("fromStation").value;
    let to =
        document.getElementById("toStation").value;
    if (!from || !to) {
        alert("Select both stations");
        return;
    }
    if (from === to) {
        addMessage(
            "⚠️ Same station selected",
            "bot"
        );
        return;
    }
    let result =
        findShortestRoute(from, to);
    if (!result) {
        addMessage(
            "❌ Route not available",
            "bot"
        );
        return;
    }
    let route = result.route;
    let totalStations =
        route.length - 1;
    let travelTime =
        totalStations * 2;
    let details =
        showFullResult(from, to);
    let routeText =
        route.join(" → ");
   let html = `
<div class="trip-details">
    <div class="trip-card">
        <span>🚇 Route</span>
        <b>${from} → ${to}</b>
    </div>
    <div class="trip-card">
        <span>🛣️ Line</span>
        <b>${result.routeType}</b>
    </div>
    <div class="trip-card">
        <span>🔁 Interchange</span>
        <b>${result.interchange}</b>
    </div>
    <div class="trip-card">
        <span>🚉 Stations</span>
        <b>${totalStations}</b>
    </div>
    <div class="trip-card">
        <span>📏 Distance</span>
        <b>${details.distance || "N/A"} km</b>
    </div>
    <div class="trip-card">
        <span>💰 Fare</span>
        <b>₹${details.fare || "N/A"}</b>
    </div>
    <div class="trip-card">
        <span>⏱ Travel Time</span>
        <b>${travelTime} mins</b>
    </div>
    <div class="trip-card">
        <span>🚆 Frequency</span>
        <b>Every ${metroData.train_frequency} mins</b>
    </div>
    <div class="route-box">
        <b>🛤 Route Stations</b><br><br>
        ${route.join(" → ")}
    </div>
</div>
`;
addHTMLMessage(html, "bot");  
}; 
const stationDetails = {
  // 🔵 BLUE LINE
  "Wimco Nagar Depot": {
    firstTrain: "04:56 AM",
    lastTrain: "11:00 PM"
  },
  "Wimco Nagar": {
    firstTrain: "04:58 AM",
    lastTrain: "11:02 PM"
  },
  "Thiruvottriyur": {
    firstTrain: "05:00 AM",
    lastTrain: "11:04 PM"
  },
  "Thiruvottriyur Theradi": {
    firstTrain: "05:02 AM",
    lastTrain: "11:06 PM"
  },
  "Kaladipet": {
    firstTrain: "05:04 AM",
    lastTrain: "11:08 PM"
  },
  "Tollgate": {
    firstTrain: "05:06 AM",
    lastTrain: "11:10 PM"
  },
  "New Washermenpet": {
    firstTrain: "05:08 AM",
    lastTrain: "11:12 PM"
  },
  "Tondiarpet": {
    firstTrain: "05:10 AM",
    lastTrain: "11:14 PM"
  },
  "Sir Theagaraya College": {
    firstTrain: "05:12 AM",
    lastTrain: "11:16 PM"
  },
  "Washermenpet": {
    firstTrain: "05:14 AM",
    lastTrain: "11:18 PM"
  },
  "Mannadi": {
    firstTrain: "05:16 AM",
    lastTrain: "11:20 PM"
  },
  "High Court": {
    firstTrain: "05:18 AM",
    lastTrain: "11:22 PM"
  },
  "Central": {
    firstTrain: "05:20 AM",
    lastTrain: "11:24 PM"
  },
  "Government Estate": {
    firstTrain: "05:22 AM",
    lastTrain: "11:26 PM"
  },
  "LIC": {
    firstTrain: "05:24 AM",
    lastTrain: "11:28 PM"
  },
  "Thousand Lights": {
    firstTrain: "05:26 AM",
    lastTrain: "11:30 PM"
  },
  "AG-DMS": {
    firstTrain: "05:28 AM",
    lastTrain: "11:32 PM"
  },
  "Teynampet": {
    firstTrain: "05:30 AM",
    lastTrain: "11:34 PM"
  },
  "Nandanam": {
    firstTrain: "05:32 AM",
    lastTrain: "11:36 PM"
  },
  "Saidapet": {
    firstTrain: "05:34 AM",
    lastTrain: "11:38 PM"
  },
  "Little Mount": {
    firstTrain: "05:36 AM",
    lastTrain: "11:40 PM"
  },
  "Guindy": {
    firstTrain: "05:38 AM",
    lastTrain: "11:42 PM"
  },
  "Alandur": {
    firstTrain: "05:40 AM",
    lastTrain: "11:44 PM"
  },
  "Nanganallur Road": {
    firstTrain: "05:42 AM",
    lastTrain: "11:46 PM"
  },
  "Meenambakkam Metro": {
    firstTrain: "05:44 AM",
    lastTrain: "11:48 PM"
  },
  "Airport": {
    firstTrain: "04:51 AM",
    lastTrain: "11:00 PM"
  },
  // 🟢 GREEN LINE
  "Egmore": {
    firstTrain: "05:02 AM",
    lastTrain: "11:02 PM"
  },
  "Nehru Park": {
    firstTrain: "05:04 AM",
    lastTrain: "11:04 PM"
  },
  "Kilpauk": {
    firstTrain: "05:06 AM",
    lastTrain: "11:06 PM"
  },
  "Pachaiyappas College": {
    firstTrain: "05:08 AM",
    lastTrain: "11:08 PM"
  },
  "Shenoy Nagar": {
    firstTrain: "05:10 AM",
    lastTrain: "11:10 PM"
  },
  "Anna Nagar East": {
    firstTrain: "05:12 AM",
    lastTrain: "11:12 PM"
  },
  "Anna Nagar Tower": {
    firstTrain: "05:14 AM",
    lastTrain: "11:14 PM"
  },
  "Thirumangalam": {
    firstTrain: "05:16 AM",
    lastTrain: "11:16 PM"
  },
  "Koyambedu": {
    firstTrain: "05:18 AM",
    lastTrain: "11:18 PM"
  },
  "CMBT": {
    firstTrain: "05:20 AM",
    lastTrain: "11:20 PM"
  },
  "Arumbakkam": {
    firstTrain: "05:22 AM",
    lastTrain: "11:22 PM"
  },
  "Vadapalani": {
    firstTrain: "05:24 AM",
    lastTrain: "11:24 PM"
  },
  "Ashok Nagar": {
    firstTrain: "05:26 AM",
    lastTrain: "11:26 PM"
  },
  "Ekkattuthangal": {
    firstTrain: "05:28 AM",
    lastTrain: "11:28 PM"
  },
  "St. Thomas Mount": {
    firstTrain: "05:30 AM",
    lastTrain: "11:30 PM"
  }
};
function showFullResult(from, to) {
    let key1 = `${from}-${to}`;
    let key2 = `${to}-${from}`;
    let routeLine = [];
    if (blueLine.includes(from) && blueLine.includes(to)) {
        routeLine = blueLine;
    }
    else if (greenLine.includes(from) && greenLine.includes(to)) {
        routeLine = greenLine;
    }
    else {
        routeLine = [...blueLine, ...greenLine];
    }
    return {
        fare:
            metroData.fare[key1] ||
            metroData.fare[key2] ||
            0,
        duration:
            metroData.duration[key1] ||
            metroData.duration[key2] ||
            0,
        distance:
            metroData.distance[key1] ||
            metroData.distance[key2] ||
            0,
        stations: Math.abs(
            routeLine.indexOf(from) -
            routeLine.indexOf(to)
        )
    };
}  
window.showSelectedStation = function () {
    let val =
        document.getElementById(
            "stationContactSelect"
        ).value;
    let station =
        stations.find(s => s.name === val);
    if (!station) {
        addMessage(
            "❌ Please select a station",
            "bot"
        );
        return;
    }
    let html = `
    <div class="scroll-box">
        <h3>🚉 Station Contact Details</h3>
        <div class="station-card">
            <span>🏢 Station</span>
            <b>${station.full}</b>
        </div>
        <div class="station-card">
            <span>📞 Contact</span>
            <b>${station.phone}</b>
        </div>

        <div class="station-card">
            <span>📍 Address</span>
            <b>${station.address}</b>
        </div>
    </div>
    `;
    addHTMLMessage(html, "bot");
};
window.showStationContact = function () {
    let html = `
    <div class="scroll-box">
        <h3>🚉 Station Contact</h3>
        <div class="station-card">
            <label>📍 Select Station</label>
            <select id="stationContactSelect">
                <option value="">
                    Select Station
                </option>
                ${stations.map(s => `
                    <option value="${s.name}">
                        ${s.full}
                    </option>
                `).join("")}
            </select>
        </div>
        <button onclick="showSelectedStation()"
        class="metro-btn">

            Get Info
        </button>
    </div>
    `;
    addHTMLMessage(html, "bot");
};
window.confirmCall = function(number) {
    let ok = confirm("Do you want to call " + number + " ?");
    if (ok) {
        window.location.href = "tel:" + number;
    }
};
window.showFeeder = function () {
    addMessage("🚐 Feeder Bus Routes (Select below 👇)", "bot");
    let div = document.createElement("div");
    div.className = "bot-msg";
    div.innerHTML = `
        <div class="feeder-container">
            ${data.map(d => `
                <div class="feeder-card" onclick="selectFeeder('${d.routeNo}')">
                    <b>${d.routeNo}</b><br>
                    ${d.from} → ${d.to}
                </div>
            `).join("")}
        </div>
    `;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
};
window.selectFeeder = function(routeNo) {
    let route = data.find(d => d.routeNo === routeNo);
    if (!route) {
        addMessage("❌ Route not found", "bot");
        return;
    }
    let html = `
    <div class="scroll-box">
        <h3>🚐 Feeder Service Details</h3>
        <div class="station-card">
            <span>🚌 Route No</span>
            <b>${route.routeNo}</b>
        </div>
        <div class="station-card">
            <span>📍 From</span>
            <b>${route.from}</b>
        </div>
        <div class="station-card">
            <span>🛣 Via</span>
            <b>${route.via}</b>
        </div>
        <div class="station-card">
            <span>🏁 To</span>
            <b>${route.to}</b>
        </div>
        <div class="station-card">
            <span>🚐 Mini Buses</span>
            <b>${route.minibuses}</b>
        </div>
    </div>
    `;
    addHTMLMessage(html, "bot");
};
function showImages() {
    images.forEach(img => {
        let div = document.createElement("div");
        div.className = "bot-msg";
        div.innerHTML = `
            <img src="${img}" 
                 style="max-width:200px;border-radius:10px;margin:5px;">
        `;
        chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
};
window.callNumber = function(number) {
    if (confirm("Do you want to call " + number + " ?")) {
        window.location.href = "tel:" + number;
    }
};
let recognition;
const voiceBtn = document.getElementById("voiceBtn");
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';
    recognition.onstart = function () {
        voiceBtn.innerHTML = "🔴";
    };
recognition.onresult = function (event) {
    let transcript =
        event.results[0][0].transcript;
    voiceMode = true;
    addMessage(transcript, "user");
    processBot(transcript);

};
    recognition.onerror = function () {
        addMessage("❌ Voice recognition error", "bot");
    };
    recognition.onend = function () {
        voiceBtn.innerHTML = "🎤";
    };
   voiceBtn.addEventListener("click", function () {
    recognition.start();
});
} else {
    alert("Voice recognition not supported in this browser");
}
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        let speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-IN";
        speech.rate = 0.95;
        speech.pitch = 1;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    }
}
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        let speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-IN";
        speech.rate = 0.95;
        speech.pitch = 1;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    }
}
function addMessage(text, type) {
    let div = document.createElement("div");
    div.className =
        type === "user"
        ? "user-msg"
        : "bot-msg";
    div.innerHTML = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (type === "bot" && voiceMode) {
        let cleanText =
            text.replace(/<[^>]*>/g, '');
        speak(cleanText);
        voiceMode = false;
    }
}
function addHTMLMessage(html, type) {
    let div = document.createElement("div");
    div.className =
        type === "user"
        ? "user-msg"
        : "bot-msg";
    div.innerHTML = html;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (type === "bot" && voiceMode) {
        let cleanText =
            div.innerText;
        speak(cleanText);
        voiceMode = false;
    }
}
Object.keys(stationDetails).forEach(station => {
    if (blueLine.includes(station)) {
        stationDetails[station].line =
            "🔵 Blue Line";
    } else if (greenLine.includes(station)) {
        stationDetails[station].line =
            "🟢 Green Line";
    }
    stationDetails[station].frequency =
        "Every 7 mins";
});
window.showTiming = function () {
    let stations = Object.keys(stationDetails);
    let html = `
    <div class="scroll-box">
        <h3>🚇 First & Last Train</h3>
        <div class="station-card">
            <label>📍 Select Station</label>
            <select id="timingStation">
                <option value="">
                    Select Station
                </option>
                ${stations.map(st => `
                    <option value="${st}">
                        ${st}
                    </option>
                `).join("")}
            </select>
        </div>
        <button onclick="getStationTiming()"
        class="metro-btn">

            Show Timing
        </button>
    </div>
    `;
    addHTMLMessage(html, "bot");
};
window.getStationTiming = function () {
    let station =
        document.getElementById(
            "timingStation"
        ).value;
    if (!station) {

        addMessage(
            "❌ Please select a station",
            "bot"
        );
        return;
    }
    let info =
        stationDetails[station];
    if (!info) {
        addMessage(
            "❌ Timing not available",
            "bot"
        );
        return;
    }
    let line = "🔵 Blue Line";
    if (
        greenLine.includes(station)
    ) {
        line = "🟢 Green Line";
    }
    let html = `
    <div class="scroll-box">
        <div class="station-card">
            <span>🚉 Station Name</span>
            <b>${station}</b>
        </div>
        <div class="station-card">
            <span>🚇 Metro Line</span>
            <b>${line}</b>
        </div>
        <div class="station-card">
            <span>🕒 First Train</span>
            <b>${info.firstTrain}</b>
        </div>
        <div class="station-card">
            <span>🌙 Last Train</span>
            <b>${info.lastTrain}</b>
        </div>
    </div>
    `;
    addHTMLMessage(html, "bot");
};
window.getMetroTiming = function () {
    const station =
        document.getElementById(
            "timingStation"
        ).value;
    if (!station) {
        addMessage(
            "❌ Please Select Station",
            "bot"
        );
        return;
    }
    const info =
        stationDetails[station];
    const html = `
    <div class="scroll-box">
        <div class="station-card">
            <span>🚉 Station Name</span>
            <b>${station}</b>
        </div>
        <div class="station-card">
            <span>🕒 First Train</span>
            <b>${info.firstTrain}</b>
        </div>
        <div class="station-card">
            <span>🌙 Last Train</span>
            <b>${info.lastTrain}</b>
        </div>
    </div>
    `;
    addHTMLMessage(html, "bot");
}
function toggleTicketOptions(event){
    event.stopPropagation();
    const options = document.getElementById("ticketOptions");
    options.classList.toggle("show-ticket-options");
}