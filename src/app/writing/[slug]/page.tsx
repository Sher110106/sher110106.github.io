import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/content";
import { writeups, type WriteupSection } from "@/data/writeups";
import { PipelineDiagram } from "@/components/writing/PipelineDiagram";
import { SchemaCard } from "@/components/writing/SchemaCard";
import { DataTable } from "@/components/writing/DataTable";
import { TraceBlock } from "@/components/writing/TraceBlock";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects
    .filter((p) => p.writeupSlug)
    .map((p) => ({ slug: p.writeupSlug }));
}

function renderSection(section: WriteupSection, i: number) {
  switch (section.type) {
    case "heading":
      return (
        <h2 key={i} className="font-mono text-xl md:text-2xl font-light tracking-tight text-text-primary mt-12 mb-6 leading-snug">
          {section.content}
        </h2>
      );
    case "subheading":
      return (
        <h3 key={i} className="font-mono text-sm font-medium text-accent-amber tracking-wider uppercase mt-10 mb-4">
          {section.content}
        </h3>
      );
    case "text":
      return (
        <p key={i} className="font-sans text-[15px] text-text-muted leading-[1.8] mb-5">
          {section.content}
        </p>
      );
    case "blockquote":
      return (
        <blockquote key={i} className="border-l-2 border-accent-amber/40 pl-5 my-6 italic font-sans text-sm text-text-muted leading-relaxed">
          {section.content}
        </blockquote>
      );
    case "callout":
      return (
        <div key={i} className="my-6 p-4 bg-accent-amber/5 border border-accent-amber/20 rounded-lg font-sans text-sm text-text-muted leading-relaxed">
          {section.content}
        </div>
      );
    case "list":
      return (
        <ul key={i} className="space-y-3 my-6">
          {(section as any).items.map((item: string, j: number) => (
            <li key={j} className="font-sans text-[15px] text-text-muted leading-relaxed pl-6 relative">
              <span className="absolute left-0 top-0 text-accent-amber">—</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "pipeline":
      return <PipelineDiagram key={i} title={(section as any).title} stages={(section as any).stages} />;
    case "schema":
      return <SchemaCard key={i} title={(section as any).title} fields={(section as any).fields} />;
    case "table":
      return (
        <DataTable
          key={i}
          title={(section as any).title}
          columns={(section as any).columns}
          rows={(section as any).rows}
          caption={(section as any).caption}
        />
      );
    case "trace":
      return <TraceBlock key={i} title={(section as any).title} lines={(section as any).lines} />;
    default:
      return null;
  }
}

export default async function WritingPage({ params }: PageProps) {
  const { slug } = await params;

  const project = projects.find((p) => p.writeupSlug === slug);
  if (!project) notFound();

  const writeup = writeups[slug];

  return (
    <main className="max-w-2xl mx-auto py-32 px-8">
      <article>
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-accent-amber tracking-wider uppercase">
              Build Log
            </span>
            <span className="text-border-subtle">·</span>
            <span className="font-mono text-[10px] text-text-dim">{project.period}</span>
          </div>
          <h1 className="font-mono text-3xl md:text-4xl font-light tracking-tight text-text-primary mb-4">
            {project.title}
          </h1>
          <p className="font-sans text-lg text-text-muted font-light leading-relaxed">
            {project.subtitle}
          </p>
        </header>

        {writeup ? (
          <div className="font-sans text-[15px] text-text-muted leading-[1.8]">
            {writeup.sections.map((section, i) => renderSection(section, i))}
          </div>
        ) : (
          <div className="font-sans text-[15px] text-text-muted leading-[1.8] space-y-6">
            <p>{project.description}</p>
            <div className="my-10 p-6 bg-bg-surface border border-border-subtle rounded-lg">
              <div className="font-mono text-[10px] text-text-dim tracking-wider mb-3 uppercase">
                Build Notes
              </div>
              <div className="font-sans text-sm text-text-muted leading-relaxed">
                <p>This field note is being drafted. Once complete, it will include:</p>
                <ul className="mt-3 space-y-1.5 list-disc pl-5">
                  <li>The problem that started this project</li>
                  <li>What made the hard part genuinely hard</li>
                  <li>System architecture and design decisions</li>
                  <li>What broke, what changed, and what worked</li>
                  <li>Diagrams, traces, and artifacts from the build</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="my-10 pt-8 border-t border-border-subtle">
          <div className="font-mono text-[10px] text-text-dim tracking-wider mb-3 uppercase">
            Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] text-text-muted border border-border-subtle rounded-sm px-2 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>

      <footer className="mt-12 pt-6 border-t border-border-subtle">
        <Link
          href="/writing"
          className="font-mono text-xs text-accent-amber hover:underline underline-offset-2 transition-colors"
        >
          ← All Field Notes
        </Link>
      </footer>
    </main>
  );
}
