"""
server.py – FastAPI backend for the Qanoon Agahi Legal RAG Platform.

Run with:  uvicorn api.server:app --reload --host 0.0.0.0 --port 8000
"""

from __future__ import annotations

import sys
import logging
from pathlib import Path

# Ensure backend root is importable
_BACKEND_DIR = Path(__file__).resolve().parent.parent
if str(_BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(_BACKEND_DIR))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from pipeline import run_rag_pipeline

# ── Logging ──────────────────────────────────────────────────────────────────
logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="\033[92m%(asctime)s\033[0m │ %(levelname)-8s │ %(message)s",
    datefmt="%H:%M:%S",
)

# ── FastAPI App ──────────────────────────────────────────────────────────────
app = FastAPI(
    title="Qanoon Agahi API",
    description="Local, privacy-first legal rights awareness API for Pakistani citizens.",
    version="1.0.0",
)

# ── CORS ─────────────────────────────────────────────────────────────────────
# Allow the React/Vite frontend running on common dev ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",    # Vite default
        "http://localhost:3000",    # CRA / Next.js default
        "http://localhost:4173",    # Vite preview
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request / Response Models ────────────────────────────────────────────────
class QueryRequest(BaseModel):
    """Payload sent by the frontend."""
    query: str = Field(..., min_length=1, max_length=500, description="Legal question in English or Urdu")


class LegalResponseModel(BaseModel):
    """Structured legal response returned to the frontend."""
    summary: str = ""
    docs: list[str] = []
    lawyer: str = ""
    court: str = ""
    steps: list[str] = []


class QueryResponse(BaseModel):
    """Full API response wrapper."""
    success: bool = True
    data: LegalResponseModel
    query: str


# ── Endpoints ────────────────────────────────────────────────────────────────
@app.get("/health")
async def health_check():
    """Simple health check to verify the server is running."""
    return {"status": "ok", "service": "Qanoon Agahi API", "version": "1.0.0"}


@app.post("/api/query/text", response_model=QueryResponse)
async def query_text(request: QueryRequest):
    """Process a legal text query through the RAG pipeline.

    Receives a user question, retrieves relevant legal documents,
    sends them to the local LLM, and returns a structured response.
    """
    logger.info("Received query: %s", request.query)

    try:
        result = run_rag_pipeline(request.query)

        return QueryResponse(
            success=True,
            data=LegalResponseModel(**result),
            query=request.query,
        )
    except Exception as exc:
        logger.error("Pipeline error: %s", exc, exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred processing your query: {str(exc)}",
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api.server:app", host="0.0.0.0", port=8000, reload=True)
