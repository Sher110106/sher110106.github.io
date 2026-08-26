"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ChapterBadgeProps {
  number: number;
  subtitle?: string;
  trigger: boolean;
}

export function ChapterBadge({ number, subtitle, trigger }: ChapterBadgeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(trigger), trigger ? 200 : 0);
    return () => clearTimeout(timer);
  }, [trigger]);

  if (!visible) return null;

  const chapterNum = number.toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="inline-block"
    >
      <div className="border border-accent-amber/30 rounded px-3 py-2 bg-bg-surface/80">
        <div className="font-mono text-[10px] sm:text-xs tracking-[0.15em] text-accent-amber font-medium text-center">
          CHAPTER_{chapterNum}
        </div>
        {subtitle && (
          <div className="font-mono text-[9px] sm:text-[10px] text-text-dim tracking-wider text-center mt-0.5">
            {subtitle}
          </div>
        )}
      </div>
    </motion.div>
  );
}
