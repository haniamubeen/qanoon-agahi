"""
test_retrieval.py – Interactive smoke-test for the HybridSearchEngine.

Runs a curated list of English + Urdu legal queries through the hybrid
retriever and prints colour-coded results using Rich (pistachio/green theme).

Usage::

    cd c:\\lawyer-fyp\\backend
    python -m tests.test_retrieval          # module-style
    python tests/test_retrieval.py          # script-style (sys.path fix below)
"""

from __future__ import annotations

import sys
from pathlib import Path

# ── Ensure the backend package root is importable when run as a script ──────
_BACKEND_DIR = str(Path(__file__).resolve().parent.parent)
if _BACKEND_DIR not in sys.path:
    sys.path.insert(0, _BACKEND_DIR)

from config import get_config                     # noqa: E402
from retrieval.search import HybridSearchEngine   # noqa: E402

from rich.console import Console                  # noqa: E402
from rich.panel import Panel                      # noqa: E402
from rich.table import Table                      # noqa: E402
from rich.text import Text                        # noqa: E402

# ── Brand colours ────────────────────────────────────────────────────────────
PISTACHIO = "#93C572"
SAGE      = "#88B04B"
DARK_GREEN = "#3A5F0B"

console = Console()

# ── Test queries (English + Urdu mix) ────────────────────────────────────────
TEST_QUERIES: list[str] = [
    "How to transfer property ownership in Pakistan?",
    "طلاق کا طریقہ کار کیا ہے؟",                       # divorce procedure
    "What is the punishment for theft under PPC?",
    "How to register an FIR?",
    "کرایہ دار کو کیسے بے دخل کریں",                    # how to evict tenant
    "What are my rights if employer fires me?",
    "How to register a company with SECP?",
    "Section 420 cheating fraud",
    "child custody after divorce",
    "online harassment cybercrime complaint",
]


def _truncate(text: str, limit: int = 200) -> str:
    """Return the first *limit* characters, appending '…' if truncated."""
    return text[:limit] + ("…" if len(text) > limit else "")


def run_tests() -> None:
    """Execute every test query and pretty-print results."""

    cfg = get_config()

    console.print(
        Panel(
            Text("⚖️  Qanoon Agahi — Hybrid Retrieval Test Suite", style=f"bold {PISTACHIO}"),
            border_style=SAGE,
            subtitle="dense + sparse + RRF",
            subtitle_align="right",
        )
    )
    console.print(
        f"  [bold {PISTACHIO}]Embedding model:[/]  {cfg.EMBEDDING_MODEL}\n"
        f"  [bold {PISTACHIO}]Dense weight:[/]      {cfg.DENSE_WEIGHT}\n"
        f"  [bold {PISTACHIO}]BM25 weight:[/]       {cfg.BM25_WEIGHT}\n"
        f"  [bold {PISTACHIO}]ChromaDB dir:[/]      {cfg.CHROMA_DB_DIR}\n"
    )

    engine = HybridSearchEngine(cfg)

    for idx, query in enumerate(TEST_QUERIES, start=1):
        # ── Header panel for each query ──────────────────────────────────
        console.print()
        console.rule(style=SAGE)
        console.print(
            Panel(
                Text(f"Q{idx}: {query}", style="bold white"),
                border_style=PISTACHIO,
                title=f"[bold {DARK_GREEN}]Query {idx}/{len(TEST_QUERIES)}[/]",
                title_align="left",
            )
        )

        results = engine.search(query, top_k=5)

        if not results:
            console.print(f"  [{PISTACHIO}]No results found.[/]\n")
            continue

        # ── Results table ────────────────────────────────────────────────
        table = Table(
            show_header=True,
            header_style=f"bold {PISTACHIO}",
            border_style=SAGE,
            title_style=f"bold {DARK_GREEN}",
            expand=True,
        )
        table.add_column("#", justify="right", width=3)
        table.add_column("Score", justify="center", width=10)
        table.add_column("Source", style=f"{PISTACHIO}", width=24)
        table.add_column("Text (first 200 chars)", ratio=1)

        for rank, hit in enumerate(results, start=1):
            table.add_row(
                str(rank),
                f"{hit['score']:.6f}",
                str(hit["source"]),
                _truncate(hit["text"]),
            )

        console.print(table)

    # ── Footer ───────────────────────────────────────────────────────────
    console.print()
    console.rule(style=SAGE)
    console.print(
        f"  [bold {PISTACHIO}]✅  All {len(TEST_QUERIES)} queries executed.[/]\n",
        justify="center",
    )


# ── Entry-point ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    run_tests()
