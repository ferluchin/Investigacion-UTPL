// chartByAuthor.js
import { createChartByAuthor } from "./charts.js";

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

export { processDataByAuthor };