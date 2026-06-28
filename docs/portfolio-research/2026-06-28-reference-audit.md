# Portfolio Inspiration Audit

Date: 2026-06-28
Project: `sher110106.github.io`
Goal: collect inspiration for a future writing/blog extension without implementing it yet.

## What I looked at

### Source repos
- Arjun Virk repo: https://github.com/virkvarjun/arjunvirk.com.git
- Alana Goyal repo: https://github.com/alanagoyal/alanagoyal.git

### Live sites
- https://www.chloeyan.me/ferry
- https://rotating.parts/
- https://aidanjs.com/
- https://leerob.com/writing
- https://leerob.com/
- https://www.okfrank.co/

### Your current site context
- Home route in `src/app/page.tsx`
- Existing content model in `src/data/content.ts`
- There is a `src/app/writing/` folder, but I could not confirm a page file inside it from the current tree.

## Current Repo Context

Your current site already has a strong identity:
- horizontal chapter-based storytelling
- cinematic, slightly sci-fi framing
- strong conceptual themes: observer, builder, researcher, leader, future
- project cards already exist in content data, but there is no mature public writing surface yet

The most important constraint for future design work is this: a writing/blog section should feel like an extension of your current voice, not a separate template dropped onto the site.

## Cross-Site Patterns That Actually Matter

Across the references, the strongest patterns are not just "minimal design". They are:

1. **A sharp personal premise**
   - The site is not just a résumé.
   - It feels like a lens into how the person thinks.

2. **Few visual ingredients, used consistently**
   - 1–2 type systems
   - very small color palette
   - generous spacing
   - a repeated structural motif

3. **Writing and projects are treated as equal proof**
   - Projects show capability.
   - Writing shows taste, thought process, and originality.

4. **Specificity over completeness**
   - Strong portfolios do not explain everything.
   - They choose a few memorable ideas and repeat them with confidence.

5. **A signature device**
   - diagrams
   - notebook / app metaphor
   - annotated lists
   - unusual grid / gallery behavior
   - personal artifacts, timestamps, sketches, or references

This is probably the biggest lesson for your portfolio: uniqueness comes less from animation and more from a repeated worldview.

## Reference-by-Reference Notes

## 1. Arjun Virk
- Repo: https://github.com/virkvarjun/arjunvirk.com.git
- Relevant files read:
  - `.firecrawl/portfolio-research/repos/arjunvirk.com/src/app/page.tsx`
  - `.firecrawl/portfolio-research/repos/arjunvirk.com/src/app/writing/page.tsx`
  - `.firecrawl/portfolio-research/repos/arjunvirk.com/src/app/globals.css`
  - `.firecrawl/portfolio-research/repos/arjunvirk.com/src/lib/data.ts`

### Visual cues
- Minimal single-column / narrow-column reading experience.
- Soft off-white background instead of pure white.
- Serif typography creates a research-journal tone.
- Dense but calm information blocks: image, bullets, work list, writing index.
- Writing gets a dedicated route, but the homepage also signals it clearly.
- The diagrams and chapter structure appear to be treated as a first-class part of the writing identity rather than decoration.

### Structural cues
- Data-driven content model for projects and writing categories.
- Writing is split into categories like a guide, reflections, and notes.
- Project cards combine image + category + date + one precise paragraph.
- Home page uses a restrained personal intro followed by proof-of-work.

### Tone cues
- Intelligent without sounding corporate.
- Specific achievements are listed plainly, but not over-sold.
- "Reflections, raw and unedited" is a strong example of giving writing a human frame.

### What is worth borrowing
- The feeling of seriousness created by typography and spacing.
- Treating writing as part of the portfolio, not a side tab.
- Diagrams as explanatory artifacts.
- Narrow reading width for long-form text.

### What not to copy directly
- The exact serif-academic aesthetic.
- The exact information density and page rhythm.
- The specific chapter / ML guide framing.

### Best fit for your site
- Use his level of editorial restraint, not his exact look.
- Borrow the idea that each major project can have both a card and a written artifact.
- A future writing section for you could combine: project story, systems diagram, lessons, and what changed in your thinking.

## 2. Alana Goyal
- Repo: https://github.com/alanagoyal/alanagoyal.git
- Relevant files read:
  - `.firecrawl/portfolio-research/repos/alanagoyal/README.md`
  - `.firecrawl/portfolio-research/repos/alanagoyal/app/page.tsx`
  - `.firecrawl/portfolio-research/repos/alanagoyal/app/home-client.tsx`
  - `.firecrawl/portfolio-research/repos/alanagoyal/app/globals.css`
  - `.firecrawl/portfolio-research/repos/alanagoyal/docs/document-apps.md`

### Visual cues
- The website is the metaphor.
- Instead of showing content inside a normal portfolio shell, the whole shell becomes a desktop operating system.
- Notes are not "blog posts" visually; they are notes inside a notes app.
- The UI choice itself becomes the brand differentiator.

### Structural cues
- Heavy app-shell architecture.
- Multiple app metaphors: notes, messages, finder, photos, calendar, terminal.
- Notes are public content, but they inherit the logic and feel of the product shell.
- The repo README is unusually explicit about product behavior, which signals that the experience is carefully designed rather than casually themed.

### Tone cues
- Casual, lowercase, playful, highly internet-native voice.
- Content feels like it belongs to a person, not a polished institution.
- The product clone aesthetic makes the site memorable immediately.

### What is worth borrowing
- The idea that content can live inside a strong metaphor.
- Turning a normal section into something experiential.
- Making writing feel discovered, opened, or browsed instead of merely listed.

### What not to copy directly
- A full desktop clone would overpower your current site identity.
- Replicating the exact Apple metaphor would feel derivative quickly.
- High-complexity shell behavior is probably too much for the scope of "expand portfolio with writing and project storytelling."

### Best fit for your site
- Use a lighter metaphor, not a full OS.
- For example: lab notebook, field notes, system logs, research dossier, build archive, casefile, or timeline.
- The lesson is not "make a notes app"; the lesson is "make the content feel like it lives somewhere specific."

## 3. Chloe Yan — SF Ferry
- Site: https://www.chloeyan.me/ferry

### What I could extract reliably
- The page appears to be a live ferry departures board with highly visual, dynamic information design.
- The extracted content was noisy and incomplete, which usually happens with dynamic UI-heavy pages.

### Visual / conceptual inference
- The idea is strong because it is extremely narrow and specific.
- It feels like a tiny product, not a portfolio page.
- Uniqueness comes from obsession with one thing and turning it into an artifact.

### What is worth borrowing
- A standalone micro-experience can make a portfolio unforgettable.
- Specificity beats general polish.
- An interface inspired by transit boards / live systems / monitors could fit your systems-and-temporal-reasoning identity well.

### Access limitation
- I could not reliably extract enough structured visual detail from this page to document layout specifics with confidence.

## 4. rotating.parts
- Site: https://rotating.parts/

### What I could extract reliably
- The page output is dominated by linked part images and catalog-like references.
- The site appears highly image-led and object-centric.

### Visual / conceptual inference
- The site likely wins through repetition, curation, and unusual subject matter.
- It treats objects as visual content, not just supporting assets.
- The experience likely feels archival, catalog-like, and intentionally obsessive.

### What is worth borrowing
- Curatorial confidence.
- Repetition as identity.
- The idea that your projects can be presented as a collection of artifacts instead of generic case-study cards.

### Access limitation
- I could not reliably recover the full visual structure from the live site with enough fidelity to make strong claims about layout mechanics.

## 5. Aidan Smith
- Site: https://aidanjs.com/
- Pages read:
  - https://aidanjs.com/about
  - https://aidanjs.com/blog

### Visual cues
- Extremely stripped-back interface.
- Very little between the reader and the person.
- Link-first, text-first, no pressure to perform visually.

### Tone cues
- Informal in a very human way.
- Slightly literary and self-aware.
- Uses personal details, quirks, and side interests to prevent the site from becoming purely professional.
- Example pattern: serious accomplishments are placed beside playful or very personal lines.

### What is worth borrowing
- Letting personality interrupt achievement.
- Using side details to make the writer feel real.
- Giving blog post titles a slightly essay-like quality instead of SEO-title energy.

### Best fit for your site
- This could be useful for your about-writing voice more than your visual direction.
- You can retain intellectual seriousness while sounding more lived-in.

## 6. Lee Robinson
- Site: https://leerob.com/
- Writing index: https://leerob.com/writing
- Article read: https://leerob.com/agents

### Visual cues
- Clean, direct, low-friction design.
- Strong hierarchy without visual gimmicks.
- Writing list is simple because the quality and clarity of titles do most of the work.

### Tone cues
- Conversational but highly structured.
- Starts from a concrete event or problem.
- Explains technical ideas in plain language.
- Uses short sections and strong subheads.
- Builds trust through specificity: numbers, costs, tradeoffs, what changed, what surprised him.

### Writing mechanics worth noting
- Opens with a story or real-world trigger.
- Then broadens to principle.
- Alternates between explanation and opinion.
- Uses examples to keep abstract ideas grounded.
- Ends with a strong takeaway that feels earned, not motivational.

### What is worth borrowing
- Article structure and clarity.
- Strong title + subtitle + date patterns.
- The ability to make technical topics readable to broader audiences.
- A homepage that highlights a few flagship pieces instead of everything.

### Best fit for your site
- Very relevant for future project writeups.
- Especially useful if you want to explain AI systems, healthcare reasoning, or debugging infrastructure to recruiters, collaborators, and peers.

## 7. Frank
- Site: https://www.okfrank.co/
- Additional page checked: https://www.okfrank.co/storm-system

### Visual cues
- Highly controlled art-direction.
- Sparse page, but with strong imagery and confident spacing.
- The page feels designed by selection, not by volume.

### Tone cues
- Career summary is written with narrative momentum instead of résumé bullets.
- Uses selective linking to create an ecosystem around each claim.
- The writing sounds confident and embedded in product/design culture.

### What is worth borrowing
- Writing a career arc as a sequence of design bets or product ideas.
- Using links as proof, not as clutter.
- Letting fewer, stronger visuals carry more weight.

### Best fit for your site
- Useful reference for writing your project ecosystem more elegantly.
- Instead of listing every stack item, connect each project to the larger question it addresses.

## Visual Inspection Audit (New)

Based on the actual screenshots I just captured, here are the direct visual cues I am seeing that we can draw inspiration from:

#### 1. Aidanjs (aidanjs-home.png)
- **Visual Cues:** Extremely minimal. Text-focused. Relies on layout density to signal hierarchy (smaller, lighter text for secondary info; bold for titles). No large imagery.
- **Inspiration:** You don't need a heavy design to look thoughtful. If you focus on excellent typography and rhythm, you can get away with a very sparse interface.

#### 2. Chloe Yan - Ferry (chloeyan-ferry.png)
- **Visual Cues:** Data-as-design. The page looks like a transit board. It uses high-contrast, clean tabular layouts. It treats temporal information (departures, times) as the primary aesthetic.
- **Inspiration:** Treat your project data like a system monitor or a live dashboard. If your portfolio is about "systems," make the layout look like a system control panel.

#### 3. Lee Rob (leerob-home.png, leerob-writing.png)
- **Visual Cues:** Very tight, predictable grid. No wasted pixels. Articles are treated as a clean list of titles and dates. The focus is entirely on clarity and speed of navigation.
- **Inspiration:** Your project-essay index doesn't need to be fancy. It just needs to be incredibly legible and easy to scan.

#### 4. Rotating Parts (rotating-parts-2.png)
- **Visual Cues:** Object-led. It’s essentially a visual grid of mechanical or distinct parts. It looks like a catalog or an archive.
- **Inspiration:** If you have projects that are distinct, treat them as a "collection" rather than a list. Use a high-quality visual grid where each card is a high-fidelity artifact.

#### 5. Okfrank (okfrank-home.png)
- **Visual Cues:** Dramatic use of white space. Large-scale headings but very sparse content per view. Feels "curated" rather than "exhausted."
- **Inspiration:** You don't need to show everything. Show a few key bets, explain them confidently, and trust the reader to click through for more.



## 1. Your site should not become "a blog page"
A generic blog tab would undersell your work. The better move is a **project writing system**:
- project card
- deeper writeup / field note / build log
- diagram or timeline
- maybe one recurring artifact per article

## 2. Your strongest differentiator is temporal and systems thinking
Your content already circles around:
- progression over time
- memory and reasoning
- agents and infrastructure
- human impact in healthcare / education

That suggests a future design language inspired by:
- timelines
- dossiers
- incident logs
- report fragments
- research annotations
- system maps

This would feel more native to you than a plain notes app or academic blog template.

## 3. A signature artifact matters more than a fancy layout
Across the references, memorability often comes from one repeatable element:
- Arjun: diagrams + editorial research feel
- Alana: app-shell metaphor
- Chloe: ultra-specific live utility
- rotating.parts: obsessive catalog curation
- Lee: clear technical essays with strong titles
- Frank: art-directed restraint

For you, the equivalent could be one of:
- a systems diagram per major writeup
- a timeline strip per project
- "what changed" snapshots across versions
- an evidence / artifact block: screenshots, traces, snippets, outputs
- a research-note margin style

## 4. Writing should reveal process, not just outcomes
The references feel strong when they answer some version of:
- why this problem mattered
- what made it difficult
- what changed in my thinking
- what I learned that wasn’t obvious at the start

That is much stronger than:
- here is project name
- here is stack
- here is result

## 5. Uniqueness should stay within your current brand
Your current homepage already has a dramatic, concept-driven identity. The safest high-upside move is:
- keep the current world-building
- add a calmer reading mode for long-form writing
- connect articles back to the main site's language of systems, chapters, and progression

## Risks To Avoid Later
- Copying a minimal portfolio so closely that your current identity disappears.
- Adding a writing section that feels like a default template bolted onto a cinematic homepage.
- Making article pages so visually clever that reading becomes tiring.
- Overbuilding a metaphor-heavy shell before proving the editorial structure.
- Writing articles that sound like polished school reports instead of real thought.

## Access Gaps / Things I Could Not Verify Well
- `https://www.chloeyan.me/ferry` was difficult to extract faithfully because of its dynamic, UI-heavy nature.
- `https://rotating.parts/` was also difficult to extract beyond its image/object-heavy surface.
- You provided two screenshot paths on your desktop, and I confirmed the files exist and their dimensions, but I could not reliably inspect their visual content in a way I trust enough to cite here.

## Bottom-Line Direction

The strongest non-copy direction for your portfolio is:

**"A writing system for projects, research, and systems-thinking artifacts"**

not

**"a generic blog page"**

The references suggest a good blend for you would be:
- Arjun's editorial restraint and diagram seriousness
- Lee's clarity and technical storytelling
- Aidan's human, slightly unguarded voice
- Alana's lesson that content should live inside a memorable frame
- Frank's art-direction and narrative selectivity
- Chloe / rotating.parts' lesson that specificity creates uniqueness
