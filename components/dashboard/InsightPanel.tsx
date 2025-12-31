type Insight = {
  title: string;
  description: string;
  action?: string;
  tone?: "positive" | "warning" | "neutral";
};

type InsightPanelProps = {
  title?: string;
  insights: Insight[];
};

export function InsightPanel({
  title = "AI & Ops Insights",
  insights,
}: InsightPanelProps) {
  return (
    <aside className="card hidden w-full max-w-sm shrink-0 flex-col gap-3 border border-border lg:flex">
      <div className="border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">
          Quick signals across cohorts and students.
        </p>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {insights.map((insight, idx) => (
          <div key={idx} className="px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">
              {insight.title}
            </p>
            <p className="mt-1 text-sm text-slate-600">{insight.description}</p>
            {insight.action ? (
              <button className="mt-2 text-sm font-semibold text-slate-900 underline underline-offset-4">
                {insight.action}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}
