"""
search.py – Hybrid search engine for the Qanoon Agahi legal RAG pipeline.

Combines **dense** retrieval (ChromaDB + SentenceTransformer) with **sparse**
retrieval (BM25) and fuses them via Reciprocal Rank Fusion (RRF).

Usage::

    from config import get_config
    from retrieval.search import HybridSearchEngine

    engine = HybridSearchEngine(get_config())
    results = engine.search("How to register an FIR?", top_k=5)
"""

from __future__ import annotations

import logging
import re
from typing import Any

import chromadb
from rank_bm25 import BM25Okapi
from sentence_transformers import SentenceTransformer

# ── Logging ──────────────────────────────────────────────────────────────────
logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="\033[92m%(asctime)s\033[0m │ %(levelname)-8s │ %(message)s",
    datefmt="%H:%M:%S",
)


def _tokenize(text: str) -> list[str]:
    """Lowercase whitespace + punctuation tokenizer (works for EN & Urdu)."""
    return re.findall(r"\w+", text.lower())


class HybridSearchEngine:
    """Unified dense + sparse retriever over the Pakistan legal corpus.

    Parameters
    ----------
    config : Config
        The project-wide ``Config`` dataclass instance (from ``get_config()``).
    """

    # ------------------------------------------------------------------ #
    #                         Initialisation                              #
    # ------------------------------------------------------------------ #
    def __init__(self, config: Any) -> None:
        self._cfg = config

        # ── ChromaDB persistent client & collection ──────────────────────
        logger.info("🟢 Connecting to ChromaDB at %s …", config.CHROMA_DB_DIR)
        self._client = chromadb.PersistentClient(path=str(config.CHROMA_DB_DIR))
        self._collection = self._client.get_or_create_collection(
            name="pakistan_legal_corpus",
        )

        # ── SentenceTransformer embedding model ──────────────────────────
        logger.info("🟢 Loading embedding model: %s …", config.EMBEDDING_MODEL)
        self._embedder = SentenceTransformer(config.EMBEDDING_MODEL)

        # ── Build BM25 index from stored documents ───────────────────────
        self._build_bm25_index()

    # ------------------------------------------------------------------ #
    #                       BM25 index builder                            #
    # ------------------------------------------------------------------ #
    def _build_bm25_index(self) -> None:
        """Fetch every document from ChromaDB and build an in-memory BM25 index."""
        logger.info("🟢 Building BM25 sparse index …")
        all_docs = self._collection.get(include=["documents", "metadatas"])

        self._doc_ids: list[str] = all_docs["ids"]
        self._doc_texts: list[str] = all_docs["documents"] or []
        self._doc_metadatas: list[dict] = all_docs["metadatas"] or []

        if not self._doc_texts:
            logger.warning(
                "⚠️  Collection is empty – BM25 index will be a no-op until "
                "documents are ingested."
            )
            self._bm25: BM25Okapi | None = None
            return

        tokenized_corpus = [_tokenize(doc) for doc in self._doc_texts]
        self._bm25 = BM25Okapi(tokenized_corpus)
        logger.info(
            "🟢 BM25 index ready – %d documents indexed.", len(self._doc_texts)
        )

    # ------------------------------------------------------------------ #
    #                        Dense (semantic) search                       #
    # ------------------------------------------------------------------ #
    def dense_search(self, query: str, top_k: int = 10) -> list[dict]:
        """Run a pure ChromaDB semantic search.

        Parameters
        ----------
        query : str
            The natural-language query string.
        top_k : int
            Maximum number of results to return.

        Returns
        -------
        list[dict]
            Each dict has keys ``text``, ``metadata``, ``score``, ``source``.
        """
        query_embedding = self._embedder.encode(query).tolist()
        results = self._collection.query(
            query_embeddings=[query_embedding],
            n_results=min(top_k, max(len(self._doc_ids), 1)),
            include=["documents", "metadatas", "distances"],
        )

        hits: list[dict] = []
        for doc, meta, dist in zip(
            results["documents"][0],
            results["metadatas"][0],
            results["distances"][0],
        ):
            hits.append(
                {
                    "text": doc,
                    "metadata": meta,
                    "score": 1.0 - dist,          # cosine distance → similarity
                    "source": meta.get("source", "unknown"),
                }
            )
        return hits

    # ------------------------------------------------------------------ #
    #                        Sparse (BM25) search                         #
    # ------------------------------------------------------------------ #
    def sparse_search(self, query: str, top_k: int = 10) -> list[dict]:
        """Run a pure BM25 keyword search.

        Parameters
        ----------
        query : str
            The natural-language query string.
        top_k : int
            Maximum number of results to return.

        Returns
        -------
        list[dict]
            Each dict has keys ``text``, ``metadata``, ``score``, ``source``.
        """
        if self._bm25 is None:
            logger.warning("BM25 index is empty – returning no results.")
            return []

        tokenized_query = _tokenize(query)
        raw_scores = self._bm25.get_scores(tokenized_query)

        # Pair scores with indices, sort descending, pick top_k
        scored_indices = sorted(
            enumerate(raw_scores), key=lambda x: x[1], reverse=True
        )[:top_k]

        hits: list[dict] = []
        for idx, score in scored_indices:
            if score <= 0:
                continue
            meta = self._doc_metadatas[idx] if idx < len(self._doc_metadatas) else {}
            hits.append(
                {
                    "text": self._doc_texts[idx],
                    "metadata": meta,
                    "score": float(score),
                    "source": meta.get("source", "unknown"),
                }
            )
        return hits

    # ------------------------------------------------------------------ #
    #                Reciprocal Rank Fusion (RRF)                         #
    # ------------------------------------------------------------------ #
    @staticmethod
    def _rrf_score(rank: int, k: int = 60) -> float:
        """Compute a single RRF contribution: ``1 / (k + rank)``."""
        return 1.0 / (k + rank)

    # ------------------------------------------------------------------ #
    #                     Hybrid (fused) search                           #
    # ------------------------------------------------------------------ #
    def search(self, query: str, top_k: int = 5) -> list[dict]:
        """Run hybrid dense + sparse search with Reciprocal Rank Fusion.

        Parameters
        ----------
        query : str
            The natural-language query string.
        top_k : int
            Maximum number of fused results to return.

        Returns
        -------
        list[dict]
            Each dict has keys ``text``, ``metadata``, ``score``, ``source``.
        """
        rrf_k: int = getattr(self._cfg, "RRF_K", 60)
        dense_weight: float = self._cfg.DENSE_WEIGHT
        bm25_weight: float = self._cfg.BM25_WEIGHT

        # Retrieve broader candidate pools for fusion
        pool_size = top_k * 3
        dense_hits = self.dense_search(query, top_k=pool_size)
        sparse_hits = self.sparse_search(query, top_k=pool_size)

        # ── Build per-text RRF accumulator ───────────────────────────────
        # Key = document text (unique enough for fusion)
        rrf_scores: dict[str, float] = {}
        hit_lookup: dict[str, dict] = {}

        for rank, hit in enumerate(dense_hits, start=1):
            key = hit["text"]
            rrf_scores[key] = rrf_scores.get(key, 0.0) + (
                dense_weight * self._rrf_score(rank, k=rrf_k)
            )
            hit_lookup.setdefault(key, hit)

        for rank, hit in enumerate(sparse_hits, start=1):
            key = hit["text"]
            rrf_scores[key] = rrf_scores.get(key, 0.0) + (
                bm25_weight * self._rrf_score(rank, k=rrf_k)
            )
            hit_lookup.setdefault(key, hit)

        # ── Sort by fused score and trim to top_k ────────────────────────
        ranked = sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)[
            :top_k
        ]

        results: list[dict] = []
        for text, fused_score in ranked:
            entry = hit_lookup[text].copy()
            entry["score"] = round(fused_score, 6)
            results.append(entry)

        logger.info(
            "🟢 Hybrid search complete – %d results for: %.60s…",
            len(results),
            query,
        )
        return results
