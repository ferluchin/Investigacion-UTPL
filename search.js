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
                const keywords = row['Keywords'] ? row['Keywords'].toLowerCase() : '';
                return title.includes(keyword) || keywords.includes(keyword);
            });
            console.log('Datos filtrados:', filteredData);
            const authorsMap = new Map();

            filteredData.forEach(row => {
                const authors = row['Authors'].split(', ');
                authors.forEach(author => {
                    if (!authorsMap.has(author)) {
                        authorsMap.set(author, []);
                    }
                    authorsMap.get(author).push(row['Title']);
                });
            });

            console.log('Mapa de autores:', authorsMap); // Agrega esto

            const searchResultsTable = document.getElementById('searchResultsTable');
            const tbody = searchResultsTable.querySelector('tbody');
            tbody.innerHTML = '';

            authorsMap.forEach((titles, author) => {
                const tr = document.createElement('tr');
                const authorTd = document.createElement('td');
                authorTd.textContent = author;
                tr.appendChild(authorTd);

                const titlesTd = document.createElement('td');
                titlesTd.innerHTML = titles.join('<br>');
                tr.appendChild(titlesTd);

                tbody.appendChild(tr);
            });
        },
        error: function (err, file, inputElem, reason) { // Agrega esto
            console.error('Error al cargar el archivo CSV:', err); // Agrega esto
        } // Agrega esto
    });
}