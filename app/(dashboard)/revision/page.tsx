"use client";

import { useState } from "react";
import { BrainCircuit, CalendarClock, Sparkles } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { revisionPlans, classes } from "@/lib/mock";

export default function RevisionPage() {
  const [focusArea, setFocusArea] = useState("Quadratics");
  const [cadence, setCadence] = useState("3 sessions/week");
  const [generated, setGenerated] = useState(revisionPlans);

  const insights = [
    {
      title: "Prioritize flagged learners",
      description:
        "Flagged students have no active revision loops. Generate tailored plans now.",
      action: "Generate tailored plans",
    },
    {
      title: "Plan freshness",
      description: "Two plans are older than 4 weeks. Refresh cadence and focus.",
      action: "Refresh plans",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Revision & Reinforcement Planner"
          description="Generate weak-area plans, schedule cadences, and keep cohorts on track."
        />

        <QuickActions
          actions={[
            {
              label: "Generate plan",
              icon: <Sparkles className="h-4 w-4" />,
              variant: "primary",
            },
            {
              label: "Share with tutors",
              icon: <BrainCircuit className="h-4 w-4" />,
              variant: "outline",
            },
            { label: "Schedule cadence", icon: <CalendarClock className="h-4 w-4" /> },
          ]}
        />

        <div className="card p-4">
          <p className="text-sm font-semibold text-slate-900">
            Weak-area plan generator
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="text-xs uppercase text-slate-500">
                Focus area
              </label>
              <input
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="e.g., Vertex form translations"
              />
            </div>
            <div>
              <label className="text-xs uppercase text-slate-500">Cadence</label>
              <input
                value={cadence}
                onChange={(e) => setCadence(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="e.g., 2 sessions/week"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              setGenerated((prev) => [
                {
                  id: `new-${Date.now()}`,
                  title: `${focusArea} plan`,
                  classId: "c1",
                  focusAreas: [focusArea],
                  cadence,
                  owner: "Auto-generated",
                  status: "draft",
                },
                ...prev,
              ])
            }
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <Sparkles className="h-4 w-4" />
            Generate plan cards
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {generated.map((plan) => {
            const cls = classes.find((c) => c.id === plan.classId);
            return (
              <div key={plan.id} className="card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {plan.title}
                    </p>
                    <p className="text-xs text-slate-500">{cls?.name}</p>
                  </div>
                  <span
                    className={`chip ${
                      plan.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : plan.status === "completed"
                          ? "bg-slate-200 text-slate-700"
                          : "bg-orange-100 text-amber-700"
                    }`}
                  >
                    {plan.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-700">
                  Focus: {plan.focusAreas.join(", ")}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Cadence: {plan.cadence}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Owner: {plan.owner}
                </p>
              </div>
            );
          })}
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
