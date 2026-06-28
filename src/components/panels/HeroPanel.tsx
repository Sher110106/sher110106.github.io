"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { identity } from "@/data/content";

const sentences = [
  { text: "I'm a CS & AI student at Plaksha University." },
  { text: "I build practical AI systems." },
  { text: "I make messy data feel legible." },
  { text: "I write about what the build taught me.", href: "/writing" },
  { text: "I believe technology should feel human." },
];

export function HeroPanel() {
  return (
    <div className="min-h-screen w-full flex items-center relative lg:min-w-[100vw] lg:w-screen lg:h-screen lg:overflow-hidden">
      <div className="z-10 w-full max-w-2xl mx-auto px-6 sm:px-10 pb-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src="/portrait.png"
            alt="Sher Partap Singh"
            className="w-20 h-20 rounded-full object-cover border border-border-subtle"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="font-sans text-4xl sm:text-5xl font-medium tracking-tight text-text-primary mb-12"
        >
          Hi, I'm Sher.
        </motion.h1>

        <div className="space-y-5">
          {sentences.map((s, i) => {
            const inner = (
              <span className={s.href ? "underline decoration-border-subtle underline-offset-4 hover:decoration-accent-amber hover:text-accent-amber transition-colors" : ""}>
                {s.text}
              </span>
            );
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.12, duration: 0.5, ease: "easeOut" }}
                className="text-xl sm:text-2xl leading-relaxed text-text-primary font-light"
              >
                {s.href ? (
                  <Link href={s.href}>{inner}</Link>
                ) : (
                  inner
                )}
              </motion.p>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-14 text-xs text-text-dim font-mono"
        >
          {identity.tagline} · Currently in Mohali, India
        </motion.p>
      </div>
    </div>
  );
}