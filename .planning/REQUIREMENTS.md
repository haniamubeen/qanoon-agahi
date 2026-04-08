# Requirements: Legal Rights Awareness Platform (Pakistan)

**Defined:** 2026-04-07
**Core Value:** Making reliable legal awareness and rights guidance accessible to every Pakistani citizen through an intuitive, privacy-preserving local platform.

## v1 Requirements

### Input & Output (IO)

- [ ] **IO-01**: User can submit a legal question using text input in English.
- [ ] **IO-02**: User can submit a legal question using text input in Urdu.
- [ ] **IO-03**: User can record and upload a voice message in English or Urdu directly from the web browser.
- [ ] **IO-04**: System successfully transcribes Urdu and English voice notes using local ASR (e.g., faster-whisper).
- [ ] **IO-05**: System plays a gentle error message if audio transcription fails or is unintelligible.

### AI & Retrieval Engine (AIRG)

- [ ] **AIRG-01**: System formalizes/translates colloquial user queries before attempting database retrieval to improve accuracy.
- [ ] **AIRG-02**: System searches the local Vector Database (ChromaDB/Qdrant) using both keyword and semantic algorithms to find relevant laws/FAQs.
- [ ] **AIRG-03**: System uses a strict System Prompt ensuring the LLM relies entirely on the retrieved context.
- [ ] **AIRG-04**: If no relevant law is retrieved, the LLM refuses to answer and states "I cannot find this in my records."
- [ ] **AIRG-05**: The LLM output provides categorized, structured advice (Required Documents, Type of Lawyer, Appropriate Court, Next Steps).

### User Interface & Experience (UIUX)

- [ ] **UIUX-01**: Interface incorporates very large typography and highly visible, accessible components.
- [ ] **UIUX-02**: Micro-interactions provide clear visual feedback when audio is recording and when transcription is in progress.
- [ ] **UIUX-03**: The response visually separates the text into categorized blocks (Docs, Lawyer, Court, Steps) rather than a wall of prose.

### Compliance & Security (COMP)

- [ ] **COMP-01**: Platform embeds a hardcoded disclaimer stating it provides educational legal awareness, not formal legal counsel.
- [ ] **COMP-02**: The entire application (FastAPI + LLM + Vector DB + Frontend) operates air-gapped without making outbound HTTP requests to external APIs.

## v2 Requirements

### Analytics & Accounts

- **V2-01**: Users can create basic local accounts to save their previous queries.
- **V2-02**: Server admin dashboard for tracking most frequently asked localized queries.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Legal Document Drafting | The platform is for awareness, not drafting reliable legal petitions that could backfire if incorrect. |
| Third-party AI APIS (OpenAI) | Absolute breach of the project's strict privacy and 100% local operation constraints. |
| Native iOS/Android apps | Building a Web platform first is quicker and still accessible on mobile browsers. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| IO-01 | Phase 4 | Pending |
| IO-02 | Phase 4 | Pending |
| IO-03 | Phase 5 | Pending |
| IO-04 | Phase 5 | Pending |
| IO-05 | Phase 5 | Pending |
| AIRG-01 | Phase 6 | Pending |
| AIRG-02 | Phase 2 | Pending |
| AIRG-03 | Phase 3 | Pending |
| AIRG-04 | Phase 3 | Pending |
| AIRG-05 | Phase 3 | Pending |
| UIUX-01 | Phase 1 | Pending |
| UIUX-02 | Phase 5 | Pending |
| UIUX-03 | Phase 1 | Pending |
| COMP-01 | Phase 4 | Pending |
| COMP-02 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 15 total
- Mapped to phases: 15
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-07*
*Last updated: 2026-04-07 after roadmap reshuffle*
