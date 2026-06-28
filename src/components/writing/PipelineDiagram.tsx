interface Stage {
  label: string;
  sublabel?: string;
}

interface PipelineDiagramProps {
  stages: Stage[];
  title?: string;
}

export function PipelineDiagram({ stages, title }: PipelineDiagramProps) {
  return (
    <div className="my-8">
      {title && (
        <div className="font-mono text-[10px] text-text-dim tracking-wider mb-4 uppercase">
          {title}
        </div>
      )}
      <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {stages.map((stage, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <div className="bg-accent-amber/10 border border-accent-amber/30 rounded-md px-3 py-2 min-w-[90px] text-center">
                  <div className="font-mono text-[11px] text-text-primary font-medium leading-tight">
                    {stage.label}
                  </div>
                  {stage.sublabel && (
                    <div className="font-mono text-[8px] text-text-dim mt-0.5 leading-tight">
                      {stage.sublabel}
                    </div>
                  )}
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="flex items-center text-text-dim shrink-0">
                  <div className="w-4 h-px bg-border-subtle" />
                  <div className="text-[10px] -ml-0.5">▸</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
