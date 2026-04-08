import { Search, LayoutDashboard, FileText, Leaf, ChevronRight, Map } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  /** When true, sidebar fills a parent (e.g. mobile sheet) instead of fixed desktop rail */
  embedded?: boolean;
}

const navPrimary = [
  { id: "search", label: "New Profile", icon: Search },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const navSecondary = [
  { id: "renault-brief", label: "Renault", icon: FileText },
  { id: "carrefour-brief", label: "Carrefour", icon: FileText },
  { id: "stellantis-brief", label: "Stellantis", icon: FileText },
  { id: "totalenergies-brief", label: "TotalEnergies", icon: FileText },
  { id: "saintgobain-brief", label: "Saint-Gobain", icon: FileText },
  { id: "schneiderelectric-brief", label: "Schneider Electric", icon: FileText },
  { id: "veolia-brief", label: "Veolia", icon: FileText },
  { id: "airfranceklm-brief", label: "Air France-KLM", icon: FileText },
  { id: "danone-brief", label: "Danone", icon: FileText },
  { id: "loreal-brief", label: "L'Oréal", icon: FileText },
  { id: "roadmap", label: "Roadmap", icon: Map },
];

export const Sidebar = ({ activeTab, onTabChange, embedded }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "glass-nav flex flex-col border-r border-white/10 text-white",
        embedded ? "h-full min-h-0 w-full" : "fixed left-0 top-0 z-40 hidden h-screen w-64 lg:flex"
      )}
    >
      <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-white/10 px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Leaf className="h-4 w-4 text-primary-foreground" aria-hidden />
        </div>
        <div className="min-w-0">
          <span className="block truncate text-[12px] font-normal tracking-tight text-white">Orange Business</span>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-3">
        <div className="space-y-0.5">
          {navPrimary.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={cn(
                "group flex min-h-11 w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[12px] font-normal tracking-tight transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black/80",
                activeTab === item.id
                  ? "bg-white/12 text-primary"
                  : "text-white/80 hover:bg-white/8 hover:text-white"
              )}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <item.icon className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                <span className="break-words leading-snug">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight className="h-3 w-3 shrink-0 text-primary" aria-hidden />}
            </button>
          ))}
        </div>
        <div className="space-y-0.5 border-t border-white/10 pt-4">
          <p className="px-2.5 pb-1.5 text-[10px] font-normal uppercase tracking-wide text-white/48">Library</p>
          {navSecondary.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={cn(
                "group flex min-h-11 w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[12px] font-normal tracking-tight transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black/80",
                activeTab === item.id
                  ? "bg-white/12 text-primary"
                  : "text-white/80 hover:bg-white/8 hover:text-white"
              )}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <item.icon className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                <span className="break-words leading-snug">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight className="h-3 w-3 shrink-0 text-primary" aria-hidden />}
            </button>
          ))}
        </div>
      </nav>

      <div className="shrink-0 border-t border-white/10 px-3 py-3">
        <p className="text-center text-[10px] font-normal tracking-tight text-white/48">Internal</p>
      </div>
    </aside>
  );
};
