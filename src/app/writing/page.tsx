import Link from "next/link";
import { projects } from "@/data/content";

export default function WritingIndex() {
  const essays = projects.filter((p) => p.writeupSlug);

  return (
    <main className="max-w-3xl mx-auto py-32 px-8">
      <header className="mb-16">
        <h1 className="font-mono text-3xl font-light tracking-tight text-text-primary mb-3">
          Field Notes
        </h1>
        <p className="font-sans text-[15px] text-text-muted leading-relaxed max-w-xl">
          Notes on systems I built, problems I chased, and things I learned along the way.
        </p>
      </header>

      <div className="space-y-6">
        {essays.map((project) => (
          <Link
            key={project.id}
            href={`/writing/${project.writeupSlug}`}
            className="block group border-b border-border-subtle pb-6 hover:border-accent-amber/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-mono text-base font-medium text-text-primary group-hover:text-accent-amber transition-colors">
                  {project.title}
                </h2>
                <p className="font-sans text-sm text-text-muted mt-1.5 leading-relaxed">
                  {project.subtitle}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] text-text-dim border border-border-subtle rounded-sm px-2 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="font-mono text-[9px] text-text-dim">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
              <div className="font-mono text-[10px] text-text-dim whitespace-nowrap mt-1">
                {project.period}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
