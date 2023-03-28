async function loadCSVAndGenerateChart(selectedYear) {
    const response = await fetch("../data/new-wos-scopus.csv");
    const csvText = await response.text();
    const parsedData = Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
    });

    const allYears = parsedData.data.map((entry) => entry.Year);
    const uniqueYears = Array.from(new Set(allYears));
    populateYearSelect(uniqueYears);

    processDataAndGenerateChart(parsedData.data, selectedYear);
}

function processDataAndGenerateChart(data, selectedYear) {
    const years = {};
    data.forEach((entry) => {
        const year = entry.Year;
        const authors = entry.Authors ? entry.Authors.split(";") : [];
        if (!years[year]) {
            years[year] = {};
        }

        authors.forEach((author) => {
            if (!years[year][author]) {
                years[year][author] = 0;
            }
            years[year][author]++;
        });
    });

    const topAuthors = years[selectedYear] ? Object.entries(years[selectedYear])
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([author]) => author) : [];

    updateChart(topAuthors, years, selectedYear);
}

function updateChart(topAuthors, years, selectedYear) {
    const ctx = document.getElementById("myChart").getContext("2d");
    if (window.myChart) {
        if (typeof window.myChart.destroy === 'function') {
            window.myChart.destroy();
        }
    }

    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: topAuthors,
            datasets: [
                {
                    label: `Top 10 Authors in ${selectedYear}`,
                    data: topAuthors.map((author) => years[selectedYear][author]),
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
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

function populateYearSelect(years) {
    const yearSelect = document.getElementById("yearSelect");
    years.sort((a, b) => b - a).forEach((year) => {
        const option = document.createElement("option");
        option.value = year;
        option.text = year;
        if (year === 2022) {
            option.selected = true;
        }
        yearSelect.add(option);
    });
}

// Llama a la función aquí
loadCSVAndGenerateChart();

document.getElementById("yearSelect").addEventListener("change", (event) => {
    const selectedYear = parseInt(event.target.value, 10);
    loadCSVAndGenerateChart(selectedYear);
});
