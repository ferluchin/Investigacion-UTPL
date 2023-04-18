import csv
from difflib import SequenceMatcher
import pandas as pd
from tqdm import tqdm

# Función que calcula la similitud entre dos cadenas de texto


def similitud(a, b):
    return SequenceMatcher(None, a, b).ratio()

# Función que elimina los autores duplicados y genera archivos de salida


def eliminar_duplicados(archivo_entrada, archivo_salida, archivo_duplicados):
    autores = []
    duplicados = []

    try:
        with open(archivo_entrada, encoding='utf-8-sig') as csvfile:
            reader = csv.DictReader(csvfile)
            filas = list(reader)

            # Iterar sobre cada fila del CSV con una barra de progreso
            for row in tqdm(filas, desc="Procesando autores"):
                autor_actual = row["Author Name"]
                encontrado = False

                for autor in autores:
                    if similitud(autor_actual, autor["Author Name"]) > 0.9:
                        encontrado = True
                        duplicados.append((row, autor))
                        break

                if not encontrado:
                    autores.append(row)
    except FileNotFoundError:
        print(
            f"Error: No se pudo encontrar el archivo '{archivo_entrada}'. Asegúrate de que el archivo exista y esté en la ubicación correcta.")
        return 0
    except Exception as e:
        print(
            f"Error: Ocurrió un problema al leer el archivo '{archivo_entrada}'. Detalles del error: {str(e)}")
        return 0

    try:
        df_autores = pd.DataFrame(autores)
        df_autores.to_csv(archivo_salida, index=False, encoding='utf-8-sig')
    except Exception as e:
        print(
            f"Error: Ocurrió un problema al guardar el archivo '{archivo_salida}'. Detalles del error: {str(e)}")
        return 0

    try:
        duplicados_resumidos = []
        for dup in duplicados:
            duplicado_resumido = {
                "Duplicado_Author Name": dup[0]["Author Name"],
                "Duplicado_Number of Documents": dup[0]["Number of Documents"],
                # "Duplicado_Auth-ID": dup[0]["Auth-ID"],
                # "Duplicado_Subject Area": dup[0]["Subject Area"],
                # "Duplicado_Orc_ID": dup[0]["Orc_ID"],
                "Original_Author Name": dup[1]["Author Name"],
                "Original_Number of Documents": dup[1]["Number of Documents"],
                # "Original_Auth-ID": dup[1]["Auth-ID"],
                # "Original_Subject Area": dup[1]["Subject Area"],
                # "Original_Orc_ID": dup[1]["Orc_ID"],
            }
            duplicados_resumidos.append(duplicado_resumido)

        df_duplicados = pd.DataFrame(duplicados_resumidos)
        df_duplicados.to_csv(archivo_duplicados,
                             index=False, encoding='utf-8-sig')
    except Exception as e:
        print(
            f"Error: Ocurrió un problema al guardar el archivo '{archivo_duplicados}'. Detalles del error: {str(e)}")
        return 0

    # Devolver la cantidad de duplicados encontrados
    return len(duplicados)

# Llamada a la función principal con los nombres de los archivos
num_duplicados = eliminar_duplicados(
    "entrada.csv", "salida.csv", "duplicados.csv")

# Mensaje informativo y creativo al final del proceso
if num_duplicados == 0:
    print("¡Excelente! No se encontraron autores duplicados en el archivo de entrada.")
elif num_duplicados == 1:
    print("Se encontró 1 autor duplicado en el archivo de entrada. ¡Revisa el archivo 'duplicados.csv' para más detalles!")
else:
    print(
        f"Se encontraron {num_duplicados} autores duplicados en el archivo de entrada. ¡Revisa el archivo 'duplicados.csv' para más detalles!")
