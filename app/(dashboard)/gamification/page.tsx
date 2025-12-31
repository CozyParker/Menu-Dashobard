"use client";

import { useState } from "react";
import { Gamepad2, Settings2, Sparkles } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";

const defaultToggles = [
  { key: "streaks", label: "Enable streak nudges", enabled: true },
  { key: "badges", label: "Tutor-assigned badges", enabled: true },
  { key: "leaderboard", label: "Show cohort leaderboard", enabled: false },
  { key: "xp", label: "XP for tutor tasks", enabled: true },
];

export default function GamificationPage() {
  const [toggles, setToggles] = useState(defaultToggles);

  const insights = [
    {
      title: "Keep it tutor-first",
      description:
        "All controls are tutor-facing only. No student UI is exposed from this screen.",
    },
    {
      title: "Rules to refine",
      description:
        "XP for tutor tasks is popular. Consider adding a cap of 3 nudges per week.",
      action: "Edit XP rule",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Gamification Controls"
          description="Toggle tutor-side motivators, configure rules, and keep incentives aligned."
        />

        <QuickActions
          actions={[
            { label: "Add rule", icon: <Settings2 className="h-4 w-4" />, variant: "primary" },
            { label: "Preview tutor view", icon: <Sparkles className="h-4 w-4" />, variant: "outline" },
            { label: "Reset to defaults", icon: <Gamepad2 className="h-4 w-4" /> },
          ]}
        />

        <div className="card p-4">
          <p className="text-sm font-semibold text-slate-900">
            Toggles
          </p>
          <div className="mt-3 space-y-2">
            {toggles.map((toggle) => (
              <label
                key={toggle.key}
                className="flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {toggle.label}
                  </p>
                  <p className="text-xs text-slate-500">
                    Tutor-facing incentive only
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={toggle.enabled}
                  onChange={() =>
                    setToggles((prev) =>
                      prev.map((t) =>
                        t.key === toggle.key ? { ...t, enabled: !t.enabled } : t
                      )
                    )
                  }
                  className="h-4 w-4 accent-slate-900"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <p className="text-sm font-semibold text-slate-900">
            Rules editor
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">
                Streak encouragement
              </p>
              <p className="text-sm text-slate-600">
                Trigger: Missed submission · Action: Send tutor nudge · Channel: In-app
              </p>
              <button className="mt-2 text-sm font-semibold text-slate-900 underline underline-offset-4">
                Edit rule
              </button>
            </div>
            <div className="rounded-lg border border-border bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">
                Badge assignment
              </p>
              <p className="text-sm text-slate-600">
                Trigger: Mastery jump +10 · Action: Suggest badge · Channel: Tutor task
              </p>
              <button className="mt-2 text-sm font-semibold text-slate-900 underline underline-offset-4">
                Edit rule
              </button>
            </div>
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
