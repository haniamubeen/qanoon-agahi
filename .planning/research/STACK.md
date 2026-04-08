# Stack Research: Legal Rights Platform (Pakistan)

## Recommended Stack

Given the constraints of 100% local deployment, Urdu/English bilingual support, voice capabilities, and the need for high-privacy RAG matching, here is the recommended robust 2026 stack:

### 1. Application Backend & API
**FastAPI (Python)**
- **Why**: Python is the absolute standard for AI/ML and LangChain/LlamaIndex integration. FastAPI handles the async requests efficiently and integrates seamlessly with local inference libraries.
- **Do not use**: Express.js/Node.js for the core backend, because the ML ecosystem (like Whisper, FAISS, LangChain) runs natively and most reliably in Python.

### 2. Local LLM Runtime
**Ollama or vLLM**
- **Why**: Ollama provides a flawless API for local inference and handles quantization out of the box. vLLM is incredibly fast if you have dedicated server-grade GPUs.
- **Model**: `Llama-3 (8B)` or `Command R (35B)` quantizations fine-tuned for instruction following.

### 3. Speech-to-Text (ASR)
**faster-whisper (Systran) using standard Whisper models**
- **Why**: Runs 4x faster than original OpenAI Whisper. HuggingFace's multilingual Whisper-v3 handles Urdu effectively with acceptable word error rates (WER).
- **Do not use**: Built-in browser SpeechRecognition, because it routes audio to Google/Apple servers, breaking the "no external APIs" privacy constraint.

### 4. Vector Database & Hybrid RAG
**ChromaDB or Qdrant (Local)**
- **Why**: Extremely easy to embed locally in Python without massive standalone infrastructure. Qdrant supports hybrid search (Sparse + Dense) out of the box.
- **Embeddings**: `BAAI/bge-m3` is a state-of-the-art multilingual embedding model capable of aligning Urdu and English semantically.

### 5. Frontend
**Next.js (React) or Vanilla HTML/Vanilla JS with Tailwind**
- **Why**: You requested a simple, highly accessible UI. Next.js offers easy routing. If no complex state is needed, a lightweight Vite React app or Vanilla JS might be even more reliable.

## Confidence
**High**. This stack avoids external APIs completely and uses the strongest open-source AI tooling available.
