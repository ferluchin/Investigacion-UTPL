// app.js
import { processDataByYearAndSource } from "./chartYearAndSource.js";
import { processDataBySource } from "./chartBySource.js";
import { processDataByAuthor } from "./chartByAuthor.js";
import { processDataByCitations } from "./chartByCitations.js";
import { processDataByTopCited } from "./chartTopCited.js";
import { processDataByYearAndCitations } from "./chartYearAndCitations.js";
import { processDataByInstitution } from "./chartByInstitution.js";

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
