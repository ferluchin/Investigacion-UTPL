import { createChart, createChartBySource, createChartByAuthor, createCitationsByYearChart, createTopCitedChart } from "./charts.js";

// Función para leer el archivo CSV y procesar los datos
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
//Crea una nueva función processDataByAuthor para procesar el CSV y contar las publicaciones por autor:
function processDataByAuthor(csvData) {
    const numArticlesByAuthor = {};

    Papa.parse(csvData, {
        header: true,
        step: function (row) {
            const authors = row.data.Authors.split(", ");

            authors.forEach((author) => {
                if (author.length > 1) { // Asegurarse de que el nombre del autor tenga más de un carácter
                    if (!numArticlesByAuthor.hasOwnProperty(author)) {
                        numArticlesByAuthor[author] = 1;
                    } else {
                        numArticlesByAuthor[author]++;
                    }
                }
            });
        },
        complete: function () {
            createChartByAuthor(numArticlesByAuthor);
        },
    });
}

// función processDataByCitations para procesar el CSV y recopilar la información del año de publicación y las citas:
function processDataByCitations(csvData) {
    const yearCitationData = [];

    Papa.parse(csvData, {
        delimiter: ";",
        header: true,
        step: function (row) {
            const year = row.data.Year;
            const citedByIndex = Object.keys(row.data).find((key) => key.toLowerCase() === "cited by");
            const citations = row.data[citedByIndex];

            if (citations) {
                yearCitationData.push({ year: parseInt(year), citations: parseInt(citations) });
            }
        },
        complete: function () {
            createCitationsByYearChart(yearCitationData);
        },
    });
}

function processDataByTopCited(csvData) {
    const topCited = [];

    Papa.parse(csvData, {
        delimiter: ";",
        header: true,
        step: function (row) {
            const title = row.data.Title;
            const citations = parseInt(row.data["Cited by"]);

            topCited.push({ title, citations });
        },
        complete: function () {
            topCited.sort((a, b) => b.citations - a.citations);
            const topCitedTitles = topCited.slice(0, 10).map((entry) => entry.title);
            const topCitedCitations = topCited.slice(0, 10).map((entry) => entry.citations);
            createTopCitedChart(topCitedTitles, topCitedCitations);
        },
    });
}
//
//FIN LECTURA Y PROCESAMIENTO DE ARCHIVOS CSV
export { processData, processDataBySource, processDataByAuthor, processDataByCitations, processDataByTopCited };