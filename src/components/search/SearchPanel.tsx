import { useState } from "react";
import { Search, ArrowRight, Leaf, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface SearchPanelProps {
  onSearch: (query: string, type: "industry" | "company") => void;
  isLoading: boolean;
}

const exampleChips = [
  "Renault",
  "Carrefour",
  "Stellantis",
  "TotalEnergies",
  "Saint-Gobain",
  "Schneider Electric",
  "Veolia",
  "Air France-KLM",
  "Danone",
  "L'Oréal",
];

const stats = ["5 AI agents", "Validated sources", "Orange portfolio map"];

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
    <div className="relative flex min-h-[calc(100dvh-3rem)] flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-[46%] h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(0 0% 80%) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_48%,transparent_40%,hsl(var(--background)/0.6)_100%)]" />
      </div>

      {/*
        Two-tier width: outer container (44rem) gives chips room to breathe;
        inner wrapper (32rem) keeps the hero and card tight and readable.
      */}
      <div className="relative flex w-full max-w-[44rem] animate-fade-in flex-col items-center">

        {/* Hero + card — narrower column */}
        <div className="w-full max-w-[32rem]">

          {/* Hero copy — center-aligned, non-uniform spacing for rhythm */}
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.08] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-primary">
              <Leaf className="h-2.5 w-2.5 shrink-0" aria-hidden />
              New profile
            </span>

            {/* Tight to badge (same concept), generous gap below toward stats */}
            <h1
              id="search-company-heading"
              className="mt-3 font-display text-balance text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[3.25rem]"
            >
              Generate a sustainability brief.
            </h1>

            {/* Stats sit at comfortable distance from the big headline */}
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

          {/* Search card */}
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

        {/*
          Chips — spans the full 44rem outer width so 10 items of varying length
          wrap into two clean, roughly-equal rows instead of ragged columns.
          mt-10 mirrors the mb-10 above the card for consistent section rhythm.
        */}
        <div className="mt-10 w-full">
          <p className="type-section-label mb-4 text-center">
            10 available companies
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {exampleChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChip(chip)}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.13] bg-white/[0.06] px-3.5 py-1.5 text-[0.8125rem] font-normal tracking-tight text-foreground/75 transition-[background-color,color] duration-150 hover:bg-white/[0.13] hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Building2 className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden />
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
