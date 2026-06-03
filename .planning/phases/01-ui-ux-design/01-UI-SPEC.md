# UI Design Contract: Phase 1 (AI Legal Right Awareness)

## Brand & Aesthetics
- **Theme:** "AI Legal Tech" (Professional trustworthiness mixed with modern AI startup minimalism).
- **Colors:**
  - Backgrounds: Clean white (`#ffffff`) for primary sections, subtle slate/cool gray (`#f8fafc` or `#f1f5f9`) for alternating sections.
  - Primary Brand: Deep Navy/Slate (`#0f172a` or `#1e3a8a`) for main headings, text, and footer.
  - Accent/AI Color: Vibrant Tech Blue (`#2563eb`) or subtle Indigo (`#4f46e5`) for CTA buttons, icons, and highlights.
- **Typography:** `Inter`, `Plus Jakarta Sans`, or `Geist`. Headings bold with tight tracking; body text airy with generous line height.
- **Styling:** Clean lines, subtle borders (`border-slate-200`), soft drop shadows (`shadow-sm` resting, `shadow-md` hover), and rounded corners (`rounded-xl` or `rounded-2xl`) for cards. Consistent icons via `lucide-react`.

## Core Layout (Demo Page Chat Feed)
- **Header:** "Educational Awareness Only" static banner.
- **Chat Feed:** User messages vs AI responses (Structured Cards).
- **Input Bar:** Fixed at bottom. Large textarea + Prominent Microphone Button.

## Component Specifications (Chat Interface)
### 1. The Voice Button
- **Default:** Large, rounded, microphone icon.
- **Recording State:** Red pulse animation, timer counting up.
- **Processing State:** Spinning indicator.

### 2. Structured Response Card
An AI response must never be flat text. Flex container holding:
1. Preamble (Summary sentence).
2. Docs Grid (2-column list with checkmarks).
3. Lawyer/Court Block (Badges).
4. Action Timeline (Vertical line with numbered steps).

## Animations & Micro-Interactions
- **Scroll Reveal:** Elements gently fade in and slide up (`y: 20` to `y: 0`) on scroll.
- **Buttons:** Active scale-down (`active:scale-95`) and smooth color transitions on hover.
