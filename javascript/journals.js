//import Chart from 'chart.js/auto';
// import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js';
//import chartjs from 'https://cdn.skypack.dev/chartjs';
//import { Chart } from "./charts.js";
//import { Chart } from 'https://cdn.skypack.dev/chart.js/dist/chart.min.js';
//import { Chart } from 'https://cdn.skypack.dev/chart.js';
//import Chart from 'chart.js/auto';
import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js';
import Chart from 'chart.js/auto';

async function loadCSV() {
    const response = await fetch('./data/new-wos-scopus.csv');
    const csvText = await response.text();
    return Papa.parse(csvText, { header: true });
}

async function showPopularJournals() {
    const { data } = await loadCSV();
    const sourceCounts = {};

    for (const row of data) {
        const source = row['Source title'];
        if (source) {
            sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        }
    }

    const sortedSources = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]);

    // Crea una lista de etiquetas y datos para la gráfica
    const labels = sortedSources.map(([source]) => source);
    const dataPoints = sortedSources.map(([_, count]) => count);

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
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

showPopularJournals();
