# 📂 Place Your Legal Data Files Here

## What goes in this folder:

### 1. Constitution of Pakistan (Required)
- Download from: https://na.gov.pk/uploads/documents/1333523681_951.pdf
- Save as: `constitution.pdf`

### 2. Legal Acts & Ordinances (At least 3-5)
Example files:
- `muslim_family_laws_ordinance_1961.pdf`
- `transfer_of_property_act_1882.pdf`
- `pakistan_penal_code.pdf`
- `factories_act_1934.pdf`
- `consumer_protection_act.pdf`

### 3. FAQ Dataset (Required)
- Save as: `legal_faqs.json`
- See the template file at: `../legal_faqs_template.json`

## Supported formats:
- `.pdf` — Will be auto-extracted
- `.txt` — Plain text files
- `.json` — For structured FAQ data

## Notes:
- File names don't matter much — the ingestion script processes everything in this folder
- Keep original formatting where possible
- Urdu text PDFs are supported
