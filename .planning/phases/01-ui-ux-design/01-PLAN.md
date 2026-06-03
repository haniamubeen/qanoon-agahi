---
wave: 1
depends_on: []
files_modified:
  - "frontend/package.json"
  - "frontend/tailwind.config.js"
  - "frontend/src/App.jsx"
  - "frontend/src/main.jsx"
  - "frontend/src/pages/LandingPage.jsx"
  - "frontend/src/pages/DemoPage.jsx"
  - "frontend/src/pages/AuthPages.jsx"
  - "frontend/src/components/InputBar.jsx"
  - "frontend/src/components/StructuredResponse.jsx"
autonomous: true
---

# Phase 1 Plan: Multi-page UI/UX Prototyping

## Goal
Establish the foundational frontend application for "AI Legal Right Awareness". Build a comprehensive landing page, a demo page showcasing the conversational AI interface, and required authentication shells, adhering to the "AI Legal Tech" design tokens.

## Tasks

<task>
<action>
Initialize a Vite React JS application in `frontend/`. Install Tailwind CSS, `react-router-dom`, `lucide-react`, and configure ESLint. Set up basic routing in `main.jsx` / `App.jsx` with routes for `/`, `/demo`, `/login`, `/register`, and `/admin-login`.
</action>
<read_first>
- .planning/phases/01-ui-ux-design/01-UI-SPEC.md
</read_first>
<acceptance_criteria>
- `package.json` includes `react-router-dom` and Tailwind dependencies.
- React Router is successfully mounted and renders a placeholder for each route.
</acceptance_criteria>
</task>

<task>
<action>
Build the Global Navigation Bar and Footer. Navbar must be sticky with a glassmorphism effect and appropriate links/CTAs. Footer must include a full-width "AI Transparency & Data Privacy" block. Apply design tokens (Deep Navy, Tech Blue) in `tailwind.config.js`.
</action>
<read_first>
- .planning/phases/01-ui-ux-design/01-CONTEXT.md
</read_first>
<acceptance_criteria>
- Navbar and Footer are rendered on all pages (or conditionally via a Layout component).
</acceptance_criteria>
</task>

<task>
<action>
Build the `LandingPage` component consisting of 7 sections: Hero, About, Target Audience Grid, Features Zig-Zag/Bento, Social Proof Stats, Testimonials, and Bottom CTA. Implement standard Tailwind micro-interactions (hover, active:scale-95).
</action>
<read_first>
- .planning/phases/01-ui-ux-design/01-CONTEXT.md
</read_first>
<acceptance_criteria>
- Landing page visually matches the 7 requested sections with correct color palette.
</acceptance_criteria>
</task>

<task>
<action>
Build the `DemoPage` component. This will host the chat interface. Create the `InputBar` (textarea + mic button with mock recording states) and `StructuredResponse` card (4 parts: Preamble, Docs Grid, Lawyer/Court Block, Timeline).
</action>
<read_first>
- .planning/phases/01-ui-ux-design/01-UI-SPEC.md
</read_first>
<acceptance_criteria>
- Demo page shows a mockup of an AI conversation using the structured response format.
</acceptance_criteria>
</task>

<task>
<action>
Build simple mocked `AuthPages` for User Login, User Registration, and Admin Login.
</action>
<read_first>
- .planning/phases/01-ui-ux-design/01-CONTEXT.md
</read_first>
<acceptance_criteria>
- Forms render correctly with inputs for email/password and modern "AI Legal Tech" styling.
</acceptance_criteria>
</task>
