import { Download, FileText, Sparkles, Upload } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { reports, classes } from "@/lib/mock";

const insights = [
  {
    title: "Parent-ready drafts",
    description:
      "Two parent reports are marked ready. Export to PDF and queue for delivery.",
    action: "Export ready reports",
  },
  {
    title: "Classwide summaries",
    description: "Admin requests monthly summaries for World History Seminar.",
    action: "Generate admin summary",
  },
];

export default function ReportsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Reports & Parent-Ready Summaries"
          description="Compose concise reports, generate exports, and keep guardians in the loop."
        />

        <QuickActions
          actions={[
            { label: "Generate report", icon: <Sparkles className="h-4 w-4" />, variant: "primary" },
            { label: "Upload evidence", icon: <Upload className="h-4 w-4" />, variant: "outline" },
            { label: "Export PDF", icon: <Download className="h-4 w-4" /> },
          ]}
        />

        <div className="card p-4">
          <p className="text-sm font-semibold text-slate-900">
            Report generator wizard
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="text-xs uppercase text-slate-500">
                Audience
              </label>
              <select className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm">
                <option>Parent</option>
                <option>Admin</option>
                <option>Tutor</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase text-slate-500">
                Period
              </label>
              <select className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm">
                <option>This week</option>
                <option>This month</option>
                <option>Custom range</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xs uppercase text-slate-500">
              Key highlights
            </label>
            <textarea
              className="mt-1 h-24 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Concise wins, areas to address, and next steps..."
            />
          </div>
          <button className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            <Sparkles className="h-4 w-4" />
            Generate draft
          </button>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Recent reports
            </p>
            <span className="chip chip-muted">{reports.length} records</span>
          </div>
          <div className="mt-3 space-y-3">
            {reports.map((report) => {
              const cls = report.classId
                ? classes.find((c) => c.id === report.classId)?.name
                : "Individual";
              return (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {report.audience} report
                    </p>
                    <p className="text-xs text-slate-500">
                      {cls} • {report.period}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`chip ${
                        report.status === "ready"
                          ? "bg-emerald-100 text-emerald-700"
                          : report.status === "sent"
                            ? "bg-slate-200 text-slate-700"
                            : "bg-orange-100 text-amber-700"
                      }`}
                    >
                      {report.status}
                    </span>
                    <button className="rounded-lg border border-border px-3 py-1 text-sm font-semibold text-slate-900">
                      <FileText className="mr-1 inline h-4 w-4" />
                      Export
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="lg:hidden">
          <details className="rounded-xl border border-border bg-white px-4 py-3">
            <summary className="text-sm font-semibold text-slate-900">
              Insights
            </summary>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              {insights.map((insight, idx) => (
                <div key={idx} className="rounded-lg bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">{insight.title}</p>
                  <p>{insight.description}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
        <InsightPanel insights={insights} />
      </div>
    </div>
  );
}
