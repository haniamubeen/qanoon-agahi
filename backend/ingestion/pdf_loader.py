"""
PDF Loader — Extract raw text from legal PDF documents.

Uses PyMuPDF (fitz) for fast, accurate text extraction.
Handles encoding quirks common in Pakistani legal PDFs
(mixed Urdu/English, scanned headers, page-number stamps).
"""

from __future__ import annotations

import re
from pathlib import Path

import fitz  # PyMuPDF


# ---------------------------------------------------------------------------
# Patterns we want to strip from extracted text
# ---------------------------------------------------------------------------
_PAGE_NUMBER_RE = re.compile(
    r"(?i)"
    r"(?:page\s+\d+\s+of\s+\d+)"   # "Page 3 of 12"
    r"|(?:^-?\s*\d+\s*-?$)",         # standalone "- 3 -" or just "3"
    re.MULTILINE,
)

_HEADER_FOOTER_RE = re.compile(
    r"(?i)"
    r"(?:^.*confidential.*$)"        # common watermark text
    r"|(?:^.*draft.*$)",             # draft watermarks
    re.MULTILINE,
)


def extract_text_from_pdf(pdf_path: Path) -> str:
    """Extract and clean text from a single PDF file.

    Args:
        pdf_path: Path to the PDF file.

    Returns:
        Cleaned, concatenated text from all pages.

    Raises:
        FileNotFoundError: If *pdf_path* does not exist.
        RuntimeError: If PyMuPDF cannot open the file.
    """
    pdf_path = Path(pdf_path)
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    pages: list[str] = []

    try:
        doc = fitz.open(str(pdf_path))
    except Exception as exc:
        raise RuntimeError(
            f"Could not open PDF '{pdf_path.name}': {exc}"
        ) from exc

    try:
        for page_num in range(len(doc)):
            page = doc[page_num]
            raw = page.get_text("text") or ""

            # Handle potential encoding issues
            try:
                raw = raw.encode("utf-8", errors="replace").decode("utf-8")
            except (UnicodeDecodeError, UnicodeEncodeError):
                raw = raw.encode("ascii", errors="replace").decode("ascii")

            pages.append(raw)
    finally:
        doc.close()

    full_text = "\n".join(pages)
    full_text = _strip_artifacts(full_text)
    return full_text.strip()


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _strip_artifacts(text: str) -> str:
    """Remove page numbers, headers, footers, and common PDF junk."""
    text = _PAGE_NUMBER_RE.sub("", text)
    text = _HEADER_FOOTER_RE.sub("", text)
    # Collapse runs of blank lines left behind
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text
