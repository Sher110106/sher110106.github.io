# Portfolio Redesign — Design Spec

**Date:** 2026-05-15  
**Status:** Design approved

## Overview

Complete overhaul of personal portfolio site. Shift from "student with cool projects" to "AI researcher-engineer building intelligent systems for real-world impact." Cinematic, narrative-driven, artistic, with warm dark tones and mono-only typography.

## Design Decisions

| Decision | Choice |
|----------|--------|
| Structure | Horizontal panels (cinematic storyboard) |
| Visual direction | Warm cinematic (amber/rose/gold, dark backgrounds) |
| Motion style | Artistic & expressive (pixel art, ASCII, terminal, generative) |
| Typography | Mono-only — JetBrains Mono / Fira Code everywhere |
| Tech stack | Next.js 15 (App Router) + Tailwind CSS v4 |

## Palette

| Token | Hex | Role |
|-------|-----|------|
| `bg-deep` | `#0D0B0A` | Main background |
| `bg-surface` | `#1C1A18` | Cards, surfaces |
| `accent-amber` | `#F59E0B` | Primary accent |
| `accent-rose` | `#EF4444` | Secondary accent |
| `text-cream` | `#F5F0E8` | Primary text |
| `text-muted` | `#A8A29E` | Secondary text |
| `text-dim` | `#78716C` | Tertiary text |
| `green-terminal` | `#84CC16` | Code/terminal highlights |
| `violet-glow` | `#A78BFA` | Special elements |

## Typography

- **Everything:** JetBrains Mono / Fira Code (system mono fallback)
- Display headings: Light weight (200–300), large sizes, tight letter-spacing
- Body: Regular weight, 14–15px, comfortable line-height (1.7)
- Code/terminal: Regular weight, 12–13px
- Chapter titles are uppercase, chapter subtitles use camelCase/snake_case styling

## Site Structure

### Horizontal Panel System

```
[HERO] → [CH1: Observer] → [CH2: Builder] → [CH3: Researcher] → [CH4: Leader] → [CH5: Future]
```

- Each panel = 100vw × 100vh, CSS scroll-snap
- Fixed minimal nav top-right: section dots
- Bottom progress bar: pixel node indicators
- GSAP ScrollTrigger for horizontal scroll management
- Framer Motion for per-panel entrance animations

### Panel Content

**Hero Panel**
- Canvas 2D particle field background (200 particles, amber/rose, constellation connections)
- Typewriter heading: "I_BUILD INTELLIGENT SYSTEMS THAT_UNDERSTAND CHANGE"
- Blinking cursor
- Identity line, dynamic tags
- Scroll hint: "→"

**Chapter 1 — The Observer**
- ASCII border frame transition
- Narrative body text
- 2 experience cards (research assistant, pattern recognition)
- Timeline terminal component

**Chapter 2 — The Builder**
- 5 project cards with pixel art icons (expandable)
- Tag chips for tech stacks
- Pixel art sprite icons: fact_graph.sprite, agent.sprite, neuron.sprite, book.sprite, data.sprite
- Each icon has 4-frame idle animation, color on hover

**Chapter 3 — The Researcher**
- Publication card (IntelliSys 2026)
- Research areas tag cloud
- Current direction bullet points
- Green-terminal accent for "active research"

**Chapter 4 — The Leader**
- 4 stat cards with terminal scroll animation (numbers type out)
- 80+ students, AI committee, Wings of Fire, 1st place Predli
- JSON-formatted terminal output component

**Chapter 5 — The Future**
- Closing narrative
- CTA: "LET'S BUILD THE NEXT INTELLIGENT_SYSTEM"
- Contact info, email, phone, LinkedIn, GitHub
- Current position badges

## Animation System

### Libraries
- **Framer Motion** — React component animations (entrance, hover, layout)
- **GSAP + ScrollTrigger** — Horizontal panel scroll, scroll-driven timelines
- **Canvas 2D** — Hero particle field, pixel art rendering
- **anime.js** — Micro-interactions (typewriter, counters, blinking)

### Key Animations

1. **Hero Particle Field** — Canvas 2D, 200 nodes drifting, connect with lines when within 80px, amber-to-rose gradient, responds subtly to mouse
2. **ASCII Chapter Frames** — Each chapter transition renders a unique ASCII border (╔═╗, ╭─╮, ┌─┐, ▄▄▄, ░░░), characters appear sequentially via anime.js stagger
3. **Typewriter Heading** — Characters type out at ~60ms intervals, cursor blinks, on hero panel mount
4. **Pixel Art Sprites** — 8×8 or 16×16 Canvas-rendered sprites, nearest-neighbor scaling, 4-frame idle animations, color shifts on hover
5. **Terminal Stats** — Numbers count up from 0, JSON formatted, green/amber terminal colors, triggers on panel enter
6. **Pixel Progress Nodes** — ■ for active, □ for inactive, connected by ─── lines, pulse animation on active node

## Component Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout, font loading
│   ├── page.tsx            # Main page (horizontal scroll container)
│   └── globals.css          # Tailwind + custom CSS
├── components/
│   ├── panels/
│   │   ├── HeroPanel.tsx       # Hero with Canvas particle bg
│   │   ├── ObserverPanel.tsx   # Chapter 1
│   │   ├── BuilderPanel.tsx    # Chapter 2 + project cards
│   │   ├── ResearcherPanel.tsx # Chapter 3
│   │   ├── LeaderPanel.tsx     # Chapter 4
│   │   └── FuturePanel.tsx     # Chapter 5 + CTA
│   ├── ui/
│   │   ├── ProjectCard.tsx     # Expandable project card
│   │   ├── StatCard.tsx        # Terminal-style stat display
│   │   ├── AsciiFrame.tsx      # ASCII border animation
│   │   ├── Typewriter.tsx      # Typewriter text effect
│   │   ├── PixelSprite.tsx     # Canvas pixel art sprite
│   │   ├── PixelProgress.tsx   # Bottom progress indicator
│   │   ├── TerminalBlock.tsx   # Terminal-style content block
│   │   └── TagChip.tsx         # Technology/label tag
│   └── canvas/
│       ├── ParticleField.tsx   # Hero particle system
│       └── PixelRenderer.ts    # Pixel art rendering utility
├── data/
│   └── content.ts          # All text content, project data
└── hooks/
    ├── useScrollPanel.ts    # Horizontal scroll logic
    ├── useTypewriter.ts     # Typewriter animation hook
    └── useCounter.ts        # Number count-up hook
```

## Font Loading

JetBrains Mono loaded from Google Fonts via `next/font/google`:
```tsx
import { JetBrains_Mono } from 'next/font/google'
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['200','300','400','500','700'] })
```

## Deployment

Static export to GitHub Pages:
```bash
next build && next export -o out/
# out/ deployed to root of sher110106.github.io
```

Add `output: 'export'` to `next.config.js` with `basePath` for GitHub Pages.

## Responsive Strategy

- Horizontal panels work on desktop (≥1024px)
- Mobile (<1024px): stack panels vertically, same content, simplified animations
- Canvas particle field: reduce particle count on mobile
- Pixel art sprites: scale down on smaller screens
