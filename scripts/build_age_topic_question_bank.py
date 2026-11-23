#!/usr/bin/env python3
"""Build a topic-oriented AGE question bank from all official exam JSON files."""

from __future__ import annotations

import json
import re
import base64
import unicodedata
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
MATERIALS_B64 = ROOT / "js" / "age-materials.js"
STOP_WORDS = set(
    "el la los las un una unos unas de del al y o u en por para con que se su sus es son "
    "ser como cual cuales quien quienes cuando donde si no a ante bajo cabe contra desde "
    "durante entre hacia hasta mediante sobre tras este esta estos esas esos lo le les más "
    "menos muy ya también según respecto opción opciones pregunta indique señale siguiente "
    "siguientes conforme acuerdo artículo artículos ley leyes"
    .split()
)


def topic_material(number: int) -> str:
    """Read the same topic material used by the AGE study reader."""
    if number <= 16:
        path = ROOT / "OPOSICIONES" / "AUX ADM AGE" / "TEMARIO" / "BLOQUE I" / f"TEMA {number:02}"
        return path.read_text(encoding="utf-8-sig") if path.exists() else ""
    filename = AGE_TOPIC_FILES.get(number)
    if filename:
        relative_path = Path(*filename.replace("\\", "/").split("/"))
        path = ROOT / "OPOSICIONES" / "AUX ADM AGE" / "TEMARIO" / relative_path
        if path.exists():
            return path.read_text(encoding="utf-8-sig")
    # Topic 26 is embedded as base64 in the reader because it has no standalone file.
    if number == 26 and MATERIALS_B64.exists():
        source = MATERIALS_B64.read_text(encoding="utf-8")
        payload = source.split("window.ageTopicMaterialsB64=", 1)[1].split(";", 1)[0]
        return base64.b64decode(json.loads(payload)["26"]).decode("utf-8")
    return ""


def normalized_words(value: str) -> set[str]:
    value = "".join(
        char
        for char in unicodedata.normalize("NFD", value.lower())
        if unicodedata.category(char) != "Mn"
    )
    return {
        word
        for word in re.findall(r"[a-z0-9]+", value)
        if len(word) > 2 and word not in STOP_WORDS
    }


def topic_articles(number: int) -> list[dict]:
    """Index article cards in the order they appear in the study material."""
    lines = topic_material(number).splitlines()
    starts = []
    for index, line in enumerate(lines):
        match = re.match(r"^Art\.\s*([^\s:]+)", line.strip(), re.IGNORECASE)
        if match and any("Hacer test Art." in previous for previous in lines[max(0, index - 2):index]):
            starts.append((index, match.group(1).rstrip(".,")))

    articles = []
    for order, (start, number_text) in enumerate(starts):
        end = starts[order + 1][0] if order + 1 < len(starts) else len(lines)
        segment = lines[start + 1:end]
        examen_index = next((i for i, line in enumerate(segment) if line.strip() == "Examen"), -1)
        if examen_index >= 0:
            segment = segment[examen_index + 1:]
            if segment and re.fullmatch(r"\d+", segment[0].strip()):
                segment = segment[1:]
            while segment and re.match(r"^\s*(?:T[ií]tulo |Cap[ií]tulo |Art[ií]culos )", segment[0], re.IGNORECASE):
                segment = segment[1:]
        body = "\n".join(segment)
        body = re.sub(r"(?m)^\s*(?:Elegir cu[aá]ntas|Hacer test.*|Examen|T[ií]tulo .*|Cap[ií]tulo .*?)\s*$", " ", body)
        body = "\n".join(line.strip() for line in body.splitlines() if line.strip())
        law_index = next(
            (i for i in range(start - 1, -1, -1) if lines[i].strip().upper() == "LEY"),
            -1,
        )
        law = " ".join(part.strip() for part in lines[law_index + 1:law_index + 3] if part.strip()) if law_index >= 0 else ""
        numeric = re.match(r"\d+(?:\.\d+)*", number_text)
        articles.append({
            "numero": numeric.group(0) if numeric else number_text.lower(),
            "orden": order,
            "ley": law,
            "texto": body,
            "palabras": normalized_words(body),
        })
    return articles


def select_article(question: dict, articles: list[dict]) -> tuple[dict | None, float]:
    reference = question.get("referencia_tematica") or ""
    match = ARTICLE_RE.search(reference)
    answer = str(question.get("respuesta_correcta") or "")
    option = (question.get("opciones") or {}).get(answer.upper()) or (question.get("opciones") or {}).get(answer.lower(), "")
    query = normalized_words(str(option))
    if match:
        cited_number = match.group(1).split(".", 1)[0]
        exact = [article for article in articles if article["numero"] == cited_number]
        if exact:
            best = max(exact, key=lambda article: len(query & article["palabras"]))
            return best, 1.0
    # Never infer an article number from textual similarity alone. Similar
    # wording can occur in several laws and versions of the same provision.
    return None, 0.0


def generated_explanation(question: dict, article: dict | None) -> str:
    answer = str(question.get("respuesta_correcta") or "").upper()
    option = (question.get("opciones") or {}).get(answer) or (question.get("opciones") or {}).get(answer.lower())
    if not answer or not option or article is None:
        return ""
    query = normalized_words((question.get("enunciado") or "") + " " + option)
    paragraphs = []
    for paragraph in article["texto"].splitlines():
        paragraph = paragraph.strip()
        if len(paragraph) <= 500:
            candidates = [paragraph]
        else:
            candidates = re.split(r"(?<=[.;])\s+", paragraph)
        paragraphs.extend(part.strip() for part in candidates if 35 <= len(part.strip()) <= 500)
    matches = sorted(
        ((len(query & normalized_words(part)), part) for part in paragraphs),
        reverse=True,
    )
    if not matches or matches[0][0] < 4:
        return ""
    excerpt = matches[0][1].strip(" \t\n\r\"“” .;:")
    repeated_prefix = excerpt[: min(80, len(excerpt) // 2)]
    duplicate = excerpt.find(repeated_prefix, len(repeated_prefix)) if len(excerpt) > 100 else -1
    if duplicate > 0:
        excerpt = excerpt[:duplicate].rstrip()
    if len(excerpt) > 280:
        excerpt = excerpt[:277].rsplit(" ", 1)[0] + "…"
    reference = question.get("referencia_tematica") or f"Artículo {article['numero']}"
    law = article["ley"].removeprefix("CE ").strip()
    law_reference = f" de la {law}" if law else ""
    return f"El {reference}{law_reference} establece: «{excerpt}». Por ello, la opción {answer} es la correcta."


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
    article_index = {number: topic_articles(number) for number in range(1, len(TOPIC_TITLES) + 1)}

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
                question_context = {
                    **raw,
                    "tema_numero": number,
                    "referencia_tematica": reference,
                }
                selected_article, article_score = select_article(
                    question_context, article_index.get(number, [])
                ) if number is not None else (None, 0.0)
                explanation = raw.get("explicacion") or ""
                generated = False
                if not explanation and raw.get("respuesta_correcta") and selected_article:
                    explanation = generated_explanation(
                        {**question_context, "referencia_tematica": reference}, selected_article
                    )
                    generated = bool(explanation)
                elif not explanation and raw.get("respuesta_correcta") and reference_type == "articulo":
                    answer = str(raw["respuesta_correcta"]).upper()
                    option = (raw.get("opciones") or {}).get(answer) or (raw.get("opciones") or {}).get(answer.lower(), "")
                    if option:
                        explanation = (
                            f"El enunciado remite al {reference}. La opción {answer} "
                            f"(«{option}») responde al supuesto que plantea ese precepto."
                        )
                        generated = True
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
                    "estado_respuesta": raw.get("estado_respuesta", ""),
                    "estado_plantilla_respuestas": raw.get("estado_plantilla_respuestas", ""),
                    "fuente_plantilla_respuestas": raw.get("fuente_plantilla_respuestas", ""),
                    "explicacion": explanation or None,
                    "explicacion_generada": generated,
                    "referencia_tematica": reference,
                    "referencia_tematica_tipo": reference_type,
                    "referencia_tematica_origen": reference_source,
                    "referencia_tematica_orden": selected_article["orden"] if selected_article else None,
                    "referencia_tematica_confianza": round(article_score, 3) if selected_article else None,
                    "referencia_normativa": selected_article["ley"] if selected_article else "",
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
            key=lambda q: (
                q["referencia_tematica_tipo"] != "articulo",
                q["referencia_tematica_orden"] if q["referencia_tematica_orden"] is not None else 10**6,
                q["referencia_tematica"] if q["referencia_tematica_tipo"] == "articulo" else "",
                q["anio"],
                q["examen_origen"],
                q["numero_original"] or 0,
            )
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
        "orden": "Por tema y en el orden de los artículos del material de estudio; las preguntas sin artículo identificable quedan al final de cada tema",
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
