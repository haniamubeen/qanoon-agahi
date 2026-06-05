"""
inference.py – Local LLM inference via Ollama for the Qanoon Agahi pipeline.

Communicates with the locally running Ollama server (localhost:11434)
to generate structured legal responses using Llama-3.
"""

from __future__ import annotations

import json
import logging
import re
from typing import Any

try:
    import ollama
except ImportError:
    ollama = None

from pydantic import BaseModel, Field, ValidationError

# ── Logging ──────────────────────────────────────────────────────────────────
logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="\033[92m%(asctime)s\033[0m │ %(levelname)-8s │ %(message)s",
    datefmt="%H:%M:%S",
)

# ── Pydantic model for validating LLM output ────────────────────────────────
class LegalResponse(BaseModel):
    """Validates the structured JSON output from the LLM."""
    summary: str = Field(default="No summary provided.", description="A brief, clear explanation of the legal answer.")
    docs: list[str] = Field(default_factory=list, description="Relevant legal references")
    lawyer: str = Field(default="General Lawyer", description="Type of lawyer to consult")
    court: str = Field(default="Relevant Court", description="Court or authority")
    steps: list[str] = Field(default_factory=list, description="Step-by-step guidance")


# ── Default model name ──────────────────────────────────────────────────────
DEFAULT_MODEL = "llama3"


def _extract_json(raw_text: str) -> dict[str, Any]:
    """Try to extract a JSON object from the LLM's raw output.

    The LLM sometimes wraps JSON in markdown code fences or adds
    preamble text. This function handles all common cases.
    """
    # Try 1: Direct parse
    try:
        return json.loads(raw_text)
    except json.JSONDecodeError:
        pass

    # Try 2: Extract from markdown code fences ```json ... ```
    fence_match = re.search(r"```(?:json)?\s*\n?(\{.*?\})\s*```", raw_text, re.DOTALL)
    if fence_match:
        try:
            return json.loads(fence_match.group(1))
        except json.JSONDecodeError:
            pass

    # Try 3: Find the first { ... } block
    brace_match = re.search(r"(\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})", raw_text, re.DOTALL)
    if brace_match:
        try:
            return json.loads(brace_match.group(1))
        except json.JSONDecodeError:
            pass

    # All parsing attempts failed
    raise ValueError(f"Could not extract valid JSON from LLM output: {raw_text[:300]}...")


def generate_response(
    system_prompt: str,
    user_prompt: str,
    model: str = DEFAULT_MODEL,
) -> dict[str, Any]:
    """Send a prompt to the local Ollama instance and return structured JSON.

    Args:
        system_prompt: The system-level instructions.
        user_prompt: The user query + retrieved documents.
        model: Ollama model name (default: 'llama3').

    Returns:
        A validated dictionary with keys: docs, lawyer, court, steps.

    Raises:
        RuntimeError: If Ollama is not installed or not running.
    """
    if ollama is None:
        raise RuntimeError(
            "The 'ollama' package is not installed. "
            "Run: pip install ollama"
        )

    logger.info("🟢 Sending prompt to Ollama model '%s'…", model)

    try:
        response = ollama.chat(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            options={
                "temperature": 0.1,      # Low temperature for factual accuracy
                "num_predict": 2048,     # Max tokens for response
            },
        )
    except Exception as exc:
        raise RuntimeError(
            f"Failed to connect to Ollama. Is it running? Error: {exc}"
        ) from exc

    raw_content = response["message"]["content"]
    logger.info("🟢 Received response (%d chars). Parsing JSON…", len(raw_content))

    # Parse and validate
    try:
        parsed = _extract_json(raw_content)
        validated = LegalResponse(**parsed)
        result = validated.model_dump()
        logger.info("🟢 Response validated successfully.")
        return result
    except (ValueError, ValidationError) as exc:
        logger.warning("⚠️  JSON validation failed: %s", exc)
        logger.warning("⚠️  Returning raw text as fallback.")
        return {
            "docs": [],
            "lawyer": "Please consult a qualified lawyer.",
            "court": "Relevant Court",
            "steps": [raw_content],
        }
