"""
test_pipeline.py – Smoke-test for the full RAG pipeline.

Runs a few legal queries through the entire pipeline (search → prompt → LLM)
and validates that the output contains the required structured keys.
"""

from __future__ import annotations

import sys
from pathlib import Path

_BACKEND_DIR = str(Path(__file__).resolve().parent.parent)
if _BACKEND_DIR not in sys.path:
    sys.path.insert(0, _BACKEND_DIR)

from pipeline import run_rag_pipeline

from rich.console import Console
from rich.panel import Panel
from rich.table import Table

PISTACHIO = "#93C572"
SAGE = "#88B04B"
DARK_GREEN = "#3A5F0B"

console = Console()

TEST_QUERIES = [
    "How to register an FIR in Pakistan?",
    "What is the punishment for theft under PPC?",
    "How can a wife get divorce through Khula?",
    "آن لائن ہراسانی کی شکایت کیسے کریں؟",
]

REQUIRED_KEYS = {"docs", "lawyer", "court", "steps"}


def main() -> None:
    """Run all smoke-test queries and report pass/fail results."""
    console.print(
        Panel(
            f"[bold {PISTACHIO}]⚖️  Qanoon Agahi — Pipeline Test Suite[/]",
            border_style=SAGE,
        )
    )

    passed = 0
    failed = 0

    for idx, query in enumerate(TEST_QUERIES, 1):
        console.rule(f"[bold {PISTACHIO}]Test {idx}/{len(TEST_QUERIES)}[/]", style=SAGE)
        console.print(f"  [bold white]Query:[/] {query}\n")

        try:
            result = run_rag_pipeline(query)

            # Validate structure
            missing_keys = REQUIRED_KEYS - set(result.keys())
            if missing_keys:
                console.print(f"  [bold red]✗ FAIL:[/] Missing keys: {missing_keys}")
                failed += 1
                continue

            # Validate types
            assert isinstance(result["docs"], list), "docs must be a list"
            assert isinstance(result["lawyer"], str), "lawyer must be a string"
            assert isinstance(result["court"], str), "court must be a string"
            assert isinstance(result["steps"], list), "steps must be a list"

            console.print(f"  [bold green]✓ PASS[/] — All 4 keys present and valid.")
            console.print(f"    docs:   {len(result['docs'])} items")
            console.print(f"    lawyer: {result['lawyer']}")
            console.print(f"    court:  {result['court']}")
            console.print(f"    steps:  {len(result['steps'])} items")
            passed += 1

        except Exception as exc:
            console.print(f"  [bold red]✗ ERROR:[/] {exc}")
            failed += 1

        console.print()

    # Summary
    console.print(
        Panel(
            f"[bold {PISTACHIO}]Results: {passed} passed, {failed} failed out of {len(TEST_QUERIES)}[/]",
            border_style="bright_green" if failed == 0 else "red",
        )
    )


if __name__ == "__main__":
    main()
