import { Bell, Search, UserRound } from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-white/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          type="search"
          placeholder="Search students, cohorts, actions..."
          className="w-full rounded-lg border border-border bg-white px-9 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative rounded-full border border-border bg-white p-2 text-slate-600 transition hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <span className="rounded-full bg-slate-900 p-1.5 text-white">
            <UserRound className="h-4 w-4" />
          </span>
          <span>Amelia Carter</span>
        </button>
      </div>
    </header>
  );
}
