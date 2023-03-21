import * as Papa from 'papaparse';

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.trim().toLowerCase();

    if (keyword === '') {
        alert('Por favor, ingrese una palabra clave o título para buscar.');
    } else {
        search(keyword);
    }
});

function search(keyword) {
    Papa.parse('Combinado-WoS-Scopus.csv', {
        download: true,
        header: true,
        complete: function (results) {
            const data = results.data;
            const filteredData = data.filter(row => {
                const title = row['Title'].toLowerCase();
                const keywords = row['Keywords'].toLowerCase();
                return title.includes(keyword) || keywords.includes(keyword);
            });

            const authorsMap = new Map();

            filteredData.forEach(row => {
                const authors = row['Authors'].split(', ');
                authors.forEach(author => {
                    if (!authorsMap.has(author)) {
                        authorsMap.set(author, []);
                    }
                    authorsMap.get(author).push(row['title']);
                });
            });

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
        }
    });
}