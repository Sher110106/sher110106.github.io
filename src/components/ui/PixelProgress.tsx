"use client";

interface PixelProgressProps {
  total: number;
  active: number;
  labels: string[];
  onSelect: (index: number) => void;
}

export function PixelProgress({ total, active, labels, onSelect }: PixelProgressProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 font-mono">
      <div className="flex items-center gap-2 bg-bg-deep/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border-subtle">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <button
              onClick={() => onSelect(i)}
              className={`text-sm transition-colors duration-300 cursor-pointer hover:text-accent-amber ${
                i === active ? "text-accent-amber" : "text-text-dim"
              }`}
            >
              {i === active ? "■" : "□"}
            </button>
            {i < total - 1 && <span className="text-border-subtle text-[8px]">──</span>}
          </div>
        ))}
      </div>
      <div className="text-[9px] text-text-dim text-center mt-1">
        [{active}/{total - 1}] {labels[active] || ""}
      </div>
    </div>
  );
}
