export interface Essay {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  summary: string;
  type: "project-essay" | "reflection" | "research-note";
  tags: string[];
  projectId?: string; // Links back to Project.id
}

export const essays: Essay[] = [
  {
    slug: "finding-frame",
    title: "When a nodule becomes a lesion",
    subtitle: "Teaching a clinical system to remember findings across reports",
    date: "Spring 2026",
    summary:
      "A field note on evidence-anchored extraction, anatomy normalization, paired-report reasoning, and deterministic tracking for longitudinal radiology intelligence.",
    type: "project-essay",
    tags: ["Clinical NLP", "Longitudinal Reasoning", "Evidence Gating", "Oncology"],
    projectId: "fact-graph",
  },
  {
    slug: "multi-agent-debugging",
    title: "Debugging websites by watching them fail",
    subtitle: "Turning autonomous browser sessions into engineering case files",
    date: "January 2025",
    summary:
      "What Bugzer captures while an agent navigates a website, and why useful debugging starts with preserving the evidence around a failure.",
    type: "project-essay",
    tags: ["Multi-Agent Systems", "Browser Automation", "Developer Tools"],
    projectId: "bugzer",
  },
  {
    slug: "curriculum-gap-analyzer",
    title: "Finding the missing concepts between two courses",
    subtitle: "Using imperfect academic documents to make transfer learning less opaque",
    date: "Summer 2025",
    summary:
      "How OCR and embeddings turned inconsistent curriculum documents into an explorable list of concepts that may need attention.",
    type: "project-essay",
    tags: ["AI for Education", "OCR", "Embeddings"],
    projectId: "curriculum",
  },
  {
    slug: "autonomous-data-narrator",
    title: "Teaching a spreadsheet to explain itself",
    subtitle: "From CSV and Excel files to charts, summaries, and useful questions",
    date: "Summer 2025",
    summary:
      "A build note on making the first pass through a dataset more accessible without hiding the analysis behind a single generated answer.",
    type: "project-essay",
    tags: ["Data Analysis", "Streamlit", "ML"],
    projectId: "streamlit",
  },
  {
    slug: "adapt-rag",
    title: "When every query does not need the same verifier",
    subtitle: "Routing RAG claims to the right level of factuality checking",
    date: "May 2026",
    summary:
      "A field note on a no-training-data router that chooses between sentence-level and atomic-level NLI verification for retrieval-augmented generation.",
    type: "research-note",
    tags: ["RAG", "Hallucination Detection", "Evaluation"],
    projectId: "adapt-rag",
  },
  {
    slug: "sac-failure-regimes",
    title: "When a failed run is not the end",
    subtitle: "Mapping recoverable failure regimes and an entropy-coefficient early-warning signal in SAC",
    date: "2026",
    summary:
      "How branched interventions turn a stalled reinforcement-learning run into a question about recoverability, not just reward, and how SAC's auto-tuned entropy coefficient can flag the difference before reward does.",
    type: "research-note",
    tags: ["Reinforcement Learning", "Robustness", "Failure Analysis", "Diagnostics"],
    projectId: "sac-failure",
  },
  {
    slug: "tempmsg",
    title: "Forecasting behavior on a graph that keeps changing",
    subtitle: "Temporal multilingual social-graph learning for multitask forecasting",
    date: "2025–2026",
    summary:
      "A field note on forecasting activity and behavioral targets across multilingual social graphs, including cold-start users without retraining.",
    type: "research-note",
    tags: ["Temporal Graphs", "Social Computing", "Forecasting"],
    projectId: "tempmsg",
  },
  {
    slug: "experimental-design-assistant",
    title: "A research plan is easier to inspect in stages",
    subtitle: "A goal-driven agent for planning machine-learning experiments",
    date: "Project",
    summary:
      "How a five-step LLM workflow makes research planning legible by keeping intermediate decisions visible and failures isolated.",
    type: "project-essay",
    tags: ["LLM Agents", "Research Tools", "Evaluation"],
    projectId: "experimental-design",
  },
];
