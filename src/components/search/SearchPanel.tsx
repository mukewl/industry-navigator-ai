import { useState } from "react";
import { Search, ArrowRight, Leaf, Building2, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface SearchPanelProps {
  onSearch: (query: string, type: "industry" | "company") => void;
  isLoading: boolean;
}

const stats = ["5 AI agents", "Validated sources", "Orange portfolio map"];

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

export const SearchPanel = ({ onSearch, isLoading }: SearchPanelProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), "company");
    }
  };

  const handleChip = (label: string) => {
    onSearch(label, "company");
  };

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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.08] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-primary">
              <Leaf className="h-2.5 w-2.5 shrink-0" aria-hidden />
              New profile
            </span>

            <h1
              id="search-company-heading"
              className="mt-3 text-balance text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[3.25rem]"
            >
              Generate a sustainability brief.
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {stats.map((s) => (
                <span
                  key={s}
                  className="flex items-center gap-1.5 text-[0.875rem] leading-none text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                  {s}
                </span>
              ))}
            </div>
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
                    placeholder="e.g. Renault, TotalEnergies, L'Oréal…"
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

        {/* Sector-grouped companies */}
        <div className="w-full">
          <p className="type-section-label mb-4">10 available companies</p>
          <div className="flex flex-col gap-2.5">
            {sectorGroups.map((group) => (
              <div key={group.sector} className="glass-panel rounded-xl p-4">
                <p className="type-eyebrow mb-3 text-muted-foreground">{group.sector}</p>
                <div className="flex flex-wrap gap-2">
                  {group.companies.map((company) => (
                    <button
                      key={company}
                      type="button"
                      onClick={() => handleChip(company)}
                      disabled={isLoading}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-black/[0.07] bg-white/70 px-3 py-1.5 text-[0.8125rem] font-normal text-foreground/80 transition-colors duration-150 hover:bg-white hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Building2 className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden />
                      {company}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
