// chartByInstitution.js
import { createChartByInstitution } from "./charts.js";

function getTopNInstitutions(numPublicationsByInstitution, N) {
    return Object.entries(numPublicationsByInstitution)
        .sort((a, b) => b[1] - a[1])
        .slice(0, N)
        .map((entry) => entry[0]);
}

function processDataByInstitution(csvData) {
    const numPublicationsByInstitution = {};

    Papa.parse(csvData, {
        header: true,
        step: function (row) {
            const affiliations = row.data.Affiliations; // Asegúrate de que "Affiliations" coincida con el nombre de la columna en tu CSV

            if (affiliations) {
                const affiliationList = affiliations.split(";");
                const uniqueInstitutions = new Set();

                affiliationList.forEach((affiliation) => {
                    const institution = affiliation.trim();
                    uniqueInstitutions.add(institution);
                });

                uniqueInstitutions.forEach((institution) => {
                    if (
                        !numPublicationsByInstitution.hasOwnProperty(
                            institution
                        )
                    ) {
                        numPublicationsByInstitution[institution] = 1;
                    } else {
                        numPublicationsByInstitution[institution]++;
                    }
                });
            }
        },
        complete: function () {
            // Llama a la función getTopNInstitutions para obtener el top 5 de instituciones
            const topInstitutions = getTopNInstitutions(
                numPublicationsByInstitution,
                5
            );

            // Llama a createChartByInstitution con los datos procesados
            createChartByInstitution(
                topInstitutions,
                numPublicationsByInstitution
            );
        },
    });
}

export { processDataByInstitution };
