"""
Ingest — Main ingestion pipeline for the Pakistan Legal RAG system.

Ties together pdf_loader → text_cleaner → chunker → ChromaDB storage.
Run directly to execute the full pipeline:

    python -m ingestion.ingest

Uses the **pistachio / green** brand palette for all CLI output.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from types import ModuleType
from typing import Any

# ---------------------------------------------------------------------------
# Ensure the backend root is on sys.path so we can import config
# ---------------------------------------------------------------------------
_BACKEND_DIR = Path(__file__).resolve().parent.parent
if str(_BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(_BACKEND_DIR))

try:
    import config  # type: ignore[import-untyped]
except ImportError:
    config = None  # will be handled at runtime

from ingestion.chunker import chunk_text
from ingestion.pdf_loader import extract_text_from_pdf
from ingestion.text_cleaner import clean_text, detect_language

# Rich console — green brand theme
from rich.console import Console
from rich.panel import Panel
from rich.theme import Theme

_THEME = Theme(
    {
        "brand": "bold green",
        "info": "dim green",
        "success": "bold bright_green",
        "warn": "bold yellow",
        "err": "bold red",
    }
)
console = Console(theme=_THEME)


# =========================================================================
# PDF ingestion
# =========================================================================

def ingest_pdfs(cfg: ModuleType) -> list[dict[str, Any]]:
    """Extract, clean, and chunk every PDF in ``config.RAW_DATA_DIR``.

    Args:
        cfg: The project ``config`` module (must expose ``RAW_DATA_DIR``).

    Returns:
        List of chunk dicts, each containing ``text``, ``metadata``, and
        ``id`` keys ready for ChromaDB insertion.
    """
    raw_dir = Path(cfg.RAW_DATA_DIR)
    pdf_files = sorted(raw_dir.glob("*.pdf"))

    if not pdf_files:
        console.print("[warn]⚠  No PDF files found in[/] " + str(raw_dir))
        return []

    console.print(
        f"[brand]📄  Found {len(pdf_files)} PDF(s) in[/] {raw_dir}"
    )

    all_chunks: list[dict[str, Any]] = []

    for pdf_path in pdf_files:
        try:
            console.print(f"  [info]→ Processing:[/] {pdf_path.name}")

            raw_text = extract_text_from_pdf(pdf_path)
            cleaned = clean_text(raw_text)
            language = detect_language(cleaned)
            chunks = chunk_text(cleaned)

            for chunk in chunks:
                doc_id = f"{pdf_path.stem}__chunk_{chunk['chunk_index']}"
                all_chunks.append(
                    {
                        "id": doc_id,
                        "text": chunk["text"],
                        "metadata": {
                            "source": pdf_path.name,
                            "chunk_index": chunk["chunk_index"],
                            "start_word": chunk["start_word"],
                            "end_word": chunk["end_word"],
                            "language": language,
                            "type": "legal_document",
                        },
                    }
                )

            console.print(
                f"    [success]✓ {len(chunks)} chunks  •  lang={language}[/]"
            )

        except Exception as exc:
            console.print(f"    [err]✗ Error: {exc}[/]")

    return all_chunks


# =========================================================================
# FAQ ingestion
# =========================================================================

def ingest_faqs(cfg: ModuleType) -> list[dict[str, Any]]:
    """Load ``legal_faqs.json`` and convert each FAQ into a searchable chunk.

    Each FAQ chunk combines ``question_en``, ``question_ur``, and
    ``answer`` so that both English and Urdu queries can match.

    Args:
        cfg: The project ``config`` module (must expose ``RAW_DATA_DIR``).

    Returns:
        List of chunk dicts ready for ChromaDB insertion.
    """
    raw_dir = Path(cfg.RAW_DATA_DIR)
    faq_path = raw_dir / "legal_faqs.json"

    if not faq_path.exists():
        console.print(
            "[warn]⚠  legal_faqs.json not found in[/] " + str(raw_dir)
        )
        return []

    try:
        with open(faq_path, "r", encoding="utf-8") as fh:
            faqs: list[dict[str, Any]] = json.load(fh)
    except (json.JSONDecodeError, OSError) as exc:
        console.print(f"[err]✗  Failed to read FAQs: {exc}[/]")
        return []

    console.print(f"[brand]❓  Processing {len(faqs)} FAQ(s)[/]")

    chunks: list[dict[str, Any]] = []

    for faq in faqs:
        try:
            faq_id: str = faq.get("id", "unknown")

            # Build a combined text block for embedding
            parts = [
                f"Question (English): {faq.get('question_en', '')}",
                f"Question (Urdu): {faq.get('question_ur', '')}",
                f"Answer: {faq.get('answer', '')}",
            ]
            text = "\n".join(parts)
            text = clean_text(text)

            related_laws = ", ".join(faq.get("related_laws", []))

            chunks.append(
                {
                    "id": f"faq__{faq_id}",
                    "text": text,
                    "metadata": {
                        "source": "legal_faqs",
                        "faq_id": faq_id,
                        "legal_domain": faq.get("legal_domain", ""),
                        "related_laws": related_laws,
                        "lawyer_type": faq.get("lawyer_type", ""),
                        "court": faq.get("court", ""),
                        "type": "faq",
                    },
                }
            )
        except Exception as exc:
            console.print(f"  [err]✗  FAQ '{faq.get('id', '?')}': {exc}[/]")

    console.print(f"  [success]✓  {len(chunks)} FAQ chunks created[/]")
    return chunks


# =========================================================================
# ChromaDB storage
# =========================================================================

def store_in_chromadb(
    chunks: list[dict[str, Any]],
    cfg: ModuleType,
) -> None:
    """Persist *chunks* into a ChromaDB collection.

    Uses ``SentenceTransformer`` as the embedding backend and stores
    vectors under ``config.CHROMA_DB_DIR``.

    Args:
        chunks: List of dicts with ``id``, ``text``, and ``metadata``.
        cfg:    The project ``config`` module.
    """
    if not chunks:
        console.print("[warn]⚠  No chunks to store — skipping ChromaDB.[/]")
        return

    try:
        import chromadb
        from chromadb.utils.embedding_functions import (
            SentenceTransformerEmbeddingFunction,
        )
        from tqdm import tqdm
    except ImportError as exc:
        console.print(
            f"[err]✗  Missing dependency: {exc}. "
            "Install with: pip install chromadb sentence-transformers tqdm[/]"
        )
        return

    chroma_dir = Path(cfg.CHROMA_DB_DIR)
    chroma_dir.mkdir(parents=True, exist_ok=True)

    console.print(
        f"[brand]🗄️  Initialising ChromaDB at[/] {chroma_dir}"
    )

    client = chromadb.PersistentClient(path=str(chroma_dir))

    embedding_fn = SentenceTransformerEmbeddingFunction(
        model_name=cfg.EMBEDDING_MODEL,
    )

    collection = client.get_or_create_collection(
        name="pakistan_legal_corpus",
        embedding_function=embedding_fn,
    )

    # ---- Batch upsert (ChromaDB caps at ~5 461 but we keep it small) ----
    batch_size = 50
    total = len(chunks)

    console.print(
        f"[info]   Adding {total} chunks in batches of {batch_size}…[/]"
    )

    for i in tqdm(
        range(0, total, batch_size),
        desc="Storing",
        colour="green",
        unit="batch",
    ):
        batch = chunks[i : i + batch_size]
        collection.upsert(
            ids=[c["id"] for c in batch],
            documents=[c["text"] for c in batch],
            metadatas=[c["metadata"] for c in batch],
        )

    console.print(
        f"[success]✅  {total} chunks stored in "
        f"'pakistan_legal_corpus' collection.[/]"
    )


# =========================================================================
# CLI entry-point
# =========================================================================

def main() -> None:
    """Run the full ingestion pipeline with pretty CLI output."""
    console.print(
        Panel(
            "[brand]⚖️  Qanoon Agahi — Legal RAG Ingestion Pipeline[/]",
            border_style="green",
            padding=(1, 2),
        )
    )

    if config is None:
        console.print(
            "[err]✗  Could not import config.py from backend root. "
            "Make sure it exists at:[/]\n"
            f"    {_BACKEND_DIR / 'config.py'}"
        )
        sys.exit(1)

    cfg = config.get_config()

    # 1. PDFs
    console.rule("[brand]Step 1 · PDF Ingestion[/]", style="green")
    pdf_chunks = ingest_pdfs(cfg)

    # 2. FAQs
    console.rule("[brand]Step 2 · FAQ Ingestion[/]", style="green")
    faq_chunks = ingest_faqs(cfg)

    all_chunks = pdf_chunks + faq_chunks

    if not all_chunks:
        console.print("[warn]⚠  Nothing to ingest. Add PDFs or FAQs first.[/]")
        sys.exit(0)

    # 3. Store
    console.rule("[brand]Step 3 · ChromaDB Storage[/]", style="green")
    store_in_chromadb(all_chunks, cfg)

    console.print()
    console.print(
        Panel(
            f"[success]🎉  Pipeline complete — "
            f"{len(pdf_chunks)} PDF chunks + "
            f"{len(faq_chunks)} FAQ chunks ingested.[/]",
            border_style="bright_green",
            padding=(1, 2),
        )
    )


if __name__ == "__main__":
    main()
