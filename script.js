// Initialize Chart.js
let chart = null;

function calculateSParameters() {
  const freqInput = document.getElementById("freq");
  const freq = parseFloat(freqInput.value);

  if (isNaN(freq) || freq <= 0) {
    alert("Please enter a valid positive frequency.");
    return;
  }

  // Simple S-parameter calculation (example logic)
  const S11 = (Math.sin(freq) * -10).toFixed(2);
  const S21 = (Math.cos(freq) * 10).toFixed(2);
  const S12 = (Math.sin(freq) * 5).toFixed(2);
  const S22 = (Math.cos(freq) * -5).toFixed(2);

  // Display results
  document.getElementById("results").innerText = `S11: ${S11} dB  |  S21: ${S21} dB  |  S12: ${S12} dB  |  S22: ${S22} dB`;

  // Update chart
  updateChart(freq, S11, S21, S12, S22);
}

function updateChart(freq, S11, S21, S12, S22) {
  const ctx = document.getElementById("sParamChart").getContext("2d");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["S11", "S21", "S12", "S22"],
      datasets: [{
        label: `S-Parameters at ${freq} GHz`,
        data: [parseFloat(S11), parseFloat(S21), parseFloat(S12), parseFloat(S22)],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}
