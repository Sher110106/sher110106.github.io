# Development Notes For A Future Writing / Project Storytelling Section

Date: 2026-06-28
Scope: research-only notes, no implementation yet.

## Current Project Observations

### Existing structure
From the current repo:
- `src/app/page.tsx` drives a horizontal panel-based homepage.
- `src/data/content.ts` is the central content source for identity, chapters, projects, and supporting data.
- You already frame yourself through concepts and narrative chapters, not a standard landing page.
- There is a `src/app/writing/` directory in the tree, suggesting an intended writing route, but I could not verify a concrete page file inside it from the current file reads.

### What this means
A future writing system should probably be:
- content-driven, like your current `src/data/content.ts`
- visually calmer than the homepage
- connected to the chapter/world-building language already present
- capable of housing both project writeups and more personal reflections

## Direction That Fits This Codebase Best

The best design direction is not to turn the whole site into someone else's pattern.

The better move is:
- keep the current homepage as the dramatic front door
- create a quieter reading surface for long-form content
- link project cards to richer writeups
- use one repeated artifact per article, such as a diagram, timeline, system block, or evidence panel

## Content Architecture Options

## Option A — Simple editorial section
Shape:
- `/writing`
- `/writing/[slug]`
- optional categories: projects, notes, reflections

Pros:
- easiest to reason about
- pairs well with your current site
- minimal risk of design overreach

Cons:
- could feel too generic unless the article pages carry a distinctive signature

Best if:
- you want to ship quickly later
- the uniqueness will come mostly from writing quality and diagrams

## Option B — Project writing system
Shape:
- every major project has a card and a companion article
- writing index groups by project stories, research notes, reflections
- article template includes recurring blocks: context, challenge, system, artifacts, lessons

Pros:
- strongest fit for your stated goal
- projects become more visible and more understandable
- good bridge between recruiter scanning and deeper reading

Cons:
- needs stronger content discipline than a normal blog

Best if:
- the main goal is to make what you built feel legible and memorable

## Option C — Framed archive / dossier model
Shape:
- writing feels like lab notes, system files, casefiles, or timeline records
- a stronger visual metaphor ties the section together

Pros:
- most distinctive
- best chance of feeling truly yours

Cons:
- easiest to overdo
- could hurt readability if the frame is too heavy

Best if:
- the metaphor stays light and article reading remains straightforward

## Recommendation

If this were implemented later, the best path is probably:

**Option B with a light touch of Option C**

Meaning:
- build a writing system primarily around project stories and essays
- give it one memorable frame rooted in your themes: systems, timelines, progression, evidence
- keep the actual reading experience clean and readable

## Signature Elements Worth Exploring Later

Not all of these should be used. These are candidates.

### 1. Timeline strip
A small visual block showing phases:
- idea
- first attempt
- blocker
- pivot
- current state
- what changed

Why it fits:
- your work often depends on progression across time
- this connects directly to your research identity

### 2. System map / diagram block
A consistent diagram or schematic in each major post.

Why it fits:
- connects to Arjun-style seriousness without copying his exact aesthetic
- makes the post feel authored and teachable

### 3. Artifact rail
A side or in-flow set of project artifacts:
- screenshot
- output
- trace
- architecture image
- experiment note

Why it fits:
- helps your work get "seen somewhere," which you explicitly want
- turns invisible systems work into visible proof

### 4. What-changed section
A recurring section near the end:
- what I believed at the start
- what the project changed

Why it fits:
- encourages more original writing
- prevents posts from becoming static summaries

### 5. Linked project-to-writing loop
Each project card should eventually point to deeper material, and each article should link back to the project page or project summary.

Why it fits:
- improves discoverability
- reinforces that writing is part of the portfolio, not separate from it

## Development Notes From The References

## Arjun repo lessons
- Data-first content organization is clean and maintainable.
- Writing categories can coexist with project listings without clutter.
- Typography and narrow width do a lot of the work.
- A future version for your site could use structured content objects before introducing a CMS or anything more complex.

## Alana repo lessons
- A strong metaphor needs system-level consistency to feel convincing.
- If you choose any frame at all, keep it lighter than a full desktop shell.
- The lesson is to make the section feel like a place, not to recreate the exact product-shell complexity.

## Lee lessons
- Strong article titles and structure reduce the need for visual noise.
- If the writing becomes good enough, the index can stay simple.

## Frank lessons
- Fewer blocks, stronger art direction.
- Use links and images selectively.
- Treat evidence like curation, not decoration.

## Suggested Information Model Later

If you implement later, the content model will likely need fields such as:
- `slug`
- `title`
- `subtitle` or `dek`
- `date`
- `type` (`project-essay`, `reflection`, `research-note`, etc.)
- `summary`
- `relatedProjectId`
- `tags`
- `cover` or `artifact`
- `diagram`
- `status` (`draft`, `published`)

And for project cards:
- optional `writeupSlug`
- optional `artifacts[]`
- optional `timeline[]`

That would let the site connect projects and essays naturally.

## Reading Experience Principles Later

Whatever gets built later should follow these constraints:
- article pages must be easier to read than the homepage
- text width should stay controlled
- one strong visual idea is enough
- diagrams should support reading, not interrupt it
- mobile reading should feel first-class
- project stories should be scannable before they become deep

## What To Prepare Before Implementation Later

Before coding, it would help to prepare:
1. a shortlist of 3–5 projects worth writing about first
2. one sample article outline per project
3. a decision on the signature artifact: diagram, timeline, artifact rail, or note frame
4. a naming choice for the section: writing, notes, field notes, casefiles, etc.
5. a decision on whether reflections and project essays live together or separately

## Practical Non-Implementation Conclusion

The future feature should probably be defined as:

**Extend the portfolio into a project-writing system where major builds are visible both as cards and as readable, artifact-rich essays.**

That is more aligned with your current brand than either:
- a plain blog index
- a full app-shell gimmick
- or a copy of someone else's minimal portfolio

## Access Notes
- I confirmed the reference repos are reachable and inspected their source structure.
- I scraped the live pages you shared and used them where the extraction was reliable.
- `chloeyan.me/ferry` and `rotating.parts` were only partially legible through extraction because they are heavily visual/dynamic.
- I confirmed your two screenshot files exist on the desktop, but I could not inspect their visuals with enough confidence to include detailed notes from them.
