# Phase 1: Research

**Domain:** UI/UX Design and Frontend Prototyping
**Focus:** Ultra-accessible legal awareness platform (English/Urdu)

## Context
The platform strictly targets the general Pakistani public, including users with low technology literacy. The interface must be obvious, prevent errors, handle multilingual layout switching (LTR for English, RTL for Urdu), and clearly separate complex legal AI output into readable blocks.

## Findings

1. **State Management for Voice**: 
   Micro-interactions for voice recording (Pulse effect while recording, "Processing" spinner during ASR) are complex to orchestrate in vanilla JS. React (via Vite) provides the perfect component-level state isolation required for this.

2. **Multilingual Accessibility (RTL Support)**:
   Urdu requires Right-To-Left (RTL) text direction. TailwindCSS handles this well via `dir="rtl"` attribute and logical properties (`ps-4` instead of `pl-4`). We must build the input box to dynamically switch reading direction based on character detection or a manual toggle.

3. **Visual Data Grouping (The Output)**:
   A wall of legal text is intimidating. The AI's structured output must map cleanly to distinct UI cards:
   - 📄 Required Documents (Checklist style)
   - 👨‍⚖️ Lawyer Type (Badge style)
   - 🏛️ Appropriate Court (Location pin style)
   - 👣 Next Steps (Numbered timeline)

## Verdict
- **Stack:** React 18 + Vite + Tailwind CSS + Lucide React (for clear, universally recognized iconography).
- **Styling:** High-contrast color palette, base font size of 18px (Tailwind `text-lg` as default instead of `text-base`), heavily rounded tactile buttons.
