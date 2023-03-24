// chartYearAndSource.js
import { createChartByYearAndSource } from "./charts.js";

// Data for año y fuente
function processDataByYearAndSource(csvData) {
    const years = new Set();
    const sources = new Set();
    const numArticlesByYearAndSource = {};

    Papa.parse(csvData, {
        header: true,
        step: function (row) {
            const year = parseInt(row.data.Year, 10);
            const source = row.data.Fuente;

            // Verifica si el año está dentro del rango deseado (2010-2023)
            if (year < 2010 || year > 2023) {
                return;
            }

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

export { processDataByYearAndSource };
