import { useState } from "react";
import { Search, LayoutDashboard, FileText, ChevronRight, Map, ChevronDown } from "lucide-react";
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

const navLibrary = [
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
];

export const Sidebar = ({ activeTab, onTabChange, embedded }: SidebarProps) => {
  const [libraryOpen, setLibraryOpen] = useState(true);

  return (
    <aside
      className={cn(
        "glass-nav flex flex-col border-r border-white/10 text-white",
        embedded ? "h-full min-h-0 w-full" : "fixed left-0 top-0 z-40 hidden h-screen w-64 lg:flex"
      )}
    >
      <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-white/10 px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Search className="h-4 w-4 text-primary-foreground" aria-hidden />
        </div>
        <div className="min-w-0">
          <span className="block truncate text-[12px] font-normal tracking-tight text-white">Orange Business</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto p-3">
        {/* Primary nav */}
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

        {/* Divider */}
        <div className="my-3 border-t border-white/10" />

        {/* Library section — collapsible */}
        <div className="flex-1">
          <button
            type="button"
            onClick={() => setLibraryOpen((o) => !o)}
            className="flex w-full items-center justify-between px-2.5 pb-1.5 focus-visible:outline-none"
          >
            <p className="text-[10px] font-normal uppercase tracking-wide text-white/48">Library</p>
            <ChevronDown
              className={cn(
                "h-3 w-3 text-white/40 transition-transform duration-200",
                libraryOpen ? "rotate-0" : "-rotate-90"
              )}
              aria-hidden
            />
          </button>

          {libraryOpen && (
            <div className="space-y-0.5">
              {navLibrary.map((item) => (
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
          )}
        </div>

        {/* Roadmap — pinned at bottom with top divider */}
        <div className="mt-auto border-t border-white/10 pt-3">
          <button
            type="button"
            onClick={() => onTabChange("roadmap")}
            className={cn(
              "group flex min-h-11 w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[12px] font-normal tracking-tight transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black/80",
              activeTab === "roadmap"
                ? "bg-white/12 text-primary"
                : "text-white/80 hover:bg-white/8 hover:text-white"
            )}
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <Map className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
              <span className="break-words leading-snug">Roadmap</span>
            </div>
            {activeTab === "roadmap" && <ChevronRight className="h-3 w-3 shrink-0 text-primary" aria-hidden />}
          </button>
        </div>
      </nav>

      <div className="shrink-0 border-t border-white/10 px-3 py-3">
        <p className="text-center text-[10px] font-normal tracking-tight text-white/48">Internal</p>
      </div>
    </aside>
  );
};
