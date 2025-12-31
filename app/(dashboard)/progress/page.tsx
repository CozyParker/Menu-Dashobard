"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Filter,
  NotebookPen,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { classes, students } from "@/lib/mock";

export default function ProgressPage() {
  const [cohortId, setCohortId] = useState<string>("all");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

  const filteredStudents = useMemo(
    () =>
      cohortId === "all"
        ? students
        : students.filter((student) => student.cohortId === cohortId),
    [cohortId]
  );

  const selectedStudent = students.find(
    (student) => student.id === selectedStudentId
  );

  const insights = [
    {
      title: "Targeted reteach",
      description:
        "3 students miss vertex form translations. Add a 10-minute micro-lesson before next class.",
      action: "Schedule reteach",
    },
    {
      title: "Notes to convert",
      description:
        "Tutor notes on flagged students can convert to revision plans in one click.",
      action: "Generate plan",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Student Progress & Evaluation"
          description="Monitor mastery trends, open evaluations, and capture notes into quick actions."
        />

        <QuickActions
          actions={[
            { label: "Cohort filter", icon: <Filter className="h-4 w-4" /> },
            {
              label: "Generate mastery snapshot",
              icon: <Sparkles className="h-4 w-4" />,
              variant: "primary",
            },
            {
              label: "Add tutor note",
              icon: <NotebookPen className="h-4 w-4" />,
              variant: "outline",
            },
          ]}
        />

        <div className="card p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <label className="text-sm font-semibold text-slate-900">
                Cohort
              </label>
              <select
                value={cohortId}
                onChange={(e) => setCohortId(e.target.value)}
                className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                <option value="all">All</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
            <span className="chip chip-muted">
              {filteredStudents.length} students
            </span>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {filteredStudents.map((student) => {
              const cohort = classes.find((c) => c.id === student.cohortId);
              return (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudentId(student.id)}
                  className="group flex w-full flex-col items-start gap-2 rounded-lg border border-border bg-white px-4 py-3 text-left transition hover:border-slate-400"
                >
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-500">{cohort?.name}</p>
                    </div>
                    {student.flagged ? (
                      <span className="chip bg-red-100 text-red-700">
                        Flagged
                      </span>
                    ) : (
                      <span className="chip bg-emerald-100 text-emerald-700">
                        Stable
                      </span>
                    )}
                  </div>
                  <div className="flex w-full items-center justify-between text-sm text-slate-700">
                    <span>Mastery: {student.mastery}%</span>
                    <span className="text-xs text-slate-500">
                      Growth: {student.growth}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Recent errors: {student.recentErrors.join(", ")}
                  </p>
                </button>
              );
            })}
          </div>

          {!filteredStudents.length && (
            <div className="mt-4 rounded-lg border border-dashed border-border bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
              No students in this cohort yet.
            </div>
          )}
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Student detail drawer
            </p>
            <span className="chip chip-muted">
              {selectedStudent ? "Open" : "Select a student"}
            </span>
          </div>

          {selectedStudent ? (
            <div className="mt-3 space-y-3 rounded-lg border border-border bg-slate-50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {selectedStudent.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    Mastery snapshot: {selectedStudent.mastery}%
                  </p>
                </div>
                <span className="chip bg-indigo-100 text-indigo-700">
                  {selectedStudent.growth} growth
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Recent errors
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {selectedStudent.recentErrors.map((error, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-amber-600" />
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Tutor notes
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {selectedStudent.notes}
                </p>
              </div>
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline underline-offset-4">
                Convert to revision plan
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="mt-4 rounded-lg border border-dashed border-border bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
              Select a student to view mastery and notes.
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
