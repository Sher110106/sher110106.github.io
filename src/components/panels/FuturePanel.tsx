"use client";

import { motion } from "framer-motion";
import { AsciiFrame } from "@/components/ui/AsciiFrame";
import { TagChip } from "@/components/ui/TagChip";
import { chapters, contact, techStack } from "@/data/content";

export function FuturePanel({ active }: { active: boolean }) {
  const ch = chapters[4];

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <h2 className="font-mono font-light text-3xl md:text-4xl tracking-tight text-accent-amber mb-3">
                LET&apos;S_BUILD
              </h2>
              <div className="font-mono text-lg text-text-cream">
                THE NEXT INTELLIGENT_SYSTEM
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-3 font-mono"
            >
              <div className="text-[10px] text-text-dim tracking-wider mb-2">
                CONTACT
              </div>
              <div className="text-[11px] text-text-dim">{contact.current}</div>
              <div className="text-[11px] text-text-dim">{contact.incoming}</div>
              <div className="text-sm text-text-cream">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-accent-amber hover:underline transition-colors"
                >
                  {contact.email}
                </a>
              </div>
              <div className="text-[12px] text-text-muted">{contact.phone}</div>
              <div className="flex gap-4 pt-1">
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-accent-amber/70 hover:text-accent-amber transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-accent-amber/70 hover:text-accent-amber transition-colors"
                >
                  GitHub
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="font-mono text-[10px] text-text-dim tracking-wider mb-3">
                TECHNICAL ARSENAL
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech) => (
                  <TagChip key={tech} label={tech} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
