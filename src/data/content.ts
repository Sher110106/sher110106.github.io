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
  asciiStyle: "double" | "round" | "box" | "heavy" | "dashed";
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
    asciiStyle: "heavy",
  },
  {
    id: "future",
    number: 5,
    title: "THE FUTURE",
    subtitle: "chapter_05.sh",
    body: "Right now, AI can generate answers.\n\nThe next generation of systems will need to:\n\n* remember context\n* reason across time\n* collaborate with humans\n* operate responsibly in critical domains\n\nThat's the future I want to help build.\n\nNot just smarter systems.\nSystems that understand progression, uncertainty, and people.\n\nThis story is still being written.",
    asciiStyle: "dashed",
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
