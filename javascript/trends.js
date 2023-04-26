//import * as d3 from 'd3';

const csvFilePath = 'data/new-wos-scopus.csv';

// 1. Leer el archivo CSV
async function readCSVFile() {
    const response = await fetch(csvFilePath);
    const csvText = await response.text();
    const csvData = d3.csvParse(csvText, d3.autoType);
    console.log("CSV data:", csvData);
    return csvData;
}

function isValidRow(row) {
    return row.hasOwnProperty('Author Keywords') && row['Author Keywords'];
}

// 2. Extraer y analizar los datos relevantes
/*
function processData(csvData) {
    const keywordCounts = new Map();

    console.log("Processing data...");
    csvData.forEach((row, index) => {
        console.log(`Processing row ${index}:`, row);
        if (row.hasOwnProperty('Author Keywords') && row['Author Keywords']) {
            const keywords = row['Author Keywords'].trim();
            console.log(`Keywords for row ${index}:`, keywords);
            if (keywords) {
                const keywordList = keywords.split(';');
                keywordList.forEach(keyword => {
                    const trimmedKeyword = keyword.trim();
                    if (keywordCounts.has(trimmedKeyword)) {
                        keywordCounts.set(trimmedKeyword, keywordCounts.get(trimmedKeyword) + 1);
                    } else {
                        keywordCounts.set(trimmedKeyword, 1);
                    }
                });
            }
        }
    });

    const sortedKeywords = Array.from(keywordCounts.entries()).sort((a, b) => b[1] - a[1]);
    console.log("Processed keyword data:", sortedKeywords);
    return sortedKeywords;
}
*/
function processData(csvData) {
    const keywordCounts = new Map();

    console.log("Processing data...");
    csvData.forEach((row, index) => {
        console.log(`Processing row ${index}:`, row);
        if (isValidRow(row)) {
            const keywords = row['Author Keywords'].trim();
            console.log(`Keywords for row ${index}:`, keywords);
            if (keywords) {
                const keywordList = keywords.split(';');
                keywordList.forEach(keyword => {
                    const trimmedKeyword = keyword.trim();
                    if (keywordCounts.has(trimmedKeyword)) {
                        keywordCounts.set(trimmedKeyword, keywordCounts.get(trimmedKeyword) + 1);
                    } else {
                        keywordCounts.set(trimmedKeyword, 1);
                    }
                });
            }
        }
    });

    const sortedKeywords = Array.from(keywordCounts.entries()).sort((a, b) => b[1] - a[1]);
    console.log("Processed keyword data:", sortedKeywords);
    return sortedKeywords;
}


// 3. Visualizar los datos en una nube de etiquetas
function visualizeData(keywordData) {
    // Crear nube de etiquetas utilizando D3.js
    const width = 800;
    const height = 600;
    const svg = d3.select('#word-cloud')
        .attr('width', width)
        .attr('height', height);

    const fontSizeScale = d3.scaleLinear()
        .domain([d3.min(keywordData, d => d[1]), d3.max(keywordData, d => d[1])])
        .range([10, 100]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    console.log("Creating word cloud...");

    svg.selectAll('text')
        .data(keywordData.slice(0, 50)) // Mostrar solo las 50 palabras clave principales
        .enter()
        .append('text')
        .attr('x', () => Math.random() * width)
        .attr('y', () => Math.random() * height)
        .attr('font-size', d => fontSizeScale(d[1]))
        .attr('fill', (_, i) => colorScale(i))
        .text(d => d[0]);
    console.log("Word cloud created.");
}

// Función principal para ejecutar las funciones anteriores
async function main() {
    const csvData = await readCSVFile();
    const keywordData = processData(csvData);
    visualizeData(keywordData);
    console.log("Main function finished.");
}

// Ejecutar la función principal
main();
