// ==========================
// CHENNAI METRO MAP SCRIPT
// ==========================

// Get station from URL
function getStationFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("station");
}

// Show all metro stations
function showAllStations() {
    const query = encodeURIComponent("Chennai Metro stations");
    document.getElementById("mapFrame").src =
        `https://www.google.com/maps?q=${query}&output=embed`;
}

// Locate specific station (manual input)
function locateStation() {

    const input = document.getElementById("locationInput").value.trim();

    if (!input) {
        alert("Please enter station name!");
        return;
    }

    const query = encodeURIComponent(input + " Chennai Metro station");

    document.getElementById("mapFrame").src =
        `https://www.google.com/maps?q=${query}&output=embed`;
}

// ✅ NEW: Load from chatbot selection
function loadFromChatbot() {

    const station = getStationFromURL();

    if (station) {
        const query = encodeURIComponent(station + " Chennai Metro station");

        document.getElementById("mapFrame").src =
            `https://www.google.com/maps?q=${query}&output=embed`;
    } else {
        showAllStations();
    }
}

// Run on load
window.onload = function () {
    loadFromChatbot();
};