type PageHeaderProps = {
  title: string;
  description: string;
  meta?: React.ReactNode;
};

export function PageHeader({ title, description, meta }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-border pb-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {meta}
      </div>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}
