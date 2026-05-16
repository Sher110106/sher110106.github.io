"use client";

import { motion } from "framer-motion";
import { ChapterBadge } from "@/components/ui/ChapterBadge";
import { TagChip } from "@/components/ui/TagChip";
import { chapters, researchAreas, currentDirection } from "@/data/content";

export function ResearcherPanel({ active }: { active: boolean }) {
  const ch = chapters[2];

  return (
    <div className="min-h-screen w-full flex items-start md:items-center relative overflow-visible md:overflow-hidden md:min-w-[100vw] md:w-screen md:h-screen py-8 md:py-0">
      <div className="z-10 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 md:mb-6">
              <ChapterBadge
                number={ch.number}
                subtitle={ch.subtitle}
                trigger={active}
              />
            </div>
            <h2 className="font-mono font-light text-3xl sm:text-4xl md:text-6xl tracking-tight text-accent-amber mb-4 md:mb-6">
              {ch.title}
            </h2>
            <div className="font-mono text-[11px] sm:text-[13px] text-text-muted leading-relaxed whitespace-pre-line">
              {ch.body}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 md:space-y-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="bg-bg-surface border border-green-terminal/20 rounded-lg p-5"
            >
              <div className="font-mono text-[10px] text-green-terminal tracking-wider mb-2">
                PUBLICATION
              </div>
              <h3 className="font-mono text-sm text-text-cream font-medium">
                &quot;The Fact Graph: A Unified Ontological Representation for
                Multi-Modal Clinical Intelligence&quot;
              </h3>
              <div className="font-mono text-[11px] text-green-terminal/70 mt-2">
                IntelliSys 2026 · Large Language Models for Healthcare
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="font-mono text-[10px] text-text-dim tracking-wider mb-3">
                CORE RESEARCH AREAS
              </div>
              <div className="flex flex-wrap gap-2">
                {researchAreas.map((area) => (
                  <TagChip key={area} label={area} active />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="bg-bg-deep border border-border-subtle rounded-lg p-5 font-mono"
            >
              <div className="text-[10px] text-text-dim tracking-wider mb-3">
                CURRENT DIRECTION
              </div>
              <div className="text-green-terminal text-[11px] leading-relaxed space-y-1">
                <div className="text-text-dim">$ cat direction.txt</div>
                {currentDirection.map((item, i) => (
                  <div key={i} className="text-text-cream">
                    &gt; {item}
                  </div>
                ))}
                <div className="text-accent-amber animate-pulse">$ _</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
