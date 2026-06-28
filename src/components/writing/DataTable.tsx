interface Column {
  header: string;
  key: string;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  rows: Record<string, string | number>[];
  caption?: string;
}

export function DataTable({ title, columns, rows, caption }: DataTableProps) {
  return (
    <div className="my-8">
      <div className="font-mono text-[10px] text-text-dim tracking-wider mb-3 uppercase">
        {title}
      </div>
      <div className="bg-bg-surface border border-border-subtle rounded-lg overflow-x-auto">
        <table className="w-full font-mono text-[11px]">
          <thead>
            <tr className="border-b border-border-subtle">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-2.5 text-text-dim font-medium tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-bg-surface" : "bg-bg-base/50"}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 text-text-muted whitespace-nowrap">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {caption && (
          <div className="px-4 py-2.5 border-t border-border-subtle">
            <div className="font-mono text-[9px] text-text-dim leading-relaxed">
              {caption}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
