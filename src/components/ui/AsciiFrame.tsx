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

  useEffect(() => {
    if (trigger) {
      const t = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [trigger]);

  if (!visible) return null;

  const innerWidth = Math.max(title.length, subtitle?.length || 0);

  const topLine = b.tl + b.h.repeat(innerWidth + 2) + b.tr;
  const botLine = b.bl + b.h.repeat(innerWidth + 2) + b.br;

  function padLine(text: string): string {
    const totalPad = innerWidth - text.length;
    const left = Math.floor(totalPad / 2);
    const right = totalPad - left;
    return b.v + " " + " ".repeat(left) + text + " ".repeat(right) + " " + b.v;
  }

  return (
    <div
      className="font-mono text-[10px] md:text-[12px] lg:text-[13px] leading-tight whitespace-pre text-accent-amber overflow-x-auto"
      style={{ lineHeight: "1.3" }}
    >
      <div>{topLine}</div>
      <div>{padLine(title)}</div>
      {subtitle && <div>{padLine(subtitle)}</div>}
      <div>{botLine}</div>
    </div>
  );
}
