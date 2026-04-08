# Legal Rights Awareness Platform (Pakistan)

## What This Is

An AI-powered Legal Rights Awareness Web Platform for Pakistan. It allows users of all technical skill levels to ask legal questions in English or Urdu using text or voice. The platform provides simple, interactive, legally grounded answers and pragmatic next steps without relying on any external APIs.

## Core Value

Making reliable legal awareness and rights guidance accessible to every Pakistani citizen through an intuitive, privacy-preserving local platform.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] User can submit legal questions via text in English or Urdu
- [ ] User can submit legal questions via voice in English or Urdu
- [ ] System locally processes and transcribes Urdu and English voice queries
- [ ] System categorizes user queries into specific legal domains
- [ ] System retrieves laws and FAQs from a custom local Pakistani legal corpus using a Hybrid RAG methodology (keyword + semantic search)
- [ ] Local Open-Source LLM generates conversational, easy-to-understand answers constrained entirely to the retrieved context
- [ ] System returns structured actionable guidance including: required documents, type of lawyer to consult, appropriate court, and step-by-step next actions
- [ ] Web application features a highly interactive, accessible, and simple UI specifically designed for non-technical demographics

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- External AI APIs (e.g., OpenAI, Claude) — Strictly against privacy and control constraints; must run 100% locally
- Cloud Hosting — Application will be deployed on a central local server for institutional control
- Native Mobile App — Focused on a responsive Web Platform first to ensure broad accessibility

## Context

- Target audience encompasses the general public in Pakistan, including many users who may struggle with complex technology, necessitating a hyper-focus on UX and UI simplicity.
- The knowledge base relies on a locally installed dataset encompassing the Pakistani Constitution, various local corpora, and an interconnected structured FAQ dataset mapped explicitly to legal sections. This dataset acts as the foundation for training, retrieval, and system evaluation.
- Application serves as an interactive awareness tool, distinct from practicing law, focusing on guidance and structured next steps.

## Constraints

- **Infrastructure**: Must run on a Central Local Server where users can access the application via a standard web browser.
- **Compute Capability**: System architecture heavily relies on local inferencing capabilities for the LLM, vector database searches, and ASR (Automatic Speech Recognition for Urdu/English).
- **Security/Privacy**: 100% data privacy capability. Zero dependencies on external web services during runtime.

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Local Open-Source LLM with RAG | Ensures no data leaks to third parties while delivering high-quality summarization confined to real legal texts | — Pending |
| Central Local Server Deployment | Centralizes heavy compute needs (GPU) so end users only need a standard web browser to access the tool | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-07 after initialization*
