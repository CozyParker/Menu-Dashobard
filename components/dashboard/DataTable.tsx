type Column = {
  header: string;
  accessor: string;
  className?: string;
  render?: (row: any) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column[];
  data: T[];
  emptyMessage?: string;
};

export function DataTable<T>({
  columns,
  data,
  emptyMessage = "No data available.",
}: DataTableProps<T>) {
  if (!data.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-subtle">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white">
              {columns.map((col) => (
                <td key={col.header} className="px-4 py-3 text-slate-800">
                  {col.render ? col.render(row) : (row as any)[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
