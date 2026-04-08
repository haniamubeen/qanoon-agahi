# Architecture Research: Legal Rights Platform (Pakistan)

## Component Boundaries

1. **Web Frontend (Client)**
   - Responsible strictly for user interaction (text input, recording audio).
   - Manages state for chat history and rendering structured output visually.

2. **API Gateway & Orchestrator (FastAPI)**
   - Receives audio blobs or text strings.
   - Routes audio to the ASR service.
   - Orchestrates the RAG pipeline.

3. **Inference & RAG Engine**
   - **Retriever**: Queries VectorDB using keyword (BM25) and Semantic search.
   - **Knowledge Base**: The indexed corpus of the Constitution of Pakistan and structured legal FAQs.
   - **Generator**: The LLM constrained entirely by a strict system prompt overriding its world-knowledge with the retrieved context.

4. **Audio Engine / ASR**
   - Processes WAV/WEBM uploads, returning Unicode strings (Urdu or English).

## Data Flow

1. User records a voice message in Urdu.
2. Web Frontend posts the audio blob to the FastAPI `/api/ask` endpoint.
3. `faster-whisper` decodes the audio to Urdu text.
4. RAG engine embeds the text query and queries Qdrant/Chroma vector DB.
5. Top-k relevant laws and FAQs are retrieved.
6. A system prompt is constructed containing the retrieved text and the constraint to extract required documents, lawyer type, and court.
7. Local LLM receives the prompt and streams the finalized advice back.
8. FastAPI streams result back to the frontend.

## Suggested Build Order

1. **Phase 1: Knowledge Base and RAG Validation**
   - Setup Vector DB. Populate with sample Pakistani laws and FAQs.
   - Validate that retrieving queries works for both English and Urdu test queries.
2. **Phase 2: RAG Generation**
   - Connect Local LLM. Hardcode prompts to generate structured outputs.
3. **Phase 3: Web Client (Text baseline)**
   - Build FastAPI router and the Web UI. Verify text-based chat.
4. **Phase 4: Voice Integration**
   - Add Audio Recorder in UI. Integrate `faster-whisper`.
