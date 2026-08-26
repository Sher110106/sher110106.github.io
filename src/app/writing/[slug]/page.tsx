import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/content";
import { essays } from "@/data/essays";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = essays.find((candidate) => candidate.slug === slug);
  if (!essay) return {};
  return {
    title: `${essay.title} | Sher Partap Singh`,
    description: essay.summary,
  };
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
          {section.items.map((item, j) => (
            <li key={j} className="font-sans text-[15px] text-text-muted leading-relaxed pl-6 relative">
              <span className="absolute left-0 top-0 text-accent-amber">—</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "pipeline":
      return <PipelineDiagram key={i} title={section.title} stages={section.stages} />;
    case "schema":
      return <SchemaCard key={i} title={section.title} fields={section.fields} />;
    case "table":
      return (
        <DataTable
          key={i}
          title={section.title}
          columns={section.columns}
          rows={section.rows}
          caption={section.caption}
        />
      );
    case "trace":
      return <TraceBlock key={i} title={section.title} lines={section.lines} />;
    default:
      return null;
  }
}

export default async function WritingPage({ params }: PageProps) {
  const { slug } = await params;

  const project = projects.find((p) => p.writeupSlug === slug);
  if (!project) notFound();

  const writeup = writeups[slug];
  const essay = essays.find((candidate) => candidate.slug === slug);
  if (!writeup) notFound();

  return (
    <main id="main-content" className="max-w-3xl mx-auto py-32 px-6 sm:px-8">
      <article>
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-accent-amber tracking-wider uppercase">
              {essay?.type.replace("-", " ") ?? "Field note"}
            </span>
            <span className="text-border-subtle">·</span>
            <span className="font-mono text-[10px] text-text-dim">{project.period}</span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-medium tracking-[-0.045em] leading-[1.02] text-text-primary mb-5 text-balance">
            {essay?.title ?? project.title}
          </h1>
          <p className="font-sans text-lg text-text-muted font-light leading-relaxed text-pretty">
            {essay?.summary ?? project.subtitle}
          </p>
          <div className="mt-5 font-mono text-[10px] text-text-dim">
            {project.title} · {project.status}
          </div>
        </header>

        {project.image && (
          <figure className="mb-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border-subtle bg-bg-code">
              <Image src={project.image} alt={`Editorial system illustration for ${project.title}`} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
            </div>
            <figcaption className="font-mono text-[9px] text-text-dim mt-2">
              Generated editorial system plate for this project.
            </figcaption>
          </figure>
        )}

        <div className="font-sans text-[15px] text-text-muted leading-[1.8]">
          {writeup.sections.map((section, i) => renderSection(section, i))}
        </div>

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
          {project.externalUrl && (
            <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 font-mono text-xs text-accent-amber hover:underline underline-offset-2">
              Open project source ↗
            </a>
          )}
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
