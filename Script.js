// ----------------------------------
// COLLEGE BUS GPS TRACKER
// ----------------------------------

// Example coordinates.
// Replace these with your actual bus-route coordinates.

const route = [
  [15.1394, 76.9214], // City Bus Stand
  [15.1418, 76.9245], // Main Road
  [15.1455, 76.9285], // College Gate
  [15.1495, 76.9320]  // RYMEC
];

let currentPosition = 0;

// Create map
const map = L.map("map").setView(route[0], 15);

// OpenStreetMap
L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; OpenStreetMap contributors"
  }
).addTo(map);


// Add route line
const routeLine = L.polyline(route, {
  color: "blue",
  weight: 5
}).addTo(map);


// Add bus marker
const busIcon = L.divIcon({
  html: "🚌",
  className: "bus-icon",
  iconSize: [35, 35]
});

const busMarker = L.marker(route[0], {
  icon: busIcon
}).addTo(map);


// Add stops
const stopNames = [
  "City Bus Stand",
  "Main Road",
  "College Gate",
  "RYMEC Campus"
];

route.forEach((location, index) => {

  L.marker(location)
    .addTo(map)
    .bindPopup(
      `<b>${stopNames[index]}</b>`
    );

});


// Move bus
function moveBus() {

  if (currentPosition < route.length - 1) {

    currentPosition++;

    busMarker.setLatLng(
      route[currentPosition]
    );

    map.panTo(
      route[currentPosition]
    );

    updateInformation();

  } else {

    alert("Bus has reached RYMEC Campus.");

  }

}


// Update information
function updateInformation() {

  const nextStop =
    Math.min(currentPosition + 1, route.length - 1);

  const eta =
    Math.max(2, 8 - currentPosition * 2);

  document.getElementById("nextStop").innerText =
    stopNames[nextStop];

  document.getElementById("eta").innerText =
    eta + " min";

  document.getElementById("speed").innerText =
    (30 + currentPosition * 2) + " km/h";

}


// Reset bus
function resetBus() {

  currentPosition = 0;

  busMarker.setLatLng(route[0]);

  map.panTo(route[0]);

  document.getElementById("nextStop").innerText =
    stopNames[1];

  document.getElementById("eta").innerText =
    "8 min";

  document.getElementById("speed").innerText =
    "32 km/h";

      }
