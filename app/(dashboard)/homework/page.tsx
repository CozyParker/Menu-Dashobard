"use client";

import { useMemo, useState } from "react";
import { CalendarClock, CheckSquare, Filter, Send } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { homeworkItems, classes } from "@/lib/mock";

type TabKey = "pending" | "scheduled" | "completed";

export default function HomeworkPage() {
  const [tab, setTab] = useState<TabKey>("pending");

  const filtered = useMemo(
    () => homeworkItems.filter((item) => item.status === tab),
    [tab]
  );

  const insights = [
    {
      title: "Bulk approvals",
      description:
        "Approve low-risk submissions with one click. 8 items match auto-approval rules.",
      action: "Run auto-approval",
    },
    {
      title: "Schedule reminders",
      description: "Send reminders to Biology and Geometry cohorts with one tap.",
      action: "Send reminders",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Homework & Practice Manager"
          description="Control review queues, schedule drops, and close the feedback loop quickly."
        />

        <QuickActions
          actions={[
            { label: "Bulk approve", icon: <CheckSquare className="h-4 w-4" />, variant: "primary" },
            { label: "Send reminder", icon: <Send className="h-4 w-4" />, variant: "outline" },
            { label: "Apply filters", icon: <Filter className="h-4 w-4" /> },
          ]}
        />

        <div className="card p-4">
          <div className="flex items-center gap-2">
            {(["pending", "scheduled", "completed"] as TabKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize ${
                  tab === key
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
                type="button"
              >
                {key}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {filtered.map((item) => {
              const cls = classes.find((c) => c.id === item.classId);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{cls?.name}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Submissions: {item.submissions}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-right">
                    <span className="chip chip-muted">{item.dueDate}</span>
                    {tab === "pending" ? (
                      <button className="text-sm font-semibold text-slate-900 underline underline-offset-4">
                        Review
                      </button>
                    ) : tab === "scheduled" ? (
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <CalendarClock className="h-4 w-4" />
                        Scheduled
                      </div>
                    ) : (
                      <span className="chip chip-success">Completed</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!filtered.length && (
            <div className="mt-4">
              <EmptyState
                title="No items in this tab"
                description="You’re all caught up. New homework will appear here as soon as it is scheduled or submitted."
                action={
                  <button className="text-sm font-semibold text-slate-900 underline underline-offset-4">
                    Create new homework
                  </button>
                }
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
