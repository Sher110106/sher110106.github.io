export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  period: string;
  spriteName: "fact_graph" | "agent" | "neuron" | "book" | "data";
  writeupSlug?: string;
  image?: string;
  status: string;
  category: "research" | "system" | "education";
  externalUrl?: string;
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
  asciiStyle: "double" | "round" | "box" | "heavy" | "dashed";
}

export const identity = {
  name: "SHER PARTAP SINGH",
  tagline: "AI RESEARCHER-ENGINEER · PLAKSHA UNIVERSITY",
  heroWords: ["I_BUILD", "INTELLIGENT", "SYSTEMS", "THAT_UNDERSTAND", "CHANGE"],
  heroSubtext:
    "I study how intelligent systems fail, verify evidence, and reason across time. My work spans clinical NLP, language-model evaluation, reinforcement-learning diagnostics, and agent infrastructure.",
  tags: [
    "Trustworthy AI",
    "Healthcare AI",
    "LLM Evaluation",
    "RL Diagnostics",
    "Agent Systems",
  ],
};

export const chapters: ChapterContent[] = [
  {
    id: "observer",
    number: 1,
    title: "THE OBSERVER",
    subtitle: "chapter_01.ts",
    body: "I began with a practical question: how do you find a reliable signal inside a messy system?\n\nAt Plaksha's Lab for Economic Behaviour in Organisations, I built data pipelines across fragmented sources. Later, in healthcare AI, the same question became harder. A useful clinical system must preserve evidence while language, measurements, and context change over time.\n\nThat habit of careful observation now shapes my work in model evaluation, reinforcement learning, and autonomous agents.",
    asciiStyle: "double",
  },
  {
    id: "builder",
    number: 2,
    title: "THE BUILDER",
    subtitle: "chapter_02.tsx",
    body: "Research becomes useful when the evaluation, tooling, and failure cases are as concrete as the idea.\n\nThese are selected systems and studies I have built across clinical intelligence, LLM verification, reinforcement learning, web agents, social forecasting, and education.",
    asciiStyle: "round",
  },
  {
    id: "researcher",
    number: 3,
    title: "THE RESEARCHER",
    subtitle: "chapter_03.py",
    body: "My research asks how AI systems can earn trust through evidence, diagnostics, and honest evaluation.\n\nIn clinical NLP, that means every extracted claim should remain traceable to its source. In RAG, verification effort should match query complexity. In reinforcement learning, internal training signals can reveal failure before reward makes it visible.\n\nI am now extending this thread toward AI safety, agent evaluation, robustness, and scalable oversight.",
    asciiStyle: "box",
  },
  {
    id: "leader",
    number: 4,
    title: "THE LEADER",
    subtitle: "chapter_04.md",
    body: "I care about the institutions around technical systems, not only the systems themselves.\n\nAt Plaksha, I contribute to student discussions on responsible AI adoption. I have mentored more than 80 high-school students, led community fundraising through Wings of Fire, and worked across research, teaching, and industry teams.\n\nGood technology needs clear explanations, accountable deployment, and people willing to question its limits.",
    asciiStyle: "heavy",
  },
  {
    id: "future",
    number: 5,
    title: "THE FUTURE",
    subtitle: "chapter_05.sh",
    body: "I am looking for research collaborations and graduate opportunities around trustworthy AI, evaluations, agent safety, and robustness.\n\nThe common thread is simple: build systems whose claims can be checked, whose failures can be understood, and whose behaviour remains legible to the people relying on them.",
    asciiStyle: "dashed",
  },
];

export const projects: Project[] = [
  {
    id: "fact-graph",
    title: "Finding Frame",
    subtitle: "Evidence-anchored longitudinal clinical tracking from radiology reports",
    description:
      "An evidence-anchored, six-slot pipeline for tracking radiology findings across time. The related Fact Graph paper was accepted at IntelliSys 2026; the extended FindingFrame system and benchmark paper is in preparation.",
    stack: ["LLMs", "Clinical NLP", "Temporal Reasoning", "Healthcare AI", "Knowledge Graphs", "Evidence Gating"],
    period: "Spring 2026",
    spriteName: "fact_graph",
    writeupSlug: "finding-frame",
    image: "/projects/finding-frame.webp",
    status: "Extended paper in preparation",
    category: "research",
  },
  {
    id: "adapt-rag",
    title: "AdaptRAG",
    subtitle: "Adaptive verification granularity for RAG hallucination detection",
    description:
      "A training-free router that sends simple queries through sentence-level verification and harder queries through atomic claim checking. On HotpotQA 1K, it reduced hallucination by 5.4 percentage points while routing 23.2% of queries through the expensive path.",
    stack: ["RAG", "NLI", "Hallucination Detection", "LLM Evaluation", "Python"],
    period: "2026",
    spriteName: "fact_graph",
    writeupSlug: "adapt-rag",
    image: "/projects/adapt-rag.webp",
    status: "Research manuscript",
    category: "research",
  },
  {
    id: "sac-failure",
    title: "SAC Failure Regimes",
    subtitle: "Recoverable and irrecoverable failure at high replay ratio",
    description:
      "A 530-job branched-intervention study of stalled reinforcement-learning runs. The experiments show that low-reward checkpoints are not one failure class: critic reinitialisation recovers some cohorts while others remain collapsed.",
    stack: ["Reinforcement Learning", "SAC", "Robotics", "PyTorch", "Experiment Design"],
    period: "2026",
    spriteName: "neuron",
    writeupSlug: "sac-failure-regimes",
    image: "/projects/sac-failure.webp",
    status: "Research manuscript",
    category: "research",
  },
  {
    id: "sac-alpha",
    title: "SAC's Entropy Coefficient",
    subtitle: "An implicit success signal in robotic manipulation",
    description:
      "A sole-author empirical study across 128 training runs and five Meta-World tasks. A two-sided entropy-coefficient threshold classified 23 of 24 seeds on the hardest tasks before reward divergence became clear.",
    stack: ["Reinforcement Learning", "Meta-World", "Stable-Baselines3", "Diagnostics"],
    period: "2026",
    spriteName: "neuron",
    writeupSlug: "sac-alpha-signal",
    status: "Accepted poster · CAISc 2026",
    category: "research",
    externalUrl: "https://openreview.net/forum?id=cylPMo1CeZ",
  },
  {
    id: "tempmsg",
    title: "TempMSG",
    subtitle: "Temporal multilingual social graph forecasting",
    description:
      "A compact encoder-decoder for forecasting activity and behavioural targets across temporal multilingual social graphs, including inductive cold-start prediction for unseen users.",
    stack: ["Graph Neural Networks", "State-Space Models", "Temporal Forecasting", "PyTorch"],
    period: "2025 – 2026",
    spriteName: "data",
    writeupSlug: "tempmsg",
    status: "Under review · SIGKDD 2027",
    category: "research",
  },
  {
    id: "bugzer",
    title: "Bugzer",
    subtitle: "Multi-Agent Debugging Infrastructure",
    description:
      "AI agents that navigate websites like users, inspect systems like engineers, and diagnose failures like investigators. Built scalable browser-automation pipelines capable of capturing console telemetry, network traces, screenshots, and performance metrics while generating LLM-assisted debugging recommendations.",
    stack: ["Multi-Agent AI", "Docker", "GCP", "Browser Automation", "Distributed Systems"],
    period: "Jan 2025 – Present",
    spriteName: "agent",
    writeupSlug: "multi-agent-debugging",
    image: "/projects/bugzer.webp",
    status: "Active build",
    category: "system",
  },
  {
    id: "radiology",
    title: "Longitudinal Radiology Intelligence",
    subtitle: "AI for Temporal Medical Reasoning",
    description:
      "Paired-report extraction and fact-graph workflows for identifying clinical change across sequential radiology reports, with a focus on entity persistence, temporal language, and RECIST-oriented progression tracking.",
    stack: ["Clinical Intelligence", "Temporal NLP", "Oncology AI", "Medical LLMs"],
    period: "Spring 2026",
    spriteName: "neuron",
    writeupSlug: "temporal-medical-reasoning",
    image: "/projects/radiology.webp",
    status: "Research internship work",
    category: "research",
  },
  {
    id: "experimental-design",
    title: "Experimental Design Assistant",
    subtitle: "An inspectable agent for ML research planning",
    description:
      "A five-step LLM pipeline that turns a research question into dataset search, model suggestions, an evaluation strategy, and an experiment plan while keeping intermediate outputs inspectable and failures isolated.",
    stack: ["LLM Agents", "NLP", "Evaluation", "Python"],
    period: "2026",
    spriteName: "agent",
    writeupSlug: "experimental-design-assistant",
    status: "Open-source project",
    category: "system",
    externalUrl: "https://github.com/Sher110106/experimental-design-assistant",
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
    writeupSlug: "curriculum-gap-analyzer",
    status: "Student internship build",
    category: "education",
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
    writeupSlug: "autonomous-data-narrator",
    status: "Student internship build",
    category: "system",
  },
];

export const experiences: Experience[] = [
  {
    title: "Business Analyst Intern · AI Committee",
    org: "Flipkart",
    description:
      "Worked on analytics and AI-driven initiatives in large-scale e-commerce systems, with exposure to applied AI deployment and internal strategy discussions.",
    period: "May 2026 – Jul 2026",
  },
  {
    title: "Research Intern · Healthcare AI",
    org: "Prof. Sunita Chauhan · Plaksha University",
    description:
      "Built longitudinal radiology and clinical-intelligence workflows spanning evidence-anchored extraction, paired-report reasoning, OCR, RECIST-oriented tracking, and fact graphs.",
    period: "Dec 2025 – May 2026",
  },
  {
    title: "Student Intern · AI for Education",
    org: "Prof. Anish Chowdhury · Plaksha University",
    description:
      "Built a curriculum comparison tool with OCR and embeddings, plus a Streamlit analytics agent for spreadsheet exploration.",
    period: "Jun 2025 – Aug 2025",
  },
  {
    title: "Junior Teaching Assistant",
    org: "Young Technology Scholars · Plaksha University",
    description:
      "Mentored more than 80 high-school students in programming, data analysis, and practical machine-learning workflows.",
    period: "May 2025 – Jun 2025",
  },
  {
    title: "Research Assistant",
    org: "Lab for Economic Behaviour in Organisations",
    description:
      "Large-scale data extraction, preprocessing, and research synthesis using Python, Selenium, and distributed scraping workflows.",
    period: "Jun 2024 – Sept 2024",
  },
  {
    title: "Learning Associate",
    org: "CTLC · Plaksha University",
    description:
      "Researched project-based learning for engineers and created educational outreach material.",
    period: "Sep 2023 – May 2024",
  },
];

export const stats: Stat[] = [
  { value: 80, suffix: "+", label: "Students Mentored" },
  { value: 2, suffix: "", label: "Accepted Research Outputs" },
  { value: 10, suffix: "", label: "Selected Projects & Studies" },
  { value: 500, suffix: " / 14K", label: "Rise for the World Finalist" },
];

export const researchAreas = [
  "Trustworthy AI",
  "LLM Evaluation",
  "Evidence-Anchored AI",
  "Agent Safety",
  "RL Robustness",
  "Clinical NLP",
  "Longitudinal Intelligence",
];

export const currentDirection = [
  "verification that scales with model capability",
  "diagnostics for agent and learning-system failures",
  "auditable AI for safety-critical domains",
  "evaluation infrastructure for responsible deployment",
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
  linkedin: "https://linkedin.com/in/sher-partap-singh-43070B26B",
  github: "https://github.com/Sher110106",
  resume: "/resume.pdf",
  current: "B.Tech. CS & AI · Plaksha University · Class of 2027",
  incoming: "Open to trustworthy AI research collaborations and graduate opportunities",
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
  "LLM Evaluation",
  "Reinforcement Learning",
  "PyTorch",
  "Hugging Face",
  "Knowledge Graphs",
  "OCR Systems",
  "Selenium",
];
