"use client";

import { motion } from "framer-motion";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { TagChip } from "@/components/ui/TagChip";
import type { Project } from "@/data/content";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-bg-surface border border-border-subtle rounded-lg p-4 hover:border-accent-amber/30 transition-colors duration-300 group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="mt-1 shrink-0">
          <PixelSprite name={project.spriteName} size={40} />
        </div>
        <div className="min-w-0">
          <h3 className="font-mono text-sm font-medium text-text-cream group-hover:text-accent-amber transition-colors">
            {project.title}
          </h3>
          <div className="font-mono text-[10px] text-accent-amber/60 mt-0.5">
            {project.subtitle}
          </div>
          <div className="font-mono text-[10px] text-text-dim mt-0.5">
            {project.period}
          </div>
        </div>
      </div>
      <p className="font-mono text-[11px] text-text-muted leading-relaxed mb-3 line-clamp-3 group-hover:line-clamp-none transition-all">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <TagChip key={tech} label={tech} />
        ))}
      </div>
    </motion.div>
  );
}
