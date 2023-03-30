// mostCitedAuthors.js
export async function loadCSVAndGenerateCitedChart(selectedYear) {
    const response = await fetch("../data/new-wos-scopus.csv");
    const csvText = await response.text();
    const parsedData = Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
    });

    processDataAndGenerateCitedChart(parsedData.data, selectedYear);
}

function processDataAndGenerateCitedChart(data, selectedYear) {
    const yearsCitations = {};
    data.forEach((entry) => {
        const year = entry.Year;
        const authors = entry.Authors ? entry.Authors.split(";") : [];
        const citations = entry["Cited by"] || 0;

        if (!yearsCitations[year]) {
            yearsCitations[year] = {};
        }

        authors.forEach((author) => {
            if (!yearsCitations[year][author]) {
                yearsCitations[year][author] = 0;
            }
            yearsCitations[year][author] += citations;
        });
    });

    const topCitedAuthors = yearsCitations[selectedYear] ? Object.entries(yearsCitations[selectedYear])
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([author]) => author) : [];

    updateCitedChart(topCitedAuthors, yearsCitations, selectedYear);
}

function updateCitedChart(topCitedAuthors, yearsCitations, selectedYear) {
    const ctx = document.getElementById("myCitedChart").getContext("2d");
    if (window.myCitedChart) {
        if (typeof window.myCitedChart.destroy === 'function') {
            window.myCitedChart.destroy();
        }
    }

    window.myCitedChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: topCitedAuthors,
            datasets: [
                {
                    label: `Top 10 Most Cited Authors in ${selectedYear}`,
                    data: topCitedAuthors.map((author) => yearsCitations[selectedYear][author]),
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Llama a la función aquí
loadCSVAndGenerateCitedChart(2022);