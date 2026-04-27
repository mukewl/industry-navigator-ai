import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SearchPanel } from "@/components/search/SearchPanel";
import { SustainabilityBrief } from "@/components/brief/SustainabilityBrief";
import { AccountDashboard } from "@/components/dashboard/AccountDashboard";
import { ArchitectureView } from "@/components/architecture/ArchitectureView";
import { RoadmapView } from "@/components/dashboard/RoadmapView";
import FloatingPaths from "@/components/ui/background-paths";
import { ChevronDown, Check, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Mode = "light" | "standard" | "deep";

const MODES: { id: Mode; name: string; description: string }[] = [
  { id: "light",    name: "Light",    description: "Fast and efficient. Lowest energy footprint." },
  { id: "standard", name: "Standard", description: "Balanced research depth and speed." },
  { id: "deep",     name: "Deep",     description: "Most thorough analysis. Highest research quality." },
];

const MODE_LABELS: Record<Mode, string> = {
  light: "Light",
  standard: "Standard",
  deep: "Deep",
};

// Tab IDs for each company brief — single source of truth used by both
// navigation handlers and the Sidebar's Recent section.
const BRIEF_TAB_MAP: Record<string, string> = {
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

// Reverse map: display name (case-insensitive) → tab ID, for the search path.
const NAME_TO_TAB: Record<string, string> = Object.fromEntries(
  Object.entries(BRIEF_TAB_MAP).map(([tab, name]) => [name.toLowerCase(), tab])
);

const LS_KEY = "obs_recent_briefs";

function getRecent(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(LS_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return (parsed as string[]).filter((id) => id in BRIEF_TAB_MAP);
  } catch {
    return [];
  }
}

function pushRecent(tabId: string): string[] {
  const next = [tabId, ...getRecent().filter((id) => id !== tabId)].slice(0, 3);
  localStorage.setItem(LS_KEY, JSON.stringify(next));
  return next;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [previousTab, setPreviousTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  // Owned here so every navigation path (search, sidebar, dashboard) updates it.
  const [recentIds, setRecentIds] = useState<string[]>(() => getRecent());
  // Research mode — cosmetic only, no downstream effect.
  const [mode, setMode] = useState<Mode>("standard");

  // Called immediately when the user submits a company name
  const handleSearch = (_query: string, _type: "industry" | "company") => {
    const query = _query.trim();
    if (!query) return;
    setSearchQuery(query);
    setHasSearched(true);
    setPreviousTab(activeTab);
    setActiveTab("brief");
    // Track recent — look up tab ID from display name (case-insensitive)
    const tabId = NAME_TO_TAB[query.toLowerCase()];
    if (tabId) setRecentIds(pushRecent(tabId));
  };

  const handleNewSearch = () => {
    setSearchQuery("");
    setHasSearched(false);
    setActiveTab("search");
  };

  const handleTabChange = (tab: string) => {
    if (tab === "search") {
      setHasSearched(false);
      setSearchQuery("");
    }
    setActiveTab(tab);
    // Track recent for direct brief tab navigation (e.g. sidebar clicks)
    if (tab in BRIEF_TAB_MAP) {
      setRecentIds(pushRecent(tab));
    }
  };

  const renderContent = () => {
    // Account Manager Dashboard
    if (activeTab === "dashboard") {
      return (
        <AccountDashboard
          onNewProfile={() => setActiveTab("search")}
          onViewBrief={(companyName) => {
            setSearchQuery(companyName);
            setHasSearched(true);
            setPreviousTab(activeTab);
            setActiveTab("brief");
            const tabId = NAME_TO_TAB[companyName.toLowerCase()];
            if (tabId) setRecentIds(pushRecent(tabId));
          }}
        />
      );
    }

    // Home screen (Search)
    if (activeTab === "search") {
      return <SearchPanel onSearch={handleSearch} isLoading={false} />;
    }

    // Sustainability Brief (post-search)
    if (activeTab === "brief") {
      return (
        <SustainabilityBrief
          key={searchQuery}
          companyName={searchQuery}
          onBack={(returnTo) => setActiveTab(returnTo)}
          returnTo={previousTab}
        />
      );
    }

    // Direct links to Briefs
    if (activeTab in BRIEF_TAB_MAP) {
      return (
        <SustainabilityBrief
          key={activeTab}
          companyName={BRIEF_TAB_MAP[activeTab]}
          onBack={(returnTo) => setActiveTab(returnTo)}
          returnTo={previousTab}
        />
      );
    }

    // System Architecture View
    if (activeTab === "architecture") {
      return <ArchitectureView />;
    }

    if (activeTab === "roadmap") {
      return <RoadmapView />;
    }

    return <AccountDashboard onNewProfile={() => setActiveTab("search")} onViewBrief={() => {}} />;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-[0.9375rem] focus:font-normal focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-[#f5f5f7]"
      >
        Skip to main content
      </a>
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} recentIds={recentIds} />
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery || undefined}
        onNewSearch={handleNewSearch}
      />
      <main id="main-content" className="relative lg:pl-64" tabIndex={-1}>
        {/* Animated path background — landing page only. Spans the main area
            from the sidebar edge to the right of the viewport. */}
        {activeTab === "search" && (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 right-0 z-0 overflow-hidden text-primary lg:left-64"
            aria-hidden
          >
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>
        )}

        {/* Research-mode picker — landing page only. Anchored to top-left of the
            main area (right of sidebar), independent of hero's centered layout. */}
        {activeTab === "search" && (
          <div className="absolute left-6 top-6 z-30 flex items-center gap-1.5 lg:left-[17.5rem]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-black/[0.1] bg-white px-4 text-base font-medium text-muted-foreground transition-colors duration-150 hover:border-black/[0.18] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                >
                  {MODE_LABELS[mode]}
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[280px] p-1">
                {MODES.map((m) => (
                  <DropdownMenuItem
                    key={m.id}
                    onSelect={() => setMode(m.id)}
                    className={cn(
                      "flex cursor-pointer items-start justify-between gap-3 rounded-md px-2.5 py-2",
                      mode === m.id && "bg-primary/[0.04]",
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-foreground">{m.name}</span>
                      <span className="mt-0.5 text-[12px] text-muted-foreground/80">{m.description}</span>
                    </div>
                    {mode === m.id && (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground/60 transition-colors duration-150 hover:bg-black/[0.04] hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                  aria-label="About research modes"
                >
                  <Info className="h-4 w-4" aria-hidden />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" className="max-w-[260px]">
                Choose research depth — affects response time, analysis quality, and energy footprint.
              </TooltipContent>
            </Tooltip>
          </div>
        )}
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
