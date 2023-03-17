// Función para leer el archivo CSV y procesar los datos
function processData(csvData) {
    const years = new Set();
    const numArticlesByYear = {};

    Papa.parse(csvData, {
        header: true,
        step: function (row) {
            const year = row.data.Year;

            if (!years.has(year)) {
                years.add(year);
                numArticlesByYear[year] = 1;
            } else {
                numArticlesByYear[year]++;
            }
        },
        complete: function () {
            createChart(Array.from(years).sort(), numArticlesByYear);
        },
    });
}

// Función para crear el gráfico utilizando Chart.js
function createChart(years, numArticlesByYear) {
    const ctx = document.getElementById('chart1').getContext('2d');
    const chartData = {
        labels: years,
        datasets: [
            {
                label: 'Número de artículos por año',
                data: years.map((year) => numArticlesByYear[year]),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
    });
}

// Leer el archivo CSV
fetch('Combinado-WoS-Scopus.csv')
    .then((response) => response.text())
    .then((csvData) => processData(csvData))
    .catch((error) => console.error('Error al leer el archivo CSV:', error));