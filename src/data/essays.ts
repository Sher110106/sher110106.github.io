import { Project } from "./content";

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
  // Initial placeholders
];
