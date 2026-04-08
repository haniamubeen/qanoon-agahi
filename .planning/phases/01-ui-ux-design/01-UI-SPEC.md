# UI Design Contract: Phase 1

## Brand & Aesthetics
- **Theme:** "Accessible Trust"
- **Colors:**
  - Primary: Deep Forest Green (#134e4a) - Conveys law, trust, Pakistan.
  - Background: Off-white/Cream (#f8fafc) - Reduces eye strain vs pure white.
  - Accelerators: Vibrant Amber (#d97706) - High contrast call-to-actions.
- **Typography:** System fonts, bumped up to base `18px`.
- **RTL:** Full support for Urdu typography (Noto Nastaliq Urdu if possible, otherwise system sans).

## Core Layout
A centered conversational interface, similar to a simplified messaging app but with strict visual structure.
- **Header:** Title + "Educational Awareness Only" static banner.
- **Chat Feed:** 
  - User messages (Right/Left depending on language).
  - AI responses (Structured Cards).
- **Input Bar:** Fixed at bottom. Large textarea + Prominent Microphone Button.

## Component Specifications

### 1. The Voice Button
- **Default:** Large, rounded, microphone icon.
- **Recording State:** Red pulse animation, timer counting up, "Tap to Stop" instruction.
- **Processing State:** Spinning indicator, "Transcribing..." text.

### 2. Structured Response Card
An AI response must never be flat text. It is a flex container holding:
1. **Preamble:** Summary sentence.
2. **Docs Grid:** 2-column list with checkmark icons.
3. **Lawyer/Court Block:** High contrast pills/badges.
4. **Action Timeline:** Vertical line with numbered steps.

## Accessibility Requirements
- All interactive elements minimum `48x48px` hit area.
- Minimum `WCAG AA` contrast ratio for all text.
- Screen-reader tags on the structure (e.g. `aria-label="Required Documents"`).
