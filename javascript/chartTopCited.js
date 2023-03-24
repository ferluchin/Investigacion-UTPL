// charTopCited.js

// chartTopCited.js
import { createTopCitedChart } from "./charts.js";

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

export { processDataByTopCited };
