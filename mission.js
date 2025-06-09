//satillite status
function loadSatelliteStatus() {
  const satellites = [
    { name: 'Satellite A', location: 'Orbit 1', status: 'Online' },
    { name: 'Satellite B', location: 'Orbit 2', status: 'Offline' },
    { name: 'Satellite C', location: 'Orbit 3', status: 'Online' },
  ];

  const container = document.getElementById('satellite-status');
  container.innerHTML = '<h2>Satellite Status</h2>';
  
  satellites.forEach(sat => {
    const statusColor = sat.status === 'Online' ? 'lime' : 'red';
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${sat.name}</strong><br>
      Location: ${sat.location}<br>
      Status: <span style="color:${statusColor}">${sat.status}</span>
      <hr>
    `;
    container.appendChild(div);
  });
}

window.onload = function () {
  loadSatelliteStatus();
};
//ends satillite


//telementray chart
function renderTelemetryChart() {
  const ctx = document.getElementById('telemetryChart').getContext('2d');

  const data = {
    labels: [],
    datasets: [{
      label: 'Altitude (km)',
      data: [],
      borderColor: '#0ff',
      backgroundColor: 'rgba(0, 255, 255, 0.2)',
      tension: 0.3,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      scales: {
        x: {
          ticks: { color: '#0ff' }
        },
        y: {
          ticks: { color: '#0ff' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#0ff' }
        }
      }
    }
  };

  const telemetryChart = new Chart(ctx, config);

  let time = 0;

  setInterval(() => {
    if (data.labels.length > 10) {
      data.labels.shift();
      data.datasets[0].data.shift();
    }

    time += 1;
    data.labels.push(`${time}s`);
    data.datasets[0].data.push(Math.floor(Math.random() * 500 + 100)); // Simulated altitude data

    telemetryChart.update();
  }, 1000); // Update every second
}
window.onload = function () {
  loadSatelliteStatus();
  renderTelemetryChart();
};
//ends telementry

//communication
function generateLogEntry() {
  const logs = document.getElementById('comm-logs');
  const now = new Date().toLocaleTimeString();
  const messages = [
    "Satellite ping received.",
    "Telemetry packet decoded.",
    "Command sent: Adjust Orbit",
    "Command sent: Start Scan",
    "Satellite response: Confirmed",
    "Low battery warning.",
    "Image transmission initiated.",
    "Recalibrating sensors...",
    "All systems nominal.",
    "Command sent: Change orientation"
  ];

  const message = messages[Math.floor(Math.random() * messages.length)];
  const entry = `[${now}] ${message}`;

  const logElement = document.createElement('div');
  logElement.textContent = entry;
  logs.appendChild(logElement);

  logs.scrollTop = logs.scrollHeight; // Auto-scroll
}

// Simulate receiving logs every 2 seconds
setInterval(generateLogEntry, 6000);
//communication ends


const ctx = document.getElementById('telemetryChart').getContext('2d');
const telemetryData = {
  labels: [],
  datasets: [{
    label: 'Signal Strength',
    backgroundColor: 'rgba(0,255,255,0.2)',
    borderColor: '#0ff',
    data: [],
    tension: 0.3,
  }]
};

const telemetryChart = new Chart(ctx, {
  type: 'line',
  data: telemetryData,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  }
});

function updateTelemetry() {
  const time = new Date().toLocaleTimeString();
  const value = Math.floor(Math.random() * 100);

  telemetryData.labels.push(time);
  telemetryData.datasets[0].data.push(value);

  if (telemetryData.labels.length > 10) {
    telemetryData.labels.shift();
    telemetryData.datasets[0].data.shift();
  }

  telemetryChart.update();
}

setInterval(updateTelemetry, 3000); // Update every 3 seconds


const systemStatus = {
  "status-power": ["OK", "WARNING", "ERROR"],
  "status-nav": ["OK", "WARNING", "ERROR"],
  "status-life": ["OK", "WARNING", "ERROR"],
  "status-comm": ["OK", "WARNING", "ERROR"]
};

function updateSystemStatus() {
  Object.keys(systemStatus).forEach(id => {
    const statusText = document.querySelector(`#${id} .status`);
    const statuses = systemStatus[id];
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];

    statusText.textContent = newStatus;

    statusText.className = "status"; // Reset
    if (newStatus === "OK") {
      statusText.classList.add("ok");
    } else if (newStatus === "WARNING") {
      statusText.classList.add("warning");
    } else {
      statusText.classList.add("error");
    }
  });
}

setInterval(updateSystemStatus, 5000); // Update every 5 seconds


const buttons = document.querySelectorAll('.control-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('clicked');

      // Reset animation class
      setTimeout(() => {
        btn.classList.remove('clicked');
      }, 600);

      // Simulated actions
      if (btn.classList.contains('deploy')) {
        alert("🛰️ Satellite Deployed!");
      } else if (btn.classList.contains('abort')) {
        alert("⚠️ Mission Aborted!");
      } else if (btn.classList.contains('reboot')) {
        alert("🔄 Rebooting Systems...");
      } else if (btn.classList.contains('launch')) {
        alert("🚀 Booster Launched!");
      }
    });
  });



  function updateRadiation() {
    const radiation = (Math.random() * 2).toFixed(2); // 0.00 - 2.00 μSv/h
    const radiationValue = document.getElementById('radiationValue');
    const radiationStatus = document.getElementById('radiationStatus');

    radiationValue.textContent = `${radiation} μSv/h`;

    if (radiation < 0.5) {
      radiationStatus.textContent = "Safe";
      radiationStatus.style.color = "#0f0";
    } else if (radiation < 1.2) {
      radiationStatus.textContent = "Elevated";
      radiationStatus.style.color = "#ff0";
    } else {
      radiationStatus.textContent = "Danger";
      radiationStatus.style.color = "#f00";
    }
  }

  setInterval(updateRadiation, 4000); // update every 4 seconds
  updateRadiation(); // initial run




function updateSatelliteData() {
  const lat = (Math.random() * 180 - 90).toFixed(2);   // -90 to +90
  const lon = (Math.random() * 360 - 180).toFixed(2);  // -180 to +180
  const speed = (27000 + Math.random() * 3000).toFixed(0); // 27,000–30,000 km/h

  document.getElementById('sat-lat').textContent = lat;
  document.getElementById('sat-lon').textContent = lon;
  document.getElementById('sat-speed').textContent = speed;

  const statusText = document.getElementById('sat-status');
  const states = [
    { text: "✅ Stable", color: "limegreen" },
    { text: "⚠️ Minor Drift", color: "orange" },
    { text: "❌ Lost Signal", color: "red" }
  ];

  const state = states[Math.floor(Math.random() * states.length)];
  statusText.textContent = state.text;
  statusText.style.color = state.color;
}

setInterval(updateSatelliteData, 5000); // update every 5 seconds
updateSatelliteData();

function createStars(count) {
  const container = document.getElementById('star-container');
  if (!container) return;
  
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(star);
  }
}

createStars(600);