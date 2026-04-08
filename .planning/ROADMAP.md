# Roadmap: Legal Rights Awareness Platform (Pakistan)

## Phase 1: UI/UX Design & Frontend Prototyping
**Goal:** Establish the highly accessible visual design language, component library, and mock up the web interface before any backend wiring.
**Requirements Included:** UIUX-01, UIUX-03
**Key Steps:**
- Design the ultra-accessible UI (large typography, clear structure).
- Build the foundational Web Application (React/Next.js or Vanilla Web) with mocked structured responses.
- Implement categorized blocks for Docs, Lawyer, Court, and Steps visually.

## Phase 2: Local Knowledge Base & RAG Infrastructure
**Goal:** Setup vector database, insert the Pakistani Constitution/FAQ corpus, and map the foundational dense/sparse retrieval pipeline.
**Requirements Included:** AIRG-02
**Key Steps:**
- Install Qdrant or ChromaDB locally.
- Build ingestion scripts for PDFs/Text (Constitution, FAQs).
- Validate keyword and semantic retrieval on sample test queries.

## Phase 3: Local LLM Integration & Structured Prompts
**Goal:** Hook up Llama-3/local LLM with the retrieval engine and apply strict defensive system prompts.
**Requirements Included:** AIRG-03, AIRG-04, AIRG-05
**Key Steps:**
- Deploy `Ollama` or `vLLM`.
- Build the LangChain/LlamaIndex chain that enforces zero hallucinations.
- Build the structured prompt extractor to force output into Docs, Lawyer, Court, and Steps.

## Phase 4: Core API Service & Frontend Wiring
**Goal:** Wrap the RAG capabilities behind an asynchronous API service running 100% locally and connect it to the Phase 1 UI.
**Requirements Included:** COMP-01, COMP-02, IO-01, IO-02
**Key Steps:**
- Setup FastAPI server with `/api/query/text` endpoint.
- Connect the React/Frontend UI to the real backend.
- Ensure strict CORS, local listener setup, and un-bypassable Legal Disclaimer.

## Phase 5: Voice Support Integration
**Goal:** Incorporate local ASR allowing users to record and upload voice notes interactively.
**Requirements Included:** IO-03, IO-04, IO-05, UIUX-02
**Key Steps:**
- Add frontend media recording capabilities with visual micro-interactions.
- Create `/api/query/audio` endpoint in FastAPI.
- Integrate `faster-whisper` for offline English/Urdu transcription.

## Phase 6: Query Translation Router & Refinement
**Goal:** Perfect the Urdu query to English legal corpus matching.
**Requirements Included:** AIRG-01
**Key Steps:**
- Insert an LLM translation hop before vector retrieval for Urdu queries to ensure high semantic matching with formal legal English text.
