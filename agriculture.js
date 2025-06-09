// Telemetry charts
function createLineChart(canvasId, label, borderColor) {
  return new Chart(document.getElementById(canvasId), {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: label,
        data: [],
        borderColor: borderColor,
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      animation: false,
      scales: {
        x: { display: false },
        y: { beginAtZero: true }
      }
    }
  });
}



/* ====== LEAFLET GROUND-TRACK MAP ====== */
const map = L.map('orbitMap', {
  zoomSnap: 0.25,
  worldCopyJump: true,        // endless wrap
}).setView([0, 0], 2);        // start on equator

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  { attribution: '© OpenStreetMap' }
).addTo(map);

// marker for “greenhouse module”:
const farmIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3210/3210055.png', // small satellite icon
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});
const farmMarker = L.marker([0, 0], { icon: farmIcon }).addTo(map);

/* simple orbital simulation: moves 2° lon / 0.2° lat every 2 s */
let lat = 0, lon = 0;
setInterval(() => {
  lon = (lon + 2) % 360;               // wrap at ±180 handled by leaflet
  lat = Math.sin((lon * Math.PI) / 180) * 20; // fake inclination wave
  farmMarker.setLatLng([lat, lon]);
  map.panTo([lat, lon], { animate: true, duration: 0.5 });
}, 2000);






const lightChart = createLineChart('lightChart', 'Light Intensity', 'yellow');
const waterChart = createLineChart('waterChart', 'Water Usage', 'aqua');
const co2Chart = createLineChart('co2Chart', 'CO₂ Levels', 'lime');

function simulateData(chart, maxValue = 100) {
  const now = new Date().toLocaleTimeString();
  const value = Math.floor(Math.random() * maxValue);
  chart.data.labels.push(now);
  chart.data.datasets[0].data.push(value);
  if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update();
}

setInterval(() => {
  simulateData(lightChart, 1000);
  simulateData(waterChart, 100);
  simulateData(co2Chart, 2000);
}, 1500);

// Analytics charts
const generateRandomData = () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));

const createChart = (id, label, color) => {
  new Chart(document.getElementById(id), {
    type: 'line',
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: label,
        data: generateRandomData(),
        borderColor: color,
        backgroundColor: 'transparent',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#0ff' } }
      },
      scales: {
        x: { ticks: { color: '#ccc' } },
        y: { ticks: { color: '#ccc' } }
      }
    }
  });
};

createChart('moistureChart', 'Soil Moisture (%)', '#0f0');
createChart('humidityChart', 'Humidity (%)', '#00f');
createChart('phChart', 'Soil pH Level', '#ff0');
createChart('tempChart', 'Temperature (°C)', '#f00');


document.getElementById("toggleLights").addEventListener("click", () => {
  document.getElementById("controlStatus").innerHTML = "<p>Lights toggled 🌗</p>";
});

document.getElementById("startIrrigation").addEventListener("click", () => {
  document.getElementById("controlStatus").innerHTML = "<p>Irrigation started 💧</p>";
});

document.getElementById("sendAlert").addEventListener("click", () => {
  document.getElementById("controlStatus").innerHTML = "<p>Alert sent to crew 🚨</p>";
});


const toggleLightBtn = document.getElementById("toggleLightBtn");
const startIrrigationBtn = document.getElementById("startIrrigationBtn");
const controlStatus = document.getElementById("controlStatus");

let lightsOn = false;

toggleLightBtn.addEventListener("click", () => {
  lightsOn = !lightsOn;
  controlStatus.textContent = lightsOn ? "Lights turned ON 💡" : "Lights turned OFF 🌑";
});

startIrrigationBtn.addEventListener("click", () => {
  controlStatus.textContent = "Irrigation started 💧";
  setTimeout(() => {
    controlStatus.textContent = "Irrigation complete ✅";
  }, 3000);
});








