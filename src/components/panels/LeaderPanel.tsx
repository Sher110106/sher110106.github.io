"use client";

import { motion } from "framer-motion";
import { AsciiFrame } from "@/components/ui/AsciiFrame";
import { StatCard } from "@/components/ui/StatCard";
import { chapters, stats, leadershipItems } from "@/data/content";

export function LeaderPanel({ active }: { active: boolean }) {
  const ch = chapters[3];

  return (
    <div className="min-h-screen w-full flex items-center relative overflow-hidden md:min-w-[100vw] md:w-screen md:h-screen py-8 md:py-0">
      <div className="z-10 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 md:mb-6">
              <AsciiFrame
                style={ch.asciiStyle}
                title={`CHAPTER_0${ch.number}`}
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
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <StatCard
                  key={i}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  trigger={active}
                />
              ))}
            </div>

            <div className="space-y-3">
              {leadershipItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={active ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="bg-bg-surface border border-border-subtle rounded-lg p-4"
                >
                  <h3 className="font-mono text-sm font-medium text-text-cream">
                    {item.title}
                  </h3>
                  <div className="font-mono text-[11px] text-accent-amber/60 mt-0.5">
                    {item.org}
                  </div>
                  <p className="font-mono text-[12px] text-text-muted mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
