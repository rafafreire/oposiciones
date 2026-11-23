#!/usr/bin/env python3
"""Build a topic-oriented AGE question bank from all official exam JSON files."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EXAMS = ROOT / "OPOSICIONES" / "AUX ADM AGE" / "EXAMENES" / "JSON"
OUTPUT = ROOT / "OPOSICIONES" / "AUX ADM AGE" / "EXAMENES" / "banco_agrupado_por_temario.json"

TOPIC_TITLES = [
    "Constitución Española: principios, derechos y garantías.",
    "Tribunal Constitucional, reforma constitucional y Corona.",
    "Cortes Generales y Defensor del Pueblo.",
    "Poder Judicial y organización judicial española.",
    "Gobierno y Administración General del Estado.",
    "Gobierno abierto, Agenda 2030 y Objetivos de Desarrollo Sostenible.",
    "Transparencia, acceso a la información y buen gobierno.",
    "Órganos centrales y territoriales de la Administración del Estado.",
    "Organización territorial: comunidades autónomas y administración local.",
    "Instituciones y funcionamiento de la Unión Europea.",
    "Procedimiento administrativo, régimen jurídico y recursos.",
    "Protección de datos personales.",
    "Personal funcionario: selección, provisión y situaciones administrativas.",
    "Derechos, deberes, carrera y retribuciones del personal funcionario.",
    "Presupuestos Generales del Estado y ciclo presupuestario.",
    "Igualdad, diversidad, discapacidad y dependencia.",
    "Atención al público y atención a personas con discapacidad.",
    "Información administrativa, iniciativas, quejas y reclamaciones.",
    "Documentos, registros y archivos.",
    "Administración electrónica y servicios a la ciudadanía.",
    "Informática básica, hardware, software y seguridad.",
    "Entorno Windows 11 y sus elementos principales.",
    "Explorador de Windows, carpetas, archivos y búsquedas.",
    "Procesador de textos Word 365.",
    "Hojas de cálculo Excel 365.",
    "Bases de datos Access 365.",
    "Correo electrónico Outlook 365.",
    "Internet, protocolos, servicios y navegadores.",
]

AGE_TOPIC_FILES = {
    **{number: f"BLOQUE I\\TEMA {number:02}" for number in range(1, 17)},
    **{number: f"BLOQUE II\\TEMA {number:02}" for number in range(17, 24)},
    24: "BLOQUE II\\TEMA 25",
    25: "BLOQUE II\\TEMA 26",
    26: "BLOQUE II\\TEMA 26 (ficha de repaso)",
    27: "BLOQUE II\\TEMA 27",
    28: "BLOQUE II\\TEMA 28",
}

ARTICLE_RE = re.compile(
    r"\b(?:artículo|artículos|art\.?|arts\.?)\s*"
    r"(\d{1,3}(?:\.\d{1,3}){0,3}[a-z]?)\b",
    re.IGNORECASE,
)


def exam_name(path: Path) -> tuple[int, str]:
    match = re.search(r"(\d{4})(?:_([AB]))?\.json$", path.name, re.IGNORECASE)
    if not match:
        raise ValueError(f"No se puede determinar convocatoria y modelo: {path.name}")
    year = int(match.group(1))
    model = match.group(2)
    return year, f"{year}{'-' + model if model else ''}"


def article_reference(question: dict) -> tuple[str, str, str]:
    """Only mark article references explicitly present in question/explanation."""
    for field in ("enunciado", "explicacion"):
        text = question.get(field) or ""
        match = ARTICLE_RE.search(text)
        if match:
            article = match.group(1)
            return f"Artículo {article}", "articulo", field
    topic = question.get("tema_numero")
    return (f"Tema {topic} del temario" if topic else "Sin tema asignado", "tema", "tema_numero")


def main() -> None:
    topics = [
        {
            "tema_numero": number,
            "parte": "Parte General" if number <= 16 else "Parte Específica",
            "titulo": title,
            "archivo_temario": f"TEMARIO\\{AGE_TOPIC_FILES[number]}",
            "numero_preguntas": 0,
            "preguntas": [],
        }
        for number, title in enumerate(TOPIC_TITLES, start=1)
    ]
    unassigned: list[dict] = []

    for path in sorted(EXAMS.glob("EXAMEN_AUXADMAGE_*.json")):
        year, exam = exam_name(path)
        data = json.loads(path.read_text(encoding="utf-8-sig"))
        for section in data.get("secciones", []):
            for raw in section.get("preguntas", []):
                number = raw.get("tema_numero")
                number = int(number) if str(number or "").isdigit() else None
                reference, reference_type, reference_source = article_reference(
                    {**raw, "tema_numero": number}
                )
                record = {
                    "numero": raw.get("numero"),
                    "tema_numero": number,
                    "anio": year,
                    "examen_origen": f"EXAMEN_AUXADMAGE_{exam.replace('-', '_')}",
                    "numero_original": raw.get("numero"),
                    "seccion": section.get("nombre", ""),
                    "enunciado": raw.get("enunciado", ""),
                    "opciones": raw.get("opciones", {}),
                    "respuesta_correcta": raw.get("respuesta_correcta"),
                    "explicacion": raw.get("explicacion"),
                    "referencia_tematica": reference,
                    "referencia_tematica_tipo": reference_type,
                    "referencia_tematica_origen": reference_source,
                    "fuente_oficial": raw.get("fuente_oficial"),
                }
                if number is not None and 1 <= number <= len(topics):
                    topics[number - 1]["preguntas"].append(record)
                else:
                    record["tema_numero"] = None
                    record["referencia_tematica"] = "Sin tema asignado"
                    record["referencia_tematica_tipo"] = "sin_clasificar"
                    record["referencia_tematica_origen"] = ""
                    unassigned.append(record)

    for topic in topics:
        topic["preguntas"].sort(
            key=lambda q: (q["anio"], q["examen_origen"], q["numero_original"] or 0)
        )
        topic["numero_preguntas"] = len(topic["preguntas"])
        for sequence, question in enumerate(topic["preguntas"], start=1):
            question["numero"] = sequence
    unassigned.sort(
        key=lambda q: (q["anio"], q["examen_origen"], q["numero_original"] or 0)
    )
    for sequence, question in enumerate(unassigned, start=1):
        question["numero"] = sequence
    total = sum(topic["numero_preguntas"] for topic in topics) + len(unassigned)
    bank = {
        "convocatoria": "Auxiliar Administrativo AGE",
        "orden": "Temario oficial por tema; preguntas agrupadas por tema y referencia normativa cuando consta expresamente en el enunciado o explicación",
        "total_preguntas": total,
        "total_clasificadas": total - len(unassigned),
        "total_sin_tema": len(unassigned),
        "temas": topics,
        "sin_tema_asignado": unassigned,
    }
    OUTPUT.write_text(json.dumps(bank, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Generado {OUTPUT.relative_to(ROOT)}: {total} preguntas, {len(unassigned)} sin tema asignado.")


if __name__ == "__main__":
    main()
