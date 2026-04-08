import { Search, LayoutDashboard, FileText, Network, Leaf, ChevronRight, Map } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "search", label: "New Profile", icon: Search },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "renault-brief", label: "Renault Brief", icon: FileText },
  { id: "carrefour-brief", label: "Carrefour Brief", icon: FileText },
  { id: "roadmap", label: "Roadmap", icon: Map },
  { id: "architecture", label: "System Architecture", icon: Network },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar hidden lg:flex lg:flex-col">
      <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-4 shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary shrink-0">
          <Leaf className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <span className="text-sm font-semibold text-sidebar-foreground tracking-tight block truncate">Orange Business</span>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 p-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className={cn(
              "group flex w-full items-center justify-between rounded-md px-2.5 py-2 text-xs font-medium transition-colors border-l-2 border-transparent",
              activeTab === item.id
                ? "bg-sidebar-accent text-primary border-l-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <item.icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
              <span className="truncate">{item.label}</span>
            </div>
            {activeTab === item.id && <ChevronRight className="h-3 w-3 shrink-0 opacity-40" />}
          </button>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3 shrink-0">
        <p className="type-eyebrow normal-case text-sidebar-foreground/40 text-center">Internal</p>
      </div>
    </aside>
  );
};
