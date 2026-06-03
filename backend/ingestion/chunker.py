"""
Chunker — Split legal text into overlapping, sentence-aware chunks.

Produces fixed-size (by word count) chunks with configurable overlap.
When possible the split point is nudged to the nearest sentence
boundary (period or newline) so chunks read naturally.
"""

from __future__ import annotations

import re


# How far (in words) from the ideal boundary we'll look for a sentence end.
_BOUNDARY_SEARCH_WINDOW = 20


def chunk_text(
    text: str,
    chunk_size: int = 500,
    overlap: int = 50,
) -> list[dict]:
    """Split *text* into overlapping word-count chunks.

    Each returned dict contains:
    - ``text``        — the chunk string
    - ``chunk_index`` — zero-based index
    - ``start_word``  — index of the first word (0-based)
    - ``end_word``    — index of the last word (inclusive, 0-based)

    The function tries to break at a sentence boundary (``.`` or ``\\n``)
    within a small window around the target split point so that chunks
    end at natural pauses.

    Args:
        text:       Cleaned text to chunk.
        chunk_size: Target number of words per chunk.
        overlap:    Number of overlapping words between consecutive chunks.

    Returns:
        List of chunk dicts (may be empty if *text* is blank).
    """
    if not text or not text.strip():
        return []

    words = text.split()
    total_words = len(words)

    if total_words == 0:
        return []

    chunks: list[dict] = []
    start = 0
    chunk_index = 0

    while start < total_words:
        # Ideal end position (exclusive)
        ideal_end = min(start + chunk_size, total_words)

        # Try to nudge the end to a sentence boundary
        end = _find_sentence_boundary(words, ideal_end, total_words)

        chunk_words = words[start:end]
        chunk_text_str = " ".join(chunk_words)

        chunks.append(
            {
                "text": chunk_text_str,
                "chunk_index": chunk_index,
                "start_word": start,
                "end_word": end - 1,   # inclusive
            }
        )

        # Advance, respecting overlap
        step = max(end - start - overlap, 1)
        start += step
        chunk_index += 1

    return chunks


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _find_sentence_boundary(
    words: list[str],
    ideal_end: int,
    total_words: int,
) -> int:
    """Look for a sentence-ending token near *ideal_end*.

    Searches a window of ±``_BOUNDARY_SEARCH_WINDOW`` words around
    *ideal_end* for a word that ends with ``.``, ``?``, ``!``, or is
    immediately followed by a newline.  Returns the best split position
    (exclusive index), or *ideal_end* if none is found.
    """
    if ideal_end >= total_words:
        return total_words

    sentence_end_re = re.compile(r"[.!?؟۔]$")  # includes Urdu question-mark & full-stop

    search_start = max(ideal_end - _BOUNDARY_SEARCH_WINDOW, 0)
    search_end = min(ideal_end + _BOUNDARY_SEARCH_WINDOW, total_words)

    best: int | None = None
    best_distance = float("inf")

    for i in range(search_start, search_end):
        if sentence_end_re.search(words[i]):
            distance = abs(i + 1 - ideal_end)
            if distance < best_distance:
                best_distance = distance
                best = i + 1  # exclusive

    return best if best is not None else ideal_end
