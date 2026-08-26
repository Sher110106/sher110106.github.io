# Sher Partap Singh

Personal research portfolio for Sher Partap Singh, an AI researcher-engineer at Plaksha University. The site covers trustworthy AI, clinical NLP, language-model evaluation, reinforcement-learning diagnostics, agent systems, and education projects.

The homepage is a chapter-based horizontal narrative on desktop and a stacked reading experience on mobile. `/writing` contains ten complete project and research field notes. The site also hosts a downloadable résumé at `/resume.pdf`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```

The production build uses Next.js static export and writes the deployable site to `out/`.

## Content map

- `src/data/content.ts`: profile, experience, projects, research, leadership, and contact information
- `src/data/essays.ts`: writing-index metadata
- `src/data/writeups.ts`: complete field-note content
- `public/projects/`: generated editorial research illustrations
- `public/resume.pdf`: current downloadable résumé

## Deployment

```bash
npm run deploy
```

This builds the static export and copies it to the repository root for GitHub Pages.
