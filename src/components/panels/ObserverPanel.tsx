"use client";

import { motion } from "framer-motion";
import { ChapterBadge } from "@/components/ui/ChapterBadge";
import { chapters, experiences } from "@/data/content";

export function ObserverPanel({ active }: { active: boolean }) {
  const ch = chapters[0];

  return (
    <div className="min-h-screen w-full flex items-start lg:items-center relative py-8 lg:py-0 lg:min-w-[100vw] lg:w-screen lg:h-screen lg:overflow-hidden">
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
            <div className="font-sans text-[13px] sm:text-[15px] md:text-base text-text-muted leading-relaxed whitespace-pre-line">
              {ch.body}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 md:max-h-[78vh] md:overflow-y-auto md:pr-2"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="bg-bg-surface border border-border-subtle rounded-lg p-5"
              >
                <div className="text-[10px] text-text-dim tracking-wider mb-1 font-mono">
                  {exp.period}
                </div>
                <h3 className="font-mono text-sm font-medium text-text-primary">
                  {exp.title}
                </h3>
                <div className="font-mono text-[11px] text-accent-amber/70 mt-0.5">
                  {exp.org}
                </div>
                <p className="font-sans text-[13px] text-text-muted mt-2 leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
