interface TagChipProps {
  label: string;
  active?: boolean;
}

export function TagChip({ label, active }: TagChipProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[9px] rounded-sm border transition-colors duration-200 font-mono ${
        active
          ? "border-accent-amber/40 text-accent-amber bg-accent-amber/5"
          : "border-border-subtle text-text-muted"
      }`}
    >
      {label}
    </span>
  );
}
