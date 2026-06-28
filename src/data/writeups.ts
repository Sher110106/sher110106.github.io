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
          "Paper: Accepted at IntelliSys 2026, Large Language Models for Healthcare track.",
          "Code: [to be open-sourced after clinician review].",
          "Related: Longitudinal Radiology Intelligence (paired-report extraction).",
        ],
      },
    ],
  },
};
