let vehicleCount = 0;

function addVehicle() {
  const container = document.getElementById("vehicleContainer");
  const div = document.createElement("div");
  div.className = "vehicle-group";
  div.innerHTML = `
    <label>Vehicle ${vehicleCount + 1} Type:</label>
    <select id="vehicleType${vehicleCount}">
      <option value="petrol">Petrol</option>
      <option value="diesel">Diesel</option>
      <option value="electric">Electric</option>
      <option value="hybrid">Hybrid</option>
    </select>

    <label>Vehicle ${vehicleCount + 1} Category:</label>
    <select id="category${vehicleCount}">
      <option value="2w">2-Wheeler</option>
      <option value="4w">4-Wheeler</option>
    </select>

    <label>Daily Distance (km):</label>
    <input type="number" id="distance${vehicleCount}" placeholder="e.g., 20">

    <label>Fuel Efficiency (km/l or km/kWh):</label>
    <input type="number" id="efficiency${vehicleCount}" placeholder="e.g., 15">
  `;
  container.appendChild(div);
  vehicleCount++;
}

function calculateEmissions() {
  let totalCarEmissions = 0;

  for (let i = 0; i < vehicleCount; i++) {
    const distance = parseFloat(document.getElementById(`distance${i}`).value);
    const efficiency = parseFloat(document.getElementById(`efficiency${i}`).value);
    const vehicleType = document.getElementById(`vehicleType${i}`).value;

    if (isNaN(distance) || isNaN(efficiency)) continue;

    let emissionFactor;
    switch(vehicleType) {
      case "petrol": emissionFactor = 2.31; break;
      case "diesel": emissionFactor = 2.68; break;
      case "electric": emissionFactor = 0; break;
      case "hybrid": emissionFactor = 1.15; break;
      default: emissionFactor = 2.31;
    }

    let fuelUsed = distance / efficiency;
    let emissions = fuelUsed * emissionFactor;
    totalCarEmissions += emissions;
  }

  const electricity = parseFloat(document.getElementById("electricity").value) || 0;
  const electricityEmissionFactor = 0.85;
  const electricityEmissions = electricity * electricityEmissionFactor;
  const totalEmissions = totalCarEmissions + electricityEmissions;
  const monthlyProjection = totalEmissions * 30;

  document.getElementById("carEmission").textContent = `Vehicle Emissions: ${totalCarEmissions.toFixed(2)} kg CO₂/day`;
  document.getElementById("electricityEmission").textContent = `Electricity Emissions: ${electricityEmissions.toFixed(2)} kg CO₂/day`;
  document.getElementById("totalEmission").textContent = `Total Daily Emissions: ${totalEmissions.toFixed(2)} kg CO₂`;
  document.getElementById("monthlyProjection").textContent = `Projected Monthly Emissions: ${monthlyProjection.toFixed(2)} kg CO₂`;

  let recommendation = "Great job! Keep tracking your impact.";
  if (totalEmissions > 10) {
    recommendation = "Try using public transport twice a week to reduce your carbon footprint by ~20%.";
  } else if (electricity > 15) {
    recommendation = "Consider switching to energy-efficient appliances to lower electricity use.";
  }

  document.getElementById("recommendation").textContent = recommendation;
  document.getElementById("resultModal").style.display = "block";
}

window.onclick = function(event) {
  const modal = document.getElementById('resultModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Add initial vehicle input
window.onload = () => addVehicle();
