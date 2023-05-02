# Visualización de datos de artículos de investigación

Este proyecto tiene como objetivo facilitar la exploración y análisis de los artículos científicos publicados por investigadores de la Universidad Técnica Particular de Loja (UTPL) a través de una herramienta web de visualización de datos. La herramienta presenta visualizaciones interactivas y gráficos generados a partir de datos extraídos de diversas fuentes, como Web of Science y Scopus.

## Características

- Descarga de datos en formatos CSV, Excel (XLSX) y ODS (LibreOffice).
- Gráficos y visualizaciones interactivas que muestran tendencias y distribuciones en la producción de artículos científicos a lo largo del tiempo.
- Análisis de coautoría y colaboración entre los investigadores de la institución.
- Información sobre las revistas y conferencias más populares donde los investigadores de la institución publican sus trabajos.
- Exportación y compartición de datos y visualizaciones en diferentes formatos.

## Tecnologías utilizadas

- HTML, CSS y JavaScript para la creación de la página web.
- D3.js, Chart.js y PapaParse para generar visualizaciones interactivas y analizar archivos CSV.
- Bootstrap para el diseño y estilo de la página.
- jQuery y Popper.js para la interacción del usuario y manipulación del DOM.

## Página Web
https://investigacion-utpl.netlify.app/

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Abre el archivo `index.html` en tu navegador web preferido, o ejecuta un servidor local.


## Cómo usar el script de Python para eliminar registros duplicados de la base de datos.

1. Asegúrate de tener Python instalado en tu computadora.
2. Localiza el archivo duplicados.py dentro de la carpeta python desde el repositorio en GitHub.
3. Abre el archivo con tu editor de código favorito y configura las rutas de los archivos de entrada, salida y duplicados según sea necesario.
4. Ejecuta el script de Python utilizando la línea de comando con el comando python duplicados.py. El script leerá el archivo CSV de entrada, identificará y eliminará los registros duplicados y generará dos nuevos archivos de salida, uno sin duplicados y otro con un resumen de los registros duplicados.
5. Revisa los archivos de salida y verifica que los registros se hayan eliminado correctamente. Si encuentras algún problema, revisa los mensajes de error del script y ajusta las rutas de los archivos de entrada y salida si es necesario.

Es importante que tengas en cuenta que para que el script funcione correctamente, es necesario que el archivo CSV de entrada tenga una columna llamada Author Name que contenga los nombres de los autores a analizar. También debes asegurarte de que los archivos de salida y duplicados tengan nombres y rutas válidos en tu sistema.
## Contribución

Si deseas contribuir al proyecto, por favor crea un fork del repositorio, realiza tus cambios y envía un pull request.

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para obtener más información.

