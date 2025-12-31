import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "./SidebarNav";
import { cn } from "@/lib/utils";

type BottomNavProps = {
  items: NavItem[];
};

export function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t border-border bg-white px-2 py-1 lg:hidden">
      {items.slice(0, 5).map((item) => {
        const active =
          pathname === item.href || pathname?.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-slate-600 transition hover:bg-slate-100",
              active && "bg-slate-900 text-white"
            )}
          >
            <span className="text-slate-500">{item.icon}</span>
            <span className="text-center leading-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
