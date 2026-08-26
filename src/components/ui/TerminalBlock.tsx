"use client";

import { useEffect, useState } from "react";

interface TerminalBlockProps {
  command?: string;
  content: string;
  trigger: boolean;
}

export function TerminalBlock({ command, content, trigger }: TerminalBlockProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    const allLines = content.split("\n");
    let lineIndex = 0;
    let charIndex = 0;
    const out: string[] = [];
    let interval: ReturnType<typeof setInterval> | undefined;

    const startTimer = setTimeout(() => {
      setLines([]);
      setDone(false);
      interval = setInterval(() => {
        if (lineIndex >= allLines.length) {
          setDone(true);
          if (interval) clearInterval(interval);
          return;
        }
        charIndex++;
        out[lineIndex] = allLines[lineIndex].slice(0, charIndex);
        if (charIndex >= allLines[lineIndex].length) {
          lineIndex++;
          charIndex = 0;
        }
        setLines([...out]);
      }, 15);
    }, 0);

    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [content, trigger]);

  return (
    <div className="bg-bg-code border border-border-subtle rounded-lg p-4 font-mono text-[11px] leading-relaxed">
      {command && <div className="text-text-muted mb-2">{command}</div>}
      <div className="text-green-terminal whitespace-pre">
        {lines.join("\n")}
        {!done && <span className="text-accent-amber animate-pulse">█</span>}
      </div>
    </div>
  );
}
