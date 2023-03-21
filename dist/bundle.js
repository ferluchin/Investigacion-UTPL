/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./utils.js\");\n\n\n// Leer el archivo CSV\nfetch(\"Combinado-WoS-Scopus.csv\").then(function (response) {\n  return response.text();\n}).then(function (csvData) {\n  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.processData)(csvData); // Procesar datos para la primera gráfica\n  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.processDataBySource)(csvData); // Procesar datos para la segunda gráfica\n  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.processDataByAuthor)(csvData); // Procesar datos para la tercera gráfica\n  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.processDataByCitations)(csvData); // Procesar datos para la cuarta gráfica\n  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.processDataByTopCited)(csvData); // Procesar datos para la quinta gráfica\n  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.processDataByYearAndCitations)(csvData); // Procesar datos para el gráfico de dispersión sexto gráfico\n  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.processDataByInstitution)(csvData); // Procesar datos para la séptima gráfica\n})[\"catch\"](function (error) {\n  return console.error(\"Error al leer el archivo CSV:\", error);\n});\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./charts.js":
/*!*******************!*\
  !*** ./charts.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createChart\": () => (/* binding */ createChart),\n/* harmony export */   \"createChartByAuthor\": () => (/* binding */ createChartByAuthor),\n/* harmony export */   \"createChartByInstitution\": () => (/* binding */ createChartByInstitution),\n/* harmony export */   \"createChartBySource\": () => (/* binding */ createChartBySource),\n/* harmony export */   \"createCitationsByYearChart\": () => (/* binding */ createCitationsByYearChart),\n/* harmony export */   \"createTopCitedChart\": () => (/* binding */ createTopCitedChart),\n/* harmony export */   \"createYearCitationScatterChart\": () => (/* binding */ createYearCitationScatterChart)\n/* harmony export */ });\n// Función para crear el gráfico utilizando Chart.js\nfunction createChart(years, numArticlesByYear) {\n  var ctx = document.getElementById('chart1').getContext('2d');\n  var chartData = {\n    labels: years,\n    datasets: [{\n      label: 'Número de artículos por año',\n      data: years.map(function (year) {\n        return numArticlesByYear[year];\n      }),\n      backgroundColor: 'rgba(75, 192, 192, 0.2)',\n      borderColor: 'rgba(75, 192, 192, 1)',\n      borderWidth: 1\n    }]\n  };\n  var chartOptions = {\n    scales: {\n      y: {\n        beginAtZero: true\n      }\n    }\n  };\n  new Chart(ctx, {\n    type: 'bar',\n    data: chartData,\n    options: chartOptions\n  });\n}\n\n// función createChartBySource para crear la segunda gráfica utilizando Chart.js:\nfunction createChartBySource(sources, numArticlesBySource) {\n  var ctx = document.getElementById(\"publicationsBySourceChart\").getContext(\"2d\");\n  var chartData = {\n    labels: sources,\n    datasets: [{\n      label: \"Cantidad de publicaciones por fuente\",\n      data: sources.map(function (source) {\n        return numArticlesBySource[source];\n      }),\n      backgroundColor: [\"rgba(75, 192, 192, 0.2)\", \"rgba(255, 206, 86, 0.2)\"],\n      borderColor: [\"rgba(75, 192, 192, 1)\", \"rgba(255, 206, 86, 1)\"],\n      borderWidth: 1\n    }]\n  };\n  var chartOptions = {\n    scales: {\n      y: {\n        beginAtZero: true\n      }\n    }\n  };\n  new Chart(ctx, {\n    type: \"bar\",\n    // Cambia a \"pie\" para un gráfico circular\n    data: chartData,\n    options: chartOptions\n  });\n}\n\n//función createChartByAuthor para crear la tercera gráfica utilizando Chart.js. \n//Esta función también ordenará a los autores por la cantidad de publicaciones y tomará solo los N autores más productivos \n//(en este ejemplo, N = 10):\n\nfunction createChartByAuthor(numArticlesByAuthor) {\n  // Ordenar autores por cantidad de publicaciones y tomar solo los 10 primeros\n  var topAuthors = Object.entries(numArticlesByAuthor).sort(function (a, b) {\n    return b[1] - a[1];\n  }).slice(0, 10);\n  var authors = topAuthors.map(function (entry) {\n    return entry[0];\n  });\n  var numArticles = topAuthors.map(function (entry) {\n    return entry[1];\n  });\n  var ctx = document.getElementById(\"topAuthorsChart\").getContext(\"2d\");\n  var chartData = {\n    labels: authors,\n    datasets: [{\n      label: \"Autores más productivos\",\n      data: numArticles,\n      backgroundColor: \"rgba(153, 102, 255, 0.2)\",\n      borderColor: \"rgba(153, 102, 255, 1)\",\n      borderWidth: 1\n    }]\n  };\n  var chartOptions = {\n    scales: {\n      y: {\n        beginAtZero: true\n      }\n    }\n  };\n  new Chart(ctx, {\n    type: \"bar\",\n    data: chartData,\n    options: chartOptions\n  });\n}\n\n//función createCitationsByYearChart para crear la cuarta gráfica utilizando Chart.js:\n\nfunction createCitationsByYearChart(yearCitationData) {\n  var ctx = document.getElementById(\"citationsByYearChart\").getContext(\"2d\");\n  var chartData = {\n    datasets: [{\n      label: \"Citas por año de publicación\",\n      data: yearCitationData,\n      backgroundColor: \"rgba(255, 99, 132, 0.2)\",\n      borderColor: \"rgba(255, 99, 132, 1)\",\n      borderWidth: 1\n    }]\n  };\n  var chartOptions = {\n    scales: {\n      x: {\n        type: \"linear\",\n        beginAtZero: true,\n        title: {\n          display: true,\n          text: \"Año\"\n        }\n      },\n      y: {\n        beginAtZero: true,\n        title: {\n          display: true,\n          text: \"Citas\"\n        }\n      }\n    }\n  };\n  new Chart(ctx, {\n    type: \"scatter\",\n    data: chartData,\n    options: chartOptions\n  });\n}\nfunction createTopCitedChart(titles, citations) {\n  var ctx = document.getElementById(\"topCitedChart\").getContext(\"2d\");\n  var maxTitleLength = 50; // Define la longitud máxima del título\n  var shortTitles = titles.map(function (title) {\n    return title.length > maxTitleLength ? title.substring(0, maxTitleLength) + '...' : title;\n  });\n  var chartData = {\n    labels: shortTitles,\n    datasets: [{\n      label: \"Publicaciones más citadas\",\n      data: citations,\n      backgroundColor: \"rgba(255, 159, 64, 0.2)\",\n      borderColor: \"rgba(255, 159, 64, 1)\",\n      borderWidth: 1\n    }]\n  };\n  var chartOptions = {\n    scales: {\n      y: {\n        beginAtZero: true\n      },\n      x: {\n        ticks: {\n          maxRotation: 90,\n          // Ángulo de rotación máximo de las etiquetas del eje x\n          minRotation: 90 // Ángulo de rotación mínimo de las etiquetas del eje x\n        }\n      }\n    }\n  };\n\n  new Chart(ctx, {\n    type: \"bar\",\n    data: chartData,\n    options: chartOptions\n  });\n}\nfunction createYearCitationScatterChart(yearCitationData) {\n  var ctx = document.getElementById(\"yearCitationScatterChart\").getContext(\"2d\");\n  var chartData = {\n    datasets: [{\n      label: \"Citas por año de publicación\",\n      data: yearCitationData,\n      backgroundColor: \"rgba(255, 99, 132, 0.2)\",\n      borderColor: \"rgba(255, 99, 132, 1)\",\n      borderWidth: 1,\n      pointRadius: 5,\n      // Ajusta el tamaño de los puntos\n      pointHoverRadius: 15,\n      // Ajusta el tamaño de los puntos al pasar el cursor sobre ellos\n      pointStyle: \"circle\"\n    }]\n  };\n  var chartOptions = {\n    scales: {\n      x: {\n        type: \"linear\",\n        min: 2010,\n        max: 2023,\n        //beginAtZero: true,\n        title: {\n          display: true,\n          text: \"Año\"\n        }\n      },\n      y: {\n        beginAtZero: true,\n        title: {\n          display: true,\n          text: \"Citas\"\n        }\n      }\n    }\n  };\n  new Chart(ctx, {\n    type: \"scatter\",\n    data: chartData,\n    options: chartOptions\n  });\n}\n\n// Cantidad de publicaciones por institución\nfunction createChartByInstitution(institutions, numPublicationsByInstitution) {\n  var ctx = document.getElementById(\"publicationsByInstitutionChart\").getContext(\"2d\");\n  var chartData = {\n    labels: institutions,\n    datasets: [{\n      label: \"Cantidad de publicaciones por institución\",\n      data: institutions.map(function (institution) {\n        return numPublicationsByInstitution[institution];\n      }),\n      backgroundColor: \"rgba(54, 162, 235, 0.2)\",\n      borderColor: \"rgba(54, 162, 235, 1)\",\n      borderWidth: 1\n    }]\n  };\n  var chartOptions = {\n    scales: {\n      y: {\n        beginAtZero: true\n      }\n    }\n  };\n  new Chart(ctx, {\n    type: \"bar\",\n    data: chartData,\n    options: chartOptions\n  });\n}\n\n\n//# sourceURL=webpack:///./charts.js?");

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"processData\": () => (/* binding */ processData),\n/* harmony export */   \"processDataByAuthor\": () => (/* binding */ processDataByAuthor),\n/* harmony export */   \"processDataByCitations\": () => (/* binding */ processDataByCitations),\n/* harmony export */   \"processDataByInstitution\": () => (/* binding */ processDataByInstitution),\n/* harmony export */   \"processDataBySource\": () => (/* binding */ processDataBySource),\n/* harmony export */   \"processDataByTopCited\": () => (/* binding */ processDataByTopCited),\n/* harmony export */   \"processDataByYearAndCitations\": () => (/* binding */ processDataByYearAndCitations)\n/* harmony export */ });\n/* harmony import */ var _charts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./charts.js */ \"./charts.js\");\n\n\n// Función para leer el archivo CSV y procesar los datos\nfunction processData(csvData) {\n  var years = new Set();\n  var numArticlesByYear = {};\n  Papa.parse(csvData, {\n    header: true,\n    step: function step(row) {\n      var year = row.data.Year;\n      if (!years.has(year)) {\n        years.add(year);\n        numArticlesByYear[year] = 1;\n      } else {\n        numArticlesByYear[year]++;\n      }\n    },\n    complete: function complete() {\n      (0,_charts_js__WEBPACK_IMPORTED_MODULE_0__.createChart)(Array.from(years).sort(), numArticlesByYear);\n    }\n  });\n}\n\n/*\r\nfunción processDataBySource para procesar el CSV y contar las publicaciones por fuente:\r\n*/\nfunction processDataBySource(csvData) {\n  var sources = new Set();\n  var numArticlesBySource = {};\n  Papa.parse(csvData, {\n    header: true,\n    step: function step(row) {\n      var source = row.data.Fuente;\n      if (!sources.has(source)) {\n        sources.add(source);\n        numArticlesBySource[source] = 1;\n      } else {\n        numArticlesBySource[source]++;\n      }\n    },\n    complete: function complete() {\n      (0,_charts_js__WEBPACK_IMPORTED_MODULE_0__.createChartBySource)(Array.from(sources).sort(), numArticlesBySource);\n    }\n  });\n}\n//Crea una nueva función processDataByAuthor para procesar el CSV y contar las publicaciones por autor:\nfunction processDataByAuthor(csvData) {\n  var numArticlesByAuthor = {};\n  Papa.parse(csvData, {\n    header: true,\n    step: function step(row) {\n      var authors = row.data.Authors.split(\", \");\n      authors.forEach(function (author) {\n        if (author.length > 1) {\n          // Asegurarse de que el nombre del autor tenga más de un carácter\n          if (!numArticlesByAuthor.hasOwnProperty(author)) {\n            numArticlesByAuthor[author] = 1;\n          } else {\n            numArticlesByAuthor[author]++;\n          }\n        }\n      });\n    },\n    complete: function complete() {\n      (0,_charts_js__WEBPACK_IMPORTED_MODULE_0__.createChartByAuthor)(numArticlesByAuthor);\n    }\n  });\n}\n\n// función processDataByCitations para procesar el CSV y recopilar la información del año de publicación y las citas:\nfunction processDataByCitations(csvData) {\n  var yearCitationData = [];\n  Papa.parse(csvData, {\n    delimiter: \";\",\n    header: true,\n    step: function step(row) {\n      var year = row.data.Year;\n      var citedByIndex = Object.keys(row.data).find(function (key) {\n        return key.toLowerCase() === \"cited by\";\n      });\n      var citations = row.data[citedByIndex];\n      if (citations) {\n        yearCitationData.push({\n          year: parseInt(year),\n          citations: parseInt(citations)\n        });\n      }\n    },\n    complete: function complete() {\n      (0,_charts_js__WEBPACK_IMPORTED_MODULE_0__.createCitationsByYearChart)(yearCitationData);\n    }\n  });\n}\nfunction processDataByTopCited(csvData) {\n  var topCited = [];\n  Papa.parse(csvData, {\n    delimiter: \";\",\n    header: true,\n    step: function step(row) {\n      var title = row.data.Title;\n      var citations = parseInt(row.data[\"Cited by\"]);\n      topCited.push({\n        title: title,\n        citations: citations\n      });\n    },\n    complete: function complete() {\n      topCited.sort(function (a, b) {\n        return b.citations - a.citations;\n      });\n      var topCitedTitles = topCited.slice(0, 10).map(function (entry) {\n        return entry.title;\n      });\n      var topCitedCitations = topCited.slice(0, 10).map(function (entry) {\n        return entry.citations;\n      });\n      (0,_charts_js__WEBPACK_IMPORTED_MODULE_0__.createTopCitedChart)(topCitedTitles, topCitedCitations);\n    }\n  });\n}\nfunction processDataByYearAndCitations(csvData) {\n  var yearCitationData = [];\n  Papa.parse(csvData, {\n    delimiter: \";\",\n    header: true,\n    step: function step(row) {\n      var year = parseInt(row.data.Year);\n      var citations = parseInt(row.data[\"Cited by\"]);\n      yearCitationData.push({\n        x: year,\n        y: citations\n      });\n    },\n    complete: function complete() {\n      (0,_charts_js__WEBPACK_IMPORTED_MODULE_0__.createYearCitationScatterChart)(yearCitationData);\n    }\n  });\n}\n\n// Modifica la función processDataByInstitution\nfunction getTopNInstitutions(numPublicationsByInstitution, N) {\n  return Object.entries(numPublicationsByInstitution).sort(function (a, b) {\n    return b[1] - a[1];\n  }).slice(0, N).map(function (entry) {\n    return entry[0];\n  });\n}\nfunction processDataByInstitution(csvData) {\n  var numPublicationsByInstitution = {};\n  Papa.parse(csvData, {\n    header: true,\n    step: function step(row) {\n      var affiliations = row.data.Affiliations; // Asegúrate de que \"Affiliations\" coincida con el nombre de la columna en tu CSV\n\n      if (affiliations) {\n        var affiliationList = affiliations.split(';');\n        var uniqueInstitutions = new Set();\n        affiliationList.forEach(function (affiliation) {\n          var institution = affiliation.trim();\n          uniqueInstitutions.add(institution);\n        });\n        uniqueInstitutions.forEach(function (institution) {\n          if (!numPublicationsByInstitution.hasOwnProperty(institution)) {\n            numPublicationsByInstitution[institution] = 1;\n          } else {\n            numPublicationsByInstitution[institution]++;\n          }\n        });\n      }\n    },\n    complete: function complete() {\n      // Llama a la función getTopNInstitutions para obtener el top 5 de instituciones\n      var topInstitutions = getTopNInstitutions(numPublicationsByInstitution, 5);\n\n      // Llama a createChartByInstitution con los datos procesados\n      (0,_charts_js__WEBPACK_IMPORTED_MODULE_0__.createChartByInstitution)(topInstitutions, numPublicationsByInstitution);\n    }\n  });\n}\n\n/*\r\nfunction getTopNInstitutions(numPublicationsByInstitution, N) {\r\n    return Object.entries(numPublicationsByInstitution)\r\n        .sort((a, b) => b[1] - a[1])\r\n        .slice(0, N)\r\n        .map((entry) => entry[0]);\r\n}\r\nfunction processDataByInstitution(csvData) {\r\n    const numPublicationsByInstitution = {};\r\n\r\n    Papa.parse(csvData, {\r\n        header: true,\r\n        step: function (row) {\r\n            const affiliations = row.data.Affiliations; // Asegúrate de que \"Affiliations\" coincida con el nombre de la columna en tu CSV\r\n\r\n            if (affiliations) {\r\n                const affiliationList = affiliations.split(';');\r\n                affiliationList.forEach((affiliation) => {\r\n                    const institution = affiliation.trim();\r\n                    if (!numPublicationsByInstitution.hasOwnProperty(institution)) {\r\n                        numPublicationsByInstitution[institution] = 1;\r\n                    } else {\r\n                        numPublicationsByInstitution[institution]++;\r\n                    }\r\n                });\r\n            }\r\n        },\r\n        complete: function () {\r\n            // Llama a la función getTopNInstitutions para obtener el top 5 de instituciones\r\n            const topInstitutions = getTopNInstitutions(numPublicationsByInstitution, 5);\r\n\r\n            // Llama a createChartByInstitution con los datos procesados\r\n            createChartByInstitution(topInstitutions, numPublicationsByInstitution);\r\n        },\r\n    });\r\n}\r\n*/\n//FIN LECTURA Y PROCESAMIENTO DE ARCHIVOS CSV\n\n\n\n//# sourceURL=webpack:///./utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;