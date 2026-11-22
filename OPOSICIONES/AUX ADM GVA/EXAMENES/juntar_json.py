import json
import re
from pathlib import Path

CARPETA_JSON = Path("./JSON")
ARCHIVO_SALIDA = Path("./banco_ordenado_por_temario.json")


def extraer_metadatos_archivo(ruta: Path, data: dict | list) -> dict:
    nombre_base = ruta.stem
    fuente_json = data.get("fuente_oficial") if isinstance(data, dict) else None
    anio_json = data.get("anio") or data.get("año") if isinstance(data, dict) else None

    match_anio = re.search(r"(20\d{2}|19\d{2})", nombre_base)
    anio = anio_json or (int(match_anio.group(1)) if match_anio else None)

    return {
        "examen_origen": fuente_json or nombre_base,
        "anio": anio,
    }


def normalizar_tema_para_orden(valor) -> tuple[int, int | str]:
    """
    Ordena numéricamente por tema (1, 2, 10...) y manda los None al final.
    """
    if valor is None or str(valor).strip() == "":
        return (2, 999999)

    texto = str(valor).strip()
    match = re.search(r"\d+", texto)
    if match:
        return (0, int(match.group(0)))

    return (1, texto.lower())


def extraer_numero_tema(valor):
    """
    Devuelve tema_numero como entero si es numérico, o el valor original / None.
    """
    if valor is None or str(valor).strip() == "":
        return None
    if isinstance(valor, int):
        return valor
    match = re.search(r"\d+", str(valor))
    return int(match.group(0)) if match else valor


def cargar_preguntas(ruta: Path) -> list[dict]:
    with ruta.open("r", encoding="utf-8") as f:
        data = json.load(f)

    meta = extraer_metadatos_archivo(ruta, data)
    preguntas = data if isinstance(data, list) else (data.get("preguntas") or [])

    resultado = []
    for idx, p in enumerate(preguntas, start=1):
        if not isinstance(p, dict):
            continue

        tema_raw = p.get("tema_numero") if "tema_numero" in p else p.get("tema")
        num_orig = p.get("numero_original") or p.get("numero") or idx

        resultado.append({
            "numero": 0,  # Se asigna correlativamente tras ordenar
            "tema_numero": extraer_numero_tema(tema_raw),
            "anio": p.get("anio") or meta["anio"],
            "examen_origen": p.get("examen_origen") or meta["examen_origen"],
            "numero_original": num_orig,
            "enunciado": p.get("enunciado", ""),
            "opciones": p.get("opciones", {}),
            "respuesta_correcta": p.get("respuesta_correcta"),
            "explicacion": p.get("explicacion"),
        })

    return resultado


def clave_ordenacion(pregunta: dict) -> tuple:
    tema_key = normalizar_tema_para_orden(pregunta.get("tema_numero"))
    anio = pregunta.get("anio") or 9999
    examen = str(pregunta.get("examen_origen") or "")

    try:
        num_orig = int(pregunta.get("numero_original") or 0)
    except (ValueError, TypeError):
        num_orig = 999999

    return (tema_key, anio, examen, num_orig)


def main():
    todas = []
    for archivo in sorted(CARPETA_JSON.glob("*.json")):
        if archivo.resolve() == ARCHIVO_SALIDA.resolve():
            continue
        todas.extend(cargar_preguntas(archivo))

    # 1. Ordenar por tema_numero -> anio -> examen_origen -> numero_original
    ordenadas = sorted(todas, key=clave_ordenacion)

    # 2. Numerar globalmente empezando en 1
    for i, p in enumerate(ordenadas, start=1):
        p["numero"] = i

    with ARCHIVO_SALIDA.open("w", encoding="utf-8") as f:
        json.dump(ordenadas, f, ensure_ascii=False, indent=2)

    print(f"Guardadas {len(ordenadas)} preguntas en {ARCHIVO_SALIDA} (numeradas del 1 al {len(ordenadas)}).")


if __name__ == "__main__":
    main()