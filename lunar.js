

/* lunar.js  — minimal version */
let chart;                                // holds the Chart.js instance

function calculatePayload () {
  // ---------- grab inputs ----------
  const dry   = +document.getElementById('dryMass').value;
  const fuel  = +document.getElementById('fuelMass').value;
  const isp   = +document.getElementById('isp').value;

  // ---------- constants & maths ----------
  const g0 = 9.81,             dvNeed = 15_400,          // m/s
        ve = isp * g0,         m0     = dry + fuel,
        payload = Math.max(m0 / Math.exp(dvNeed / ve) - dry, 0),
        dvMax   = ve * Math.log(m0 / dry),               // zero-payload Δv
        km      = Math.min(dvMax / dvNeed, 1) * 384_400; // Earth-Moon km

  // ---------- write results ----------
  const res = document.getElementById('result');
  res.innerHTML = `
      <h3>Results</h3>
      <p><strong>Payload:</strong> ${payload.toFixed(0)} kg</p>
      <canvas id="distChart" height="110"></canvas>
  `;

  // ---------- draw / redraw chart ----------
  chart?.destroy();                               // clean up previous run
  chart = new Chart(document.getElementById('distChart'), {
    type: 'bar',
    data: {
      labels: ['Earth → Moon'],
      datasets: [
        { label: 'km achievable', data: [km],     backgroundColor: 'teal' },
        { label: 'total 384 400 km', data: [384400], backgroundColor: 'gray' }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      scales: { x: { beginAtZero: true } },
      plugins: { legend: { display: false } }
    }
  });
}



const map = L.map('map',{zoomControl:false}).setView([0,0],2);

L.tileLayer(
  'https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
  {maxZoom:7,attribution:'NASA Moon Trek'}
).addTo(map);

// sample craters
[[ -43.3,-11.2,'Tycho'],[9.7,-20,'Copernicus']].forEach(([lat,lng,name])=>{
  L.circleMarker([lat,lng],{radius:6,color:'red'}).addTo(map)
   .bindPopup(name);
});

// sample water spots
[[85,15],[ -85,-25]].forEach(([lat,lng])=>{
  L.circleMarker([lat,lng],{radius:6,color:'cyan'}).addTo(map)
   .bindPopup('Possible water ice');
});








