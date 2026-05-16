# CMRL Metro Bot

A responsive web-based chatbot for Chennai Metro Rail users. The bot provides quick access to metro ticket booking links, trip planning, fare and duration details, first/last train timings, station location lookup, feeder service details, NCMC information, help options, and voice input support.

## 🚇 Project Overview

**CMRL Metro Bot** is a frontend-only chatbot interface built using HTML, CSS, and JavaScript. It is designed as a floating chat widget that can be opened from a webpage and used to access common Chennai Metro services quickly.

The project also includes a separate **Chennai Metro Station Locator** page that embeds Google Maps and allows users to search for metro stations.

## ✨ Features

- Floating metro chatbot widget
- Menu-based quick actions
- Online ticket booking shortcuts
  - WhatsApp
  - Google Pay
  - Paytm
  - Rapido
- Trip planner with route, fare, distance, and duration details
- First and last train timing lookup
- Chennai Metro station locator using Google Maps embed
- Feeder service information
- NCMC card information
- Help and contact options
- Voice input support using browser speech recognition
- Text-to-speech response support
- Clean and responsive user interface

## 🛠️ Technologies Used

- **HTML5** – Page structure
- **CSS3** – Styling and responsive UI
- **JavaScript** – Chatbot logic and interactivity
- **Google Maps Embed** – Station location display
- **Web Speech API** – Voice input and speech output

## 📁 Project Structure

```text
Chat_bot-main/
│
├── index.html      # Main chatbot page
├── style2.css      # Chatbot styling
├── script2.js      # Chatbot functionality and metro data
│
├── mapp.html       # Metro station locator page
├── mapp.css        # Map page styling
├── mapp.js         # Map search and station loading logic
│
└── README.md       # Project documentation
```

## 🚀 How to Run the Project

### Method 1: Open Directly in Browser

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html`.
4. The chatbot will open in your browser.
5. Click the floating 🚇 button to start using the bot.

### Method 2: Use VS Code Live Server

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. The website will run locally in your browser.

## 🧭 How to Use

### Chatbot

1. Open `index.html`.
2. Click the floating metro icon at the bottom-right corner.
3. Choose any option from the menu:
   - Book your ticket online
   - NCMC
   - Ticket
   - First & Last Train
   - Trip Planner
   - Feeder Service
   - Help
4. You can also type a message in the input box and press Enter or click the send button.

### Station Locator

1. Open `mapp.html`.
2. Enter a Chennai Metro station name.
3. Click **Locate**.
4. The station location will be shown using Google Maps.
5. Click **Show All** to view Chennai Metro stations.

## 📌 Main Functionalities

### 1. Ticket Booking

The chatbot provides quick links to different ticket booking or transport-related platforms.

### 2. Trip Planner

Users can select source and destination stations to view trip-related details such as:

- Route
- Fare
- Travel duration
- Distance

### 3. Train Timings

Users can select a station and view:

- Station name
- Metro line
- First train timing
- Last train timing

### 4. Station Location

The station locator page uses Google Maps embed links to show metro station locations.

### 5. Voice Support

The chatbot supports voice input through the browser's speech recognition feature. Browser compatibility may vary.

## 🌐 Browser Compatibility

Recommended browsers:

- Google Chrome
- Microsoft Edge
- Brave

Voice recognition works best in Chromium-based browsers.

## ⚠️ Notes

- This is a frontend-only project.
- No backend or database is used.
- Fare, route, distance, and timing data are stored inside `script2.js`.
- Some external images and links are loaded from the internet.
- Google Maps embed requires an active internet connection.
- If the website is hosted on GitHub Pages, file names and paths must match exactly.

## 🔮 Future Improvements

- Add backend support for dynamic metro data
- Connect with official Chennai Metro APIs if available
- Add real-time train status
- Improve mobile responsiveness
- Add admin panel to update fares and timings
- Add multilingual support in Tamil and English
- Add better error handling for invalid station names
- Store user queries for analytics
- Improve accessibility support

## 👨‍💻 Author

Developed as a Chennai Metro chatbot web project.

## 📄 License

This project is for educational and learning purposes. You may modify and improve it based on your requirements.
