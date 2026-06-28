interface TraceLine {
  text: string;
  status?: "pass" | "fail" | "neutral" | "highlight";
}

interface TraceBlockProps {
  title: string;
  lines: TraceLine[];
}

const statusStyles = {
  pass: "text-green-terminal",
  fail: "text-accent-rose",
  neutral: "text-text-dim",
  highlight: "text-accent-amber",
};

const statusPrefix = {
  pass: "✓",
  fail: "✗",
  neutral: " ",
  highlight: "→",
};

export function TraceBlock({ title, lines }: TraceBlockProps) {
  return (
    <div className="my-8">
      <div className="font-mono text-[10px] text-text-dim tracking-wider mb-3 uppercase">
        {title}
      </div>
      <div className="bg-bg-code border border-border-subtle rounded-lg p-4 overflow-x-auto">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`font-mono text-[11px] leading-relaxed whitespace-pre-wrap ${
              statusStyles[line.status || "neutral"]
            }`}
          >
            <span className="mr-2 select-none">
              {statusPrefix[line.status || "neutral"]}
            </span>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
