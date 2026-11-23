#!/usr/bin/env python3
"""Encode the current GVA Markdown topics for the static web application."""

from __future__ import annotations

import base64
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
GENERAL = ROOT / "OPOSICIONES" / "AUX ADM GVA" / "TEMARIO" / "PARTE GENERAL"
SPECIFIC = ROOT / "OPOSICIONES" / "AUX ADM GVA" / "TEMARIO" / "PARTE ESPECIFICA"


def main() -> None:
    for number in range(1, 25):
        folder = GENERAL if number <= 10 else SPECIFIC
        source = folder / f"TEMA {number:02d}.md"
        if not source.is_file():
            raise FileNotFoundError(f"No se encontró el material de origen: {source}")

        markdown = source.read_text(encoding="utf-8-sig")
        encoded = base64.b64encode(markdown.encode("utf-8")).decode("ascii")
        output = ROOT / "js" / "materials" / f"tema-{number:02d}.js"
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(
            "window.topicMaterialB64=window.topicMaterialB64||{};"
            f"window.topicMaterialB64['{number}']='{encoded}';\n",
            encoding="utf-8",
        )


if __name__ == "__main__":
    main()
