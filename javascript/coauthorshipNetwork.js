// coauthorshipNetwork.js

let data = [];

Papa.parse("./data/new-wos-scopus.csv", {
    header: true,
    download: true,
    complete: function (results) {
        data = results.data;
        fillYearSelect(data);
        createCoauthorshipNetwork(data, selectedYear);
        //createCoauthorshipNetwork(data, "all");
    },
});

function getUniqueYears(data) {
    const years = new Set();
    data.forEach((row) => {
        years.add(row.Year);
    });
    return Array.from(years).sort();
}

function fillYearSelect(data) {
    const yearSelect = document.getElementById("yearSelect");
    const years = getUniqueYears(data);

    years.forEach((year) => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
}

function createCoauthorshipNetwork(data, selectedYear) {
    const authors = new Map();
    const links = [];

    // Filtrar los datos en función del año seleccionado
    const filteredData = data.filter((row) => {
        if (selectedYear === "all") {
            return true;
        }
        return row.Year === selectedYear;
    });

    filteredData.forEach((row) => {
        const authorList = row.Authors.split(";");

        authorList.forEach((author, index) => {
            if (!authors.has(author)) {
                authors.set(author, { name: author, count: 0 });
            }

            authors.get(author).count += 1;

            for (let i = index + 1; i < authorList.length; i++) {
                const coauthor = authorList[i];
                links.push({ source: author, target: coauthor });
            }
        });
    });

    const nodes = Array.from(authors.values());

    const svg = d3.select("#coauthorshipNetwork");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const simulation = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(links).id((d) => d.name).distance(100))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);

    const link = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 1);

    const node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", (d) => Math.sqrt(d.count) * 3)
        .attr("fill", "#69b3a2")
        .call(drag(simulation));

    node.append("title").text((d) => d.name);

    function ticked() {
        link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    function drag(simulation) {
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }
}

document.getElementById("yearSelect").addEventListener("change", (event) => {
    const selectedYear = event.target.value;
    // Limpia el SVG antes de recrear la visualización
    d3.select("#coauthorshipNetwork").selectAll("*").remove();
    createCoauthorshipNetwork(data, selectedYear);
});

const svg = d3.select("#coauthorshipNetwork");
resizeSVG(); // Llama a la función resizeSVG para ajustar el tamaño inicial del SVG

// Función para ajustar el tamaño del SVG de acuerdo al tamaño de la ventana
function resizeSVG() {
    const containerWidth = d3.select(".chart-container").node().getBoundingClientRect().width;
    svg.attr("width", containerWidth).attr("height", containerWidth * 0.6);
    createCoauthorshipNetwork(data, "all");
}

// Controlador de eventos para el cambio de tamaño de la ventana
window.addEventListener("resize", () => {
    // Limpia el SVG antes de recrear la visualización
    d3.select("#coauthorshipNetwork").selectAll("*").remove();
    resizeSVG();
});