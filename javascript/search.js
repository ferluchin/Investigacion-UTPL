console.log('search.js cargado');

let table;

window.addEventListener('DOMContentLoaded', function () {
    // Inicializa DataTables aquí
    table = $('#searchResultsTable').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json"
            
        },
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
    });

    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const searchInput = document.getElementById('searchInput');
        const keyword = searchInput.value.trim().toLowerCase();

        if (keyword === '') {
            alert('Por favor, ingrese una palabra clave o título para buscar.');
        } else {
            search(keyword);
        }
        return false;
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
                const source = row['Fuente'];

                if (!titlesMap.has(title)) {
                    titlesMap.set(title, { authors: [], keywords, citations, source });
                }
                titlesMap.get(title).authors.push(authors);
            });

            console.log('Mapa de títulos:', titlesMap);

            const sortedResults = Array.from(titlesMap, ([title, data]) => {
                const authors = [...new Set(data.authors.map(a => a.split(', ')).flat())].join(', ');
                const keywords = data.keywords;
                const citations = data.citations;
                const source = data.source;

                return {
                    title,
                    authors,
                    keywords,
                    citations,
                    source
                };
            }).sort((a, b) => b.citations - a.citations);
            console.log('Resultados ordenados:', sortedResults);

            // Borra las filas existentes en la tabla
            table.clear().draw();

            // Añade filas a la tabla usando DataTables
            sortedResults.forEach(data => {
                let sourceHTML = "";
                if (data.source.includes("Web of Science")) {
                    sourceHTML += '<img src="images/wos-logo.png" alt="Web of Science" class="tech-logo">';
                }
                if (data.source.includes("Scopus")) {
                    sourceHTML += '<img src="images/scopus-logo.png" alt="Scopus" class="tech-logo">';
                }

                table.row.add([
                    data.title,
                    data.authors,
                    data.keywords,
                    data.citations,
                    sourceHTML
                ]).draw();
            });
        },
        error: function (err, file, inputElem, reason) {
            console.error('Error al cargar el archivo CSV:', err);
        }
    });
}