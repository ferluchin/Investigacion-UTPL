
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

//función createChartByAuthor para crear la tercera gráfica utilizando Chart.js. 
//Esta función también ordenará a los autores por la cantidad de publicaciones y tomará solo los N autores más productivos 
//(en este ejemplo, N = 10):

function createChartByAuthor(numArticlesByAuthor) {
    // Ordenar autores por cantidad de publicaciones y tomar solo los 10 primeros
    const topAuthors = Object.entries(numArticlesByAuthor)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const authors = topAuthors.map((entry) => entry[0]);
    const numArticles = topAuthors.map((entry) => entry[1]);

    const ctx = document.getElementById("topAuthorsChart").getContext("2d");
    const chartData = {
        labels: authors,
        datasets: [
            {
                label: "Autores más productivos",
                data: numArticles,
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
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
        type: "bar",
        data: chartData,
        options: chartOptions,
    });
}

//función createCitationsByYearChart para crear la cuarta gráfica utilizando Chart.js:

function createCitationsByYearChart(yearCitationData) {
    const ctx = document.getElementById("citationsByYearChart").getContext("2d");
    const chartData = {
        datasets: [
            {
                label: "Citas por año de publicación",
                data: yearCitationData,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };
    const chartOptions = {
        scales: {
            x: {
                type: "linear",
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Año",
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Citas",
                },
            },
        },
    };

    new Chart(ctx, {
        type: "scatter",
        data: chartData,
        options: chartOptions,
    });
}

export { createChart, createChartBySource, createChartByAuthor, createCitationsByYearChart };