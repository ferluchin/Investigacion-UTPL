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

/*
función processDataBySource para procesar el CSV y contar las publicaciones por fuente:
*/
function processDataBySource(csvData) {
    const sources = new Set();
    const numArticlesBySource = {};

    Papa.parse(csvData, {
        header: true,
        step: function (row) {
            const source = row.data.Fuente;

            if (!sources.has(source)) {
                sources.add(source);
                numArticlesBySource[source] = 1;
            } else {
                numArticlesBySource[source]++;
            }
        },
        complete: function () {
            createChartBySource(Array.from(sources).sort(), numArticlesBySource);
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

// función createChartBySource para crear la segunda gráfica utilizando Chart.js:
function createChartBySource(sources, numArticlesBySource) {
    const ctx = document.getElementById("publicationsBySourceChart").getContext("2d");
    const chartData = {
        labels: sources,
        datasets: [
            {
                label: "Cantidad de publicaciones por fuente",
                data: sources.map((source) => numArticlesBySource[source]),
                backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 206, 86, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)"],
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
        type: "bar", // Cambia a "pie" para un gráfico circular
        data: chartData,
        options: chartOptions,
    });
}
// Leer el archivo CSV
fetch("Combinado-WoS-Scopus.csv")
    .then((response) => response.text())
    .then((csvData) => {
        processData(csvData); // Procesar datos para la primera gráfica
        processDataBySource(csvData); // Procesar datos para la segunda gráfica
    })
    .catch((error) => console.error("Error al leer el archivo CSV:", error));