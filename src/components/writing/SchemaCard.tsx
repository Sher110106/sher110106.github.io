interface SlotField {
  name: string;
  type: string;
  values: string;
  note?: string;
}

interface SchemaCardProps {
  title: string;
  fields: SlotField[];
}

export function SchemaCard({ title, fields }: SchemaCardProps) {
  return (
    <div className="my-8">
      <div className="font-mono text-[10px] text-text-dim tracking-wider mb-3 uppercase">
        {title}
      </div>
      <div className="bg-bg-surface border border-border-subtle rounded-lg overflow-hidden">
        <div className="divide-y divide-border-subtle">
          {fields.map((field, i) => (
            <div key={i} className="p-3.5 grid grid-cols-[100px_1fr] gap-3">
              <div>
                <div className="font-mono text-[11px] text-accent-amber font-medium">
                  {field.name}
                </div>
                <div className="font-mono text-[9px] text-text-dim mt-0.5">
                  {field.type}
                </div>
              </div>
              <div>
                <div className="font-sans text-[12px] text-text-muted leading-relaxed">
                  {field.values}
                </div>
                {field.note && (
                  <div className="font-mono text-[9px] text-text-dim mt-1 italic">
                    {field.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
