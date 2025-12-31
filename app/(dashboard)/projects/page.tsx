import { CalendarRange, CheckSquare, ListChecks } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { classes, projects } from "@/lib/mock";

const insights = [
  {
    title: "Timeline risk",
    description:
      "Historical dossier draft review is 2 days out. Add a buffer checkpoint.",
    action: "Add checkpoint",
  },
  {
    title: "Rubric alignment",
    description: "Ensure rubric weights add up to 100%. Two projects need review.",
    action: "Review rubrics",
  },
];

export default function ProjectsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Project & Case Oversight"
          description="Track milestones, rubric readiness, and teaching interventions for projects."
        />

        <QuickActions
          actions={[
            { label: "Add milestone", icon: <CalendarRange className="h-4 w-4" />, variant: "primary" },
            { label: "Edit rubric", icon: <ListChecks className="h-4 w-4" />, variant: "outline" },
            { label: "Share timeline", icon: <CheckSquare className="h-4 w-4" /> },
          ]}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => {
            const cls = classes.find((c) => c.id === project.classId);
            return (
              <div key={project.id} className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {project.title}
                    </p>
                    <p className="text-xs text-slate-500">{cls?.name}</p>
                  </div>
                  <span className="chip chip-muted">Due {project.dueDate}</span>
                </div>

                <div className="mt-3 space-y-2">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Milestones
                  </p>
                  <div className="space-y-2">
                    {project.milestones.map((m) => (
                      <div
                        key={m.label}
                        className="flex items-center justify-between rounded-lg border border-border bg-slate-50 px-3 py-2"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {m.label}
                          </p>
                          <p className="text-xs text-slate-500">{m.date}</p>
                        </div>
                        <span
                          className={`chip ${
                            m.status === "done"
                              ? "bg-emerald-100 text-emerald-700"
                              : m.status === "in_progress"
                                ? "bg-orange-100 text-amber-700"
                                : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {m.status.replace("_", " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Rubric checklist
                  </p>
                  <div className="space-y-2">
                    {project.rubric.map((r) => (
                      <div
                        key={r.criterion}
                        className="flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {r.criterion}
                          </p>
                          <p className="text-xs text-slate-500">
                            Weight {r.weight}%
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={r.met}
                          readOnly
                          className="h-4 w-4 accent-slate-900"
                        />
                      </div>
                    ))}
                  </div>
                </div>
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
