"use client";

import { motion } from "framer-motion";
import { AsciiFrame } from "@/components/ui/AsciiFrame";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { chapters, projects } from "@/data/content";

export function BuilderPanel({ active }: { active: boolean }) {
  const ch = chapters[1];

  return (
    <div className="min-w-[100vw] w-screen h-screen flex items-center relative overflow-hidden">
      <div className="z-10 px-8 md:px-16 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-24"
          >
            <div className="mb-6">
              <AsciiFrame
                style={ch.asciiStyle}
                title={`CHAPTER_0${ch.number}`}
                subtitle={ch.subtitle}
                trigger={active}
              />
            </div>
            <h2 className="font-mono font-light text-4xl md:text-5xl tracking-tight text-accent-amber mb-6">
              {ch.title}
            </h2>
            <div className="font-mono text-[13px] text-text-muted leading-relaxed whitespace-pre-line">
              {ch.body}
            </div>
          </motion.div>

          <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
