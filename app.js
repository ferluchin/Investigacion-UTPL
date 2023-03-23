import {
    processDataByYearAndSource,
    processDataBySource,
    processDataByAuthor,
    processDataByCitations,
    processDataByTopCited,
    processDataByYearAndCitations,
    processDataByInstitution,
} from "./utils.js";

// Leer el archivo CSV
function fetchAndProcessData() {
    return fetch("Combinado-WoS-Scopus.csv")
        .then((response) => response.text())
        .then((csvData) => {
            processDataByYearAndSource(csvData);
            processDataBySource(csvData);
            processDataByAuthor(csvData);
            processDataByCitations(csvData);
            processDataByTopCited(csvData);
            processDataByYearAndCitations(csvData);
            processDataByInstitution(csvData);
            // Devuelve una función que acepta un parámetro 'year'
            return function (year) {
                processDataByAuthor(csvData, year);
            };
        })
        .catch((error) =>
            console.error("Error al leer el archivo CSV:", error)
        );
}

export { fetchAndProcessData };
