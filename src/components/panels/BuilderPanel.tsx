"use client";

import { motion } from "framer-motion";
import { ChapterBadge } from "@/components/ui/ChapterBadge";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { chapters, projects } from "@/data/content";

export function BuilderPanel({ active }: { active: boolean }) {
  const ch = chapters[1];

  return (
    <div className="min-h-screen w-full flex items-start md:items-center relative overflow-visible md:overflow-hidden md:min-w-[100vw] md:w-screen md:h-screen py-8 md:py-0">
      <div className="z-10 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-24"
          >
            <div className="mb-4 md:mb-6">
              <ChapterBadge
                number={ch.number}
                subtitle={ch.subtitle}
                trigger={active}
              />
            </div>
            <h2 className="font-mono font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-accent-amber mb-4 md:mb-6">
              {ch.title}
            </h2>
            <div className="font-mono text-[11px] sm:text-[13px] text-text-muted leading-relaxed whitespace-pre-line">
              {ch.body}
            </div>
          </motion.div>

          <div className="space-y-3 md:space-y-4 md:max-h-[80vh] overflow-y-auto pr-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
