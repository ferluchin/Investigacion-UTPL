import { Chart, LinearScale, BarController, BarElement, CategoryScale } from 'https://cdn.skypack.dev/chart.js';

Chart.register(LinearScale, BarController, BarElement, CategoryScale);

async function loadCSV() {
    const response = await fetch('./data/new-wos-scopus.csv');
    const csvText = await response.text();
    return Papa.parse(csvText, { header: true, delimiter: ';' }); // Especifica el delimitador aquí
}

async function showPopularJournals() {
    const { data } = await loadCSV();
    console.log(data); // Verifica los datos cargados desde el archivo CSV


    const sourceCounts = {};

    for (const row of data) {
        const source = row['Source title'];
        if (source) {
            sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        }
    }
    console.log(sourceCounts); // Verifica si las revistas y sus recuentos están correctamente acumulados

    const sortedSources = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]);

    // Crea una lista de etiquetas y datos para la gráfica
    const labels = sortedSources.map(([source]) => source);
    const dataPoints = sortedSources.map(([_, count]) => count);

    console.log(labels, dataPoints); // Verifica si las etiquetas y los puntos de datos están correctamente formateados

    const popularJournalsDiv = document.getElementById('journalsChart');
    const chartCanvas = document.createElement('canvas');
    popularJournalsDiv.appendChild(chartCanvas);

    // Crea un nuevo gráfico de barras
    new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cantidad de publicaciones',
                data: dataPoints,
                backgroundColor: 'rgba(105, 179, 162, 0.8)',
                borderColor: 'rgba(105, 179, 162, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                },
                y: {
                    type: 'linear',
                    beginAtZero: true
                }
            }
        }
    });
}

showPopularJournals();
