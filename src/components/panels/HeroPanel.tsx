"use client";

import { motion } from "framer-motion";
import { Typewriter } from "@/components/ui/Typewriter";
import { TagChip } from "@/components/ui/TagChip";
import { identity } from "@/data/content";

export function HeroPanel() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-visible md:min-w-[100vw] md:w-screen">
      <div className="z-10 px-4 sm:px-8 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-6 sm:mb-10"
        >
          <h1 className="font-mono font-light text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            {identity.heroWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                className={`block ${i === 0 ? "text-accent-amber" : "text-text-cream"}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="space-y-6"
        >
          <Typewriter
            text={identity.heroSubtext}
            speed={25}
            startDelay={1800}
            className="block text-[13px] md:text-sm text-text-muted leading-relaxed max-w-2xl mx-auto"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="space-y-3"
          >
            <div className="text-sm font-medium tracking-[0.2em] text-text-cream">
              {identity.name}
            </div>
            <div className="text-[11px] text-text-dim tracking-wider">
              {identity.tagline}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-2 pt-2"
          >
            {identity.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 0.8 }}
          className="mt-12 text-text-dim text-xs animate-bounce"
        >
          &rarr;
        </motion.div>
      </div>
    </div>
  );
}
