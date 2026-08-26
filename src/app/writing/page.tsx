import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/content";
import { essays } from "@/data/essays";

export default function WritingIndex() {
  const entries = essays.flatMap((essay) => {
    const project = projects.find((candidate) => candidate.id === essay.projectId);
    return project ? [{ essay, project }] : [];
  });

  return (
    <main id="main-content" className="max-w-5xl mx-auto py-32 px-6 sm:px-8">
      <header className="mb-16">
        <div className="font-mono text-[10px] text-accent-amber tracking-wider mb-3">SHER&apos;S RESEARCH NOTEBOOK</div>
        <h1 className="font-sans text-5xl sm:text-7xl font-medium tracking-[-0.05em] leading-none text-text-primary mb-5">
          Field Notes
        </h1>
        <p className="font-sans text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl text-pretty">
          Complete build notes from clinical AI, language-model evaluation, reinforcement learning, multi-agent systems, and education. Each note records the system shape, evidence, limitations, and what I would test next.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
        {entries.map(({ essay, project }, index) => (
          <Link
            key={essay.slug}
            href={`/writing/${essay.slug}`}
            className={`block group border-b border-border-subtle pb-7 hover:border-accent-amber/40 transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-amber ${index === 0 ? "md:col-span-2" : ""}`}
          >
            <article className={index === 0 && project.image ? "md:grid md:grid-cols-[1.2fr_1fr] md:gap-8 md:items-end" : ""}>
              {project.image && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border-subtle bg-bg-code mb-5 md:mb-0">
                  <Image src={project.image} alt={`Editorial system illustration for ${project.title}`} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" priority={index === 0} />
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-4 mb-3 font-mono text-[9px] tracking-wide uppercase">
                  <span className="text-accent-amber">{essay.type.replace("-", " ")}</span>
                  <span className="text-text-dim whitespace-nowrap">{essay.date}</span>
                </div>
                <h2 className={`${index === 0 ? "text-2xl sm:text-3xl" : "text-lg"} font-mono font-medium leading-snug text-text-primary group-hover:text-accent-amber transition-colors`}>
                  {essay.title}
                </h2>
                <p className="font-sans text-sm text-text-muted mt-2 leading-relaxed">
                  {essay.summary}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {essay.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] text-text-dim border border-border-subtle rounded-sm px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 font-mono text-[10px] text-accent-amber group-hover:underline underline-offset-2">Read note →</div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
