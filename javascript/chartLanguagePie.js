// import Chart from "chart.js";

function processDataLanguages(csvData) {
    const languageCount = {};
    const allowedLanguages = ["English", "Spanish", "Italian", "Portuguese"];

    Papa.parse(csvData, {
        header: true,
        step: function (row) {
            const language = row.data["Language of Original Document"];

            if (allowedLanguages.includes(language)) {
                if (languageCount.hasOwnProperty(language)) {
                    languageCount[language]++;
                } else {
                    languageCount[language] = 1;
                }
            }
        },
        complete: function () {
            createPieChart(languageCount);
        },
    });
}


function createPieChart(data) {
    const ctx = document.getElementById("languagePieChart").getContext("2d");

    const labels = Object.keys(data);
    const values = Object.values(data);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: generateRandomColors(labels.length),
                },
            ],
        },
        options: {
            responsive: true,
            legend: {
                position: "right",
            },
            title: {
                display: true,
                text: "Distribución de idiomas de las publicaciones",
            },
        },
    });
}

function generateRandomColors(numColors) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        colors.push(
            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, 0.5)`
        );
    }
    return colors;
}

export { processDataLanguages };
