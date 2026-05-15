"use client";

import { useEffect, useState } from "react";

type AsciiStyle = "double" | "round" | "box" | "bold" | "shade";

const borders: Record<AsciiStyle, { tl: string; tr: string; bl: string; br: string; h: string; v: string }> = {
  double: { tl: "╔", tr: "╗", bl: "╚", br: "╝", h: "═", v: "║" },
  round: { tl: "╭", tr: "╮", bl: "╰", br: "╯", h: "─", v: "│" },
  box: { tl: "┌", tr: "┐", bl: "└", br: "┘", h: "─", v: "│" },
  bold: { tl: "▄", tr: "▄", bl: "▀", br: "▀", h: "▄", v: "█" },
  shade: { tl: "░", tr: "░", bl: "░", br: "░", h: "░", v: "░" },
};

interface AsciiFrameProps {
  style: AsciiStyle;
  title: string;
  subtitle?: string;
  trigger: boolean;
}

export function AsciiFrame({ style, title, subtitle, trigger }: AsciiFrameProps) {
  const [visible, setVisible] = useState(false);
  const b = borders[style];
  const width = Math.max(title.length, subtitle?.length || 0) + 4;

  useEffect(() => {
    if (trigger) {
      const t = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [trigger]);

  if (!visible) return null;

  const topLine = b.tl + b.h.repeat(width - 2) + b.tr;
  const botLine = b.bl + b.h.repeat(width - 2) + b.br;
  const padTitle = " ".repeat(Math.max(0, (width - 4 - title.length) / 2));
  const titleLine = b.v + " " + padTitle + title + padTitle + " " + b.v;

  return (
    <div
      className="font-mono text-[13px] leading-tight whitespace-pre text-accent-amber animate-in fade-in duration-500"
      style={{ lineHeight: "1.3" }}
    >
      <div>{topLine}</div>
      <div>{titleLine}</div>
      {subtitle && (
        <div>
          {b.v} {subtitle}{" ".repeat(Math.max(0, width - 4 - subtitle.length))} {b.v}
        </div>
      )}
      <div>{botLine}</div>
    </div>
  );
}
