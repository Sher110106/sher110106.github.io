# Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild personal portfolio as a cinematic horizontal-panel site with warm dark theme, mono-only typography, particle fields, pixel art sprites, and terminal aesthetics. Static export to GitHub Pages.

**Architecture:** Next.js 15 App Router with static export. Single page with horizontal scroll-snap panels (Hero → 5 chapters). Canvas 2D for particles/pixel art. GSAP for scroll, Framer Motion for component animations, anime.js for typewriter/counters. Content in a single data file.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Canvas 2D, JetBrains Mono (next/font/google)

**Source directory:** `src/` (Next.js App Router with `src/` directory)

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: package.json, tsconfig.json, next.config.ts, postcss.config.mjs, src/app/layout.tsx, src/app/page.tsx, src/app/globals.css, tailwind is configured via @tailwindcss/postcss

- [ ] **Step 1: Create the Next.js project in current directory**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

Expected: Project scaffolded, package.json created, `src/` directory with app router

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Next.js dev server on localhost:3000, verify the default page loads

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs src/ .gitignore eslint.config.mjs
git commit -m "scaffold: Next.js 15 + TypeScript + Tailwind project"
```

---

### Task 2: Configure Project for Static Export + Custom Theme

**Files:**
- Modify: `next.config.ts`
- Modify: `src/app/globals.css`
- Create: `src/app/layout.tsx` (overwrite with JetBrains Mono font)

- [ ] **Step 1: Update next.config.ts for static export**

Read the existing file, then replace its content:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 2: Replace globals.css with full Tailwind config + custom CSS**

Read `src/app/globals.css`, replace all content:

```css
@import "tailwindcss";

@theme {
  --color-bg-deep: #0D0B0A;
  --color-bg-surface: #1C1A18;
  --color-accent-amber: #F59E0B;
  --color-accent-rose: #EF4444;
  --color-text-cream: #F5F0E8;
  --color-text-muted: #A8A29E;
  --color-text-dim: #78716C;
  --color-green-terminal: #84CC16;
  --color-violet-glow: #A78BFA;
  --color-border-subtle: #292524;
  --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--color-bg-deep);
  color: var(--color-text-cream);
  font-family: var(--font-mono);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar {
  display: none;
}

::selection {
  background: rgba(245, 158, 11, 0.3);
  color: var(--color-text-cream);
}
```

- [ ] **Step 3: Replace layout.tsx with JetBrains Mono font**

Read `src/app/layout.tsx`, replace all content:

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sher Partap Singh — CS & AI Portfolio",
  description:
    "AI researcher-engineer building intelligent systems for real-world impact. Healthcare AI, Multi-Agent Systems, Longitudinal Intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify font loads**

```bash
npm run dev
```

Open http://localhost:3000, inspect element — body should use JetBrains Mono font family.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts src/app/globals.css src/app/layout.tsx
git commit -m "config: static export, custom warm-cinematic theme, JetBrains Mono"
```

---

### Task 3: Create Content Data

**Files:**
- Create: `src/data/content.ts`

- [ ] **Step 1: Create content data file**

Write `src/data/content.ts`:

```ts
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  period: string;
  spriteName: "fact_graph" | "agent" | "neuron" | "book" | "data";
}

export interface Experience {
  title: string;
  org: string;
  description: string;
  period: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ChapterContent {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  body: string;
  asciiStyle: "double" | "round" | "box" | "bold" | "shade";
}

export const identity = {
  name: "SHER PARTAP SINGH",
  tagline: "CS & AI @ PLAKSHA UNIVERSITY",
  heroWords: ["I_BUILD", "INTELLIGENT", "SYSTEMS", "THAT_UNDERSTAND", "CHANGE"],
  heroSubtext:
    "From multi-agent infrastructure to longitudinal clinical intelligence, I work at the intersection of AI, systems, and human impact—turning fragmented information into decisions, timelines, and scalable solutions.",
  tags: [
    "Healthcare AI",
    "Multi-Agent Systems",
    "Longitudinal Intelligence",
    "AI for Education",
    "Research & Infrastructure",
  ],
};

export const chapters: ChapterContent[] = [
  {
    id: "observer",
    number: 1,
    title: "THE OBSERVER",
    subtitle: "chapter_01.ts",
    body: "Before building intelligent systems, I learned to observe complex ones.\n\nAt Plaksha University's Lab for Economic Behaviour, I worked on large-scale research pipelines—scraping data across fragmented sources, synthesizing literature, and uncovering patterns hidden beneath noisy information. That experience taught me something fundamental:\n\nData is rarely clean.\nHuman systems are rarely linear.\nThe signal is always buried inside the chaos.\n\nToday, that same mindset drives everything I build—from AI agents navigating websites to clinical systems tracking disease progression across time.",
    asciiStyle: "double",
  },
  {
    id: "builder",
    number: 2,
    title: "THE BUILDER",
    subtitle: "chapter_02.tsx",
    body: "I don't just prototype ideas.\nI build systems that reason, adapt, and scale.\n\nMy work spans AI infrastructure, healthcare intelligence, educational systems, and autonomous debugging platforms—each solving a different form of complexity.\n\nSome systems analyze code.\nSome analyze people.\nSome analyze time itself.",
    asciiStyle: "round",
  },
  {
    id: "researcher",
    number: 3,
    title: "THE RESEARCHER",
    subtitle: "chapter_03.py",
    body: "The deeper I explored AI, the more I became interested in systems that understand context across time—not just isolated inputs.\n\nThat curiosity led me into healthcare AI.\n\nI worked on clinical intelligence systems capable of longitudinal reasoning across radiology reports, where the challenge isn't just extraction—it's memory.\n\nA \"nodule\" becomes a \"lesion.\"\nA \"lesion\" becomes a \"mass.\"\nMonths pass.\nLanguage changes.\nThe patient's story continues.\n\nMost systems forget the past.\n\nI want to build systems that don't.",
    asciiStyle: "box",
  },
  {
    id: "leader",
    number: 4,
    title: "THE LEADER",
    subtitle: "chapter_04.md",
    body: "Technology matters most when it amplifies people.\n\nWhether mentoring students, contributing to institutional AI governance, or leading community initiatives, I care deeply about making complex systems more accessible to others.\n\nI believe the future of AI will not just be defined by capability—but by responsibility, accessibility, and trust.",
    asciiStyle: "bold",
  },
  {
    id: "future",
    number: 5,
    title: "THE FUTURE",
    subtitle: "chapter_05.sh",
    body: "Right now, AI can generate answers.\n\nThe next generation of systems will need to:\n\n* remember context\n* reason across time\n* collaborate with humans\n* operate responsibly in critical domains\n\nThat's the future I want to help build.\n\nNot just smarter systems.\nSystems that understand progression, uncertainty, and people.\n\nThis story is still being written.",
    asciiStyle: "shade",
  },
];

export const projects: Project[] = [
  {
    id: "fact-graph",
    title: "The Fact Graph",
    subtitle: "Longitudinal Clinical Intelligence",
    description:
      "A healthcare AI research system designed to track clinical findings across time using LLM-based paired-report reasoning and ontological fact graphs. Instead of reading radiology reports independently, the system connects findings longitudinally—tracking progression, stability, worsening, and resolution across months of patient history. Accepted at IntelliSys 2026 under the Large Language Models for Healthcare track.",
    stack: ["LLMs", "Clinical NLP", "Temporal Reasoning", "Healthcare AI", "Knowledge Graphs"],
    period: "Spring 2026",
    spriteName: "fact_graph",
  },
  {
    id: "bugzer",
    title: "Bugzer",
    subtitle: "Multi-Agent Debugging Infrastructure",
    description:
      "AI agents that navigate websites like users, inspect systems like engineers, and diagnose failures like investigators. Built scalable browser-automation pipelines capable of capturing console telemetry, network traces, screenshots, and performance metrics while generating LLM-assisted debugging recommendations.",
    stack: ["Multi-Agent AI", "Docker", "GCP", "Browser Automation", "Distributed Systems"],
    period: "Jan 2025 — Present",
    spriteName: "agent",
  },
  {
    id: "radiology",
    title: "Longitudinal Radiology Intelligence",
    subtitle: "AI for Temporal Medical Reasoning",
    description:
      "Worked on paired-report extraction pipelines for identifying clinical change across sequential radiology reports. Focused on entity persistence across time, RECIST-based oncology progression tracking, temporal language understanding, and medical event graphs.",
    stack: ["Clinical Intelligence", "Temporal NLP", "Oncology AI", "Medical LLMs"],
    period: "Spring 2026",
    spriteName: "neuron",
  },
  {
    id: "curriculum",
    title: "Curriculum Gap Analyzer",
    subtitle: "Educational Intelligence System",
    description:
      "An OCR + embedding powered platform that compares curricula across institutions and identifies missing concepts automatically. Designed to reduce transfer-learning friction for students transitioning between academic systems.",
    stack: ["React", "Tesseract.js", "Azure OpenAI", "Embeddings"],
    period: "Summer 2025",
    spriteName: "book",
  },
  {
    id: "streamlit",
    title: "Streamlit Data Agent",
    subtitle: "Autonomous Data Narrator",
    description:
      "Transforms raw spreadsheets into interactive visualizations, statistical summaries, and natural-language insights automatically.",
    stack: ["Python", "Streamlit", "Data Analysis", "ML"],
    period: "Summer 2025",
    spriteName: "data",
  },
];

export const experiences: Experience[] = [
  {
    title: "Research Assistant",
    org: "Lab for Economic Behaviour in Organisations",
    description:
      "Large-scale data extraction, preprocessing, and research synthesis using Python, Selenium, and distributed scraping workflows.",
    period: "Jun 2024 — Sept 2024",
  },
  {
    title: "Pattern Recognition",
    org: "Research → Systems Thinking",
    description:
      "Learned to transform disconnected information into structured intelligence pipelines.",
    period: "Ongoing",
  },
];

export const stats: Stat[] = [
  { value: 80, suffix: "+", label: "Students Mentored" },
  { value: 1, suffix: "", label: "Publications" },
  { value: 5, suffix: "", label: "Projects Shipped" },
  { value: 1, suffix: "st", label: "Place — Predli AI Case Comp" },
];

export const researchAreas = [
  "Longitudinal Clinical Intelligence",
  "Temporal Reasoning",
  "Medical NLP",
  "Multi-Agent Systems",
  "Human-Centered AI",
  "AI Infrastructure",
  "Knowledge Representation",
];

export const currentDirection = [
  "reason across time",
  "integrate multimodal information",
  "support human decision-making",
  "scale responsibly in healthcare and education",
];

export const leadershipItems = [
  {
    title: "AI Committee Member",
    org: "Plaksha University",
    description:
      "Contributing to institutional discussions on responsible AI adoption, governance, and ethical deployment frameworks.",
  },
  {
    title: "Founder",
    org: "Wings of Fire Club",
    description:
      "Led charitable initiatives and student-driven fundraising campaigns focused on community impact.",
  },
];

export const contact = {
  email: "sher.singh.ug23@plaksha.edu.in",
  phone: "+91 7056613201",
  linkedin: "https://linkedin.com/in/sherpartapsingh",
  github: "https://github.com/sher110106",
  current: "Currently at Plaksha University, Mohali",
  incoming: "Incoming Business Analyst Intern @ Flipkart",
};

export const techStack = [
  "Python",
  "C++",
  "TypeScript",
  "SQL",
  "LLMs",
  "OpenAI APIs",
  "Docker",
  "GCP",
  "Azure",
  "Next.js",
  "React",
  "Clinical NLP",
  "Multi-Agent Systems",
  "Temporal AI",
  "Knowledge Graphs",
  "OCR Systems",
  "Selenium",
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/content.ts
git commit -m "feat: add content data with all site text"
```

---

### Task 4: Create Custom Hooks

**Files:**
- Create: `src/hooks/useTypewriter.ts`
- Create: `src/hooks/useCounter.ts`
- Create: `src/hooks/useScrollPanel.ts`

- [ ] **Step 1: Create useTypewriter hook**

Write `src/hooks/useTypewriter.ts`:

```ts
"use client";

import { useState, useEffect, useCallback } from "react";

export function useTypewriter(text: string, speed = 60, startDelay = 300) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  const reset = useCallback(() => {
    setDisplayed("");
    setDone(false);
  }, []);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    const delayTimer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, startDelay]);

  return { displayed, done, reset };
}
```

- [ ] **Step 2: Create useCounter hook**

Write `src/hooks/useCounter.ts`:

```ts
"use client";

import { useState, useEffect } from "react";

export function useCounter(target: number, duration = 1500, trigger: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}
```

- [ ] **Step 3: Create useScrollPanel hook**

Write `src/hooks/useScrollPanel.ts`:

```ts
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useScrollPanel(totalPanels: number) {
  const [activePanel, setActivePanel] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const panelWidth = container.clientWidth;
      const panel = Math.round(scrollLeft / panelWidth);
      setActivePanel(Math.min(panel, totalPanels - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalPanels, isMobile]);

  const scrollTo = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      if (isMobile) {
        document.getElementById(`panel-${index}`)?.scrollIntoView({ behavior: "smooth" });
      } else {
        container.scrollTo({
          left: index * container.clientWidth,
          behavior: "smooth",
        });
      }
    },
    [isMobile]
  );

  return { activePanel, containerRef, scrollTo, isMobile };
}
```

- [ ] **Step 4: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useTypewriter, useCounter, useScrollPanel hooks"
```

---

### Task 5: Create Canvas Utilities — PixelRenderer + PixelSprite

**Files:**
- Create: `src/lib/pixels.ts`
- Create: `src/components/ui/PixelSprite.tsx`

- [ ] **Step 1: Create pixel rendering utility**

Write `src/lib/pixels.ts`:

```ts
export type SpriteName = "fact_graph" | "agent" | "neuron" | "book" | "data";

export interface SpriteFrame {
  grid: number[][]; // 8x8 grid, 0=transparent, 1=color1, 2=color2
  primaryColor: string;
  secondaryColor: string;
}

export const spriteDefinitions: Record<SpriteName, SpriteFrame[]> = {
  fact_graph: [
    {
      // fact graph — knowledge graph node with connections
      grid: [
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [1, 0, 2, 0, 0, 2, 0, 1],
        [1, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 2, 0, 0, 2, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
      ],
      primaryColor: "#84CC16",
      secondaryColor: "#F59E0B",
    },
  ],
  agent: [
    {
      // agent — surveillance / robot face
      grid: [
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 2, 2, 0, 1, 1],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 2, 2, 1, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      primaryColor: "#F59E0B",
      secondaryColor: "#EF4444",
    },
  ],
  neuron: [
    {
      // neuron — brain/neural node
      grid: [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 2, 2, 0, 1, 0],
        [1, 0, 2, 0, 0, 2, 0, 1],
        [1, 0, 2, 0, 0, 2, 0, 1],
        [0, 1, 0, 2, 2, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
      ],
      primaryColor: "#A78BFA",
      secondaryColor: "#F59E0B",
    },
  ],
  book: [
    {
      // book — education / curriculum
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 0, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 0, 0, 0, 0, 0, 0, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 0, 0, 0, 0, 0, 0, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      primaryColor: "#F59E0B",
      secondaryColor: "#F5F0E8",
    },
  ],
  data: [
    {
      // data — chart / bars
      grid: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 2, 0, 0, 1],
        [1, 0, 1, 0, 2, 0, 0, 1],
        [1, 0, 1, 0, 2, 0, 2, 1],
        [1, 0, 1, 0, 2, 0, 2, 1],
        [1, 1, 1, 0, 2, 2, 2, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      primaryColor: "#F59E0B",
      secondaryColor: "#84CC16",
    },
  ],
};

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  name: SpriteName,
  size: number,
  frameIndex: number,
  hovered: boolean,
) {
  const frames = spriteDefinitions[name];
  const frame = frames[Math.min(frameIndex, frames.length - 1)];
  const cellSize = size / 8;

  ctx.clearRect(0, 0, size, size);

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const val = frame.grid[y][x];
      if (val === 0) continue;
      ctx.fillStyle =
        val === 1
          ? hovered
            ? frame.secondaryColor
            : frame.primaryColor
          : hovered
            ? frame.primaryColor
            : frame.secondaryColor;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}
```

- [ ] **Step 2: Create PixelSprite component**

Write `src/components/ui/PixelSprite.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { drawSprite, type SpriteName } from "@/lib/pixels";

interface PixelSpriteProps {
  name: SpriteName;
  size?: number;
  className?: string;
}

export function PixelSprite({ name, size = 48, className }: PixelSpriteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const interval = setInterval(() => {
      frameRef.current = (frameRef.current + 1) % 4;
      drawSprite(ctx, name, size, frameRef.current % 2, hovered);
    }, 600);

    drawSprite(ctx, name, size, 0, hovered);

    return () => clearInterval(interval);
  }, [name, size, hovered]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ imageRendering: "pixelated", width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/pixels.ts src/components/ui/PixelSprite.tsx
git commit -m "feat: add pixel art system — sprite defs + PixelSprite component"
```

---

### Task 6: Create UI Components (TagChip, TerminalBlock, StatCard, Typewriter)

**Files:**
- Create: `src/components/ui/TagChip.tsx`
- Create: `src/components/ui/TerminalBlock.tsx`
- Create: `src/components/ui/StatCard.tsx`
- Create: `src/components/ui/Typewriter.tsx`

- [ ] **Step 1: Create TagChip component**

Write `src/components/ui/TagChip.tsx`:

```tsx
interface TagChipProps {
  label: string;
  active?: boolean;
}

export function TagChip({ label, active }: TagChipProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[9px] rounded-sm border transition-colors duration-200 ${
        active
          ? "border-accent-amber text-accent-amber bg-accent-amber/10"
          : "border-border-subtle text-text-dim"
      }`}
    >
      {label}
    </span>
  );
}
```

- [ ] **Step 2: Create TerminalBlock component**

Write `src/components/ui/TerminalBlock.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

interface TerminalBlockProps {
  command?: string;
  content: string;
  trigger: boolean;
}

export function TerminalBlock({ command, content, trigger }: TerminalBlockProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setLines([]);
    setDone(false);
    const allLines = content.split("\n");
    let lineIndex = 0;
    let charIndex = 0;
    const out: string[] = [];

    const interval = setInterval(() => {
      if (lineIndex >= allLines.length) {
        setDone(true);
        clearInterval(interval);
        return;
      }
      charIndex++;
      out[lineIndex] = allLines[lineIndex].slice(0, charIndex);
      if (charIndex >= allLines[lineIndex].length) {
        lineIndex++;
        charIndex = 0;
      }
      setLines([...out]);
    }, 15);

    return () => clearInterval(interval);
  }, [content, trigger]);

  return (
    <div className="bg-bg-deep border border-border-subtle rounded-lg p-4 font-mono text-[11px] leading-relaxed">
      {command && <div className="text-text-dim mb-2">{command}</div>}
      <div className="text-green-terminal whitespace-pre">
        {lines.join("\n")}
        {!done && <span className="text-accent-amber animate-pulse">█</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create StatCard component**

Write `src/components/ui/StatCard.tsx`:

```tsx
"use client";

import { useCounter } from "@/hooks/useCounter";

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
}

export function StatCard({ value, suffix, label, trigger }: StatCardProps) {
  const count = useCounter(value, 1500, trigger);

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 text-center font-mono">
      <div className="text-4xl font-light text-accent-amber tracking-tight">
        {count}
        <span className="text-xl text-text-muted">{suffix}</span>
      </div>
      <div className="text-[11px] text-text-muted mt-2">{label}</div>
    </div>
  );
}
```

- [ ] **Step 4: Create Typewriter component**

Write `src/components/ui/Typewriter.tsx`:

```tsx
"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 60,
  startDelay = 300,
  className,
}: TypewriterProps) {
  const { displayed, done } = useTypewriter(text, speed, startDelay);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span className="text-accent-amber animate-pulse ml-0.5">_</span>
      )}
    </span>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/TagChip.tsx src/components/ui/TerminalBlock.tsx src/components/ui/StatCard.tsx src/components/ui/Typewriter.tsx
git commit -m "feat: add UI components — TagChip, TerminalBlock, StatCard, Typewriter"
```

---

### Task 7: Create AsciiFrame and PixelProgress

**Files:**
- Create: `src/components/ui/AsciiFrame.tsx`
- Create: `src/components/ui/PixelProgress.tsx`

- [ ] **Step 1: Create AsciiFrame component**

Write `src/components/ui/AsciiFrame.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

type AsciiStyle = "double" | "round" | "box" | "bold" | "shade";

const borders: Record<AsciiStyle, { tl: string; tr: string; bl: string; br: string; h: string; v: string }> = {
  double: { tl: "╔", tr: "╗", bl: "╚", br: "╝", h: "═", v: "║" },
  round: { tl: "╭", tr: "╮", bl: "╰", br: "╯", h: "─", v: "│" },
  box: { tl: "┌", tr: "┐", bl: "└", br: "┘", h: "─", v: "│" },
  bold: { tl: "▄", tr: "▄", bl: "▀", br: "▀", h: "▄", v: "█" },
  shade: { tl: "░", tr: "░", bl: "░", br: "░", h: "░", v: "░" },
};

interface AsciiFrameProps {
  style: AsciiStyle;
  title: string;
  subtitle?: string;
  trigger: boolean;
}

export function AsciiFrame({ style, title, subtitle, trigger }: AsciiFrameProps) {
  const [visible, setVisible] = useState(false);
  const b = borders[style];
  const width = Math.max(title.length, subtitle?.length || 0) + 4;

  useEffect(() => {
    if (trigger) {
      const t = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [trigger]);

  if (!visible) return null;

  const topLine = b.tl + b.h.repeat(width - 2) + b.tr;
  const botLine = b.bl + b.h.repeat(width - 2) + b.br;
  const padTitle = " ".repeat(Math.max(0, (width - 4 - title.length) / 2));
  const titleLine = b.v + " " + padTitle + title + padTitle + " " + b.v;

  return (
    <div
      className="font-mono text-[13px] leading-tight whitespace-pre text-accent-amber animate-in fade-in duration-500"
      style={{ lineHeight: "1.3" }}
    >
      <div>{topLine}</div>
      <div>{titleLine}</div>
      {subtitle && (
        <div>
          {b.v} {subtitle}{" ".repeat(Math.max(0, width - 4 - subtitle.length))} {b.v}
        </div>
      )}
      <div>{botLine}</div>
    </div>
  );
}
```

- [ ] **Step 2: Create PixelProgress component**

Write `src/components/ui/PixelProgress.tsx`:

```tsx
"use client";

interface PixelProgressProps {
  total: number;
  active: number;
  labels: string[];
  onSelect: (index: number) => void;
}

export function PixelProgress({ total, active, labels, onSelect }: PixelProgressProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 font-mono">
      <div className="flex items-center gap-2 bg-bg-deep/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border-subtle">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <button
              onClick={() => onSelect(i)}
              className={`text-sm transition-colors duration-300 cursor-pointer hover:text-accent-amber ${
                i === active ? "text-accent-amber" : "text-text-dim"
              }`}
            >
              {i === active ? "■" : "□"}
            </button>
            {i < total - 1 && <span className="text-border-subtle text-[8px]">──</span>}
          </div>
        ))}
      </div>
      <div className="text-[9px] text-text-dim text-center mt-1">
        [{active}/{total - 1}] {labels[active] || ""}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/AsciiFrame.tsx src/components/ui/PixelProgress.tsx
git commit -m "feat: add AsciiFrame and PixelProgress components"
```

---

### Task 8: Create ParticleField Canvas Component

**Files:**
- Create: `src/components/canvas/ParticleField.tsx`

- [ ] **Step 1: Create ParticleField component**

Write `src/components/canvas/ParticleField.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const PARTICLE_COUNT = 180;
const CONNECTION_DISTANCE = 100;

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particles: Particle[] = [];
      const colors = ["#F59E0B", "#EF4444", "#F5F0E8", "#A8A29E", "#A78BFA"];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      particlesRef.current = particles;
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dxMouse = mx - p.x;
        const dyMouse = my - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          p.x += dxMouse * 0.002;
          p.y += dyMouse * 0.002;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = 0.08 * (1 - dist / CONNECTION_DISTANCE);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/canvas/ParticleField.tsx
git commit -m "feat: add ParticleField canvas component"
```

---

### Task 9: Create HeroPanel

**Files:**
- Create: `src/components/panels/HeroPanel.tsx`

- [ ] **Step 1: Create HeroPanel**

Write `src/components/panels/HeroPanel.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Typewriter } from "@/components/ui/Typewriter";
import { TagChip } from "@/components/ui/TagChip";
import { identity } from "@/data/content";

export function HeroPanel() {
  return (
    <div className="min-w-[100vw] w-screen h-screen flex items-center justify-center relative">
      <div className="z-10 px-8 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-10"
        >
          <h1 className="font-mono font-light text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            {identity.heroWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                className={`block ${i === 0 ? "text-accent-amber" : "text-text-cream"}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="space-y-6"
        >
          <Typewriter
            text={identity.heroSubtext}
            speed={25}
            startDelay={1800}
            className="block text-[13px] md:text-sm text-text-muted leading-relaxed max-w-2xl mx-auto"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="space-y-3"
          >
            <div className="text-sm font-medium tracking-[0.2em] text-text-cream">
              {identity.name}
            </div>
            <div className="text-[11px] text-text-dim tracking-wider">
              {identity.tagline}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-2 pt-2"
          >
            {identity.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 0.8 }}
          className="mt-12 text-text-dim text-xs animate-bounce"
        >
          &rarr;
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/panels/HeroPanel.tsx
git commit -m "feat: add HeroPanel with typewriter and tag chips"
```

---

### Task 10: Create ObserverPanel (Chapter 1)

**Files:**
- Create: `src/components/panels/ObserverPanel.tsx`

- [ ] **Step 1: Create ObserverPanel**

Write `src/components/panels/ObserverPanel.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { AsciiFrame } from "@/components/ui/AsciiFrame";
import { chapters, experiences } from "@/data/content";

export function ObserverPanel({ active }: { active: boolean }) {
  const ch = chapters[0];

  return (
    <div className="min-w-[100vw] w-screen h-screen flex items-center relative overflow-hidden">
      <div className="z-10 px-8 md:px-16 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <AsciiFrame
                style={ch.asciiStyle}
                title={`CHAPTER_0${ch.number}`}
                subtitle={ch.subtitle}
                trigger={active}
              />
            </div>
            <h2 className="font-mono font-light text-5xl md:text-6xl tracking-tight text-accent-amber mb-6">
              {ch.title}
            </h2>
            <div className="font-mono text-[13px] md:text-sm text-text-muted leading-relaxed whitespace-pre-line">
              {ch.body}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="bg-bg-surface border border-border-subtle rounded-lg p-5"
              >
                <div className="text-[10px] text-text-dim tracking-wider mb-1 font-mono">
                  {exp.period}
                </div>
                <h3 className="font-mono text-sm font-medium text-text-cream">
                  {exp.title}
                </h3>
                <div className="font-mono text-[11px] text-accent-amber/70 mt-0.5">
                  {exp.org}
                </div>
                <p className="font-mono text-[12px] text-text-muted mt-2 leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/panels/ObserverPanel.tsx
git commit -m "feat: add ObserverPanel (Chapter 1)"
```

---

### Task 11: Create ProjectCard + BuilderPanel (Chapter 2)

**Files:**
- Create: `src/components/ui/ProjectCard.tsx`
- Create: `src/components/panels/BuilderPanel.tsx`

- [ ] **Step 1: Create ProjectCard component**

Write `src/components/ui/ProjectCard.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { TagChip } from "@/components/ui/TagChip";
import type { Project } from "@/data/content";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-bg-surface border border-border-subtle rounded-lg p-4 hover:border-accent-amber/30 transition-colors duration-300 group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="mt-1 shrink-0">
          <PixelSprite name={project.spriteName} size={40} />
        </div>
        <div className="min-w-0">
          <h3 className="font-mono text-sm font-medium text-text-cream group-hover:text-accent-amber transition-colors">
            {project.title}
          </h3>
          <div className="font-mono text-[10px] text-accent-amber/60 mt-0.5">
            {project.subtitle}
          </div>
          <div className="font-mono text-[10px] text-text-dim mt-0.5">
            {project.period}
          </div>
        </div>
      </div>
      <p className="font-mono text-[11px] text-text-muted leading-relaxed mb-3 line-clamp-3 group-hover:line-clamp-none transition-all">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <TagChip key={tech} label={tech} />
        ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create BuilderPanel**

Write `src/components/panels/BuilderPanel.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { AsciiFrame } from "@/components/ui/AsciiFrame";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { chapters, projects } from "@/data/content";

export function BuilderPanel({ active }: { active: boolean }) {
  const ch = chapters[1];

  return (
    <div className="min-w-[100vw] w-screen h-screen flex items-center relative overflow-hidden">
      <div className="z-10 px-8 md:px-16 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-24"
          >
            <div className="mb-6">
              <AsciiFrame
                style={ch.asciiStyle}
                title={`CHAPTER_0${ch.number}`}
                subtitle={ch.subtitle}
                trigger={active}
              />
            </div>
            <h2 className="font-mono font-light text-4xl md:text-5xl tracking-tight text-accent-amber mb-6">
              {ch.title}
            </h2>
            <div className="font-mono text-[13px] text-text-muted leading-relaxed whitespace-pre-line">
              {ch.body}
            </div>
          </motion.div>

          <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ProjectCard.tsx src/components/panels/BuilderPanel.tsx
git commit -m "feat: add ProjectCard + BuilderPanel (Chapter 2)"
```

---

### Task 12: Create ResearcherPanel (Chapter 3)

**Files:**
- Create: `src/components/panels/ResearcherPanel.tsx`

- [ ] **Step 1: Create ResearcherPanel**

Write `src/components/panels/ResearcherPanel.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { AsciiFrame } from "@/components/ui/AsciiFrame";
import { TagChip } from "@/components/ui/TagChip";
import { chapters, researchAreas, currentDirection } from "@/data/content";

export function ResearcherPanel({ active }: { active: boolean }) {
  const ch = chapters[2];

  return (
    <div className="min-w-[100vw] w-screen h-screen flex items-center relative overflow-hidden">
      <div className="z-10 px-8 md:px-16 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <AsciiFrame
                style={ch.asciiStyle}
                title={`CHAPTER_0${ch.number}`}
                subtitle={ch.subtitle}
                trigger={active}
              />
            </div>
            <h2 className="font-mono font-light text-5xl md:text-6xl tracking-tight text-accent-amber mb-6">
              {ch.title}
            </h2>
            <div className="font-mono text-[13px] text-text-muted leading-relaxed whitespace-pre-line">
              {ch.body}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="bg-bg-surface border border-green-terminal/20 rounded-lg p-5"
            >
              <div className="font-mono text-[10px] text-green-terminal tracking-wider mb-2">
                PUBLICATION
              </div>
              <h3 className="font-mono text-sm text-text-cream font-medium">
                &quot;The Fact Graph: A Unified Ontological Representation for
                Multi-Modal Clinical Intelligence&quot;
              </h3>
              <div className="font-mono text-[11px] text-green-terminal/70 mt-2">
                IntelliSys 2026 · Large Language Models for Healthcare
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="font-mono text-[10px] text-text-dim tracking-wider mb-3">
                CORE RESEARCH AREAS
              </div>
              <div className="flex flex-wrap gap-2">
                {researchAreas.map((area) => (
                  <TagChip key={area} label={area} active />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="bg-bg-deep border border-border-subtle rounded-lg p-5 font-mono"
            >
              <div className="text-[10px] text-text-dim tracking-wider mb-3">
                CURRENT DIRECTION
              </div>
              <div className="text-green-terminal text-[11px] leading-relaxed space-y-1">
                <div className="text-text-dim">$ cat direction.txt</div>
                {currentDirection.map((item, i) => (
                  <div key={i} className="text-text-cream">
                    &gt; {item}
                  </div>
                ))}
                <div className="text-accent-amber animate-pulse">$ _</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/panels/ResearcherPanel.tsx
git commit -m "feat: add ResearcherPanel (Chapter 3)"
```

---

### Task 13: Create LeaderPanel (Chapter 4)

**Files:**
- Create: `src/components/panels/LeaderPanel.tsx`

- [ ] **Step 1: Create LeaderPanel**

Write `src/components/panels/LeaderPanel.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { AsciiFrame } from "@/components/ui/AsciiFrame";
import { StatCard } from "@/components/ui/StatCard";
import { chapters, stats, leadershipItems } from "@/data/content";

export function LeaderPanel({ active }: { active: boolean }) {
  const ch = chapters[3];

  return (
    <div className="min-w-[100vw] w-screen h-screen flex items-center relative overflow-hidden">
      <div className="z-10 px-8 md:px-16 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <AsciiFrame
                style={ch.asciiStyle}
                title={`CHAPTER_0${ch.number}`}
                subtitle={ch.subtitle}
                trigger={active}
              />
            </div>
            <h2 className="font-mono font-light text-5xl md:text-6xl tracking-tight text-accent-amber mb-6">
              {ch.title}
            </h2>
            <div className="font-mono text-[13px] text-text-muted leading-relaxed whitespace-pre-line">
              {ch.body}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <StatCard
                  key={i}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  trigger={active}
                />
              ))}
            </div>

            <div className="space-y-3">
              {leadershipItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={active ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="bg-bg-surface border border-border-subtle rounded-lg p-4"
                >
                  <h3 className="font-mono text-sm font-medium text-text-cream">
                    {item.title}
                  </h3>
                  <div className="font-mono text-[11px] text-accent-amber/60 mt-0.5">
                    {item.org}
                  </div>
                  <p className="font-mono text-[12px] text-text-muted mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/panels/LeaderPanel.tsx
git commit -m "feat: add LeaderPanel (Chapter 4)"
```

---

### Task 14: Create FuturePanel (Chapter 5)

**Files:**
- Create: `src/components/panels/FuturePanel.tsx`

- [ ] **Step 1: Create FuturePanel**

Write `src/components/panels/FuturePanel.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { AsciiFrame } from "@/components/ui/AsciiFrame";
import { chapters, contact, techStack } from "@/data/content";
import { TagChip } from "@/components/ui/TagChip";

export function FuturePanel({ active }: { active: boolean }) {
  const ch = chapters[4];

  return (
    <div className="min-w-[100vw] w-screen h-screen flex items-center relative overflow-hidden">
      <div className="z-10 px-8 md:px-16 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <AsciiFrame
                style={ch.asciiStyle}
                title={`CHAPTER_0${ch.number}`}
                subtitle={ch.subtitle}
                trigger={active}
              />
            </div>
            <h2 className="font-mono font-light text-5xl md:text-6xl tracking-tight text-accent-amber mb-6">
              {ch.title}
            </h2>
            <div className="font-mono text-[13px] text-text-muted leading-relaxed whitespace-pre-line">
              {ch.body}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <h2 className="font-mono font-light text-3xl md:text-4xl tracking-tight text-accent-amber mb-3">
                LET&apos;S_BUILD
              </h2>
              <div className="font-mono text-lg text-text-cream">
                THE NEXT INTELLIGENT_SYSTEM
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-3 font-mono"
            >
              <div className="text-[10px] text-text-dim tracking-wider mb-2">
                CONTACT
              </div>
              <div className="text-[11px] text-text-dim">{contact.current}</div>
              <div className="text-[11px] text-text-dim">{contact.incoming}</div>
              <div className="text-sm text-text-cream">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-accent-amber hover:underline transition-colors"
                >
                  {contact.email}
                </a>
              </div>
              <div className="text-[12px] text-text-muted">{contact.phone}</div>
              <div className="flex gap-4 pt-1">
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-accent-amber/70 hover:text-accent-amber transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-accent-amber/70 hover:text-accent-amber transition-colors"
                >
                  GitHub
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="font-mono text-[10px] text-text-dim tracking-wider mb-3">
                TECHNICAL ARSENAL
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech) => (
                  <TagChip key={tech} label={tech} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/panels/FuturePanel.tsx
git commit -m "feat: add FuturePanel (Chapter 5) with contact + CTA"
```

---

### Task 15: Create Main Page — Horizontal Scroll Container

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx with the horizontal scroll container**

Read `src/app/page.tsx`, replace all content:

```tsx
"use client";

import { ParticleField } from "@/components/canvas/ParticleField";
import { HeroPanel } from "@/components/panels/HeroPanel";
import { ObserverPanel } from "@/components/panels/ObserverPanel";
import { BuilderPanel } from "@/components/panels/BuilderPanel";
import { ResearcherPanel } from "@/components/panels/ResearcherPanel";
import { LeaderPanel } from "@/components/panels/LeaderPanel";
import { FuturePanel } from "@/components/panels/FuturePanel";
import { PixelProgress } from "@/components/ui/PixelProgress";
import { useScrollPanel } from "@/hooks/useScrollPanel";

const chapterLabels = ["hero", "observer", "builder", "researcher", "leader", "future"];

export default function Home() {
  const { activePanel, containerRef, scrollTo, isMobile } = useScrollPanel(6);

  const panels = [
    <HeroPanel key="hero" />,
    <ObserverPanel key="observer" active={activePanel === 1} />,
    <BuilderPanel key="builder" active={activePanel === 2} />,
    <ResearcherPanel key="researcher" active={activePanel === 3} />,
    <LeaderPanel key="leader" active={activePanel === 4} />,
    <FuturePanel key="future" active={activePanel === 5} />,
  ];

  return (
    <main className="relative">
      <ParticleField />

      {isMobile ? (
        <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
          {panels.map((panel, i) => (
            <div
              key={i}
              id={`panel-${i}`}
              className="snap-start h-screen w-screen overflow-hidden"
            >
              {panel}
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={containerRef}
          className="flex overflow-x-scroll snap-x snap-mandatory h-screen"
        >
          {panels.map((panel, i) => (
            <div
              key={i}
              id={`panel-${i}`}
              className="snap-start min-w-[100vw] h-screen"
            >
              {panel}
            </div>
          ))}
        </div>
      )}

      <PixelProgress
        total={6}
        active={activePanel}
        labels={chapterLabels}
        onSelect={scrollTo}
      />
    </main>
  );
}
```

- [ ] **Step 2: Verify dev server works and shows the site**

```bash
npm run dev
```

Open http://localhost:3000 — verify all panels render, horizontal scroll works, particles visible.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: main page with horizontal scroll container + all panels"
```

---

### Task 16: Build and Test Static Export

**Files:**
- Modify: `next.config.ts` (verify output config)

- [ ] **Step 1: Run the static build**

```bash
npm run build
```

Expected: Build succeeds, `out/` directory created with static files. Check for errors.

- [ ] **Step 2: Verify built output**

```bash
ls out/
```

Expected: `index.html`, `_next/`, and other static files.

- [ ] **Step 3: Test locally with a static server (optional)**

```bash
npx serve out/
```

Open the served URL, verify the site works from static files.

- [ ] **Step 4: Commit build artifacts**

```bash
git add out/
git commit -m "build: static export output"
```

---

### Task 17: Configure GitHub Pages Deployment

**Files:**
- Modify: `.gitignore` (add entries for Next.js source protection)
- Create: `.github/workflows/deploy.yml` (optional — manual deploy if preferred)

- [ ] **Step 1: Update .gitignore**

Check `.gitignore` and ensure these entries exist. Read the file first, then add missing entries:

```
.next/
node_modules/
.superpowers/
```

- [ ] **Step 2: Add deploy script to package.json**

Read `package.json`, add under `"scripts"`:

```json
"deploy": "npm run build && cp -r out/* . && touch .nojekyll"
```

- [ ] **Step 3: Run deploy**

```bash
npm run deploy
```

Expected: Builds the site, copies `out/` contents to repo root. `index.html` at root is now the new portfolio.

- [ ] **Step 4: Commit deploy output**

```bash
git add index.html _next/ 404.html .nojekyll
git commit -m "deploy: new portfolio static output to root"
```

- [ ] **Step 5: Push to GitHub**

```bash
git push origin main
```

The site will be live at `https://sher110106.github.io` once GitHub Pages processes it.

---

### Task 18: Final Polish — Fix Any Visual Issues

**Files:**
- Review: any file that needs adjustment after deployment

- [ ] **Step 1: Check the live site**

Visit `https://sher110106.github.io` after deployment. Check:
- Hero particle field renders
- Horizontal scroll works
- All panels display correct content
- Pixel progress indicator works
- Mobile responsive layout
- Links work (LinkedIn, GitHub, email)

- [ ] **Step 2: Fix any issues**

Common issues to watch for:
- `basePath` configuration may need adjustment if deployed to a subdirectory
- Font loading — verify JetBrains Mono loads
- Image paths — ensure all assets are relative

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: polish and final adjustments"
git push origin main
```
