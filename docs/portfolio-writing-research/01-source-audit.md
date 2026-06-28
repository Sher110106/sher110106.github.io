# Source audit

## User-provided links

| Source | Access result | Local research artifact | Notes |
| --- | --- | --- | --- |
| `https://github.com/virkvarjun/arjunvirk.com.git` | Accessed and shallow-cloned | `.firecrawl/repos/arjunvirk.com/` | Used to inspect content model, writing categories, project structure, and diagram-heavy article architecture. |
| `https://arjunvirk.com` | Accessed with Firecrawl after retry | `.firecrawl/references/arjun-live.json` | First live scrape failed with a Firecrawl tunnel error, retry succeeded. |
| `https://github.com/alanagoyal/alanagoyal.git` | Accessed and shallow-cloned | `.firecrawl/repos/alanagoyal/` | Used to inspect app metaphor, README architecture, and desktop/window system structure. |
| `https://alanagoyal.com` | Accessed with Firecrawl | `.firecrawl/references/alana-live.json` | Captured live Notes/Desktop content and app-like site behavior in markdown. |
| `https://www.chloeyan.me/ferry` | Accessed with Firecrawl | `.firecrawl/references/chloeyan-ferry.json` | Markdown extraction is sparse because the page is mostly a visual/interactive timetable. Screenshot URL was captured by Firecrawl. |
| `https://rotating.parts/` | Accessed with Firecrawl | `.firecrawl/references/rotating-parts.json` | Markdown mostly exposes repeated linked part images; the value is the single-idea visual grid. Screenshot URL was captured. |
| `https://aidanjs.com/` | Accessed with Firecrawl | `.firecrawl/references/aidanjs.json` | Text extraction is minimal: homepage title, about/blog links, metadata. Screenshot URL was captured. |
| `https://leerob.com/writing` | Accessed with Firecrawl | `.firecrawl/references/leerob-writing.json` | Clean writing index extracted successfully. |
| `https://leerob.com/` | Accessed with Firecrawl | `.firecrawl/references/leerob-home.json` | Homepage copy extracted successfully. |
| `https://www.okfrank.co/` | Accessed with Firecrawl | `.firecrawl/references/okfrank.json` | About page text extracted successfully. |

## User-provided screenshots

| Screenshot | Observed content | Notes |
| --- | --- | --- |
| `/Users/sher/Desktop/Screenshot 2026-06-28 at 2.12.20 PM.png` | okfrank.co page portion | Sparse bio/contact copy on warm background, underlined text links, large hand-drawn line illustration of a landscape/bridge. |
| `/Users/sher/Desktop/Screenshot 2026-06-28 at 2.13.38 PM.png` | personal portfolio page for "Syahdan" | White canvas, playful stamp-like portrait, sticker label intro, lowercase sentence stack, extremely direct personal copy, visible email. |

## Access limitations

- No source was permanently inaccessible.
- `arjunvirk.com` failed once through Firecrawl with `ERR_TUNNEL_CONNECTION_FAILED`, then succeeded on retry.
- Some sites are intentionally visual/interactive, so Firecrawl markdown is not enough to fully understand motion and layout. For those, the captured screenshot URLs and local screenshot inspection were more useful than text extraction.

## Visual screenshot follow-up

The Firecrawl screenshots for Chloe, rotating.parts, and Aidan were downloaded locally to `.firecrawl/screenshots/` and visually inspected after the initial markdown pass:

- `.firecrawl/screenshots/chloeyan-ferry.png`
- `.firecrawl/screenshots/rotating-parts.png`
- `.firecrawl/screenshots/aidanjs.png`

This corrected an important earlier assumption: Aidan's markdown is sparse, but the page itself is visually loud and highly designed.

## Current portfolio context

The existing portfolio is a Next.js single-page horizontal scroll experience with:

- dark terminal/pixel aesthetic,
- chapter-style panels,
- animated particle background,
- project cards,
- mono typography,
- existing content source at `src/data/content.ts`,
- static export configured through `next.config.ts`.

The future direction has now changed: the revamp should be light-themed. The current site remains useful for understanding Sher's content, structure, and systems identity, but the next design should move away from the dark terminal atmosphere.

The future writing section should not become a generic white blog. It should be light, readable, and distinctive: more like a lab notebook, research desk, system board, or visual field guide than a default blog template.
