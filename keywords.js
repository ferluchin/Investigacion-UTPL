async function extractKeywords() {
    try {
        const response = await fetch("Combinado-WoS-Scopus.csv");
        const csvData = await response.text();
        processData(csvData);
    } catch (error) {
        console.error("Error al cargar el archivo CSV:", error);
    }
}

function processData(csvData) {
    const rows = csvData.split("\n");
    const keywords = new Set();

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].split(";");
        const authorKeywords = cells[14];
        const indexKeywords = cells[15];

        if (authorKeywords) {
            authorKeywords.split(";").forEach((keyword) => keywords.add(keyword.trim()));
        }

        if (indexKeywords) {
            indexKeywords.split(";").forEach((keyword) => keywords.add(keyword.trim()));
        }
    }

    console.log("Palabras clave extraídas:", Array.from(keywords));
}

extractKeywords();