# Development notes for a future implementation

This is not an implementation. It is a set of notes for the later build.

## Current app constraints

Observed local project:

- Next.js app router.
- Static export enabled in `next.config.ts`.
- Main page is a client component with horizontal panel scrolling.
- Content is mostly centralized in `src/data/content.ts`.
- The current visual identity is terminal/pixel/story-panel oriented.
- Existing UI components include project cards, tag chips, ASCII frames, sprites, progress dots, and terminal blocks.

Implication:

- A future writing system should work with static export.
- It should not require a database unless the direction changes.
- Structured local content is the simplest first version.
- Markdown/MDX can come later if the first pass needs richer authoring.
- The future revamp should intentionally move to a light theme. Do not assume the current dark visual system is the desired final direction.

## Possible content model

Potential entities:

```ts
type WritingNote = {
  slug: string;
  title: string;
  dek: string;
  projectId?: string;
  date: string;
  status: "published" | "draft" | "research-note";
  readTime: string;
  tags: string[];
  kind: "build-note" | "research-note" | "retro" | "essay";
  visual: {
    type: "ascii-diagram" | "image" | "trace" | "graph";
    value: string;
  };
};
```

Do not treat this as final. It is a sketch of the fields the references imply.

## Routing options

Option A: simple route

- `/writing`
- `/writing/[slug]`

Pros:

- shareable,
- easy to index,
- easy static export.

Cons:

- may feel separate from the horizontal portfolio unless linked carefully.

Option B: writing panel plus routes

- Add "Field Notes" panel inside the horizontal portfolio.
- Also expose `/writing` and `/writing/[slug]`.

Pros:

- integrates with current portfolio story,
- keeps shareable article pages.

Cons:

- more design work to keep panel readable on mobile and desktop.

Option C: project pages with notes

- `/projects/[id]`
- writing appears inside project pages as logs/notes.

Pros:

- projects and writing are naturally connected.

Cons:

- less obvious as a blog unless a top-level writing index also exists.

## Visual implementation ideas

Use existing language selectively:

- The current `AsciiFrame`, `TerminalBlock`, `TagChip`, and pixel components can inspire structure, but should likely be redesigned for a light theme.
- Preserve the ideas of logs, traces, metadata, and diagrams.
- Do not preserve the dark terminal styling by default.

Light-theme component directions:

- `NoteIndex`: clean list/grid of project notes on paper-like background.
- `ArtifactCard`: preview card with a diagram, screenshot, trace, or object.
- `ArticleShell`: readable page with generous margins, clear metadata, and no heavy dark panel.
- `MetaRail`: project, stack, status, repo, date, read time.
- `SystemDiagram`: thin-line or subtle-color diagrams.
- `TraceBlock`: light-background log blocks with restrained monospace text.
- `ProjectNoteLink`: project-to-writing connection.

## Diagram strategy

Do not build a large diagram engine at first.

Start with 3-5 hand-authored diagrams that match Sher's actual projects:

- Fact Graph timeline.
- Agent debugging loop.
- Curriculum gap pipeline.
- Data agent stack.
- Clinical entity graph.

Use simple React/CSS/SVG/ASCII first. Add interactivity only when it helps the reader understand something that static diagrams cannot.

## Avoid these traps

- Do not copy Alana's macOS desktop. It is unique to her site and expensive to build.
- Do not copy Arjun's exact card layout or ML guide style.
- Do not make a generic blog template that ignores Sher's systems/research identity.
- Do not put a marketing hero in front of the writing.
- Do not make every article a card inside a card.
- Do not over-index on animations before the reading experience works.
- Do not require CMS/database infrastructure for the first writing pass.
- Do not accidentally keep the old dark terminal theme just because the current codebase uses it.

## Future build checklist

Before coding later:

- Confirm the light-theme visual direction first.
- Decide the light palette and typography system.
- Decide whether writing is called "Writing", "Field Notes", "Build Logs", or "Lab Notes."
- Decide whether the first release has 3 polished notes or many stubs.
- Pick the first project note to write fully.
- Decide article authoring format: TypeScript data, Markdown, or MDX.
- Decide whether project cards link to notes.
- Decide diagram style: ASCII, pixel, SVG, or mixed.
- Confirm mobile reading layout before adding desktop flourish.
