// chartYearAndCitations.js
import { createYearCitationScatterChart } from "./charts.js";

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

export { processDataByYearAndCitations };
