export type WriteupSection =
  | { type: "text"; content: string }
  | { type: "heading"; content: string }
  | { type: "subheading"; content: string }
  | { type: "list"; items: string[] }
  | { type: "blockquote"; content: string }
  | { type: "callout"; content: string }
  | { type: "pipeline"; title: string; stages: { label: string; sublabel?: string }[] }
  | { type: "schema"; title: string; fields: { name: string; type: string; values: string; note?: string }[] }
  | { type: "table"; title: string; columns: { header: string; key: string }[]; rows: Record<string, string | number>[]; caption?: string }
  | { type: "trace"; title: string; lines: { text: string; status?: "pass" | "fail" | "neutral" | "highlight" }[] };

export interface WriteupContent {
  slug: string;
  sections: WriteupSection[];
}

export const writeups: Record<string, WriteupContent> = {
  "finding-frame": {
    slug: "finding-frame",
    sections: [
      {
        type: "heading",
        content: "When a nodule becomes a lesion — teaching a clinical system to remember",
      },
      {
        type: "text",
        content:
          "This is a field note on Finding Frame, a structured pipeline for tracking clinical findings across time from radiology reports. It won't teach you how to build a clinical NLP system. But it will show you what surprised me about the gap between extraction and understanding — and why the hardest problem in medical AI might not be reading, but remembering.",
      },
      {
        type: "subheading",
        content: "The thing that started it",
      },
      {
        type: "text",
        content:
          "A patient with metastatic cancer gets scanned every 2–3 months. By the end of two years, there are ten CT reports. Each one describes the liver, the lungs, the lymph nodes — sometimes in detail, sometimes in a single line. A radiologist reading all ten builds a mental timeline: this lesion grew, this one stayed stable, this one is new.",
      },
      {
        type: "text",
        content:
          "I wanted to build the machine version of that timeline. Not a system that reads one report well — we have those. A system that connects the same finding across ten reports, through changing language, different scanners, and the natural messiness of clinical text.",
      },
      {
        type: "blockquote",
        content:
          "\"A 'nodule' in January becomes a 'lesion' in March becomes a 'mass' in June. Same patient. Same disease. Different words. A human knows these are the same thing. How do you teach a machine that without hardcoding every possible synonym?\"",
      },
      {
        type: "subheading",
        content: "The awkward part",
      },
      {
        type: "text",
        content:
          "The naive approach is to throw an LLM at the problem. Give it ten reports, ask it to list what changed. Most people try this first — and it fails in a specific, hard-to-detect way.",
      },
      {
        type: "text",
        content:
          "We ran a pilot. We gave GPT-5 the same ten reports and asked it to extract all clinical findings with their progression. It produced 2.6× more findings than our structured pipeline. When we checked whether each extracted finding had verifiable evidence in the source text, only 20.7% of them did.",
      },
      {
        type: "callout",
        content:
          "The problem is not that LLMs can't extract findings. It's that they can't stop inventing them. A hallucinated progression signal — 'liver metastasis increased' when the report said nothing about the liver — could change a treatment decision. And you wouldn't know it was wrong without re-reading every source report yourself.",
      },
      {
        type: "text",
        content:
          "So the real question became: how do you get the flexibility of LLMs — zero-shot generalization across different report styles, organ systems, and scanners — without the hallucination problem?",
      },
      {
        type: "subheading",
        content: "The system shape",
      },
      {
        type: "text",
        content:
          "Finding Frame's architecture has three ideas wired together. None of them are new individually. The contribution is how they constrain each other.",
      },
      {
        type: "pipeline",
        title: "Finding Frame Pipeline",
        stages: [
          { label: "Report", sublabel: "raw clinical text" },
          { label: "Cleaner", sublabel: "section extraction" },
          { label: "LLM", sublabel: "checklist + 6-slot" },
          { label: "Gate", sublabel: "evidence verify" },
          { label: "Normalizer", sublabel: "anatomy etc." },
          { label: "Linker", sublabel: "deterministic key" },
          { label: "Digest", sublabel: "timeline output" },
        ],
      },
      {
        type: "text",
        content:
          "First, the slot schema. Every finding is decomposed into exactly six slots. This turns open-ended extraction into a bounded classification problem. The taxonomy covers 20 finding types across all body systems — not just chest X-rays like most clinical NLP datasets.",
      },
      {
        type: "schema",
        title: "Finding Frame 6-Slot Schema",
        fields: [
          { name: "finding_type", type: "20-class", values: "liver_metastasis, lung_metastasis, pleural_effusion, fracture …", note: "covers all body systems" },
          { name: "assertion", type: "3-value", values: "present | absent | uncertain", note: "evidence gate verifies source" },
          { name: "anatomy", type: "127 rules", values: "liver, lung, bone, lymph_node …", note: "alias map collapses hepatic_segment_7 → liver" },
          { name: "laterality", type: "4-value", values: "left | right | bilateral | not_applicable" },
          { name: "measurement", type: "parsed numeric", values: "{ value: 2.3, unit: cm, mm: 23 }", note: "handles mm/cm/%, multi-dimensional" },
          { name: "temporal_change", type: "6-value", values: "increased | decreased | stable | new | resolved | not_stated" },
        ],
      },
      {
        type: "text",
        content:
          "Second, the evidence gate. Every extracted frame must cite the exact sentence it came from, with token-boundary verification. If the sentence doesn't contain the claimed information, the frame is rejected.",
      },
      {
        type: "trace",
        title: "Evidence Gate — Passing and Failing Cases",
        lines: [
          { text: "Extracted: liver_metastasis | present | liver", status: "neutral" },
          { text: "Evidence: \"2.3 cm hypodensity in right hepatic lobe\"", status: "neutral" },
          { text: " [2.3 cm] measurement match", status: "pass" },
          { text: " [hypodensity → liver_metastasis] taxonomy match", status: "pass" },
          { text: " [right hepatic lobe → liver] anatomy normalizer", status: "pass" },
          { text: "RESULT: PASS", status: "pass" },
          { text: "", status: "neutral" },
          { text: "---", status: "neutral" },
          { text: "", status: "neutral" },
          { text: "Extracted: lung_metastasis | increased | bilateral", status: "neutral" },
          { text: "Evidence: \"No definite pulmonary nodules.\"", status: "neutral" },
          { text: " [increased] not found in evidence", status: "fail" },
          { text: " [bilateral] not found in evidence", status: "fail" },
          { text: " [pulmonary_nodules] assertion mismatch", status: "fail" },
          { text: "RESULT: FAIL — telemetry only", status: "fail" },
        ],
      },
      {
        type: "text",
        content:
          "Third, the track builder. Once you have structured frames with verified evidence, linking them across time becomes a deterministic problem: same finding type + same anatomy + same laterality = same track. No LLM calls needed.",
      },
      {
        type: "subheading",
        content: "What the numbers look like",
      },
      {
        type: "text",
        content:
          "We evaluated on 30 patients (300 reports) spanning orthopedics, oncology, neurology, and abdominal imaging — up to 10 reports per patient across 5 years.",
      },
      {
        type: "table",
        title: "Frame-Level Extraction Performance (30-patient cohort)",
        columns: [
          { header: "Metric", key: "m" },
          { header: "Dev 8", key: "d8" },
          { header: "Ext 20", key: "e20" },
          { header: "All 30", key: "a30" },
        ],
        rows: [
          { m: "Type macro-F1", d8: "0.901", e20: "0.837", a30: "0.855" },
          { m: "Identity F1", d8: "0.815", e20: "0.731", a30: "0.751" },
          { m: "Full-Frame F1", d8: "0.745", e20: "0.593", a30: "0.634" },
          { m: "Latest-Status", d8: "0.950", e20: "0.874", a30: "0.895" },
          { m: "Trajectory", d8: "0.940", e20: "0.794", a30: "0.839" },
        ],
        caption: "The gap between Type F1 and Full-Frame F1 shows single-slot errors dominate, not hallucination.",
      },
      {
        type: "text",
        content:
          "The most informative number is not the F1. It's the gap between single-slot accuracy (≥0.95 across all slots on the development cohort) and full-frame F1 (0.745). Most errors are single-slot failures — measurement wrong, laterality mis-assigned — rather than hallucination. A clinician can fix 'laterality: left vs. bilateral' in seconds. They can't fix 'the system invented a finding.'",
      },
      {
        type: "subheading",
        content: "What surprised me",
      },
      {
        type: "table",
        title: "Component Ablation (8 patients)",
        columns: [
          { header: "Configuration", key: "c" },
          { header: "Type F1", key: "t" },
          { header: "ID F1", key: "i" },
          { header: "Full Δ", key: "d" },
        ],
        rows: [
          { c: "Full system", t: "0.901", i: "0.815", d: "—" },
          { c: "No evidence gate", t: "0.917", i: "0.838", d: "+0.007" },
          { c: "No anatomy norm.", t: "0.901", i: "0.482", d: "-0.313" },
          { c: "LLM linker (vs det.)", t: "—", i: "0.382", d: "—" },
          { c: "Strict evidence gate", t: "0.704", i: "0.636", d: "-0.154" },
        ],
        caption: "Removing anatomy normalization collapses Identity F1 by 40 points. LLM pairwise linker over-aggregates (55 tracks → 18).",
      },
      {
        type: "text",
        content:
          "Removing anatomy normalization collapsed Identity F1 from 0.815 to 0.482 — a 40% drop from a single component. The reason: the LLM uses different anatomical granularity depending on context. One report says 'liver metastasis,' another says 'hepatic segment 7 metastasis.' Without normalization, the linker sees different anatomies and creates separate tracks for the same lesion.",
      },
      {
        type: "text",
        content:
          "Replacing the deterministic linker with LLM-based pairwise matching collapsed the track count from 55 to 18 through over-aggregation. The LLM kept deciding different findings were 'similar enough' and merging them. The deterministic composite key — (finding_type, anatomy, laterality) — consistently outperformed the model at its own linking task. The part I assumed would need the most intelligence turned out to need the least.",
      },
      {
        type: "subheading",
        content: "The domain transfer test",
      },
      {
        type: "text",
        content:
          "We tested the pipeline on echocardiography without changing a single line of code. Only 45 lines of taxonomy configuration for echo-specific finding types.",
      },
      {
        type: "table",
        title: "Echocardiography Transfer (50 patients)",
        columns: [
          { header: "Finding Type", key: "f" },
          { header: "Prec", key: "p" },
          { header: "Recall", key: "r" },
          { header: "F1", key: "f1" },
        ],
        rows: [
          { f: "Aortic regurgitation", p: "1.000", r: "1.000", f1: "1.000" },
          { f: "Mitral regurgitation", p: "1.000", r: "1.000", f1: "1.000" },
          { f: "LA size", p: "0.980", r: "1.000", f1: "0.990" },
          { f: "LV systolic function", p: "0.900", r: "1.000", f1: "0.947" },
          { f: "Overall", p: "0.850", r: "0.941", f1: "0.893" },
        ],
        caption: "Zero code changes. 45 lines of taxonomy. The evidence gate correctly fails closed when ambiguity exists.",
      },
      {
        type: "subheading",
        content: "What I would change",
      },
      {
        type: "text",
        content:
          "The temporal change slot needs rethinking. Currently extracted from single-report text ('increased,' 'stable'), it's backwards — temporal change is inherently cross-report. Better: compute it from the track data. If measurement went 2.3 cm → 3.1 cm, the change is 'increased' by definition.",
      },
      {
        type: "text",
        content:
          "The pneumonia/infection linking uses broad anatomical keys that don't distinguish lobes or episodes. Right-sided opacities across different lobes get incorrectly merged. Fix: lobe-aware linking with temporal gap thresholds.",
      },
      {
        type: "text",
        content:
          "The gold standard is engineering-curated, not clinician-adjudicated. A proper inter-rater reliability study with board-certified radiologists is prerequisite for any clinical deployment.",
      },
      {
        type: "subheading",
        content: "Cost and latency",
      },
      {
        type: "table",
        title: "Cost Comparison",
        columns: [
          { header: "Method", key: "m" },
          { header: "Cost/Rep", key: "c" },
          { header: "Latency", key: "l" },
          { header: "Calls", key: "n" },
        ],
        rows: [
          { m: "Finding Frame", c: "$0.0144", l: "36.9s", n: "1" },
          { m: "GPT-5 zero-shot", c: "$0.0378", l: "93.9s", n: "0" },
          { m: "GPT-4o zero-shot", c: "$0.0240", l: "9.2s", n: "1" },
          { m: "Regex baseline", c: "$0.0000", l: "0.05s", n: "0" },
        ],
        caption: "2.6× cheaper than GPT-5 zero-shot. Total project cost: $2.44. Structured checklist produces 629 vs 7,441 tokens.",
      },
      {
        type: "subheading",
        content: "What's next",
      },
      {
        type: "list",
        items: [
          "Clinician adjudication study with two board-certified reviewers targeting κ ≥0.8.",
          "Cohort expansion from 30 to 50–75 patients with adjudicated gold labels.",
          "RECIST 1.1 integration: response categories from measurement changes.",
          "Open-weight model evaluation: Llama 3.1 70B and Mistral.",
          "Domain extension to pathology reports and discharge summaries.",
        ],
      },
      {
        type: "subheading",
        content: "Links",
      },
      {
        type: "list",
        items: [
          "Paper: The Fact Graph was accepted at IntelliSys 2026 in the Large Language Models for Healthcare track. FindingFrame is the extended paper in preparation.",
          "Code remains private while clinician review is in progress.",
          "Related: Longitudinal Radiology Intelligence (paired-report extraction).",
        ],
      },
    ],
  },
  "multi-agent-debugging": {
    slug: "multi-agent-debugging",
    sections: [
      {
        type: "heading",
        content: "Debugging websites by watching them fail",
      },
      {
        type: "text",
        content:
          "Bugzer is an independent build about a simple gap in web debugging: a bug report often arrives after the useful evidence has disappeared. The goal was to let an agent navigate a site like a user, preserve what happened in the browser, and turn that session into an engineering case file.",
      },
      {
        type: "subheading",
        content: "The thing that started it",
      },
      {
        type: "text",
        content:
          "A report that says \"the page is broken\" does not tell an engineer which action led to the failure, whether the browser logged an error, or what the network was doing at the time. Screenshots help, but a screenshot on its own cannot explain a slow request or a client-side exception. I wanted the observation to happen during the interaction, not as a reconstruction after the fact.",
      },
      {
        type: "subheading",
        content: "The awkward part",
      },
      {
        type: "text",
        content:
          "An agent that can click buttons is not automatically a debugging agent. It also needs a record of what it saw, a way to connect that record to the action that preceded it, and a report that an engineer can inspect. The language model is useful for turning those traces into hypotheses, but the trace itself has to remain available as the ground truth for the session.",
      },
      {
        type: "pipeline",
        title: "Bugzer Session Pipeline",
        stages: [
          { label: "Observe", sublabel: "page state" },
          { label: "Act", sublabel: "agent interaction" },
          { label: "Capture", sublabel: "browser telemetry" },
          { label: "Correlate", sublabel: "action + failure" },
          { label: "Diagnose", sublabel: "LLM-assisted review" },
          { label: "Report", sublabel: "case file" },
        ],
      },
      {
        type: "subheading",
        content: "The system shape",
      },
      {
        type: "text",
        content:
          "Bugzer combines a browser-automation layer with a small service surface. Agents navigate the application and generate testing sessions. During those sessions, the platform captures console logs, network requests, latency metrics, and screenshots. FastAPI coordinates the backend workflow, while the Next.js interface makes the resulting sessions and recommendations easier to inspect. Docker packages the services, and the deployment runs on Google Cloud Run with Steel.dev supporting the browser layer.",
      },
      {
        type: "trace",
        title: "A Useful Debugging Record",
        lines: [
          { text: "Session: agent navigates to the target flow", status: "neutral" },
          { text: "Action: submits the form", status: "highlight" },
          { text: "Console: browser error captured", status: "pass" },
          { text: "Network: request and latency recorded", status: "pass" },
          { text: "Screenshot: state at failure preserved", status: "pass" },
          { text: "Recommendation: generated from the collected trace", status: "neutral" },
        ],
      },
      {
        type: "subheading",
        content: "What held up",
      },
      {
        type: "text",
        content:
          "The most important choice was to treat telemetry as part of the product output rather than as hidden debugging infrastructure. A recommendation is more useful when an engineer can move from the explanation back to the console event, request, or screenshot that motivated it. That separation also keeps the model's diagnosis distinguishable from the evidence collected by the browser.",
      },
      {
        type: "text",
        content:
          "The multi-agent framing is useful because exploration and diagnosis are different jobs. One part of the system can focus on exercising the site, while another can examine the resulting record. Keeping those responsibilities explicit makes it easier to extend the workflow without making every agent responsible for every kind of reasoning.",
      },
      {
        type: "subheading",
        content: "What I would change",
      },
      {
        type: "text",
        content:
          "The next version should make replay and comparison first-class. A useful report should let an engineer rerun the same path, compare two sessions, and see which signals changed. I would also make uncertainty visible in the recommendation layer, so a plausible hypothesis does not read like a confirmed root cause.",
      },
      {
        type: "subheading",
        content: "Links",
      },
      {
        type: "list",
        items: [
          "Project: Bugzer, an independent multi-agent web QA platform.",
          "Stack: Python, FastAPI, Next.js, Docker, Google Cloud Run, and Steel.dev.",
          "Related: AI-Powered Website Exploration System.",
        ],
      },
    ],
  },
  "temporal-medical-reasoning": {
    slug: "temporal-medical-reasoning",
    sections: [
      {
        type: "heading",
        content: "The report is only half the story",
      },
      {
        type: "text",
        content:
          "Longitudinal Radiology Intelligence grew out of a question that looks small until the reports are placed next to each other: what changed? A single radiology report can describe a finding. Clinical reasoning often depends on comparing that description with the one before it and deciding whether the finding progressed, stayed stable, worsened, or resolved.",
      },
      {
        type: "subheading",
        content: "The thing that started it",
      },
      {
        type: "text",
        content:
          "Radiology language is full of references that only make sense over time. A later report may say that an opacity is improved, a lesion is unchanged, or a finding is no longer seen. Those phrases are not isolated labels. They are statements about the relationship between observations. A system that reads each report independently has to reconstruct that relationship later, often with less context than the reader had at the start.",
      },
      {
        type: "subheading",
        content: "The awkward part",
      },
      {
        type: "text",
        content:
          "The challenge was not only extracting medical entities. It was deciding which parts of two reports should be compared and keeping the comparison tied to the right finding. Language can change between reports, measurements can be expressed differently, and temporal cues can be distributed across a sentence. The system therefore needed a paired view of the reports rather than a collection of disconnected summaries.",
      },
      {
        type: "pipeline",
        title: "Paired-Report Reasoning Flow",
        stages: [
          { label: "Earlier report", sublabel: "baseline finding" },
          { label: "Later report", sublabel: "new observation" },
          { label: "Pair", sublabel: "align context" },
          { label: "Extract", sublabel: "finding + evidence" },
          { label: "Compare", sublabel: "temporal change" },
          { label: "Track", sublabel: "clinical timeline" },
        ],
      },
      {
        type: "subheading",
        content: "The system shape",
      },
      {
        type: "text",
        content:
          "The work focused on paired-report extraction pipelines for longitudinal radiology understanding. The pipeline identifies the findings in each report, associates the relevant evidence, and represents the comparison as a temporal event. For oncology use cases, the reasoning is oriented toward RECIST-style progression tracking, where measurements and response categories matter across visits rather than in one note.",
      },
      {
        type: "schema",
        title: "A Change Needs More Than a Label",
        fields: [
          { name: "finding", type: "entity", values: "lesion, opacity, effusion, mass …", note: "what is being followed" },
          { name: "evidence", type: "source span", values: "sentence or phrase from the report", note: "why the event exists" },
          { name: "measurement", type: "numeric", values: "value + unit when available", note: "supports comparison" },
          { name: "temporal_change", type: "relation", values: "progressed | stable | improved | resolved", note: "describes the transition" },
        ],
      },
      {
        type: "subheading",
        content: "What held up",
      },
      {
        type: "text",
        content:
          "Treating the pair as the unit of reasoning made the temporal question explicit. It also created a useful boundary for the model: the job is to compare the evidence available in the two reports, not to fill in a patient's history from general medical knowledge. That structure supported the broader fact-graph work on queryable timelines for radiology and oncology intelligence.",
      },
      {
        type: "text",
        content:
          "This work was part of my healthcare AI research internship with Prof. Sunita Chauhan at Plaksha University. The project sits alongside the accepted IntelliSys 2026 paper, The Fact Graph, and the extended FindingFrame work on auditable longitudinal extraction.",
      },
      {
        type: "subheading",
        content: "What I would change",
      },
      {
        type: "text",
        content:
          "The next version should make uncertainty and missing comparisons explicit. If a later report refers to a prior study without enough detail to support a precise change, the system should preserve that limitation instead of forcing a category. More clinician-adjudicated evaluation would also make it possible to measure not only extraction quality, but whether the resulting timeline is useful for real review workflows.",
      },
      {
        type: "subheading",
        content: "Links",
      },
      {
        type: "list",
        items: [
          "Related paper: The Fact Graph, accepted at IntelliSys 2026 (Springer SVPROC).",
          "Related field note: Finding Frame and its evidence-anchored tracking pipeline.",
          "Focus: paired-report extraction, temporal NLP, oncology AI, and medical LLMs.",
        ],
      },
    ],
  },
  "curriculum-gap-analyzer": {
    slug: "curriculum-gap-analyzer",
    sections: [
      {
        type: "heading",
        content: "Finding the missing concepts between two courses",
      },
      {
        type: "text",
        content:
          "A curriculum gap sounds administrative until you are the student moving between academic systems. Two courses may cover the same broad subject while using different names, ordering topics differently, or assuming different prerequisites. The Curriculum Gap Analyzer was built to turn that uncertainty into something a student or advisor could inspect.",
      },
      {
        type: "subheading",
        content: "The thing that started it",
      },
      {
        type: "text",
        content:
          "The inputs were ordinary academic documents: syllabi and curriculum PDFs that were not written for machine comparison. Some text was selectable, some needed OCR, and course descriptions often mixed topics, outcomes, readings, and logistics. Before comparing concepts, the system had to make those documents legible without pretending that their structure was already clean.",
      },
      {
        type: "subheading",
        content: "The awkward part",
      },
      {
        type: "text",
        content:
          "A keyword match is too brittle for this problem. Two syllabi can describe a similar idea with different vocabulary, while the same word can mean different levels of depth in different courses. Embeddings help find semantic relationships, but a useful result still needs an explanation of which source concepts were compared and why a gap was suggested.",
      },
      {
        type: "pipeline",
        title: "Curriculum Comparison Pipeline",
        stages: [
          { label: "Upload", sublabel: "course documents" },
          { label: "OCR", sublabel: "Tesseract.js" },
          { label: "Extract", sublabel: "concept candidates" },
          { label: "Embed", sublabel: "Azure OpenAI" },
          { label: "Compare", sublabel: "semantic overlap" },
          { label: "Explain", sublabel: "gap list" },
        ],
      },
      {
        type: "subheading",
        content: "The system shape",
      },
      {
        type: "text",
        content:
          "The tool uses a React interface and Tesseract.js OCR to parse curriculum documents, then uses Azure OpenAI embeddings to compare the concepts they contain. The output is a list of possible syllabus gaps rather than a single opaque similarity score. That distinction matters for lateral-entry students, who need to know what to learn next and where the recommendation came from.",
      },
      {
        type: "trace",
        title: "From Document to Gap",
        lines: [
          { text: "Source A: course topics extracted from a PDF", status: "neutral" },
          { text: "Source B: second curriculum parsed and normalized", status: "neutral" },
          { text: "Concepts: semantically related topics compared", status: "highlight" },
          { text: "Gap: candidate concept with weaker coverage", status: "pass" },
          { text: "Review: source context remains available to the reader", status: "pass" },
        ],
      },
      {
        type: "subheading",
        content: "What held up",
      },
      {
        type: "text",
        content:
          "The useful result was not automation for its own sake. It was reducing the first comparison from a manual document-by-document exercise to a reviewable shortlist. The project was reported as making that comparison about 10 times faster than manual review, while keeping the student or advisor in the loop for interpretation.",
      },
      {
        type: "text",
        content:
          "The split between OCR, semantic comparison, and explanation also made the limitations easier to see. An OCR mistake can affect the concepts downstream, and a semantic match can still be educationally misleading if course depth is ignored. Keeping those stages visible is more useful than presenting the final list as unquestionable truth.",
      },
      {
        type: "subheading",
        content: "What I would change",
      },
      {
        type: "text",
        content:
          "I would make document structure more explicit in the next version. Topics, prerequisites, learning outcomes, and assessment methods should not all be treated as the same kind of text. I would also add a correction workflow so an advisor can accept, reject, or rename a suggested concept and leave behind a better comparison for the next student.",
      },
      {
        type: "subheading",
        content: "Links",
      },
      {
        type: "list",
        items: [
          "Project: Curriculum Gap Analyzer, built during my student internship with Prof. Anish Chowdhury.",
          "Stack: React, Tesseract.js, Azure OpenAI, and embeddings.",
          "Audience: students transitioning between academic systems, especially lateral-entry students.",
        ],
      },
    ],
  },
  "autonomous-data-narrator": {
    slug: "autonomous-data-narrator",
    sections: [
      {
        type: "heading",
        content: "Teaching a spreadsheet to explain itself",
      },
      {
        type: "text",
        content:
          "A spreadsheet usually arrives before its story does. The columns are there, but the person opening the file still has to work out what the data contains, which comparisons are meaningful, and which question to ask first. The Streamlit Data Agent was a small attempt to make that first pass less intimidating while keeping the analysis visible.",
      },
      {
        type: "subheading",
        content: "The thing that started it",
      },
      {
        type: "text",
        content:
          "The starting point is often a CSV or Excel file with no accompanying narrative. A useful tool should profile the data, create visualizations, summarize the important patterns, and help the user decide what to inspect next. The order matters: a generated explanation should follow an analysis of the file, not replace it.",
      },
      {
        type: "subheading",
        content: "The awkward part",
      },
      {
        type: "text",
        content:
          "Natural-language output can sound convincing even when a column was parsed incorrectly or a chart hides an important caveat. That makes the interface responsible for more than producing prose. It has to expose enough of the underlying summaries and visualizations for a reader to check whether the explanation matches the data.",
      },
      {
        type: "pipeline",
        title: "Data Narration Flow",
        stages: [
          { label: "Load", sublabel: "CSV or Excel" },
          { label: "Profile", sublabel: "columns + types" },
          { label: "Analyze", sublabel: "statistics" },
          { label: "Visualize", sublabel: "interactive charts" },
          { label: "Summarize", sublabel: "plain language" },
          { label: "Explore", sublabel: "next questions" },
        ],
      },
      {
        type: "subheading",
        content: "The system shape",
      },
      {
        type: "text",
        content:
          "The agent is built with Python and Streamlit. It accepts spreadsheet data, performs data analysis, and presents interactive visualizations, statistical summaries, and natural-language insights in one place. The interface is deliberately close to the artifacts being analyzed: a chart or summary should be available beside the explanation that describes it.",
      },
      {
        type: "schema",
        title: "The First Pass Through a Dataset",
        fields: [
          { name: "source", type: "file", values: "CSV | Excel", note: "the user's existing data" },
          { name: "profile", type: "structure", values: "columns, types, missing values", note: "what the file contains" },
          { name: "analysis", type: "statistics", values: "summaries and comparisons", note: "what can be measured" },
          { name: "view", type: "visual", values: "interactive charts", note: "what can be inspected" },
          { name: "narrative", type: "language", values: "insights and follow-up questions", note: "what to explore next" },
        ],
      },
      {
        type: "subheading",
        content: "What held up",
      },
      {
        type: "text",
        content:
          "Putting profiling, statistics, charts, and language in the same workflow made the agent feel more like a guided analysis surface than a chatbot attached to a file. A user can start with a broad question, inspect the generated view, and use the result to choose a more specific question. That progression is the useful part of the automation.",
      },
      {
        type: "text",
        content:
          "The project also reinforced a practical rule for data agents: every sentence should have a nearby artifact. If the agent says a group is unusual, the reader should be able to find the comparison or chart that supports that observation.",
      },
      {
        type: "subheading",
        content: "What I would change",
      },
      {
        type: "text",
        content:
          "The next version should make assumptions and provenance easier to inspect. It should show how a column was typed, which rows were excluded, and which calculation produced each insight. I would also add stronger handling for messy headers and mixed-type columns, since those are common reasons a seemingly simple spreadsheet needs human judgment.",
      },
      {
        type: "subheading",
        content: "Links",
      },
      {
        type: "list",
        items: [
          "Project: Streamlit Data Agent, developed during my student internship with Prof. Anish Chowdhury.",
          "Stack: Python, Streamlit, data analysis, and machine learning.",
          "Output: visualizations, statistical summaries, and natural-language insights from CSV and Excel data.",
        ],
      },
    ],
  },
  "adapt-rag": {
    slug: "adapt-rag",
    sections: [
      {
        type: "heading",
        content: "When every query does not need the same verifier",
      },
      {
        type: "text",
        content:
          "AdaptRAG started with a practical problem in retrieval-augmented generation: verification has a cost, but not every answer needs the same kind of inspection. A simple query may be adequately checked at the sentence level. A comparison or multi-hop question may need the answer decomposed into atomic claims. The project studies whether a small, interpretable router can choose between those paths without training data.",
      },
      {
        type: "subheading",
        content: "The thing that started it",
      },
      {
        type: "text",
        content:
          "A generated answer can be fluent while still containing a claim that the retrieved context does not support. Sentence-level natural-language inference gives a useful first check, but it can miss problems hidden inside a sentence with several claims. Atomic verification is more detailed, though it is also more expensive. The design question was how to spend that extra scrutiny where it is most useful.",
      },
      {
        type: "subheading",
        content: "The awkward part",
      },
      {
        type: "text",
        content:
          "The router cannot use the answer's confidence as a shortcut. It needs signals that describe the query and the verification problem in an interpretable way. AdaptRAG uses seven such features to route a query to sentence-level or atomic-level NLI. The resulting system is a decision about verification granularity, not a new generator that tries to write around uncertainty.",
      },
      {
        type: "pipeline",
        title: "Adaptive Verification Flow",
        stages: [
          { label: "Query", sublabel: "RAG question" },
          { label: "Features", sublabel: "7 interpretable signals" },
          { label: "Route", sublabel: "granularity choice" },
          { label: "Verify", sublabel: "sentence or atomic NLI" },
          { label: "Classify", sublabel: "supported or not" },
          { label: "Abstain", sublabel: "when evidence is insufficient" },
        ],
      },
      {
        type: "subheading",
        content: "The system shape",
      },
      {
        type: "text",
        content:
          "The query-complexity router requires no training data. It sends only 23.2% of queries through the more expensive atomic path, leaving the rest on sentence-level verification. The abstention policy keeps contradicted claims distinct from unsupported claims, which matters when a verifier is being used to decide whether an answer should be trusted.",
      },
      {
        type: "table",
        title: "AdaptRAG Results",
        columns: [
          { header: "Measure", key: "measure" },
          { header: "Result", key: "result" },
          { header: "Context", key: "context" },
        ],
        rows: [
          { measure: "Hallucination rate", result: "24.8% → 19.4%", context: "HotpotQA 1K; 5.4 percentage-point reduction" },
          { measure: "Bootstrap test", result: "p < 0.001", context: "HotpotQA result" },
          { measure: "Atomic route", result: "23.2% of queries", context: "Expensive verification path" },
          { measure: "Router accuracy", result: "70.6% → 79.2%", context: "Logistic-regression router" },
          { measure: "Transfer", result: "6.8pp overall", context: "2WikiMultiHopQA without retuning" },
        ],
        caption: "The router is evaluated as a way to allocate verification effort, not as a replacement for evidence checking.",
      },
      {
        type: "subheading",
        content: "What held up",
      },
      {
        type: "text",
        content:
          "The most useful result was the separation between the routing decision and the verification decision. The system can decide how much analysis a query deserves, then apply the selected NLI check. On HotpotQA 1K, hallucination fell from 24.8% to 19.4%, a 5.4 percentage-point reduction with bootstrap p < 0.001. On 2WikiMultiHopQA, the approach transferred without retuning, with a 6.8 percentage-point overall improvement and a 21.0 percentage-point improvement on comparison questions.",
      },
      {
        type: "text",
        content:
          "The comparison with other checks also clarified the target. AdaptRAG is not claiming that one verifier is universally best. It is trying to make the verification policy sensitive to the question, while making the reason for the route inspectable.",
      },
      {
        type: "subheading",
        content: "What I would change",
      },
      {
        type: "text",
        content:
          "I would stress-test the router on more domains and make calibration visible alongside the final hallucination rate. A route can be accurate on average while still mishandling a particular class of questions. I would also keep the status clear: this work was submitted to ACL Rolling Review in May 2026 and is out for now, with EMNLP 2026 as a target rather than an accepted venue.",
      },
      {
        type: "subheading",
        content: "Links",
      },
      {
        type: "list",
        items: [
          "Paper: Adaptive Verification Granularity for RAG Hallucination Detection.",
          "Status: submitted to ACL Rolling Review in May 2026; out for now, with an EMNLP 2026 target.",
          "Team: Sher Partap Singh, Shreyansh Singh, Mohak Agarwala, Akshat Mishra, and Mukul Jangra.",
        ],
      },
    ],
  },
  "sac-failure-regimes": {
    slug: "sac-failure-regimes",
    sections: [
      {
        type: "heading",
        content: "When a failed run is not the end",
      },
      {
        type: "text",
        content:
          "Reinforcement-learning experiments often reduce failure to a low final reward. The SAC failure-regimes study asked a more useful question: if training stalls, can the run recover, and does the answer depend on how it failed? The project treats recoverability as something to measure with interventions rather than something to infer from one checkpoint.",
      },
      {
        type: "subheading",
        content: "The thing that started it",
      },
      {
        type: "text",
        content:
          "A low-reward checkpoint is an observation, not an explanation. Two runs can look similarly unsuccessful while responding differently when training is continued or reset. To separate those cases, the study took checkpoints from failed SAC runs and branched them into parallel continuation runs under different intervention arms.",
      },
      {
        type: "subheading",
        content: "The awkward part",
      },
      {
        type: "text",
        content:
          "One continuation is too noisy to establish a recovery pattern. The study therefore used ten parallel continuation runs per intervention arm and measured recovery probability with Clopper-Pearson confidence intervals. That design makes the experiment more expensive, but it turns a vague claim about a failed run into a comparison of outcomes under controlled interventions.",
      },
      {
        type: "pipeline",
        title: "Branched Failure Analysis",
        stages: [
          { label: "Train", sublabel: "SAC run" },
          { label: "Detect", sublabel: "stalled checkpoint" },
          { label: "Branch", sublabel: "intervention arms" },
          { label: "Continue", sublabel: "10 parallel runs" },
          { label: "Measure", sublabel: "recovery probability" },
          { label: "Classify", sublabel: "failure regime" },
        ],
      },
      {
        type: "subheading",
        content: "The system shape",
      },
      {
        type: "text",
        content:
          "The study completed 530 branched jobs. It compares interventions including actor-critic resets and critic reinitialisation, then examines the resulting recovery patterns rather than treating all low-reward checkpoints as one population. The analysis identified a stochastic-collapse regime and found that critic reinitialisation was the essential ingredient in the recovery patterns studied.",
      },
      {
        type: "trace",
        title: "From Checkpoint to Regime",
        lines: [
          { text: "Checkpoint: low-reward SAC state selected", status: "neutral" },
          { text: "Intervention: continuation arm created", status: "highlight" },
          { text: "Branches: parallel runs continue from the same checkpoint", status: "neutral" },
          { text: "Outcome: recovery probability estimated with confidence intervals", status: "pass" },
          { text: "Interpretation: recoverable and irrecoverable patterns separated", status: "pass" },
        ],
      },
      {
        type: "subheading",
        content: "What held up",
      },
      {
        type: "text",
        content:
          "The branched design made an important distinction visible: actor-critic reset increased recovery in some cohorts and failed entirely in others. Low reward was not a single failure mode. The alpha trajectory also appeared as a leading indicator of learning success, connecting this study to the separate CAISc analysis of SAC's entropy coefficient.",
      },
      {
        type: "text",
        content:
          "That distinction is relevant beyond one algorithm. If a learned system is deployed, it matters whether a bad state can be recovered from and how much confidence to place in an intervention. The experiment does not turn recovery into a guarantee, but it gives the question a measurable structure.",
      },
      {
        type: "subheading",
        content: "What I would change",
      },
      {
        type: "text",
        content:
          "The next version should test whether the same regimes persist across more tasks, seeds, and replay ratios. It should also make the boundary between an observed recovery pattern and a causal explanation explicit. The paper is out for now after submission to TMLR, so these are directions for strengthening the study rather than claims about an accepted result.",
      },
      {
        type: "subheading",
        content: "Links",
      },
      {
        type: "list",
        items: [
          "Paper: Recoverable and Irrecoverable Failure Regimes in SAC at High Replay Ratio.",
          "Status: submitted to TMLR and out for now, not currently accepted.",
          "Team: Sher Partap Singh, Mannan Sharma, Mudasir Rasheed, Akshita Shukla, and Aryan Chopra.",
        ],
      },
    ],
  },
  "tempmsg": {
    slug: "tempmsg",
    sections: [
      {
        type: "heading",
        content: "Forecasting behavior on a graph that keeps changing",
      },
      {
        type: "text",
        content:
          "TempMSG studies forecasting on temporal multilingual social graphs, where the users, interactions, languages, and behavioral targets change together. The model is designed to predict user activity and several behavioral signals over a multi-day horizon while keeping the temporal structure of the graph in view.",
      },
      {
        type: "subheading",
        content: "The thing that started it",
      },
      {
        type: "text",
        content:
          "A static graph misses the rhythm of participation. An inactive edge should not necessarily carry the same information as an active one, and a new user should not require a full retraining cycle before receiving a forecast. TempMSG treats activity, language, community context, and exposure as signals that evolve over time.",
      },
      {
        type: "subheading",
        content: "The awkward part",
      },
      {
        type: "text",
        content:
          "The model has to solve several prediction problems at once. Presence is different from aggression, toxicity, sentiment, or bias dimensions, but those targets can still influence one another. It also has to preserve temporal memory without making inference depend on a retrained model for every unseen user. That combination makes the representation and decoder as important as the final forecast.",
      },
      {
        type: "pipeline",
        title: "TempMSG Forecasting Flow",
        stages: [
          { label: "Graph", sublabel: "users + edges" },
          { label: "Features", sublabel: "activity + context" },
          { label: "Propagate", sublabel: "active-edge gating" },
          { label: "Remember", sublabel: "temporal state space" },
          { label: "Decode", sublabel: "anchored deviations" },
          { label: "Forecast", sublabel: "activity + behavior" },
        ],
      },
      {
        type: "subheading",
        content: "The system shape",
      },
      {
        type: "text",
        content:
          "TempMSG uses an encoder-decoder architecture with causal input features such as activity decay, soft language profiles, community rhythm, exposure aggregation, and population context. Asymmetric Activity-Gated Propagation allows only active edges to propagate, with task-aware compatibility matrices. A Mamba-style Temporal Selective State-Space Memory with a DPLR low-rank correction handles temporal memory. The anchored-deviation decoder combines evidence-weighted personal and community anchors with bounded cross-task residuals, enabling cold-start forecasts for unseen users without retraining.",
      },
      {
        type: "table",
        title: "Evaluation Footprint",
        columns: [
          { header: "Dataset", key: "dataset" },
          { header: "Scale", key: "scale" },
          { header: "Targets", key: "targets" },
        ],
        rows: [
          { dataset: "Twitter", scale: "40,729 users; 606K edges; 240 daily snapshots; 4 languages", targets: "6 categorical tasks" },
          { dataset: "Koo", scale: "28,957 users; 819 snapshots", targets: "4 continuous tasks" },
        ],
      },
      {
        type: "subheading",
        content: "What held up",
      },
      {
        type: "text",
        content:
          "Across the reported evaluation, behavior MAE was reduced by 25 to 28 percent compared with the best of 13 baselines. Presence reached approximately 0.963 AUC, and rare-event PR-AUC was best on all folds, with gains of 5.2 to 16.5 percent. The model used about 0.11 million parameters, stayed below 6 GB, and took about 90 seconds per epoch on one L40S in the reported setup.",
      },
      {
        type: "text",
        content:
          "The cold-start result is especially useful as a design constraint. A community prior alone produced a reported cold-start MAE of 0.0703, giving an unseen user a starting point without a new training run. That does not remove uncertainty, but it makes the inductive setting explicit rather than hiding it behind a transductive assumption.",
      },
      {
        type: "subheading",
        content: "What I would change",
      },
      {
        type: "text",
        content:
          "The current draft needs a careful revision before the results are treated as final. In particular, the ablation significance-testing assumptions, unresolved cross-references, and duplicated problem-formulation section should be fixed. I would also make calibration and subgroup behavior more prominent, since forecasting potentially harmful behavior should communicate uncertainty as clearly as the point prediction.",
      },
      {
        type: "subheading",
        content: "Links",
      },
      {
        type: "list",
        items: [
          "Paper: TempMSG: Temporal Multilingual Social Graph Learning for Multitask Forecasting.",
          "Status: under review in the SIGKDD 2027 Research Track.",
          "MOSAIC: the earlier multicommunity forecasting project that evolved into TempMSG.",
        ],
      },
    ],
  },
  "sac-alpha-signal": {
    slug: "sac-alpha-signal",
    sections: [
      {
        type: "heading",
        content: "The entropy coefficient was telling us something",
      },
      {
        type: "text",
        content:
          "In Soft Actor-Critic, the entropy coefficient alpha is usually treated as a training control. In this study, I asked whether its trajectory could also serve as a diagnostic. Across 128 runs on five Meta-World manipulation tasks, the shape of alpha separated successful and failed seeds before their reward curves made the difference obvious.",
      },
      {
        type: "subheading",
        content: "The thing that started it",
      },
      {
        type: "text",
        content:
          "Reward is a lagging signal when a run is going wrong. By the time two seeds have visibly different returns, many training steps have already passed. The study logged alpha trajectories alongside Q-values and replay-buffer composition to look for an earlier indicator inside the learner's state.",
      },
      {
        type: "subheading",
        content: "The awkward part",
      },
      {
        type: "text",
        content:
          "A correlation in one task can disappear in another, and an apparent threshold can be an artifact of a particular training setup. The evaluation therefore used multiple Meta-World tasks and a 2 by 2 ablation with 64 runs. The aim was to test whether the alpha signal remained useful under controlled changes, not to claim that alpha alone explains every failure.",
      },
      {
        type: "pipeline",
        title: "Alpha Diagnostic Flow",
        stages: [
          { label: "Train", sublabel: "SAC seed" },
          { label: "Log", sublabel: "alpha + Q + replay" },
          { label: "Observe", sublabel: "trajectory regime" },
          { label: "Compare", sublabel: "success vs failure" },
          { label: "Ablate", sublabel: "fixed annealing" },
          { label: "Diagnose", sublabel: "early signal" },
        ],
      },
      {
        type: "subheading",
        content: "What the runs showed",
      },
      {
        type: "text",
        content:
          "Solved seeds kept alpha in a stable moderate range of 0.02 to 0.25. Failed seeds showed one of two regimes: alpha collapse toward zero, associated with premature determinism, or alpha explosion toward 9 and above, associated with entropy dominance. These regimes predicted seed success or failure hundreds of thousands of steps before reward differences emerged on the hard tasks studied.",
      },
      {
        type: "table",
        title: "Reported Alpha Patterns",
        columns: [
          { header: "Pattern", key: "pattern" },
          { header: "Observed range or effect", key: "effect" },
          { header: "Interpretation", key: "interpretation" },
        ],
        rows: [
          { pattern: "Solved seeds", effect: "alpha 0.02 to 0.25", interpretation: "stable moderate entropy" },
          { pattern: "Alpha collapse", effect: "alpha approaches 0", interpretation: "premature determinism" },
          { pattern: "Alpha explosion", effect: "alpha reaches 9+", interpretation: "entropy dominance" },
          { pattern: "Fixed annealing ablation", effect: "up to 98% lower final return on pick-place", interpretation: "all seeds forced into collapse regime" },
        ],
      },
      {
        type: "subheading",
        content: "The diagnostic test",
      },
      {
        type: "text",
        content:
          "A two-sided threshold, 0.005 < alpha < 1.0, classified 23 of 24 seeds correctly on the two hardest tasks, or 96 percent. I read that as an early-warning diagnostic for the tested setup, not as a universal stopping rule. Its value is that it uses a signal already produced during training instead of adding a separate reward-engineering objective.",
      },
      {
        type: "subheading",
        content: "What I would change",
      },
      {
        type: "text",
        content:
          "The next study should test how stable the threshold is across algorithms, task families, and hyperparameter choices. It should also distinguish a predictive diagnostic from an intervention that improves training. The current result shows that alpha can be informative; it does not by itself establish that changing alpha will rescue a run.",
      },
      {
        type: "subheading",
        content: "Status and links",
      },
      {
        type: "list",
        items: [
          "Paper: SAC's Entropy Coefficient as an Implicit Success Signal in Robotic Manipulation.",
          "Status: accepted poster at CAISc 2026, Track 2: Open-Ended Problems; non-archival, sole author.",
          "Related work: Recoverable and Irrecoverable Failure Regimes in SAC at High Replay Ratio.",
        ],
      },
    ],
  },
  "experimental-design-assistant": {
    slug: "experimental-design-assistant",
    sections: [
      {
        type: "heading",
        content: "A research plan is easier to inspect in stages",
      },
      {
        type: "text",
        content:
          "The Experimental Design Assistant is a goal-driven LLM agent for planning machine-learning research. It breaks a broad request into a five-step pipeline and keeps the intermediate decisions visible. The project treats planning as a sequence of inspectable choices rather than a single prompt that returns a polished experiment plan.",
      },
      {
        type: "subheading",
        content: "The thing that started it",
      },
      {
        type: "text",
        content:
          "A research idea is rarely ready to implement when it first appears. Someone has to identify the problem type, find a suitable dataset, choose candidate models, decide how to evaluate them, and turn those decisions into an experiment plan. If all of that happens inside one opaque response, it is hard to tell which assumption needs correcting.",
      },
      {
        type: "subheading",
        content: "The awkward part",
      },
      {
        type: "text",
        content:
          "The system needs to be helpful without making an unsupported plan look settled. A dataset suggestion can constrain the model choice, and the evaluation strategy can expose a weakness in the original problem framing. Isolating the stages gives each decision somewhere to be inspected and gives a failure a smaller surface area.",
      },
      {
        type: "pipeline",
        title: "Experimental Design Assistant",
        stages: [
          { label: "Problem", sublabel: "identify task type" },
          { label: "Dataset", sublabel: "search candidates" },
          { label: "Models", sublabel: "suggest approaches" },
          { label: "Evaluation", sublabel: "choose measures" },
          { label: "Experiment", sublabel: "assemble plan" },
        ],
      },
      {
        type: "subheading",
        content: "The system shape",
      },
      {
        type: "text",
        content:
          "The agent follows five explicit steps: problem type, dataset search, model suggestions, evaluation strategy, and experiment plan. Each stage produces an intermediate output that can be read before the next stage proceeds. That makes the workflow useful as a planning aid while preserving a place for a researcher to reject a dataset, revise a task definition, or question a proposed metric.",
      },
      {
        type: "trace",
        title: "Inspectable Planning Trace",
        lines: [
          { text: "Goal: research question supplied", status: "neutral" },
          { text: "Step 1: problem type identified", status: "highlight" },
          { text: "Step 2: dataset candidates returned", status: "neutral" },
          { text: "Step 3: model suggestions attached to the task", status: "neutral" },
          { text: "Step 4: evaluation strategy made explicit", status: "pass" },
          { text: "Step 5: experiment plan assembled for review", status: "pass" },
        ],
      },
      {
        type: "subheading",
        content: "What held up",
      },
      {
        type: "text",
        content:
          "The intermediate outputs are the main design decision. They make it possible to inspect a plan while it is forming instead of only after the final answer. They also support isolated failure: a weak dataset search can be corrected without treating the entire agent run as a mystery.",
      },
      {
        type: "text",
        content:
          "That structure connects the project to a broader interest in monitored multi-step agents. Planning systems need room for human judgment, especially when the cost of an attractive but poorly supported experiment is measured in weeks of work.",
      },
      {
        type: "subheading",
        content: "What I would change",
      },
      {
        type: "text",
        content:
          "The next version should attach evidence and uncertainty to each recommendation. Dataset candidates should show why they match the problem, model suggestions should state their assumptions, and evaluation choices should identify what they cannot measure. I would also add a way to edit an intermediate decision and regenerate only the downstream stages.",
      },
      {
        type: "subheading",
        content: "Status and links",
      },
      {
        type: "list",
        items: [
          "Project: Experimental Design Assistant, a goal-driven multi-step LLM agent for ML research planning.",
          "Status: project, not presented here as a publication or accepted paper.",
          "Focus: inspectable intermediate outputs, isolated failure, and agent monitoring.",
        ],
      },
    ],
  },
};
