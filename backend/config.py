"""
config.py – Central configuration for the Qanoon Agahi legal RAG pipeline.

All filesystem paths are resolved relative to the *backend* directory so the
project stays portable across machines.  Use ``get_config()`` to obtain the
singleton instance.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

# ── Resolve the backend root once at import time ──────────────────────────────
_BACKEND_DIR: Path = Path(__file__).resolve().parent


@dataclass(frozen=True)
class Config:
    """Immutable, centralised settings for every pipeline stage."""

    # ── Filesystem paths (relative to backend/) ──────────────────────────────
    RAW_DATA_DIR: Path = field(default_factory=lambda: _BACKEND_DIR / "data" / "raw")
    """Directory containing the original, unprocessed legal PDFs."""

    PROCESSED_DIR: Path = field(default_factory=lambda: _BACKEND_DIR / "data" / "processed")
    """Directory for chunked / cleaned documents ready for indexing."""

    CHROMA_DB_DIR: Path = field(default_factory=lambda: _BACKEND_DIR / "db" / "chroma_store")
    """Persistent ChromaDB vector-store location."""

    # ── Embedding model ──────────────────────────────────────────────────────
    EMBEDDING_MODEL: str = "paraphrase-multilingual-MiniLM-L12-v2"
    """Smaller multilingual model (~470MB) – fast to download, works well on English/Urdu."""

    # ── Chunking parameters ──────────────────────────────────────────────────
    CHUNK_SIZE: int = 500
    """Maximum number of tokens per document chunk."""

    CHUNK_OVERLAP: int = 50
    """Token overlap between consecutive chunks to preserve context."""

    # ── Retrieval parameters ─────────────────────────────────────────────────
    TOP_K: int = 5
    """Number of top results returned by the hybrid retriever."""

    BM25_WEIGHT: float = 0.3
    """Weight assigned to the sparse BM25 retrieval score."""

    DENSE_WEIGHT: float = 0.7
    """Weight assigned to the dense (embedding) retrieval score."""

    # ── Helpers ───────────────────────────────────────────────────────────────
    def ensure_dirs(self) -> None:
        """Create all configured directories if they don't already exist."""
        self.RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
        self.PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
        self.CHROMA_DB_DIR.mkdir(parents=True, exist_ok=True)


# ── Singleton accessor ────────────────────────────────────────────────────────
_instance: Config | None = None


def get_config() -> Config:
    """Return the singleton ``Config`` instance (created on first call)."""
    global _instance
    if _instance is None:
        _instance = Config()
    return _instance
