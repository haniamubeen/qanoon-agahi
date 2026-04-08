---
wave: 1
depends_on: []
files_modified:
  - "frontend/package.json"
  - "frontend/tailwind.config.js"
  - "frontend/src/App.jsx"
  - "frontend/src/components/InputBar.jsx"
  - "frontend/src/components/StructuredResponse.jsx"
autonomous: true
---

# Phase 1 Plan: UI/UX Prototyping

## Goal
Establish the foundational frontend application, applying the high-accessibility UI specification and creating mock interfaces for text/voice input and structured RAG outputs.

## Requirements Covered
- UIUX-01
- UIUX-03

## Tasks

<task>
<action>
Initialize a Vite React JS application in the `frontend/` directory. Install Tailwind CSS, `lucide-react` for icons, and configure basic ESLint. Clear out the default Vite boilerplates.
</action>
<read_first>
- .planning/phases/01-ui-ux-design/01-UI-SPEC.md
</read_first>
<acceptance_criteria>
- `frontend/package.json` exists with React and Tailwind dependencies.
- `npm run build` runs successfully inside `frontend/`.
- Default Vite CSS is removed.
</acceptance_criteria>
</task>

<task>
<action>
Build the Global Layout and Header component in `frontend/src/App.jsx`. Define the primary colors (Deep Forest Green, Amber) in tailwind config. Include the static "Educational Awareness Only" header banner (COMP-01 mock). ensure background is off-white (#f8fafc).
</action>
<read_first>
- frontend/tailwind.config.js
- .planning/phases/01-ui-ux-design/01-UI-SPEC.md
</read_first>
<acceptance_criteria>
- `App.jsx` renders a fixed header with the disclaimer.
- Tailwind config contains custom color extensions.
</acceptance_criteria>
</task>

<task>
<action>
Build the `InputBar` component (`frontend/src/components/InputBar.jsx`). It must sit fixed at the bottom. It should include a large text input (handling dynamic LTR/RTL typing) and a large Microphone button. Implement visual state mocks (e.g., clicking mic changes it to a pulsing red circle).
</action>
<read_first>
- frontend/src/App.jsx
</read_first>
<acceptance_criteria>
- `InputBar.jsx` exported correctly.
- UI contains a button that toggles a 'recording' CSS pulse state.
- Input supports normal text entry.
</acceptance_criteria>
</task>

<task>
<action>
Build the `StructuredResponse` component (`frontend/src/components/StructuredResponse.jsx`). Create a hardcoded mock UI that displays: 1) A summary paragraph, 2) A checklist grid of "Required Documents", 3) Badges for "Lawyer Type" and "Court", and 4) A vertical timeline for "Next Steps".
</action>
<read_first>
- .planning/phases/01-ui-ux-design/01-UI-SPEC.md
</read_first>
<acceptance_criteria>
- Component renders 4 distinct visual sections using Tailwind card/flex concepts.
- Visually separates information rather than using standard paragraph text.
</acceptance_criteria>
</task>

## Verification
1. Run `npm run dev` in the frontend directory.
2. Ensure the UI renders at `localhost:5173`.
3. Verify the microphone button toggle mechanism is clickable.
4. Verify the StructuredResponse mock displays cleanly on mobile and desktop viewports.
