// chartByCitations.js
import { createCitationsByYearChart } from "./charts.js";

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

export { processDataByCitations };