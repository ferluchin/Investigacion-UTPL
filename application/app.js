import { processData, processDataBySource, processDataByAuthor, processDataByCitations, processDataByTopCited } from "./utils.js";

// Leer el archivo CSV
fetch("Combinado-WoS-Scopus.csv")
    .then((response) => response.text())
    .then((csvData) => {
        processData(csvData); // Procesar datos para la primera gráfica
        processDataBySource(csvData); // Procesar datos para la segunda gráfica
        processDataByAuthor(csvData); // Procesar datos para la tercera gráfica
        processDataByCitations(csvData); // Procesar datos para la cuarta gráfica
        processDataByTopCited(csvData); // Procesar datos para la quinta gráfica
    })
    .catch((error) => console.error("Error al leer el archivo CSV:", error));
