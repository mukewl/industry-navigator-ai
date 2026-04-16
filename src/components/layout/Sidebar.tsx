import { Search, LayoutDashboard, FileText, ChevronRight, Map, Clock, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  recentIds: string[];
  embedded?: boolean;
}

const navPrimary = [
  { id: "search", label: "New Profile", icon: Search },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const COMPANY_LABEL: Record<string, string> = {
  "renault-brief":           "Renault",
  "carrefour-brief":         "Carrefour",
  "stellantis-brief":        "Stellantis",
  "totalenergies-brief":     "TotalEnergies",
  "saintgobain-brief":       "Saint-Gobain",
  "schneiderelectric-brief": "Schneider Electric",
  "veolia-brief":            "Veolia",
  "airfranceklm-brief":      "Air France-KLM",
  "danone-brief":            "Danone",
  "loreal-brief":            "L'Oréal",
};

const navItemBase =
  "group flex min-h-[2.375rem] w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[0.75rem] font-medium tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-black/80";
const navItemActive = "bg-white/[0.10] text-primary shadow-[inset_2px_0_0_0_hsl(24_100%_50%)]";
const navItemInactive = "text-white/65 hover:bg-white/[0.07] hover:text-white";

export const Sidebar = ({ activeTab, onTabChange, recentIds, embedded }: SidebarProps) => {
  const CompanyButton = ({ id }: { id: string }) => {
    const active = activeTab === id;
    return (
      <button
        type="button"
        onClick={() => onTabChange(id)}
        className={cn(navItemBase, "min-h-9", active ? navItemActive : navItemInactive)}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <FileText className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
          <span className="break-words leading-snug">{COMPANY_LABEL[id]}</span>
        </div>
        {active && <ChevronRight className="h-3 w-3 shrink-0 text-primary/70" aria-hidden />}
      </button>
    );
  };

  return (
    <aside
      className={cn(
        "glass-nav flex flex-col border-r border-white/[0.08] text-white",
        embedded ? "h-full min-h-0 w-full" : "fixed left-0 top-0 z-40 hidden h-screen w-64 lg:flex"
      )}
    >
      {/* Header */}
      <div className="flex h-13 shrink-0 items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary shadow-[0_2px_8px_rgba(255,105,0,0.35)]">
          <Search className="h-4 w-4 text-primary-foreground" aria-hidden />
        </div>
        <div className="min-w-0">
          <span className="block truncate text-[0.8125rem] font-semibold tracking-tight text-white">Orange Business</span>
          <span className="block text-[0.625rem] font-normal tracking-wide text-white/40 uppercase">Industry Navigator</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto px-2.5 py-3">
        {/* Primary nav */}
        <div className="space-y-0.5">
          {navPrimary.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={cn(navItemBase, active ? navItemActive : navItemInactive)}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <item.icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                  <span className="break-words leading-snug">{item.label}</span>
                </div>
                {active && <ChevronRight className="h-3 w-3 shrink-0 text-primary/70" aria-hidden />}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-white/[0.08]" />

        {/* Recent briefs */}
        <div className="flex-1">
          <p className="mb-2 flex items-center gap-1.5 px-2.5 text-[0.625rem] font-semibold uppercase tracking-[0.07em] text-white/35">
            <Clock className="h-3 w-3" aria-hidden />
            Recent
          </p>
          {recentIds.length === 0 ? (
            <p className="px-2.5 py-1.5 text-[0.6875rem] italic text-white/25">No recent activity</p>
          ) : (
            <div className="space-y-0.5">
              {recentIds.map((id) => (
                <CompanyButton key={id} id={id} />
              ))}
            </div>
          )}
        </div>

        {/* Architecture + Roadmap */}
        <div className="mt-auto space-y-0.5 border-t border-white/[0.08] pt-3">
          {[
            { id: "architecture", label: "Architecture", icon: GitBranch },
            { id: "roadmap",      label: "Roadmap",      icon: Map },
          ].map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                className={cn(navItemBase, active ? navItemActive : navItemInactive)}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                  <span className="break-words leading-snug">{label}</span>
                </div>
                {active && <ChevronRight className="h-3 w-3 shrink-0 text-primary/70" aria-hidden />}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="shrink-0 border-t border-white/[0.08] px-3 py-2.5 flex items-center justify-between">
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.07em] text-white/30">Internal</p>
        <ThemeToggle className="text-white/40 hover:bg-white/10 hover:text-white/70" />
      </div>
    </aside>
  );
};
