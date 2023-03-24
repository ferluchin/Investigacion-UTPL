// chartBySource.js
import { createChartBySource } from "./charts.js";

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

export { processDataBySource };
