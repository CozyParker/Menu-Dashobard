import { ImageIcon, PanelsTopLeft, Sparkles } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { EmptyState } from "@/components/dashboard/EmptyState";

const previews = [
  {
    title: "Cell transport diagram",
    status: "Ready",
    description: "Channels labeled with passive vs active transport cues.",
  },
  {
    title: "Quadratic transformations",
    status: "Ready",
    description: "Side-by-side vertex, standard, and factored forms.",
  },
];

const insights = [
  {
    title: "Re-use visuals",
    description:
      "Math visuals from last week can be pinned to the next session prep.",
    action: "Pin to sessions",
  },
  {
    title: "Accessibility",
    description: "Add alt text for two diagrams before sharing with families.",
    action: "Add alt text",
  },
];

export default function VisualsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Visual Teaching Tools"
          description="Generate quick diagrams and anchor visuals to support live instruction."
        />

        <QuickActions
          actions={[
            {
              label: "Generate diagram",
              icon: <Sparkles className="h-4 w-4" />,
              variant: "primary",
            },
            { label: "Upload reference", icon: <PanelsTopLeft className="h-4 w-4" />, variant: "outline" },
            { label: "Share with cohort", icon: <ImageIcon className="h-4 w-4" /> },
          ]}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-4">
            <p className="text-sm font-semibold text-slate-900">
              Generate diagram
            </p>
            <p className="text-xs text-slate-500">
              Mock prompt input with preview placeholder.
            </p>
            <textarea
              className="mt-3 h-28 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Describe what you need (e.g., 'Labelled cell membrane showing diffusion vs active transport')."
            />
            <button className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              <Sparkles className="h-4 w-4" />
              Generate preview
            </button>
          </div>

          <div className="card p-4">
            <p className="text-sm font-semibold text-slate-900">Preview</p>
            <div className="mt-3 flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-slate-50">
              <span className="text-sm text-slate-500">Diagram preview</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-700">
              <span>Alt text: auto-generated summary</span>
              <span className="chip chip-muted">Editable</span>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Saved visuals
            </p>
            <span className="chip chip-muted">{previews.length} ready</span>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {previews.map((preview) => (
              <div key={preview.title} className="rounded-lg border border-border bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">
                    {preview.title}
                  </p>
                  <span className="chip chip-success">{preview.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {preview.description}
                </p>
              </div>
            ))}
          </div>
          {!previews.length && (
            <div className="mt-3">
              <EmptyState
                title="No visuals yet"
                description="Generate or upload a reference to populate this space."
              />
            </div>
          )}
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
