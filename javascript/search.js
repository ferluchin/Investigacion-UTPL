//import * as Papa from 'papaparse';

console.log('search.js cargado');

window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const searchInput = document.getElementById('searchInput');
        const keyword = searchInput.value.trim().toLowerCase();

        if (keyword === '') {
            alert('Por favor, ingrese una palabra clave o título para buscar.');
        } else {
            search(keyword);
        }
        return false; // Agrega esta línea
    });
});

function search(keyword) {
    console.log('Buscando:', keyword);
    Papa.parse('./data/new-wos-scopus.csv', {
        download: true,
        header: true,
        complete: function (results) {
            console.log('Datos CSV cargados:', results.data);
            const data = results.data;
            const filteredData = data.filter(row => {
                const title = row['Title'] ? row['Title'].toLowerCase() : '';
                const keywords = row['Author Keywords'] ? row['Author Keywords'].toLowerCase() : '';
                return title.includes(keyword) || keywords.includes(keyword);
            });
            console.log('Datos filtrados:', filteredData);

            const titlesMap = new Map();

            filteredData.forEach(row => {
                const authors = row['Authors'];
                const title = row['Title'];
                const keywords = row['Author Keywords'];
                const citations = row['Cited by'];
                const source = row['Fuente']; // Añade esta línea

                if (!titlesMap.has(title)) {
                    titlesMap.set(title, { authors: [], keywords, citations, source }); // Añade source
                }
                titlesMap.get(title).authors.push(authors);
            });

            console.log('Mapa de títulos:', titlesMap);

            const searchResultsTable = document.getElementById('searchResultsTable');
            const tbody = searchResultsTable.querySelector('tbody');
            tbody.innerHTML = '';

            // Modificación
            const sortedResults = Array.from(titlesMap, ([title, data]) => {
                const authors = [...new Set(data.authors.map(a => a.split(', ')).flat())].join(', ');
                const keywords = data.keywords;
                const citations = data.citations;
                const source = data.source; // Añade esta línea

                return {
                    title,
                    authors,
                    keywords,
                    citations,
                    source // Añade esta línea
                };
            }).sort((a, b) => b.citations - a.citations);
            console.log('Resultados ordenados:', sortedResults);

            sortedResults.forEach(data => {
                const tr = document.createElement('tr');
                const titleTd = document.createElement('td');
                titleTd.textContent = data.title;
                tr.appendChild(titleTd);

                const authorsTd = document.createElement('td');
                authorsTd.innerHTML = data.authors;
                tr.appendChild(authorsTd);

                // Agrega la columna de palabras clave
                const keywordsTd = document.createElement('td');
                keywordsTd.innerHTML = data.keywords;
                tr.appendChild(keywordsTd);

                // Agrega la columna de citas
                const citationsTd = document.createElement('td');
                citationsTd.innerHTML = data.citations;
                tr.appendChild(citationsTd);

                // Agrega la columna de Fuente
                const sourceTd = document.createElement('td');
                let sourceHTML = "";
                if (data.source.includes("Web of Science")) {
                    sourceHTML += '<img src="images/wos-logo.png" alt="Web of Science" class="tech-logo">';
                }
                if (data.source.includes("Scopus")) {
                    sourceHTML += '<img src="images/scopus-logo.png" alt="Scopus" class="tech-logo">';
                }
                sourceTd.innerHTML = sourceHTML;
                tr.appendChild(sourceTd);

                tbody.appendChild(tr);
            });
        },
        error: function (err, file, inputElem, reason) {
            console.error('Error al cargar el archivo CSV:', err);
        }
    });
}