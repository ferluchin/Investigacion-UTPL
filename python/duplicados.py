import csv
from difflib import SequenceMatcher
import pandas as pd
from tqdm import tqdm  # Importar tqdm

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
            filas = list(reader)  # Convertir el lector a una lista

            # Iterar sobre cada fila del CSV con una barra de progreso
            for row in tqdm(filas, desc="Procesando autores"):
                autor_actual = row["Author Name"]
                encontrado = False

                for autor in autores:
                    if similitud(autor_actual, autor) > 0.8:
                        encontrado = True
                        duplicados.append((autor_actual, autor))
                        break

                if not encontrado:
                    autores.append(autor_actual)
    except FileNotFoundError:
        print(
            f"Error: No se pudo encontrar el archivo '{archivo_entrada}'. Asegúrate de que el archivo exista y esté en la ubicación correcta.")
        return
    except Exception as e:
        print(
            f"Error: Ocurrió un problema al leer el archivo '{archivo_entrada}'. Detalles del error: {str(e)}")
        return

    try:
        df_autores = pd.DataFrame(autores, columns=["Author Name"])
        df_autores.to_csv(archivo_salida, index=False, encoding='utf-8-sig')
    except Exception as e:
        print(
            f"Error: Ocurrió un problema al guardar el archivo '{archivo_salida}'. Detalles del error: {str(e)}")
        return

    try:
        with open(archivo_duplicados, "w", encoding='utf-8-sig') as f:
            f.write("Duplicados encontrados:\n")
            for dup in duplicados:
                f.write(f"{dup[0]} - {dup[1]}\n")
    except Exception as e:
        print(
            f"Error: Ocurrió un problema al guardar el archivo '{archivo_duplicados}'. Detalles del error: {str(e)}")
        return


# Llamada a la función principal con los nombres de los archivos
eliminar_duplicados("entrada.csv", "salida.csv", "duplicados.txt")
