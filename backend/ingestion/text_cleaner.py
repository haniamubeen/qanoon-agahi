"""
Text Cleaner — Normalise and sanitise extracted legal text.

Designed for bilingual (Urdu + English) content found in Pakistani
legal documents.  Performs Unicode normalisation (NFKC — critical for
Urdu ligatures), collapses whitespace, removes control characters
while preserving Urdu script, and strips common PDF artifacts.
"""

from __future__ import annotations

import re
import unicodedata


# ---------------------------------------------------------------------------
# Character-class helpers
# ---------------------------------------------------------------------------

# Unicode blocks that cover Arabic/Urdu script characters
_URDU_RANGES = (
    "\u0600-\u06FF"   # Arabic
    "\u0750-\u077F"   # Arabic Supplement
    "\uFB50-\uFDFF"   # Arabic Presentation Forms-A
    "\uFE70-\uFEFF"   # Arabic Presentation Forms-B
)

# Control characters to strip, *except* \n, \r, \t
_CONTROL_CHAR_RE = re.compile(
    r"[^\S \n\r\t]"          # non-printable whitespace beyond space/NL/CR/tab
    r"|[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]",
    re.UNICODE,
)

# Common PDF artifacts
_PDF_ARTIFACT_RE = re.compile(
    r"(?:"
    r"\ufeff"                 # BOM
    r"|[\uf000-\uf8ff]"       # Private Use Area (font-specific glyphs)
    r"|\(cid:\d+\)"           # CID references from bad font mappings
    r"|â€[™œ\x9d]"            # mojibake for smart quotes / em-dash
    r")",
    re.UNICODE,
)

# Multiple whitespace / blank lines
_MULTI_SPACE_RE = re.compile(r"[^\S\n]+")       # horizontal whitespace
_MULTI_NEWLINE_RE = re.compile(r"\n{3,}")         # 3+ newlines → 2


def clean_text(text: str) -> str:
    """Clean and normalise extracted document text.

    Processing order:
    1. Unicode NFKC normalisation (merges Urdu ligatures correctly).
    2. Remove PDF artifacts & BOM.
    3. Strip control characters (preserve Urdu + standard whitespace).
    4. Collapse repeated whitespace / blank lines.

    Args:
        text: Raw text extracted from a PDF.

    Returns:
        Cleaned text ready for chunking.
    """
    if not text:
        return ""

    # 1 — NFKC normalisation (important for Urdu)
    text = unicodedata.normalize("NFKC", text)

    # 2 — PDF artifacts
    text = _PDF_ARTIFACT_RE.sub("", text)

    # 3 — Control characters (keep Urdu, Latin, digits, punctuation)
    text = _CONTROL_CHAR_RE.sub("", text)

    # 4 — Whitespace normalisation
    text = _MULTI_SPACE_RE.sub(" ", text)
    text = _MULTI_NEWLINE_RE.sub("\n\n", text)

    return text.strip()


def detect_language(text: str) -> str:
    """Detect whether *text* is predominantly Urdu or English.

    Uses a simple character-ratio heuristic: if ≥ 30 % of alphabetic
    characters fall within Arabic/Urdu Unicode blocks the text is
    classified as ``'urdu'``; otherwise ``'english'``.

    Args:
        text: Input text to analyse.

    Returns:
        ``'urdu'`` or ``'english'``.
    """
    if not text:
        return "english"

    urdu_pattern = re.compile(f"[{_URDU_RANGES}]")
    latin_pattern = re.compile(r"[a-zA-Z]")

    urdu_count = len(urdu_pattern.findall(text))
    latin_count = len(latin_pattern.findall(text))

    total = urdu_count + latin_count
    if total == 0:
        return "english"

    urdu_ratio = urdu_count / total
    return "urdu" if urdu_ratio >= 0.30 else "english"
