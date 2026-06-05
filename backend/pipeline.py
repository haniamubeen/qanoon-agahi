"""
pipeline.py – End-to-end RAG pipeline for the Qanoon Agahi legal assistant.

Orchestrates: Hybrid Search → Prompt Engineering → Local LLM → Structured Response.

Usage::

    python pipeline.py "How do I register an FIR?"
"""

from __future__ import annotations

import sys
from pathlib import Path

# ── Ensure backend root is importable ────────────────────────────────────────
_BACKEND_DIR = Path(__file__).resolve().parent
if str(_BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(_BACKEND_DIR))

from config import get_config
from retrieval.search import HybridSearchEngine
from retrieval.prompt_engine import build_prompt
from llm_service.inference import generate_response

from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.json import JSON as RichJSON

console = Console()

# ── Brand colours ────────────────────────────────────────────────────────────
PISTACHIO = "#93C572"
SAGE = "#88B04B"
DARK_GREEN = "#3A5F0B"


def run_rag_pipeline(query: str, top_k: int = 5) -> dict:
    """Execute the full RAG pipeline for a legal query.

    Args:
        query: The user's legal question (English or Urdu).
        top_k: Number of documents to retrieve.

    Returns:
        A dict with keys: docs, lawyer, court, steps.
    """
    cfg = get_config()

    # Step 1: Retrieve relevant documents
    console.print(f"\n[bold {PISTACHIO}]🔍 Step 1:[/] Searching legal database…")
    engine = HybridSearchEngine(cfg)
    results = engine.search(query, top_k=top_k)
    
    console.print(f"  [dim]Found {len(results)} relevant documents.[/dim]")
    for i, r in enumerate(results, 1):
        console.print(f"  [dim]{i}. {r['source']} (score: {r['score']:.4f})[/dim]")

    # Step 2: Build the prompt
    console.print(f"\n[bold {PISTACHIO}]📝 Step 2:[/] Building context prompt…")
    system_prompt, user_prompt = build_prompt(query, results)

    # Step 3: Generate response from local LLM
    console.print(f"\n[bold {PISTACHIO}]🤖 Step 3:[/] Generating response from Llama-3…")
    response = generate_response(system_prompt, user_prompt)

    return response


def main() -> None:
    """CLI entry-point for testing the full pipeline."""
    if len(sys.argv) < 2:
        console.print(
            Panel(
                f"[bold {PISTACHIO}]⚖️  Qanoon Agahi — Legal RAG Pipeline[/]\n\n"
                f"Usage: python pipeline.py \"Your legal question here\"",
                border_style=SAGE,
            )
        )
        sys.exit(1)

    query = " ".join(sys.argv[1:])

    console.print(
        Panel(
            f"[bold {PISTACHIO}]⚖️  Qanoon Agahi — Legal RAG Pipeline[/]",
            border_style=SAGE,
        )
    )
    console.print(f"\n[bold white]Query:[/] {query}\n")

    response = run_rag_pipeline(query)

    # Pretty print the result
    console.print(f"\n[bold {PISTACHIO}]📋 Structured Legal Response:[/]")
    console.print()

    # Docs
    if response.get("docs"):
        console.print(f"  [bold {PISTACHIO}]📄 Relevant Laws & Documents:[/]")
        for doc in response["docs"]:
            console.print(f"    • {doc}")
    
    console.print()
    
    # Lawyer
    console.print(f"  [bold {PISTACHIO}]👨‍⚖️ Recommended Lawyer:[/] {response.get('lawyer', 'N/A')}")
    
    # Court
    console.print(f"  [bold {PISTACHIO}]🏛️  Relevant Court:[/] {response.get('court', 'N/A')}")
    
    console.print()
    
    # Steps
    if response.get("steps"):
        console.print(f"  [bold {PISTACHIO}]📋 Steps to Take:[/]")
        for i, step in enumerate(response["steps"], 1):
            console.print(f"    {i}. {step}")

    console.print()
    console.print(
        Panel(
            f"[bold {PISTACHIO}]✅ Pipeline complete![/]",
            border_style="bright_green",
        )
    )


if __name__ == "__main__":
    main()
