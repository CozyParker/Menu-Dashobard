"use client";

import { useState } from "react";
import { Plus, Play } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { automationRules } from "@/lib/mock";

export default function AutomationsPage() {
  const [showForm, setShowForm] = useState(true);

  const insights = [
    {
      title: "High-impact rules",
      description:
        "Weekly report generator drives the most parent engagement. Keep it active.",
      action: "Review metrics",
    },
    {
      title: "Paused items",
      description:
        "1 rule is paused. Confirm if it should be reactivated before progress meetings.",
      action: "Resume rule",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Automation & Rules"
          description="Configure triggers, actions, and channels to keep tutor workflows moving."
        />

        <QuickActions
          actions={[
            { label: "New rule", icon: <Plus className="h-4 w-4" />, variant: "primary" },
            { label: "Run now", icon: <Play className="h-4 w-4" />, variant: "outline" },
          ]}
        />

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Rules list</p>
            <span className="chip chip-muted">{automationRules.length} rules</span>
          </div>
          <div className="mt-3 space-y-3">
            {automationRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {rule.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Trigger: {rule.trigger} · Action: {rule.action}
                  </p>
                  <p className="text-xs text-slate-500">
                    Channel: {rule.channel} · Owner: {rule.owner}
                  </p>
                </div>
                <span
                  className={`chip ${
                    rule.status === "active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {rule.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Create rule</p>
            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="text-sm font-semibold text-slate-900 underline underline-offset-4"
            >
              {showForm ? "Collapse" : "Expand"}
            </button>
          </div>
          {showForm && (
            <form className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="text-xs uppercase text-slate-500">
                  Trigger
                </label>
                <input
                  className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="e.g., Mastery below 70%"
                />
              </div>
              <div>
                <label className="text-xs uppercase text-slate-500">
                  Channel
                </label>
                <select className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm">
                  <option>Email</option>
                  <option>SMS</option>
                  <option>In-app</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs uppercase text-slate-500">
                  Action
                </label>
                <input
                  className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="e.g., Create revision plan draft"
                />
              </div>
              <div>
                <label className="text-xs uppercase text-slate-500">
                  Owner
                </label>
                <input
                  className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Tutor name"
                />
              </div>
              <button
                type="button"
                className="md:col-span-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
                Save rule
              </button>
            </form>
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
