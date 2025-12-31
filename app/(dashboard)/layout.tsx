import type { ReactNode } from "react";
import {
  Atom,
  BarChart3,
  BookOpenCheck,
  ClipboardCheck,
  Cog,
  Gamepad2,
  Home,
  Layers,
  NotebookPen,
  Puzzle,
  School,
  Sparkles,
  Workflow,
} from "lucide-react";
import { SidebarNav, type NavItem } from "@/components/dashboard/SidebarNav";
import { TopBar } from "@/components/dashboard/TopBar";
import { BottomNav } from "@/components/dashboard/BottomNav";

const navItems: NavItem[] = [
  { label: "Today", href: "/", icon: <Home className="h-4 w-4" /> },
  {
    label: "Classes & Cohorts",
    href: "/classes",
    icon: <School className="h-4 w-4" />,
  },
  {
    label: "Progress & Evaluation",
    href: "/progress",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    label: "Homework Manager",
    href: "/homework",
    icon: <BookOpenCheck className="h-4 w-4" />,
  },
  {
    label: "Assessment Builder",
    href: "/assessments",
    icon: <NotebookPen className="h-4 w-4" />,
  },
  {
    label: "Revision Planner",
    href: "/revision",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    label: "Visual Tools",
    href: "/visuals",
    icon: <Atom className="h-4 w-4" />,
  },
  {
    label: "Gamification Controls",
    href: "/gamification",
    icon: <Gamepad2 className="h-4 w-4" />,
  },
  {
    label: "Projects & Cases",
    href: "/projects",
    icon: <Puzzle className="h-4 w-4" />,
  },
  {
    label: "Reports & Summaries",
    href: "/reports",
    icon: <ClipboardCheck className="h-4 w-4" />,
  },
  {
    label: "Automation & Rules",
    href: "/automations",
    icon: <Workflow className="h-4 w-4" />,
  },
  {
    label: "Tutor Settings",
    href: "/settings",
    icon: <Cog className="h-4 w-4" />,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav items={navItems} />

      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 pb-20 lg:pb-8">
          {children}
        </main>
      </div>

      <BottomNav items={navItems} />
    </div>
  );
}
