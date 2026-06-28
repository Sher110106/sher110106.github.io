# Master Website Revamp Plan: Portfolio Transformation
Date: 2026-06-28

## 1. Goal
Complete transformation of the portfolio from a dark-themed, experimental experimental interface to a high-clarity, light-themed, project-centric identity that treats technical writing as a first-class citizen.

## 2. Design Identity
- **Theme:** Full transition from dark theme to a high-contrast, clean light theme.
- **Voice:** Reflective systems-builder. Technical, personal, precise.
- **Reading Mode:** Calmer, serif-inflected typography, narrow-column reading surface.
- **Signature Artifacts:** Use one of these per major project writeup:
  - System diagrams
  - Timeline strips
  - Artifact rails (screenshots/traces/code snippets)

## 3. Scope of Work

### Phase A: Design System Shift
- Update global CSS to a high-contrast light theme.
- Define new type scales (serif for long-form, mono for system elements).
- Update color palette (off-whites, warm greys, sharp accents).

### Phase B: Homepage Redesign
- Redesign the current horizontal panel system to focus on "Projects" as the site backbone.
- Simplify visual framing (cinematic/sci-fi to high-clarity/research-journal).
- Integrate "Field Notes" as a core entrance point on the landing panel.

### Phase C: Field Notes System
- Create the `/writing` (or `/notes`) index.
- Build article templates with:
  - Narrow reading columns.
  - Signature artifact placeholders.
  - Structured content (Pull, Setting, Hard Part, Build, Artifact, Lesson).

### Phase D: Integration
- Link homepage project cards to detailed project Field Notes.
- Add "Related Essays" to project pages.
- Ensure all legacy panels map to the new identity.

## 4. Implementation Roadmap
1. **Design System:** Apply new CSS variables and typography.
2. **Global Components:** Update `ProjectCard`, `ChapterBadge`, and `PixelProgress` to light-theme styles.
3. **Homepage:** Refactor `src/app/page.tsx` panels for clarity.
4. **Field Notes Infrastructure:** Complete `/writing` and template logic.
5. **Content Fill:** Draft initial project essays and artifacts.
6. **Polishing:** Verify cross-site transitions and mobile reading rhythm.
