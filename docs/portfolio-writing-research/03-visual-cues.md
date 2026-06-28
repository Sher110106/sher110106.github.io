# Visual cues

## Patterns worth noticing

### 1. One strong metaphor beats generic polish

Several references are memorable because they commit to one metaphor:

- Alana: personal website as macOS desktop.
- Chloe: ferry departure board as a floating 3D object in a quiet room.
- rotating.parts: rotating grid/catalog of parts.
- Aidan: orange field of repeated illustrated eyes, with eye-shaped nav.
- Syahdan screenshot: personal page as a small handmade/stamp identity sheet.
- okfrank screenshot: written bio plus large hand-drawn landscape.

For Sher, the strongest metaphors are already nearby:

- agent console,
- clinical timeline,
- lab notebook,
- debug trace,
- knowledge graph,
- system schematic,
- file tree,
- experiment log.

### 2. Visual diagrams should explain the work

Arjun's site makes diagrams part of the writing system, not decoration. The diagrams appear tied to chapters and technical concepts.

For Sher, useful original diagrams could include:

- longitudinal radiology timeline: report A -> report B -> entity match -> change label,
- fact graph: patient -> finding -> attribute -> evidence -> time,
- agent debugging loop: observe -> act -> capture telemetry -> diagnose -> report,
- OCR/embedding curriculum pipeline: PDF -> OCR -> concepts -> embedding match -> gaps,
- Streamlit data agent: upload -> profile -> chart -> summary -> decision.

### 3. Use density intentionally

There are two useful density modes:

- Lee and okfrank: low density, prose-first, easy scanning.
- Arjun and Alana: high density, many artifacts, strong organization.

Sher's current portfolio is already dense and atmospheric. The writing section should probably introduce calmer reading surfaces while keeping the terminal identity.

### 4. Keep the "object" visible

The best references do not hide the object:

- Chloe shows the ferry board.
- rotating.parts shows the parts.
- Alana shows the desktop/notes/messages.
- Arjun shows project images and diagrams.
- okfrank shows the drawing.

For Sher, each writing item should show a visible object:

- a mini system diagram,
- a screenshot,
- a trace/log excerpt,
- a paper figure,
- a notebook-like excerpt,
- a compact data flow.

### 5. A single drawing can soften technical content

The okfrank screenshot uses a big hand-drawn line illustration to give warmth to otherwise sparse text. Sher's site is more technical and dark, so an equivalent could be:

- hand-drawn-style ASCII schematic,
- pixel schematic,
- low-fi diagram in amber/green terminal colors,
- graph lines that look like a research notebook,
- small "field sketch" panels.

### 6. Minimal pages still need hierarchy

Lee's writing page works because it has:

- a clear heading,
- authorship signal,
- one list,
- strong titles.

Syahdan's screenshot works because it has:

- one portrait object,
- one intro sticker,
- large sentence stack,
- small footnote,
- direct contact.

If Sher adds a writing index, it should not become a plain dump. It needs hierarchy:

- featured build notes,
- research notes,
- project retrospectives,
- reading/thinking logs,
- maybe "shipped", "drafting", "research note" status.

## Color and surface notes

Current portfolio palette:

- deep brown/black background,
- amber accents,
- rose,
- cream text,
- muted gray,
- terminal green,
- violet glow.

Important revamp direction:

- The new site should be light themed.
- The current dark terminal look should be treated as old context, not the target.
- The revamp should feel cleaner, brighter, more readable, and more open.
- The light theme should still feel technical and personal, not generic startup-white.

Reference palette lessons:

- okfrank: warm cream background plus black line art.
- Syahdan: white background plus gray text and playful image treatment.
- Lee: minimal, text-first.
- Alana: OS-style surfaces and icons.
- Arjun: image cards and educational diagrams.

Recommended adaptation:

- Move to a light base: warm white, paper, off-white, or very pale gray.
- Use black/charcoal for primary text and restrained accent colors for system states.
- Keep technical personality through diagrams, type, layout, and artifacts rather than a dark terminal background.
- Use softer article surfaces for readability.
- Use color sparingly: one or two accent colors for links, active states, diagrams, and status markers.
- Avoid making the writing page too card-heavy. Cards can preview notes, but article pages should breathe.

Possible light palette directions:

- Warm paper: `#F7F2EA`, charcoal text, muted amber/rust accents, thin black line diagrams.
- Clinical notebook: `#F8FAF7`, graphite text, green/blue status accents, subtle grid lines.
- Research desk: white/off-white base, gray rules, black text, small colored tags, diagram-first visuals.
- Technical field guide: pale background, monospaced metadata, serif or humanist body text, hand-drawn/system diagrams.

## Typography direction

Chosen rare pairing for the revamp:

- body / essays: **Literata**
- headings / labels / metadata: **Recursive Mono**

Why this direction:

- It avoids the common Inter / Geist / JetBrains Mono portfolio look.
- Literata gives the site a literary, field-note, research-archive quality.
- Recursive Mono keeps the systems/technical identity without feeling like a default terminal clone.
- The pairing supports a light theme that feels distinctive rather than generic.

Usage guidance:

- Use Literata for readable project writing, article bodies, reflective prose, and longer descriptions.
- Use Recursive Mono for metadata, status labels, project tags, diagram labels, timestamps, nav, and small UI text.
- Test headings in both fonts during design: Recursive Mono for technical/system pages, Literata for more editorial article pages.

Fallback if either font becomes impractical:

- body: a Charter-like serif or Newsreader,
- mono: IBM Plex Mono or Commit Mono.

## Interaction ideas for later

These are not implementation decisions yet:

- Writing index as a "field notes" panel.
- Project cards can include "read note" links.
- Each article opens with a small schematic, not a hero image.
- A side rail can show metadata: project, date, stack, status, repo link.
- Articles can include collapsible "trace" or "what broke" blocks.
- Long technical posts can include interactive mini-diagrams only when the concept benefits from manipulation.
- A "notebook index" can group notes by project rather than date.

## Specific visual observations from follow-up screenshots

### Chloe ferry page

- The page is mostly negative space.
- The main object is centered but not full-width; it feels like an exhibit.
- Perspective and shadow do a lot of work.
- The board has a nostalgic public-infrastructure feel: transit, airport, train station, departure system.
- The small red timestamp gives life and real-time energy.

Possible Sher translation:

- A "clinical timeline board" floating in space.
- An "agent run board" with columns like task, observation, trace, status.
- A "lab departures" board where projects are not cards but rows moving through stages.

### rotating.parts

- The page is pure object inventory.
- Real cutout images make the site feel tactile and specific.
- There is no visible UI chrome, which makes the objects carry all personality.
- The whitespace is generous enough that each part remains inspectable.

Possible Sher translation:

- A grid of system artifacts: traces, graphs, reports, screenshots, paper figures, pipeline blocks.
- A "parts bin" for projects where each object opens a note.
- A visual index of build components rather than a text-only blog list.

### Aidan

- The strongest asset is the repeated eye motif.
- The orange background is loud and memorable.
- The title is huge and integrated with the pattern rather than isolated in a hero card.
- The nav is also part of the art direction, using larger green-irised eyes.
- The page proves that a personal site can be both minimal in information architecture and maximal in graphic identity.

Possible Sher translation:

- Repeated pixel/terminal/graph motifs could become wallpaper-like identity.
- A few nav elements could be embedded into a system diagram.
- The writing section could use repeated small "nodes", "findings", "agents", or "frames" as a motif instead of generic cards.

## Light-theme implications

The revamp should make the site feel more like:

- a research notebook,
- a clean project archive,
- a visual field guide,
- a lab desk with artifacts,
- a readable publication system.

It should feel less like:

- a dark cyber terminal,
- a game-like pixel scene,
- a hacker dashboard,
- a neon portfolio.

The key is not to remove Sher's systems identity. The key is to express it through light-theme objects:

- thin-line diagrams,
- table-like metadata,
- project artifacts,
- timeline boards,
- clean note pages,
- visual indexes,
- annotated screenshots,
- small schematics.
