# Content directions for Sher

## Core positioning

The writing section should make projects visible by showing the thinking behind them.

A useful framing:

> I write field notes on systems I build: what broke, what changed, what I learned, and what I would rebuild.

This fits the existing portfolio because it already presents Sher as observer, builder, researcher, leader, and future-focused engineer.

## Possible section names

- Field Notes
- Build Notes
- Lab Notes
- System Notes
- Project Logs
- Notes From the Build
- Things I Built

Best fit right now: `Field Notes`.

Why:

- less generic than "Blog",
- works for research and projects,
- can hold polished essays and rough notes,
- matches the observer/researcher identity.

## First note candidates

### 1. The Fact Graph

Possible titles:

- Teaching a clinical system to remember
- When a nodule becomes a lesion
- Why medical AI needs memory, not just extraction

Core story:

- The challenge is longitudinal continuity.
- Reports use changing language over time.
- The system needs to connect findings, evidence, and temporal change.
- The diagram should show a timeline plus graph.

### 2. Bugzer

Possible titles:

- Debugging websites by watching them fail
- What an agent sees before it explains a bug
- Turning vague bug reports into case files

Core story:

- Most bug reports lose the evidence.
- Browser agents can capture traces while acting like users.
- Useful output should feel like an engineering case file.
- The diagram should show observe -> act -> capture -> diagnose.

### 3. Curriculum Gap Analyzer

Possible titles:

- Finding the missing concepts between two courses
- The PDFs were the interface
- Comparing curricula without pretending syllabi are clean

Core story:

- Transfer learning between academic systems is messy.
- Course docs are inconsistent.
- OCR and embeddings help, but the product challenge is explainability.
- The diagram should show PDF -> OCR -> concept map -> gap list.

### 4. Streamlit Data Agent

Possible titles:

- Teaching a spreadsheet to explain itself
- From raw CSV to first useful question
- Data analysis as a conversation with evidence

Core story:

- Spreadsheets often arrive without a narrative.
- The agent should profile, chart, summarize, and ask useful next questions.
- The article can show before/after examples.

## Article template

Use this as a writing scaffold:

```md
# Title

One-sentence deck: what the note is about and why it matters.

## The thing that started it

Concrete situation. No generic intro.

## The awkward part

What made the project harder than it sounded.

## The system shape

Diagram plus explanation.

## What worked

Specific decisions that held up.

## What I would change

Honest next version.

## Links

Repo, demo, paper, screenshots, related notes.
```

## How informal should it be?

Recommended level:

- More informal than a research abstract.
- More structured than a diary.
- Avoid forced jokes.
- Use first person when discussing decisions.
- Use technical language when it is needed, but explain the reason behind it.

Example direction:

> I thought the hard part would be extraction. It wasn't. The hard part was identity across time.

This is better than:

> This project leverages LLMs for longitudinal multimodal clinical intelligence.

Both can appear, but the first should lead.

## Visual identity for the writing section

Future revamp direction:

- The website should become light themed.
- The writing section should be designed as part of that light revamp, not as a dark panel bolted onto the current site.
- The result should feel readable, open, and artifact-rich.

Keep conceptually:

- chapter-like structure,
- system language.
- project evidence,
- diagrams,
- notes/logs/traces as content objects.

Add:

- calmer article pages,
- small diagrams,
- project-linked metadata,
- fewer animations during reading,
- strong note titles.
- light backgrounds,
- thin line work,
- generous whitespace,
- object-specific visuals,
- paper/notebook/field-guide energy.

Avoid:

- generic white blog,
- overly polished corporate case-study writing,
- copying macOS/Apple UI,
- copying Arjun's exact card system,
- adding too much explanation text inside the app UI.
- keeping the current dark theme as the default for the revamp.
