"use client";

import { motion } from "framer-motion";
import { AsciiFrame } from "@/components/ui/AsciiFrame";
import { chapters, experiences } from "@/data/content";

export function ObserverPanel({ active }: { active: boolean }) {
  const ch = chapters[0];

  return (
    <div className="min-w-[100vw] w-screen h-screen flex items-center relative overflow-hidden">
      <div className="z-10 px-8 md:px-16 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <AsciiFrame
                style={ch.asciiStyle}
                title={`CHAPTER_0${ch.number}`}
                subtitle={ch.subtitle}
                trigger={active}
              />
            </div>
            <h2 className="font-mono font-light text-5xl md:text-6xl tracking-tight text-accent-amber mb-6">
              {ch.title}
            </h2>
            <div className="font-mono text-[13px] md:text-sm text-text-muted leading-relaxed whitespace-pre-line">
              {ch.body}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
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
                <h3 className="font-mono text-sm font-medium text-text-cream">
                  {exp.title}
                </h3>
                <div className="font-mono text-[11px] text-accent-amber/70 mt-0.5">
                  {exp.org}
                </div>
                <p className="font-mono text-[12px] text-text-muted mt-2 leading-relaxed">
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
