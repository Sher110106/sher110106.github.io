"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { identity } from "@/data/content";

export function HeroPanel() {
  return (
    <div className="min-h-screen w-full flex items-center relative lg:min-w-[100vw] lg:w-screen lg:h-screen lg:overflow-hidden">
      <div className="z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 pb-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-7 flex items-center gap-4"
        >
          <Image
            src="/portrait.png"
            alt="Sher Partap Singh"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover border border-border-subtle"
          />
          <div className="font-mono text-[10px] sm:text-xs leading-relaxed text-text-dim tracking-wide">
            <div>{identity.tagline}</div>
            <div>Mohali, India · Class of 2027</div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="font-sans text-5xl sm:text-7xl font-medium tracking-[-0.05em] leading-[0.95] text-text-primary mb-7 text-balance"
        >
          I build AI systems that can be checked.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55, ease: "easeOut" }}
          className="max-w-2xl text-lg sm:text-xl leading-relaxed text-text-muted font-light text-pretty"
        >
          {identity.heroSubtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-7 flex flex-wrap gap-2"
        >
          {identity.tags.map((tag) => (
            <span key={tag} className="font-mono text-[10px] text-text-muted border border-border-subtle rounded-sm px-2.5 py-1 bg-bg-surface/60">
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center gap-5 font-mono text-xs"
        >
          <button
            type="button"
            onClick={() => document.getElementById("panel-2")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-text-primary text-bg-base px-4 py-2.5 rounded-sm hover:bg-accent-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber active:translate-y-px transition-all"
          >
            Explore the work →
          </button>
          <Link href="/writing" className="text-text-muted hover:text-accent-amber underline decoration-border-subtle underline-offset-4 transition-colors">
            Read field notes
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-amber underline decoration-border-subtle underline-offset-4 transition-colors">
            Résumé · PDF
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-10 text-[10px] text-text-dim font-mono"
        >
          Scroll horizontally or use the chapter index below
        </motion.p>
      </div>
    </div>
  );
}
