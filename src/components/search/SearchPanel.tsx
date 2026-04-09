import { useState, useMemo } from "react";
import { Search, ArrowRight, Building2, ChevronRight, Clock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { briefData } from "@/data/briefData";
import { cn } from "@/lib/utils";

interface SearchPanelProps {
  onSearch: (query: string, type: "industry" | "company") => void;
  isLoading: boolean;
}

const HELP_STEPS = [
  {
    title: "Enter a company name and run profile",
    desc: "Type any company name and click Run profile to kick off the multi-agent ESG analysis.",
  },
  {
    title: "Review ESG challenges and matched solutions",
    desc: "Read the sustainability pressure points mapped to specific Orange Business plays and impact scores.",
  },
  {
    title: "Use filters to find the right prospect",
    desc: "Filter by ESG risk level, solution type, or sector to prioritise the companies that fit best.",
  },
  {
    title: "Export to PowerPoint or Canva",
    desc: "Generate a sales deck from the brief and save it directly to your CRM with one click.",
  },
];

type EsgRisk = "Critical" | "High" | "Medium" | "Low";

const recentBriefs: { name: string; sector: string; esgRisk: EsgRisk }[] = [
  { name: "Renault", sector: "Automotive", esgRisk: "High" },
  { name: "Carrefour", sector: "Retail", esgRisk: "Medium" },
  { name: "TotalEnergies", sector: "Energy", esgRisk: "Critical" },
  { name: "Air France-KLM", sector: "Aviation", esgRisk: "Critical" },
];

const esgRiskStyle: Record<EsgRisk, string> = {
  Critical: "text-red-600 bg-red-50 border border-red-200/80",
  High: "text-amber-600 bg-amber-50 border border-amber-200/80",
  Medium: "text-yellow-700 bg-yellow-50 border border-yellow-200/80",
  Low: "text-green-600 bg-green-50 border border-green-200/80",
};

const sectorGroups = [
  { sector: "Automotive", companies: ["Renault", "Stellantis"] },
  { sector: "Energy & Resources", companies: ["TotalEnergies", "Veolia"] },
  { sector: "Retail & Consumer", companies: ["Carrefour", "Danone", "L'Oréal"] },
  { sector: "Industry & Technology", companies: ["Schneider Electric", "Saint-Gobain"] },
  { sector: "Aviation", companies: ["Air France-KLM"] },
];

// Maps solution product names → filter category labels
const PRODUCT_SOLUTION_TYPES: Record<string, string[]> = {
  "Smart Eco Energy": ["Energy & Emissions"],
  "Ocean + Circular Mobility": ["Circular Economy"],
  "Ocean Platform": ["Circular Economy"],
  "RE Program & Circular Mobility": ["Circular Economy", "Supply Chain & Compliance"],
  "Evolution Platform": ["Supply Chain & Compliance"],
};

// Derived once at module load from briefData — never changes
const companyFilterMeta = Object.values(briefData).map((company) => {
  const solutionTypes = new Set<string>();
  company.solutions.forEach((s) => {
    (PRODUCT_SOLUTION_TYPES[s.product] ?? []).forEach((t) => solutionTypes.add(t));
  });
  // "Digital Infrastructure" sourced from customSolutions.divisions in briefData
  ((company as any).customSolutions ?? []).forEach((cs: any) => {
    if (cs.divisions?.includes("Digital Infrastructure")) {
      solutionTypes.add("Digital Infrastructure");
    }
  });
  return {
    name: company.name,
    sector: (company as any).sector as string,
    esgRiskLevel: (company as any).esgRiskLevel as string,
    solutionTypes: [...solutionTypes],
  };
});

type ActiveFilters = {
  urgency: Set<string>;
  solutionType: Set<string>;
  sector: Set<string>;
};

function getMatchDimScore(
  meta: (typeof companyFilterMeta)[0],
  filters: ActiveFilters
): number {
  let score = 0;
  if (filters.urgency.size > 0 && filters.urgency.has(meta.esgRiskLevel)) score++;
  if (
    filters.solutionType.size > 0 &&
    meta.solutionTypes.some((t) => filters.solutionType.has(t))
  )
    score++;
  if (filters.sector.size > 0 && filters.sector.has(meta.sector)) score++;
  return score;
}

export const SearchPanel = ({ onSearch, isLoading }: SearchPanelProps) => {
  const [query, setQuery] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    urgency: new Set(),
    solutionType: new Set(),
    sector: new Set(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), "company");
    }
  };

  const handleChip = (label: string) => {
    onSearch(label, "company");
  };

  const toggleFilter = (dim: keyof ActiveFilters, value: string) => {
    setActiveFilters((prev) => {
      const next = { ...prev, [dim]: new Set(prev[dim]) };
      if (next[dim].has(value)) {
        next[dim].delete(value);
      } else {
        next[dim].add(value);
      }
      return next;
    });
  };

  const clearFilters = () => {
    setActiveFilters({ urgency: new Set(), solutionType: new Set(), sector: new Set() });
  };

  const hasActiveFilters =
    activeFilters.urgency.size > 0 ||
    activeFilters.solutionType.size > 0 ||
    activeFilters.sector.size > 0;

  const activeDimCount = [
    activeFilters.urgency.size > 0,
    activeFilters.solutionType.size > 0,
    activeFilters.sector.size > 0,
  ].filter(Boolean).length;

  const sortedSectorGroups = useMemo(() => {
    return sectorGroups
      .map((group) => {
        const withScore = group.companies.map((name) => {
          const meta = companyFilterMeta.find((m) => m.name === name)!;
          const score = hasActiveFilters ? getMatchDimScore(meta, activeFilters) : 0;
          return {
            name,
            score,
            isFullMatch: hasActiveFilters && activeDimCount > 0 && score === activeDimCount,
          };
        });
        const sorted = [...withScore].sort((a, b) => b.score - a.score);
        const sectorMatchCount = sorted.filter((c) => c.isFullMatch).length;
        return { ...group, companies: sorted, sectorMatchCount };
      })
      .sort((a, b) => b.sectorMatchCount - a.sectorMatchCount);
  }, [activeFilters, hasActiveFilters, activeDimCount]);

  const fullMatchCount = sortedSectorGroups.reduce(
    (n, g) => n + g.sectorMatchCount,
    0
  );

  return (
    <div className="relative flex flex-col items-center overflow-hidden px-4 pb-16 pt-10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-[22%] h-[480px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(0 0% 80%) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,transparent_40%,hsl(var(--background)/0.55)_100%)]" />
      </div>

      {/*
        Two-tier width: outer (44rem) for full-width sections;
        inner (32rem) keeps hero and card tight and readable.
      */}
      <div className="relative flex w-full max-w-[44rem] animate-fade-in flex-col items-center gap-10">

        {/* Hero + search card — narrower column */}
        <div className="w-full max-w-[32rem]">
          <div className="mb-10 flex flex-col items-center text-center">
            <h1
              id="search-company-heading"
              className="text-balance text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[3.25rem]"
            >
              Generate a sustainability brief.
            </h1>
            <p className="mt-4 text-[0.9375rem] font-normal leading-relaxed text-muted-foreground">
              Turn company insights into better sales conversations.
            </p>
          </div>

          <Card className="glass-panel-strong border-0 shadow-none">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    name="company"
                    autoComplete="organization"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a company name."
                    className="h-11 border-[3px] border-black/[0.04] bg-[#fafafc] pl-10"
                    aria-labelledby="search-company-heading"
                    autoFocus
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading || !query.trim()}
                  className="h-11 w-full gap-2 rounded-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Running
                    </>
                  ) : (
                    <>
                      Run profile
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* ── Filter panel ── */}
        <div className="w-full">
          <div className="rounded-xl border border-black/[0.06] bg-white/60 px-4 py-3.5 backdrop-blur-sm">
            <div className="flex flex-col gap-2.5">

              {/* ESG Risk row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="type-eyebrow w-[4.5rem] shrink-0 text-muted-foreground/70">
                  ESG Risk
                </span>
                {(["Critical", "High", "Medium"] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => toggleFilter("urgency", level)}
                    className={cn(
                      "rounded-full border px-2.5 py-[0.2rem] text-[0.6875rem] font-medium transition-colors duration-100",
                      activeFilters.urgency.has(level)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-black/[0.1] bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {level} Risk
                  </button>
                ))}
              </div>

              {/* Solution Type row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="type-eyebrow w-[4.5rem] shrink-0 text-muted-foreground/70">
                  Solution
                </span>
                {(
                  [
                    "Energy & Emissions",
                    "Supply Chain & Compliance",
                    "Circular Economy",
                    "Digital Infrastructure",
                  ] as const
                ).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleFilter("solutionType", type)}
                    className={cn(
                      "rounded-full border px-2.5 py-[0.2rem] text-[0.6875rem] font-medium transition-colors duration-100",
                      activeFilters.solutionType.has(type)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-black/[0.1] bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Sector row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="type-eyebrow w-[4.5rem] shrink-0 text-muted-foreground/70">
                  Sector
                </span>
                {(
                  [
                    "Automotive",
                    "Energy & Resources",
                    "Retail & Consumer",
                    "Industry & Technology",
                    "Aviation",
                  ] as const
                ).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleFilter("sector", s)}
                    className={cn(
                      "rounded-full border px-2.5 py-[0.2rem] text-[0.6875rem] font-medium transition-colors duration-100",
                      activeFilters.sector.has(s)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-black/[0.1] bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear filters link — visible only when filters are active */}
            {hasActiveFilters && (
              <div className="mt-2.5 flex justify-end border-t border-black/[0.05] pt-2.5">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[0.6875rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Briefs */}
        <div className="w-full">
          <div className="mb-3 flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            <p className="type-section-label">Recent briefs</p>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {recentBriefs.map((brief) => (
              <button
                key={brief.name}
                type="button"
                onClick={() => handleChip(brief.name)}
                disabled={isLoading}
                className="group glass-panel flex flex-col gap-2.5 rounded-xl p-4 text-left transition-shadow duration-150 hover:shadow-apple-soft disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-[0.8125rem] font-medium leading-tight text-foreground">
                    {brief.name}
                  </span>
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </div>
                <span className="type-eyebrow text-muted-foreground">{brief.sector}</span>
                <span
                  className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.06em] ${esgRiskStyle[brief.esgRisk]}`}
                >
                  {brief.esgRisk} risk
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sector-grouped companies with live filter */}
        <div className="w-full">
          <p className="type-section-label mb-3">
            {hasActiveFilters
              ? `Showing ${fullMatchCount} of 10 companies`
              : "10 available companies"}
          </p>
          <div className="flex flex-col divide-y divide-black/[0.05] rounded-xl border border-black/[0.06] bg-white/50">
            {sortedSectorGroups.map((group) => (
              <div
                key={group.sector}
                className={cn(
                  "flex items-baseline gap-4 px-4 py-3 transition-opacity duration-150",
                  hasActiveFilters && group.sectorMatchCount === 0 && "opacity-40"
                )}
              >
                <p className="type-eyebrow w-32 shrink-0 text-muted-foreground/70">
                  {group.sector}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.companies.map(({ name, isFullMatch }) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => handleChip(name)}
                      disabled={isLoading}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md border border-black/[0.06] bg-white/80 px-2.5 py-1 text-[0.75rem] font-normal text-foreground/70 transition-colors duration-150 hover:bg-white hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isFullMatch && "border-primary/20 bg-primary/[0.04] text-foreground"
                      )}
                    >
                      <Building2
                        className="h-2.5 w-2.5 shrink-0 text-muted-foreground/60"
                        aria-hidden
                      />
                      {name}
                      {isFullMatch && (
                        <span
                          className="ml-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-label="matches active filters"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Help button ── */}
      <button
        type="button"
        onClick={() => setIsHelpOpen(true)}
        aria-label="How it works"
        className="fixed bottom-6 right-6 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.1] bg-white/90 shadow-apple-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <HelpCircle className="h-4 w-4 text-muted-foreground" aria-hidden />
      </button>

      {/* ── Help modal ── */}
      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="tracking-tight">How it works</DialogTitle>
            <DialogDescription>Four steps to a sales-ready brief.</DialogDescription>
          </DialogHeader>
          <ol className="mt-3 space-y-4">
            {HELP_STEPS.map(({ title, desc }, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[0.6875rem] font-semibold tabular-nums text-primary-foreground">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-sm font-medium leading-snug text-foreground">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </DialogContent>
      </Dialog>
    </div>
  );
};
