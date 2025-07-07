let portfolio = [
  {
    name: "OpenAI",
    industry: "AI",
    investmentDate: "2022-01-01",
    investmentAmount: 5000000,
    currentValue: 7000000
  }
];

const tableBody = document.querySelector("#portfolio-table tbody");
const form = document.getElementById("add-company-form");
const ctx = document.getElementById("portfolioChart").getContext("2d");

function renderTable() {
  tableBody.innerHTML = "";
  portfolio.forEach(company => {
    const row = document.createElement("tr");
    const returnPct = (((company.currentValue - company.investmentAmount) / company.investmentAmount) * 100).toFixed(2);
    row.innerHTML = `
      <td>${company.name}</td>
      <td>${company.industry}</td>
      <td>${company.investmentDate}</td>
      <td>$${company.investmentAmount.toLocaleString()}</td>
      <td>$${company.currentValue.toLocaleString()}</td>
      <td>${returnPct}%</td>
    `;
    tableBody.appendChild(row);
  });
}

function updateChart(chart) {
  const labels = portfolio.map(c => c.name);
  const values = portfolio.map(c => c.currentValue);

  chart.data.labels = labels;
  chart.data.datasets[0].data = values;
  chart.update();
}

// Create Chart.js pie chart
const portfolioChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [],
    datasets: [{
      label: "Portfolio Allocation",
      data: [],
      backgroundColor: ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc949"]
    }]
  },
  options: {
    responsive: true
  }
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCompany = {
    name: document.getElementById("name").value,
    industry: document.getElementById("industry").value,
    investmentDate: document.getElementById("date").value,
    investmentAmount: parseFloat(document.getElementById("amount").value),
    currentValue: parseFloat(document.getElementById("value").value)
  };

  portfolio.push(newCompany);
  renderTable();
  updateChart(portfolioChart);

  form.reset();
});

renderTable();
updateChart(portfolioChart);

