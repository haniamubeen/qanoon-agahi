# Pitfalls Research: Legal Rights Platform (Pakistan)

## Critical Mistakes & Risks

### 1. The Language & Embedding Gap
**The Pitfall**: Native Pakistani legal text is highly formal (often archaic English). User queries will be colloquial Urdu or Roman Urdu. Standard embedding models will struggle to match colloquial Urdu syntax with archaic English legal statutes.
**Prevention**: Implement query rewriting. The orchestrator should first use the LLM to cleanly translate and formalize the user's query into English before querying the vector database.
**Phase Mapping**: Must be addressed during the Knowledge Base and RAG Phase.

### 2. Hallucinating Non-Existent Laws
**The Pitfall**: Llama-3 and similar models inherently "know" US or UK law from their training data. When asked about Pakistani law, they might subtly mix in foreign legal principles.
**Prevention**: Highly defensive system prompts. E.g., `You are a legal assistant. If the strict context provided below does not contain the answer, you must output entirely "I cannot find the answer in the provided Pakistani laws." Do not use outside knowledge.`
**Phase Mapping**: RAG Generation Phase.

### 3. Server Hardware Exhaustion
**The Pitfall**: Running an LLM (8B+ parameters) and Whisper concurrently on a local server takes at least 12-16GB of VRAM (GPU). If multiple users query at once, the server crashes via OOM (Out of Memory).
**Prevention**: Use an Inference Engine that batches requests (like vLLM) and ensure models are quantized (4-bit or 8-bit). Ensure Whisper is offloaded properly or unloaded between requests if VRAM is extremely tight.
**Phase Mapping**: Deployment & Architecture Phase.

### 4. Poor Audio Quality in Rural Demographics
**The Pitfall**: Voice notes recorded on low-end smartphones with background noise will transcribe poorly.
**Prevention**: Use a robust Whisper model size (at least `base` or `small`). Prompt the user gently if transcription fails: "We couldn't hear that clearly, please try again."
**Phase Mapping**: Voice Integration Phase.
