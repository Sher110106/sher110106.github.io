"use client";

import { useEffect, useRef, useState } from "react";
import { drawSprite, type SpriteName } from "@/lib/pixels";

interface PixelSpriteProps {
  name: SpriteName;
  size?: number;
  className?: string;
}

export function PixelSprite({ name, size = 48, className }: PixelSpriteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const interval = setInterval(() => {
      frameRef.current = (frameRef.current + 1) % 4;
      drawSprite(ctx, name, size, frameRef.current % 2, hovered);
    }, 600);

    drawSprite(ctx, name, size, 0, hovered);

    return () => clearInterval(interval);
  }, [name, size, hovered]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ imageRendering: "pixelated", width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
}
