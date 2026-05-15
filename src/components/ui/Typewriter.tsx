"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 60,
  startDelay = 300,
  className,
}: TypewriterProps) {
  const { displayed, done } = useTypewriter(text, speed, startDelay);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span className="text-accent-amber animate-pulse ml-0.5">_</span>
      )}
    </span>
  );
}
