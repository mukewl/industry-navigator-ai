import { useState, useEffect } from "react";
import { Search, LayoutDashboard, FileText, ChevronRight, Map, ChevronDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { briefData } from "@/data/briefData";

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

// Display labels for each company brief tab ID
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

// Map briefData keys → sidebar tab IDs
const COMPANY_KEY_TO_TAB: Record<string, string> = {
  renault:           "renault-brief",
  carrefour:         "carrefour-brief",
  stellantis:        "stellantis-brief",
  totalenergies:     "totalenergies-brief",
  saintgobain:       "saintgobain-brief",
  schneiderelectric: "schneiderelectric-brief",
  veolia:            "veolia-brief",
  airfranceklm:      "airfranceklm-brief",
  danone:            "danone-brief",
  loreal:            "loreal-brief",
};

// Derive groups from briefData — a company only appears in a group if it has
// at least one solution whose product field exactly matches the group label.
const SOLUTION_GROUP_NAMES = [
  "Smart Eco Energy",
  "Evolution Platform",
  "Ocean + Circular Mobility",
] as const;

const SOLUTION_GROUPS: { label: string; ids: string[] }[] = SOLUTION_GROUP_NAMES
  .map((groupName) => ({
    label: groupName,
    ids: (Object.entries(briefData) as [string, { solutions: { product: string }[] }][])
      .filter(([, company]) => company.solutions.some((s) => s.product === groupName))
      .map(([key]) => COMPANY_KEY_TO_TAB[key])
      .filter((id): id is string => Boolean(id)),
  }))
  .filter((group) => group.ids.length > 0);

const LS_KEY = "obs_recent_briefs";

function getRecent(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(LS_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return (parsed as string[]).filter((id) => id in COMPANY_LABEL);
  } catch {
    return [];
  }
}

function pushRecent(tabId: string): string[] {
  const next = [tabId, ...getRecent().filter((id) => id !== tabId)].slice(0, 3);
  localStorage.setItem(LS_KEY, JSON.stringify(next));
  return next;
}

export const Sidebar = ({ activeTab, onTabChange, embedded }: SidebarProps) => {
  const [libraryOpen, setLibraryOpen] = useState(true);
  const [recentIds, setRecentIds] = useState<string[]>(() => getRecent());
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(SOLUTION_GROUPS.map((g) => g.label))
  );

  // Update recents whenever any company brief becomes active — catches navigation from anywhere
  useEffect(() => {
    if (activeTab in COMPANY_LABEL) {
      setRecentIds(pushRecent(activeTab));
    }
  }, [activeTab]);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const CompanyButton = ({ id }: { id: string }) => (
    <button
      type="button"
      onClick={() => onTabChange(id)}
      className={cn(
        "group flex min-h-9 w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[12px] font-normal tracking-tight transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black/80",
        activeTab === id
          ? "bg-white/12 text-primary"
          : "text-white/80 hover:bg-white/8 hover:text-white"
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <FileText className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
        <span className="break-words leading-snug">{COMPANY_LABEL[id]}</span>
      </div>
      {activeTab === id && <ChevronRight className="h-3 w-3 shrink-0 text-primary" aria-hidden />}
    </button>
  );

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
            <div className="space-y-4">

              {/* ── Recent ── */}
              <div>
                <p className="mb-1 flex items-center gap-1.5 px-2.5 text-[10px] font-normal uppercase tracking-wide text-white/40">
                  <Clock className="h-2.5 w-2.5" aria-hidden />
                  Recent
                </p>
                {recentIds.length === 0 ? (
                  <p className="px-2.5 py-1 text-[11px] italic text-white/28">No recent activity</p>
                ) : (
                  <div className="space-y-0.5">
                    {recentIds.map((id) => (
                      <CompanyButton key={id} id={id} />
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-white/10" />

              {/* ── Solution type groups ── */}
              <div className="space-y-3">
                {SOLUTION_GROUPS.map((group) => (
                  <div key={group.label}>
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.label)}
                      className="flex w-full items-center justify-between px-2.5 pb-1 focus-visible:outline-none hover:text-white/70 transition-colors duration-150"
                    >
                      <span className="text-[10px] font-normal uppercase tracking-wide text-white/48">
                        {group.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] tabular-nums text-white/28">{group.ids.length}</span>
                        <ChevronDown
                          className={cn(
                            "h-2.5 w-2.5 text-white/40 transition-transform duration-200",
                            openGroups.has(group.label) ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden
                        />
                      </div>
                    </button>
                    {openGroups.has(group.label) && (
                      <div className="space-y-0.5">
                        {group.ids.map((id) => (
                          <CompanyButton key={id} id={id} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

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
