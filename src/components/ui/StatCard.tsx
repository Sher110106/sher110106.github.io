"use client";

import { useCounter } from "@/hooks/useCounter";

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
}

export function StatCard({ value, suffix, label, trigger }: StatCardProps) {
  const count = useCounter(value, 1500, trigger);

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 text-center font-mono">
      <div className="text-4xl font-light text-accent-amber tracking-tight">
        {count}
        <span className="text-xl text-text-muted">{suffix}</span>
      </div>
      <div className="text-[11px] text-text-muted mt-2">{label}</div>
    </div>
  );
}
