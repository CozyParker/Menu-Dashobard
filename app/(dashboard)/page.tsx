import {
  AlarmClock,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  PlayCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import {
  classes,
  evaluationItems,
  homeworkItems,
  sessions,
  students,
} from "@/lib/mock";

export default function CommandCenterPage() {
  const pendingHomework = homeworkItems.filter((h) => h.status === "pending");
  const pendingEvaluations = evaluationItems.filter(
    (e) => e.status !== "completed"
  );
  const flaggedStudents = students.filter((s) => s.flagged);

  const insights = [
    {
      title: "Approve all pending homework",
      description: `${pendingHomework.length} items queued across ${new Set(
        pendingHomework.map((h) => h.classId)
      ).size} classes.`,
      action: "Open homework queue",
    },
    {
      title: "Flagged students need touchpoints",
      description: `${flaggedStudents.length} students marked at-risk. Schedule a 5-min check-in.`,
      action: "Start quick reach-outs",
    },
    {
      title: "Evaluations ready",
      description: `${pendingEvaluations.length} evaluation packets ready for review.`,
      action: "Review evaluations",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Today’s Command Center"
          description="Approve homework, clear evaluations, and act on at-risk signals in under a minute."
        />

        <QuickActions
          actions={[
            { label: "Send reminder", icon: <Send className="h-4 w-4" /> },
            {
              label: "Approve all",
              icon: <CheckCircle2 className="h-4 w-4" />,
              variant: "primary",
            },
            {
              label: "Create revision plan",
              icon: <Sparkles className="h-4 w-4" />,
              variant: "outline",
            },
            { label: "Export day brief", icon: <AlarmClock className="h-4 w-4" /> },
          ]}
        />

        <section className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-header">Today&apos;s sessions</p>
              <p className="text-base font-semibold text-slate-900">
                Live and upcoming
              </p>
            </div>
            <span className="chip chip-muted">
              {sessions.filter((s) => s.status !== "completed").length} queued
            </span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {sessions.map((session) => {
              const cls = classes.find((c) => c.id === session.classId);
              return (
                <div
                  key={session.id}
                  className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
                >
                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock3 className="h-4 w-4" />
                      <span>{session.time}</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-semibold text-slate-800">
                        {cls?.name}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      Focus: {session.focus}
                    </p>
                  </div>
                  <button
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-subtle hover:bg-slate-800"
                    type="button"
                  >
                    {session.status === "live" ? (
                      <PlayCircle className="h-4 w-4" />
                    ) : (
                      <Clock3 className="h-4 w-4" />
                    )}
                    {session.status === "live" ? "Join live" : "Prep"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="section-header">Homework to review</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {pendingHomework.length}
                </p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-slate-500" />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Prioritize by due date and risk level.
            </p>
            <button className="mt-3 text-sm font-semibold text-slate-900 underline underline-offset-4">
              Review queue
            </button>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="section-header">Evaluations pending</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {pendingEvaluations.length}
                </p>
              </div>
              <Sparkles className="h-5 w-5 text-slate-500" />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Auto-summarized highlights ready to confirm.
            </p>
            <button className="mt-3 text-sm font-semibold text-slate-900 underline underline-offset-4">
              Open evaluations
            </button>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="section-header">Students flagged</p>
                <p className="text-2xl font-semibold text-danger">
                  {flaggedStudents.length}
                </p>
              </div>
              <AlertTriangle className="h-5 w-5 text-danger" />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Quick outreach and revision plans recommended today.
            </p>
            <button className="mt-3 text-sm font-semibold text-slate-900 underline underline-offset-4">
              View flagged list
            </button>
          </div>
        </section>

        <section className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-header">At-risk insights</p>
              <p className="text-base font-semibold text-slate-900">
                AI suggestions for intervention
              </p>
            </div>
            <span className="chip chip-warning">Action needed</span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {flaggedStudents.map((student) => {
              const cohort = classes.find((c) => c.id === student.cohortId);
              return (
                <div
                  key={student.id}
                  className="rounded-lg border border-border bg-slate-50 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      {student.name}
                    </p>
                    <span className="chip chip-muted">{cohort?.name}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-700">
                    Mastery: {student.mastery}%
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Recent errors: {student.recentErrors.join(", ")}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <AlertTriangle className="h-4 w-4 text-danger" />
                    AI: {student.notes}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="space-y-4">
        <div className="lg:hidden">
          <details className="rounded-xl border border-border bg-white px-4 py-3">
            <summary className="text-sm font-semibold text-slate-900">
              Insights
            </summary>
            <div className="mt-3 space-y-3">
              {insights.map((insight, idx) => (
                <div key={idx} className="rounded-lg bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {insight.title}
                  </p>
                  <p className="text-sm text-slate-600">{insight.description}</p>
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
