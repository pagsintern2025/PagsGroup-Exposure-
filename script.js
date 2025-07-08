const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv';

Tabletop.init({
  key: SHEET_URL,
  callback: handleData,
  simpleSheet: true
});

function handleData(data) {
  // Build fund-company matrix
  const funds = [...new Set(data.map(row => row.Fund))];
  const companies = [...new Set(data.map(row => row.Company))];

  const matrix = funds.map(fund => {
    return companies.map(company => {
      const entry = data.find(r => r.Fund === fund && r.Company === company);
      return entry ? Number(entry.Amount) : 0;
    });
  });

  const ctx = document.getElementById('exposureChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: companies,
      datasets: funds.map((fund, i) => ({
        label: fund,
        data: matrix[i],
        backgroundColor: `hsl(${(i * 70) % 360}, 60%, 60%)`
      }))
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Investment Amount'
          }
        }
      }
    }
  });
}
