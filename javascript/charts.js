const backgroundColors = {
    scopus: "rgba(75, 192, 192, 0.2)",
    wos: "rgba(255, 206, 86, 0.2)",
    both: "rgba(153, 102, 255, 0.2)",
    topAuthors: "rgba(153, 102, 255, 0.2)",
    topCited: "rgba(255, 159, 64, 0.2)",
    citations: "rgba(255, 99, 132, 0.2)",
    institutions: "rgba(54, 162, 235, 0.2)",
};

const borderColors = {
    scopus: "rgba(75, 192, 192, 1)",
    wos: "rgba(255, 206, 86, 1)",
    both: "rgba(153, 102, 255, 1)",
    topAuthors: "rgba(153, 102, 255, 1)",
    topCited: "rgba(255, 159, 64, 1)",
    citations: "rgba(255, 99, 132, 1)",
    institutions: "rgba(54, 162, 235, 1)",
};

//random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


//variable global
let chartByYearAndSourceInstance = null;

function getDefaultChartOptions() {
    return {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
}

function generateChartData(
    labels,
    datasetLabels,
    data,
    backgroundColors,
    borderColors
) {
    const datasets = datasetLabels.map((label, index) => {
        return {
            label: label,
            data: data[index],
            backgroundColor: backgroundColors[index],
            borderColor: borderColors[index],
            borderWidth: 1,
        };
    });

    return {
        labels: labels,
        datasets: datasets,
    };
}

function createChartByYearAndSource(years, numArticlesByYearAndSource) {
    const ctx = document.getElementById("chart1").getContext("2d");

    // Destruye la instancia del gráfico anterior si existe.
    if (chartByYearAndSourceInstance) {
        chartByYearAndSourceInstance.destroy();
    }

    // Extraer datos para cada fuente
    const scopusData = years.map(
        (year) => numArticlesByYearAndSource[year]?.["Scopus"] || 0
    );
    const wosData = years.map(
        (year) => numArticlesByYearAndSource[year]?.["Web of Science"] || 0
    );
    const bothData = years.map(
        (year) =>
            numArticlesByYearAndSource[year]?.["Scopus, Web of Science"] || 0
    );

    const labels = years;
    const datasetLabels = ["Scopus", "Web of Science", "Ambas"];
    const data = [scopusData, wosData, bothData];
    const chartBackgroundColors = [
        backgroundColors.scopus,
        backgroundColors.wos,
        backgroundColors.both,
    ];
    const chartBorderColors = [
        borderColors.scopus,
        borderColors.wos,
        borderColors.both,
    ];

    const chartData = generateChartData(
        labels,
        datasetLabels,
        data,
        chartBackgroundColors,
        chartBorderColors
    );

    const chartOptions = getDefaultChartOptions();

    // Almacena la instancia del gráfico en la variable global.
    chartByYearAndSourceInstance = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: chartOptions,
    });
}

// función createChartBySource para crear la segunda gráfica utilizando Chart.js:
function createChartBySource(sources, numArticlesBySource) {
    const ctx = document
        .getElementById("publicationsBySourceChart")
        .getContext("2d");

    const labels = sources;
    const datasetLabels = ["Cantidad de publicaciones por fuente"];
    const data = [sources.map((source) => numArticlesBySource[source])];

    const chartData = generateChartData(
        labels,
        datasetLabels,
        data,
        [],
        []
    );

    const chartOptions = getDefaultChartOptions();

    new Chart(ctx, {
        type: "bar", // Cambia a "pie" para un gráfico circular
        data: chartData,
        options: chartOptions,
    });
}

function getTopNAuthors(numArticlesByAuthor, n = 10) {
    return Object.entries(numArticlesByAuthor)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
}
//función createChartByAuthor para crear la tercera gráfica utilizando Chart.js.
//Esta función también ordenará a los autores por la cantidad de publicaciones y tomará solo los N autores más productivos (en este ejemplo, N = 10):

function createChartByAuthor(numArticlesByAuthor, year) {
    if (typeof topAuthorsChart !== "undefined" && topAuthorsChart !== null) {
        topAuthorsChart.destroy();
    }

    const topAuthors = getTopNAuthors(numArticlesByAuthor, 10);

    const authors = topAuthors.map((entry) => entry[0]);
    const numArticles = topAuthors.map((entry) => entry[1]);

    const ctx = document.getElementById("topAuthorsChart").getContext("2d");
    const labels = authors;
    const datasetLabels = [`Autores más productivos (${year})`];
    const data = [numArticles];

    const chartData = generateChartData(
        labels,
        datasetLabels,
        data,
        [backgroundColors.purple],
        [borderColors.purple]
    );
    const chartOptions = getDefaultChartOptions();

    topAuthorsChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: chartOptions,
    });
}

function createCitationsByYearChart(yearCitationData) {
    const ctx = document
        .getElementById("citationsByYearChart")
        .getContext("2d");

    const labels = yearCitationData.map((dataPoint) => dataPoint.x);
    const datasetLabels = ["Citas por año de publicación"];
    const data = [yearCitationData.map((dataPoint) => dataPoint.y)];

    const chartData = generateChartData(
        labels,
        datasetLabels,
        data,
        [backgroundColors.red],
        [borderColors.red]
    );

    const chartOptions = getDefaultChartOptions(true, true, "Año", "Citas");

    new Chart(ctx, {
        type: "scatter",
        data: chartData,
        options: chartOptions,
    });
}

function truncateTitle(title, maxLength = 50) {
    return title.length > maxLength
        ? title.substring(0, maxLength) + "..."
        : title;
}

function createTopCitedChart(titles, citations) {
    const ctx = document.getElementById("topCitedChart").getContext("2d");
    const shortTitles = titles.map((title) => truncateTitle(title, 50));

    const labels = shortTitles;
    const datasetLabels = ["Publicaciones más citadas"];
    const data = [citations];

    const chartData = generateChartData(
        labels,
        datasetLabels,
        data,
        [backgroundColors.orange],
        [borderColors.orange]
    );
    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 90,
                    font: {
                        size: 10,
                    },
                },
            },
        },
    };

    new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: chartOptions,
    });
}

function generateChartDataScatter(
    labels,
    data,
    backgroundColors,
    borderColors
) {
    const datasets = labels.map((label, i) => {
        return {
            label: label,
            data: data[i],
            backgroundColor: backgroundColors[i],
            borderColor: borderColors[i],
            borderWidth: 1,
        };
    });

    return {
        datasets: datasets,
    };
}

function createYearCitationScatterChart(yearCitationData) {
    const ctx = document
        .getElementById("yearCitationScatterChart")
        .getContext("2d");

    const labels = ["Citas por año de publicación"];
    const data = [yearCitationData];
    const chartData = generateChartDataScatter(
        labels,
        data,
        [backgroundColors.red],
        [borderColors.red]
    );

    const chartOptions = {
        scales: {
            x: {
                type: "linear",
                min: 2010,
                max: 2023,
                ticks: {
                    beginAtZero: true,
                },
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

// Cantidad de publicaciones por institución
function filterInstitutions(
    institutions,
    numPublicationsByInstitution,
    filter,
    topN
) {
    const filteredInstitutions = institutions.filter(
        (institution) => !institution.includes(filter)
    );

    return filteredInstitutions
        .sort(
            (a, b) =>
                numPublicationsByInstitution[b] -
                numPublicationsByInstitution[a]
        )
        .slice(0, topN);
}

function createChartByInstitution(institutions, numPublicationsByInstitution) {
    const filteredInstitutions = filterInstitutions(
        institutions,
        numPublicationsByInstitution,
        "Universidad Técnica Particular de Loja",
        10
    );
    const ctx = document
        .getElementById("publicationsByInstitutionChart")
        .getContext("2d");

    const labels = filteredInstitutions;
    const datasetLabels = ["Cantidad de publicaciones por institución"];
    const data = [
        filteredInstitutions.map(
            (institution) => numPublicationsByInstitution[institution]
        ),
    ];

    const chartData = generateChartData(
        labels,
        datasetLabels,
        data,
        [backgroundColors.blue],
        [borderColors.blue]
    );
    const chartOptions = getDefaultChartOptions();

    new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: chartOptions,
    });
}

let topAuthorsChart = null;

export {
    createChartByYearAndSource,
    createChartBySource,
    createChartByAuthor,
    createCitationsByYearChart,
    createTopCitedChart,
    createYearCitationScatterChart,
    createChartByInstitution,
};
