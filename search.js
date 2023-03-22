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
    Papa.parse('Combinado-WoS-Scopus.csv', {
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
                if (!titlesMap.has(title)) {
                    titlesMap.set(title, { authors: [], keywords, citations });
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

                return {
                    title,
                    authors,
                    keywords,
                    citations
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

                tbody.appendChild(tr);
            });
        },
        error: function (err, file, inputElem, reason) {
            console.error('Error al cargar el archivo CSV:', err);
        }
    });
}