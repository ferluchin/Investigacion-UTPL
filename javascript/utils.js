import {
    createChartBySource,
    createChartByAuthor,
    createCitationsByYearChart,
    createTopCitedChart,
    createYearCitationScatterChart,
    createChartByInstitution,
    createChartByYearAndSource,
} from "./charts.js";

// Función para leer el archivo CSV y procesar los datos

// Data for año y fuente
function processDataByYearAndSource(csvData) {
    const years = new Set();
    const sources = new Set();
    const numArticlesByYearAndSource = {};

    Papa.parse(csvData, {
        header: true,
        step: function (row) {
            const year = row.data.Year;
            const source = row.data.Fuente;

            if (!years.has(year)) {
                years.add(year);
            }

            if (!sources.has(source)) {
                sources.add(source);
            }

            if (!numArticlesByYearAndSource.hasOwnProperty(year)) {
                numArticlesByYearAndSource[year] = {};
            }

            if (!numArticlesByYearAndSource[year].hasOwnProperty(source)) {
                numArticlesByYearAndSource[year][source] = 1;
            } else {
                numArticlesByYearAndSource[year][source]++;
            }
        },
        complete: function () {
            createChartByYearAndSource(
                Array.from(years).sort(),
                numArticlesByYearAndSource
            );
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
            createChartBySource(
                Array.from(sources).sort(),
                numArticlesBySource
            );
        },
    });
}
//Crea una nueva función processDataByAuthor para procesar el CSV y contar las publicaciones por autor:

function processDataByAuthor(csvData, year) {
    const numArticlesByAuthor = {};

    Papa.parse(csvData, {
        header: true,
        step: function (row) {
            const authors = row.data.Authors.split(", ");
            const publicationYear = row.data.Year;

            if (publicationYear == year) {
                authors.forEach((author) => {
                    if (author.length > 1) {
                        // Asegurarse de que el nombre del autor tenga más de un carácter
                        if (!numArticlesByAuthor.hasOwnProperty(author)) {
                            numArticlesByAuthor[author] = 1;
                        } else {
                            numArticlesByAuthor[author]++;
                        }
                    }
                });
            }
        },
        complete: function () {
            createChartByAuthor(numArticlesByAuthor, year);
        },
        error: function (err, file, inputElem, reason) {
            console.error("Error en el parseo del CSV:", err, reason);
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
            const citedByIndex = Object.keys(row.data).find(
                (key) => key.toLowerCase() === "cited by"
            );
            const citations = row.data[citedByIndex];

            if (citations) {
                yearCitationData.push({
                    year: parseInt(year),
                    citations: parseInt(citations),
                });
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
            const topCitedTitles = topCited
                .slice(0, 10)
                .map((entry) => entry.title);
            const topCitedCitations = topCited
                .slice(0, 10)
                .map((entry) => entry.citations);
            createTopCitedChart(topCitedTitles, topCitedCitations);
        },
    });
}

function processDataByYearAndCitations(csvData) {
    const yearCitationData = [];

    Papa.parse(csvData, {
        delimiter: ";",
        header: true,
        step: function (row) {
            const year = parseInt(row.data.Year);
            const citations = parseInt(row.data["Cited by"]);

            yearCitationData.push({ x: year, y: citations });
        },
        complete: function () {
            createYearCitationScatterChart(yearCitationData);
        },
    });
}

// Modifica la función processDataByInstitution
function getTopNInstitutions(numPublicationsByInstitution, N) {
    return Object.entries(numPublicationsByInstitution)
        .sort((a, b) => b[1] - a[1])
        .slice(0, N)
        .map((entry) => entry[0]);
}

function processDataByInstitution(csvData) {
    const numPublicationsByInstitution = {};

    Papa.parse(csvData, {
        header: true,
        step: function (row) {
            const affiliations = row.data.Affiliations; // Asegúrate de que "Affiliations" coincida con el nombre de la columna en tu CSV

            if (affiliations) {
                const affiliationList = affiliations.split(";");
                const uniqueInstitutions = new Set();

                affiliationList.forEach((affiliation) => {
                    const institution = affiliation.trim();
                    uniqueInstitutions.add(institution);
                });

                uniqueInstitutions.forEach((institution) => {
                    if (
                        !numPublicationsByInstitution.hasOwnProperty(
                            institution
                        )
                    ) {
                        numPublicationsByInstitution[institution] = 1;
                    } else {
                        numPublicationsByInstitution[institution]++;
                    }
                });
            }
        },
        complete: function () {
            // Llama a la función getTopNInstitutions para obtener el top 5 de instituciones
            const topInstitutions = getTopNInstitutions(
                numPublicationsByInstitution,
                5
            );

            // Llama a createChartByInstitution con los datos procesados
            createChartByInstitution(
                topInstitutions,
                numPublicationsByInstitution
            );
        },
    });
}

//FIN LECTURA Y PROCESAMIENTO DE ARCHIVOS CSV
export {
    //processData,
    processDataBySource,
    processDataByAuthor,
    processDataByCitations,
    processDataByTopCited,
    processDataByYearAndCitations,
    processDataByInstitution,
    processDataByYearAndSource,
};
