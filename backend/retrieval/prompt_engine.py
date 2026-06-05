"""
prompt_engine.py – Builds strict RAG prompts for the Qanoon Agahi legal assistant.

Combines retrieved legal chunks with a carefully engineered system prompt that
forces the LLM to output structured JSON with zero hallucinations.
"""

from __future__ import annotations
from typing import Any


SYSTEM_PROMPT = """You are **Qanoon Agahi**, a legal rights awareness assistant for Pakistani citizens.

Your ONLY job is to help users understand their legal rights based on the provided legal documents.

## STRICT RULES:
1. You MUST answer ONLY using information from the LEGAL DOCUMENTS provided below.
2. If the answer is NOT in the provided documents, say: "I could not find relevant information in my legal database for this query. Please consult a qualified lawyer."
3. NEVER invent, guess, or hallucinate any law, section number, or legal procedure.
4. Always cite the specific document source when referencing a law.
5. Support both English and Urdu queries. Respond in the same language as the query.

## OUTPUT FORMAT:
You MUST respond with valid JSON only. No markdown, no explanation outside the JSON.
The JSON must have exactly these 5 keys:

{
  "summary": "A 2-3 sentence clear explanation of the legal answer to the user's question.",
  "docs": ["Family Courts Act 1964", "Pakistan Penal Code Section 379"],
  "lawyer": "Type of lawyer the user should consult (e.g., 'Criminal Lawyer', 'Family Lawyer', 'Property / Civil Lawyer')",
  "court": "The relevant court or authority (e.g., 'Family Court', 'Sessions Court', 'Civil Court')",
  "steps": ["Step-by-step practical guidance for the user to take action"]
}

IMPORTANT: Output ONLY the JSON object. No text before or after it."""


def build_prompt(query: str, retrieved_docs: list[dict[str, Any]]) -> tuple[str, str]:
    """Build the system + user prompt for the LLM.

    Args:
        query: The user's original legal question.
        retrieved_docs: List of dicts from HybridSearchEngine.search(),
            each containing 'text', 'metadata', 'score', 'source'.

    Returns:
        A tuple of (system_prompt, user_prompt).
    """
    # Format retrieved documents into numbered context blocks
    context_parts: list[str] = []
    for i, doc in enumerate(retrieved_docs, start=1):
        source = doc.get("source", "Unknown")
        score = doc.get("score", 0.0)
        text = doc.get("text", "")
        metadata = doc.get("metadata", {})
        doc_type = metadata.get("type", "document")
        domain = metadata.get("legal_domain", "")

        header = f"[Document {i}] Source: {source}"
        if domain:
            header += f" | Domain: {domain}"
        header += f" | Relevance: {score:.4f} | Type: {doc_type}"

        context_parts.append(f"{header}\n{text}")

    context_block = "\n\n---\n\n".join(context_parts)

    user_prompt = (
        f"## LEGAL DOCUMENTS (use ONLY these to answer):\n\n"
        f"{context_block}\n\n"
        f"---\n\n"
        f"## USER QUESTION:\n{query}\n\n"
        f"Respond with the JSON object now."
    )

    return SYSTEM_PROMPT, user_prompt
