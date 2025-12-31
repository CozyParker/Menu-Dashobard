import { Plus, Share2, UserRoundCheck } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DataTable } from "@/components/dashboard/DataTable";
import { classes, tutors } from "@/lib/mock";

export default function ClassesPage() {
  const insights = [
    {
      title: "Rebalance cohorts",
      description:
        "Biology Foundations is nearing capacity. Consider splitting into two sections next week.",
      action: "Draft new cohort",
    },
    {
      title: "Risk watch",
      description:
        "World History Seminar flagged as high risk. Add 1:1 checkpoints for top 3 students.",
      action: "Create 1:1 cadence",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Classes & Cohorts"
          description="Manage capacity, tutor coverage, and risk signals for each cohort."
        />

        <QuickActions
          actions={[
            { label: "New class", icon: <Plus className="h-4 w-4" />, variant: "primary" },
            { label: "Assign tutors", icon: <UserRoundCheck className="h-4 w-4" />, variant: "outline" },
            { label: "Share schedule", icon: <Share2 className="h-4 w-4" /> },
          ]}
        />

        <DataTable
          columns={[
            { header: "Class", accessor: "name" },
            { header: "Subject", accessor: "subject" },
            { header: "Level", accessor: "level" },
            {
              header: "Schedule",
              accessor: "schedule",
              render: (row) => <span className="text-slate-600">{row.schedule}</span>,
            },
            {
              header: "Tutor",
              accessor: "tutorId",
              render: (row) => {
                const tutor = tutors.find((t) => t.id === row.tutorId);
                return <span className="font-semibold text-slate-900">{tutor?.name}</span>;
              },
            },
            {
              header: "Students",
              accessor: "studentCount",
              render: (row) => (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
                  {row.studentCount}
                </span>
              ),
            },
            {
              header: "Risk",
              accessor: "riskLevel",
              render: (row) => (
                <span
                  className={`chip ${
                    row.riskLevel === "high"
                      ? "bg-red-100 text-red-700"
                      : row.riskLevel === "medium"
                        ? "bg-orange-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {row.riskLevel}
                </span>
              ),
            },
          ]}
          data={classes}
          emptyMessage="No classes configured yet. Create a cohort to get started."
        />
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
