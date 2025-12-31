type EmptyStateProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-slate-50 px-6 py-10 text-center">
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="max-w-md text-sm text-slate-600">{description}</p>
      {action}
    </div>
  );
}
