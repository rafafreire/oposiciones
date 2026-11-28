# Administrativo AGE · recursos

La aplicación lee el programa oficial desde `js/admin-age-data.js` y el progreso se guarda localmente en el navegador.

## Añadir materiales

Guarda los documentos de estudio en esta carpeta y añádelos a `recursos.json`:

```json
{
  "resources": [
    {
      "title": "Tema 01 · Constitución Española",
      "path": "OPOSICIONES/ADMIN AGE/TEMARIO/TEMA_01.pdf"
    }
  ]
}
```

`path` se escribe desde la raíz del repositorio. La aplicación muestra los enlaces incluidos en `resources` en la sección Recursos.

## Material oficial de 2025 incluido

- `TEMARIO/temario-2025.json`: los 45 temas del Anexo III.
- `EXAMENES/preguntas-2025.json`: preguntas de los modelos A y B, con sus opciones y corrección provisional.
- `EXAMENES/respuestas-2025.json`: claves provisionales separadas por parte y supuesto.
- Los PDF oficiales de los dos cuestionarios, las plantillas provisionales y el Anexo III.

Para regenerar los JSON de los cuestionarios después de sustituir los PDF, ejecuta `python scripts/build_admin_age_json.py`. El script necesita `pdftotext` (Poppler).
