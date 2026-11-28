"""Convert the official INAP 2025 Administrative AGE exam PDFs to JSON.

Requires Poppler's pdftotext executable. The emitted question bank keeps each
model's numbering and its official provisional answer key.
"""
from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXAMS = ROOT / "OPOSICIONES" / "ADMIN AGE" / "EXAMENES"
OUT_QUESTIONS = EXAMS / "preguntas-2025.json"
OUT_KEYS = EXAMS / "respuestas-2025.json"
OUT_SYLLABUS = ROOT / "OPOSICIONES" / "ADMIN AGE" / "TEMARIO" / "temario-2025.json"
DATA_JS = ROOT / "js" / "admin-age-data.js"
PDFTOTEXT = shutil.which("pdftotext") or r"C:\Program Files\Git\mingw64\bin\pdftotext.exe"

MODELS = {
    "A": ("ADVO_2025_A.pdf", "ADVO_2025_A_respuestas_provisionales.pdf"),
    "B": ("ADVO_2025_B.pdf", "ADVO_2025_B_respuestas_provisionales.pdf"),
}
HEADINGS = re.compile(r"(?im)^\s*(PRIMERA PARTE|SUPUESTO I|SUPUESTO II|PREGUNTAS DE RESERVA)\s*$")
QUESTION_START = re.compile(r"(?m)^\s*(\d{1,2})\.\s+(.+?)\s*$")
OPTION = re.compile(r"(?<![\w])([a-d])\)\s*", re.I)
PAGE_HEADER = re.compile(r"^\s*2025\s*-\s*ADVO-L.*P[aá]gina\s+\d+\s+de\s+\d+\s*$", re.I)


def pdf_text(filename: str) -> str:
    path = EXAMS / filename
    if not path.exists():
        raise FileNotFoundError(path)
    result = subprocess.run([PDFTOTEXT, "-enc", "UTF-8", "-raw", str(path), "-"], check=True, capture_output=True)
    return result.stdout.decode("utf-8", errors="replace").replace("\x0c", "\n")


def section_name(heading: str, active: str | None) -> str:
    normalized = heading.strip().upper()
    if normalized == "PRIMERA PARTE":
        return "primeraParte"
    if normalized == "SUPUESTO I":
        return "supuestoI"
    if normalized == "SUPUESTO II":
        return "supuestoII"
    return {"primeraParte": "reservaPrimeraParte", "supuestoI": "reservaSupuestoI", "supuestoII": "reservaSupuestoII"}.get(active or "", "reserva")


def split_sections(text: str) -> list[tuple[str, str]]:
    matches = list(HEADINGS.finditer(text))
    sections: list[tuple[str, str]] = []
    active: str | None = None
    for index, match in enumerate(matches):
        name = section_name(match.group(1), active)
        if name in {"primeraParte", "supuestoI", "supuestoII"}:
            active = name
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        sections.append((name, text[match.end():end]))
    return sections


def parse_questions(section: str, expected_count: int) -> list[dict]:
    lines = []
    page_for_line = []
    page_number = 1
    for raw_line in section.splitlines():
        header = PAGE_HEADER.match(raw_line.strip())
        if header:
            page_match = re.search(r"P[aá]gina\s+(\d+)\s+de", raw_line, re.I)
            if page_match:
                page_number = int(page_match.group(1))
            continue
        clean = raw_line.strip()
        if clean:
            lines.append(clean)
            page_for_line.append(page_number)
    starts: list[tuple[int, int]] = []
    for line_index, line in enumerate(lines):
        match = re.match(r"^(\d{1,2})\.\s+", line)
        if match:
            starts.append((line_index, int(match.group(1))))
    if len(starts) != expected_count:
        raise ValueError(f"Expected {expected_count} questions, extracted {len(starts)}; printed numbers {[number for _, number in starts[-12:]]}")

    questions = []
    for index, (line_index, printed_number) in enumerate(starts):
        number = index + 1
        end = starts[index + 1][0] if index + 1 < len(starts) else len(lines)
        block = " ".join(lines[line_index:end])
        block = re.sub(r"^\d{1,2}\.\s*", "", block)
        marks = list(OPTION.finditer(block))
        option_sequence = None
        for offset in range(len(marks) - 3):
            if [marks[offset + step].group(1).lower() for step in range(4)] == list("abcd"):
                option_sequence = marks[offset:offset + 4]
                break
        if not option_sequence:
            raise ValueError(f"Could not find four options for question {number}: {block[:160]}")
        stem = re.sub(r"\s+", " ", block[:option_sequence[0].start()]).strip()
        options = {}
        for offset, mark in enumerate(option_sequence):
            stop = option_sequence[offset + 1].start() if offset < 3 else len(block)
            options[mark.group(1).lower()] = re.sub(r"\s+", " ", block[mark.end():stop]).strip()
        questions.append({"number": number, "printedNumber": printed_number, "sourcePage": page_for_line[line_index], "question": stem, "options": options})
    return questions


def parse_answer_key(text: str) -> dict[str, dict[str, str | None]]:
    sections: dict[str, dict[str, str | None]] = {}
    active: str | None = None
    for line in text.splitlines():
        clean = line.strip()
        upper = clean.upper()
        if upper == "PRIMERA PARTE":
            active = "primeraParte"
            sections[active] = {}
        elif upper == "SUPUESTO I":
            active = "supuestoI"
            sections[active] = {}
        elif upper == "SUPUESTO II":
            active = "supuestoII"
            sections[active] = {}
        elif upper == "PREGUNTAS DE RESERVA":
            active = {"primeraParte": "reservaPrimeraParte", "supuestoI": "reservaSupuestoI", "supuestoII": "reservaSupuestoII"}.get(active or "", "reserva")
            sections[active] = {}
        elif active:
            match = re.match(r"^(\d{1,2})\.\s+([A-D]|ANULADA)(?:\s|$)", clean, re.I)
            if match:
                answer = match.group(2).upper()
                sections[active][match.group(1)] = None if answer == "ANULADA" else answer
    expected = {"primeraParte": 70, "reservaPrimeraParte": 5, "supuestoI": 20, "reservaSupuestoI": 5, "supuestoII": 20, "reservaSupuestoII": 5}
    for name, count in expected.items():
        if len(sections.get(name, {})) != count:
            raise ValueError(f"Expected {count} answers in {name}, got {len(sections.get(name, {}))}")
    return sections


def build() -> None:
    all_models = {}
    answer_models = {}
    section_counts = {
        "primeraParte": 70,
        "reservaPrimeraParte": 5,
        "supuestoI": 20,
        "reservaSupuestoI": 5,
        "supuestoII": 20,
        "reservaSupuestoII": 5,
    }
    for model, (exam_pdf, key_pdf) in MODELS.items():
        sections = split_sections(pdf_text(exam_pdf))
        answer_key = parse_answer_key(pdf_text(key_pdf))
        parsed = {}
        for name, count in section_counts.items():
            source = next((body for section, body in sections if section == name), None)
            if source is None:
                raise ValueError(f"Missing section {name} in model {model}")
            questions = parse_questions(source, count)
            for question in questions:
                question["correct"] = answer_key[name][str(question["number"])]
                question["status"] = "annulled" if question["correct"] is None else "keyed"
            parsed[name] = questions
        all_models[model] = {"officialPdf": exam_pdf, "sections": parsed}
        answer_models[model] = answer_key

    meta = {
        "exam": "Cuerpo General Administrativo de la Administración del Estado",
        "access": "ingreso libre",
        "call": 2025,
        "examDate": "2026-05-23",
        "sourcePage": "https://sede.inap.gob.es/es/procedimientos-y-servicios/seleccion/procesos-selectivos-de-cuerpos-y-escalas-generales/cuerpo-general-administrativo-de-la-administracion-del-estado-ingreso-libre-convocatoria-2025",
        "sourceQuestionnaires": "INAP · ejercicio único · modelos A y B",
        "answerKeyStatus": "provisional",
        "models": all_models,
    }
    keys = {**{key: value for key, value in meta.items() if key != "models"}, "models": answer_models}
    EXAMS.mkdir(parents=True, exist_ok=True)
    OUT_QUESTIONS.write_text(json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    OUT_KEYS.write_text(json.dumps(keys, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    syllabus = build_syllabus()
    OUT_SYLLABUS.parent.mkdir(parents=True, exist_ok=True)
    OUT_SYLLABUS.write_text(json.dumps(syllabus, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT_QUESTIONS}")
    print(f"Wrote {OUT_KEYS}")
    print(f"Wrote {OUT_SYLLABUS}")


def build_syllabus() -> dict:
    source = DATA_JS.read_text(encoding="utf-8")
    block_names = re.findall(r"\{ name: '([^']+)', topics: \[", source)
    pairs = re.findall(r"\['([^']*)', '([^']*)'\]", source)
    counts = [11, 4, 7, 9, 6, 8]
    if len(block_names) != 6 or len(pairs) != 45:
        raise ValueError(f"Expected 6 syllabus blocks and 45 topics; found {len(block_names)} and {len(pairs)}")
    official_scopes = extract_official_syllabus()
    topics = []
    position = 0
    for block_index, count in enumerate(counts):
        for _ in range(count):
            title, _app_scope = pairs[position]
            position += 1
            topics.append({"number": position, "block": block_names[block_index], "title": title, "scope": official_scopes[position - 1]})
    return {
        "opposition": "Cuerpo General Administrativo de la Administración del Estado",
        "access": "ingreso libre",
        "call": 2025,
        "source": "Resolución de 18 de diciembre de 2025, BOE-A-2025-26262, Anexo III",
        "sourcePage": "https://sede.inap.gob.es/es/procedimientos-y-servicios/seleccion/procesos-selectivos-de-cuerpos-y-escalas-generales/cuerpo-general-administrativo-de-la-administracion-del-estado-ingreso-libre-convocatoria-2025",
        "topics": topics,
    }


def extract_official_syllabus() -> list[str]:
    text = pdf_text("ADVO_2025_convocatoria_anexo_III.pdf")
    lines = [re.sub(r"\s+", " ", line).strip() for line in text.splitlines()]
    block_pattern = re.compile(r"^(I|II|III|IV|V|VI)\.\s+(Organizaci|Derecho|Gesti|Inform.tica)", re.I)
    current_block = None
    started = False
    current_topic: list[str] | None = None
    scopes: list[str] = []

    def save_topic() -> None:
        nonlocal current_topic
        if current_topic:
            scopes.append(re.sub(r"\s+", " ", " ".join(current_topic)).strip())
            current_topic = None

    for line in lines:
        if not started:
            if re.match(r"^3\.\s+Programa\.", line, re.I):
                started = True
            continue
        if not line or line.isdigit() or line.startswith(("MINISTERIO ", "SECRETARIA DE ESTADO", "PARA LA TRANSFORMACI", "Y DE LA FUNCI")):
            continue
        block = block_pattern.match(line)
        if block:
            save_topic()
            current_block = block.group(1)
            continue
        if current_block and (topic := re.match(r"^(\d{1,2})\.\s+(.+)$", line)):
            save_topic()
            current_topic = [topic.group(2)]
            continue
        if current_topic:
            current_topic.append(line)
        if len(scopes) >= 45:
            break
    save_topic()
    if len(scopes) != 45:
        raise ValueError(f"Expected 45 topics in the official Anexo III PDF; extracted {len(scopes)}")
    return scopes


if __name__ == "__main__":
    build()
