import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Action = {
  label: string;
  icon: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  loading?: boolean;
};

type QuickActionsProps = {
  actions: Action[];
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200",
            action.variant === "primary" &&
              "border-transparent bg-slate-900 text-white hover:bg-slate-800",
            action.variant === "outline" &&
              "border-border bg-white text-slate-800 hover:bg-slate-50",
            (!action.variant || action.variant === "ghost") &&
              "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200"
          )}
        >
          {action.loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            action.icon
          )}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}
