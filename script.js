// Sample dummy data
const data = {
  fund: [
    { name: "Fund A", amount: 2000000, value: 2800000 },
    { name: "Fund B", amount: 1500000, value: 1600000 }
  ],
  direct: [
    { name: "Startup X", amount: 1000000, value: 3000000 }
  ],
  other: [
    { name: "Private Equity Y", amount: 500000, value: 750000 }
  ]
};

// Determine which page is loaded
const page = window.location.pathname;

if (page.includes("fund.html")) {
  renderSection("fund", "fund-table", "fundChart");
} else if (page.includes("direct.html")) {
  renderSection("direct", "direct-table", "directChart");
} else if (page.includes("other.html")) {
  renderSection("other", "other-table", "otherChart");
}

function renderSection(key, tableId, chartId) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const sectionData = data[key];

  let html = `<thead><tr><th>Name</th><th>Amount</th><th>Value</th><th>Return (%)</th></tr></thead><tbody>`;
  sectionData.forEach(item => {
    const ret = (((item.value - item.amount) / item.amount) * 100).toFixed(2);
    html += `<tr>
      <td>${item.name}</td>
      <td>$${item.amount.toLocaleString()}</td>
      <td>$${item.value.toLocaleString()}</td>
      <td>${ret}%</td>
    </tr>`;
  });
  html += "</tbody>";
  table.innerHTML = html;

  // Render chart
  const ctx = document.getElementById(chartId);
  if (ctx) {
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: sectionData.map(i => i.name),
        datasets: [{
          data: sectionData.map(i => i.value),
          backgroundColor: ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2"]
        }]
      }
    });
  }
}
