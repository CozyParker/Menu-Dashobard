"use client";

import { useState } from "react";
import { FileQuestion, LayoutTemplate, PlusCircle } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { questionBank } from "@/lib/mock";

export default function AssessmentsPage() {
  const [showMcq, setShowMcq] = useState(true);
  const [showCase, setShowCase] = useState(false);

  const insights = [
    {
      title: "Re-use best items",
      description:
        "Pull top-performing MCQs into the next assessment set for Geometry Lab.",
      action: "Add to set",
    },
    {
      title: "Diversity check",
      description:
        "Balance case studies vs MCQs to cover reasoning and recall evenly.",
      action: "Run coverage check",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Question & Assessment Builder"
          description="Curate question banks and launch assessments with reusable patterns."
        />

        <QuickActions
          actions={[
            {
              label: "Create MCQ",
              icon: <PlusCircle className="h-4 w-4" />,
              variant: "primary",
            },
            {
              label: "Create Case Study",
              icon: <LayoutTemplate className="h-4 w-4" />,
              variant: "outline",
            },
            { label: "Import items", icon: <FileQuestion className="h-4 w-4" /> },
          ]}
        />

        <DataTable
          columns={[
            { header: "Type", accessor: "type" },
            { header: "Prompt", accessor: "prompt" },
            { header: "Difficulty", accessor: "difficulty" },
            {
              header: "Tags",
              accessor: "tags",
              render: (row) => (
                <div className="flex flex-wrap gap-1">
                  {row.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ),
            },
            { header: "Updated", accessor: "updatedAt" },
          ]}
          data={questionBank}
          emptyMessage="No questions yet. Add an MCQ or case study to get started."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Create MCQ
                </p>
                <p className="text-xs text-slate-500">Quick modal preview</p>
              </div>
              <button
                onClick={() => setShowMcq((prev) => !prev)}
                className="text-sm font-semibold text-slate-900 underline underline-offset-4"
              >
                {showMcq ? "Collapse" : "Expand"}
              </button>
            </div>
            {showMcq && (
              <form className="mt-3 space-y-3">
                <div>
                  <label className="text-xs uppercase text-slate-500">
                    Prompt
                  </label>
                  <textarea
                    className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="Write a concise MCQ prompt..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs uppercase text-slate-500">
                      Difficulty
                    </label>
                    <select className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm">
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase text-slate-500">
                      Tags
                    </label>
                    <input
                      className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
                      placeholder="e.g., Algebra, Graphs"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Save MCQ
                </button>
              </form>
            )}
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Create Case Study
                </p>
                <p className="text-xs text-slate-500">Modal form outline</p>
              </div>
              <button
                onClick={() => setShowCase((prev) => !prev)}
                className="text-sm font-semibold text-slate-900 underline underline-offset-4"
              >
                {showCase ? "Collapse" : "Expand"}
              </button>
            </div>
            {showCase && (
              <form className="mt-3 space-y-3">
                <div>
                  <label className="text-xs uppercase text-slate-500">
                    Scenario
                  </label>
                  <textarea
                    className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="Describe the case context..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs uppercase text-slate-500">
                      Expected depth
                    </label>
                    <select className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm">
                      <option>Brief</option>
                      <option>Standard</option>
                      <option>Extended</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase text-slate-500">
                      Rubric hook
                    </label>
                    <input
                      className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
                      placeholder="Evidence, reasoning, creativity..."
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  Save case study
                </button>
              </form>
            )}
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
