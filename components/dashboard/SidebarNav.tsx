import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type SidebarNavProps = {
  items: NavItem[];
};

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-72 lg:flex-col gap-4 border-r border-border bg-white px-4 py-6">
      <div className="flex items-center gap-2 px-2">
        <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-lg font-bold">
          TA
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Tutor Admin Hub
          </p>
          <p className="text-xs text-slate-500">Today&apos;s command center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-100",
                active
                  ? "bg-slate-900 text-white shadow-subtle"
                  : "text-slate-700"
              )}
              aria-current={active ? "page" : undefined}
            >
              <span className="text-slate-500">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-xl border border-dashed border-border bg-slate-50 px-3 py-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Health snapshot
        </p>
        <div className="mt-2 flex items-center justify-between text-sm font-semibold">
          <span>Readiness</span>
          <span className="text-emerald-600">Stable</span>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Cohorts covered, rules active, and reports scheduled.
        </p>
      </div>
    </aside>
  );
}
