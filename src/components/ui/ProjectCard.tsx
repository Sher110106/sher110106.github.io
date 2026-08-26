"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PixelSprite } from "@/components/ui/PixelSprite";
import { TagChip } from "@/components/ui/TagChip";
import type { Project } from "@/data/content";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const CardContent = (
    <>
      <div className={project.image ? "grid sm:grid-cols-[9.5rem_1fr] gap-4" : ""}>
        {project.image && (
          <div className="relative overflow-hidden rounded-md bg-bg-code border border-border-subtle aspect-[16/10] sm:aspect-auto sm:min-h-[9rem]">
            <Image
              src={project.image}
              alt={`Editorial system illustration for ${project.title}`}
              fill
              sizes="(max-width: 640px) 100vw, 152px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}
        <div>
          <div className="flex items-start gap-3 mb-3">
            <div className="mt-1 shrink-0">
              <PixelSprite name={project.spriteName} size={36} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[9px] text-text-dim tracking-wide uppercase mb-1">
                {project.category} · {project.status}
              </div>
              <h3 className="font-mono text-sm font-medium text-text-primary group-hover:text-accent-amber transition-colors">
                {project.title}
              </h3>
              <div className="font-mono text-[10px] text-accent-amber/80 mt-0.5 leading-relaxed">
                {project.subtitle}
              </div>
              <div className="font-mono text-[10px] text-text-dim mt-1">
                {project.period}
              </div>
            </div>
          </div>
          <p className="font-sans text-[13px] text-text-muted leading-relaxed mb-3 line-clamp-3 group-hover:line-clamp-none transition-all">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <TagChip key={tech} label={tech} />
            ))}
          </div>
          {project.writeupSlug && (
            <div className="mt-3 font-mono text-[10px] text-accent-amber group-hover:underline underline-offset-2">
              Read field note →
            </div>
          )}
        </div>
      </div>
    </>
  );

  const cardClasses =
    "bg-bg-surface border border-border-subtle rounded-lg p-3.5 hover:border-accent-amber/40 transition-all duration-300 group hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {project.writeupSlug ? (
        <Link href={`/writing/${project.writeupSlug}`} className={`block ${cardClasses}`}>
          {CardContent}
        </Link>
      ) : (
        <div className={cardClasses}>{CardContent}</div>
      )}
    </motion.div>
  );
}
