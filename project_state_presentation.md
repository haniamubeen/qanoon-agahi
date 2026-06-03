# Legal Rights Awareness Platform (Pakistan) - Comprehensive Project Overview

## 1. Project Vision & Core Value
The Legal Rights Awareness Platform is an AI-powered Web Platform specifically designed for Pakistan. The core mission is to make reliable legal awareness and rights guidance accessible to every Pakistani citizen. It achieves this through an intuitive, privacy-preserving, and 100% locally running system that requires no external dependencies. 

Users of all technical skill levels can ask legal questions in English or Urdu via text or voice, receiving simple, interactive, legally grounded answers, and pragmatic next steps.

## 2. Target Audience & Benefits
- **Target Audience:** The general public in Pakistan, including users who may struggle with complex technology. The system focuses on UX/UI simplicity and large typography.
- **Benefits:**
  - **100% Privacy:** Complete data privacy with zero external API dependencies (air-gapped operation).
  - **Local Language Support:** Allows users to interact natively in Urdu (both text and voice), alongside English.
  - **Structured Actionable Guidance:** Instead of a wall of text, answers are divided into actionable steps: Required Documents, Type of Lawyer to Consult, Appropriate Court, and Step-by-Step Next Actions.
  - **Educational Focus:** Empowers citizens with knowledge of their rights rather than drafting binding legal documents.

## 3. Current Project State
**Current Status:** Phase 1 Completed ✅ (Ready for Phase 2)
Phase 1 focused heavily on establishing a highly accessible visual design language and frontend prototyping. 

**Achievements so far:**
- **UI/UX & Design:** Implemented a pistachio/sage green light mode palette with a modern glassmorphism design.
- **Frontend Pages Developed:**
  - Landing Page (Hero, About, Audience Grid, Features Bento, Testimonials, CTA)
  - Demo Page featuring a chat interface, sidebar, InputBar, and StructuredResponse.
  - About & Team Pages.
  - Authentication Pages (Login, Register with validation, Admin Login).
  - Admin Dashboard featuring statistics cards, bar/doughnut charts, and user tables.
  - Profile Completion 3-step wizard (personal info, location, preferences).
- **Navigation:** Fully responsive Navbar with dark mode toggle and Footer.

## 4. Feature Scope
### Active v1 Features (In Progress / Roadmap)
- Text and voice input for legal questions in English and Urdu.
- Local ASR (e.g., faster-whisper) for transcription of voice notes.
- Hybrid RAG (Retrieval-Augmented Generation) combining keyword and semantic search over a local vector database.
- A local Open-Source LLM (e.g., Llama-3) that generates answers strictly constrained to the retrieved context (zero hallucinations).
- Query translation routing to match Urdu queries to formal English legal texts.

### Future v2 Features
- Local user accounts to save previous queries.
- Admin dashboard tracking frequently asked localized queries.

### Out of Scope
- **Legal Document Drafting:** The platform is for awareness, not drafting reliable legal petitions that could backfire if incorrect.
- **Third-party AI APIs (e.g., OpenAI, Claude):** Absolute breach of the project's strict privacy and 100% local operation constraints.
- **Native iOS/Android Apps:** Focus is on a responsive web platform to ensure broad and immediate accessibility.

## 5. Technical Structure & Constraints
- **Infrastructure:** Central Local Server deployment. End-users access the application via a standard web browser.
- **Backend Architecture:** FastAPI backend for asynchronous API services.
- **AI & RAG Engine:** 
  - Local Vector Database (ChromaDB or Qdrant).
  - Dense/Sparse retrieval pipeline for local corpus (Pakistani Constitution, FAQs).
  - Offline LLM inference using `Ollama` or `vLLM`.
- **Frontend:** React/Next.js (or Vanilla Web) focusing on accessibility and structural presentation.

## 6. Future Scope & Roadmap
The project will evolve through the following structured phases:
- **Phase 2: Local Knowledge Base & RAG Infrastructure:** Setting up the vector database, ingesting the legal corpus, and validating retrieval algorithms.
- **Phase 3: Local LLM Integration & Structured Prompts:** Hooking up the local LLM, building the LangChain/LlamaIndex pipeline, and enforcing strict defensive system prompts.
- **Phase 4: Core API Service & Frontend Wiring:** Creating a 100% local FastAPI service, connecting the frontend to the backend, and implementing compliance constraints.
- **Phase 5: Voice Support Integration:** Adding local ASR (faster-whisper) to process offline audio transcription for English and Urdu.
- **Phase 6: Query Translation Router:** Adding a translation hop to perfect Urdu-to-English legal matching before retrieval.
