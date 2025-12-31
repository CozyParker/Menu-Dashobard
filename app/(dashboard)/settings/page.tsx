"use client";

import { useState } from "react";
import { Save, SlidersHorizontal, Sparkles } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function SettingsPage() {
  const [strictness, setStrictness] = useState(6);
  const [tone, setTone] = useState("Supportive");
  const [limit, setLimit] = useState("3 nudges/day");

  const insights = [
    {
      title: "Tone guidance",
      description: "Supportive tone yields higher parent response rates.",
    },
    {
      title: "Nudge limits",
      description: "Cap nudges to avoid fatigue. Current cap: 3 per day.",
      action: "Adjust cap",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Tutor Settings & Preferences"
          description="Control communication tone, strictness, and operational limits."
        />

        <QuickActions
          actions={[
            { label: "Save settings", icon: <Save className="h-4 w-4" />, variant: "primary" },
            { label: "Apply defaults", icon: <SlidersHorizontal className="h-4 w-4" />, variant: "outline" },
            { label: "AI suggestions", icon: <Sparkles className="h-4 w-4" /> },
          ]}
        />

        <div className="card p-4 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-900">
              Strictness slider
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={strictness}
              onChange={(e) => setStrictness(Number(e.target.value))}
              className="mt-2 w-full accent-slate-900"
            />
            <p className="text-sm text-slate-600">
              Current level: <span className="font-semibold">{strictness}/10</span>
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-900">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
              >
                <option>Supportive</option>
                <option>Direct</option>
                <option>Celebratory</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-900">
                Limits
              </label>
              <input
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm"
                placeholder="e.g., 3 nudges/day"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-900">
              Communication defaults
            </label>
            <textarea
              className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Preferred greeting, sign-off, and expectations..."
            />
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
