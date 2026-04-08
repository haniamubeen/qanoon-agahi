# Features Research: Legal Rights Platform (Pakistan)

## Table Stakes (Must-Haves)

- **Multilingual Input Handling**: Robust transcription and text processing for both Urdu and English.
- **RAG Generation Constraint**: Zero LLM hallucination. If a law isn't in the database, the system must say "I cannot find this in my legal records."
- **Audio Upload Interface**: Universal cross-browser audio recording (handling iOS Safari dictation quirks and Android Chrome).
- **Strict Privacy Mode**: Data never leaves the central local server. Zero analytic callbacks.
- **Legal Disclaimer**: Hardcoded, un-bypassable disclaimer clarifying that the tool is for educational/awareness purposes, not formal legal representation.

## Differentiators

- **Structured Output Mechanism**: Instead of a wall of text, parsing answers into clear categories:
  - Required Documents
  - Type of Lawyer (e.g., Family Court, Criminal, Civil)
  - Appropriate Court/Tribunal
  - Next Steps
- **Urdu-English Cross-Retrieval**: Translating an Urdu query behind the scenes to English if the legal corpus is predominantly in English, then translating the structured answer back into simple Urdu for the user.
- **Ultra-Accessible UI**: Very large buttons, clear iconography, screen-reader friendly design, and potentially text-to-speech (TTS) outputs for illiterate demographics.

## Anti-Features (Deliberately Avoid)

- **Legal Representation**: The system should not write formal petitions, draft legal notices, or act as an advocate. It is an *awareness* tool.
- **Chit-chat / General AI**: Pre-trained behaviors must be removed via system prompting. The bot should refuse non-legal questions entirely.
