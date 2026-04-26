import { useState, useRef, useEffect } from "react";
import { Search, ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
import { briefData } from "@/data/briefData";
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
import { cn } from "@/lib/utils";
import { CompanyLogo, COMPANY_NAME_TO_DOMAIN } from "@/lib/companyLogos";

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

const COMPANY_NAMES = (Object.values(briefData) as { name: string }[]).map((c) => c.name);

const SOLUTION_GROUPS = ["Smart Eco Energy", "Evolution Platform", "Ocean + Circular Mobility"].map(
  (groupName) => ({
    label: groupName,
    companies: (Object.values(briefData) as { name: string; solutions: { product: string }[] }[])
      .filter((company) => company.solutions.some((s) => s.product === groupName))
      .map((company) => company.name),
  })
);

export const SearchPanel = ({ onSearch, isLoading }: SearchPanelProps) => {
  const [query, setQuery] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = query.trim()
    ? COMPANY_NAMES.filter((name) =>
        name.toLowerCase().startsWith(query.trim().toLowerCase())
      )
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputWrapperRef.current && !inputWrapperRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDropdownOpen(false);
    if (query.trim()) {
      onSearch(query.trim(), "company");
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-10">
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

        {/* Hero + search card */}
        <div className="relative z-10 w-full max-w-[32rem]">
          <div className="mb-10 flex flex-col items-center text-center">
            <h1
              id="search-company-heading"
              className="text-balance text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-[3.375rem]"
            >
              Generate a sustainability brief.
            </h1>
            <p className="mt-5 max-w-[26rem] text-[1rem] font-normal leading-relaxed text-muted-foreground">
              Turn company ESG signals into pipeline-ready sales conversations.
            </p>
          </div>

          <Card className="border border-black/[0.07] bg-white/92 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl">
            <CardContent className="p-6 sm:p-7">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="relative" ref={inputWrapperRef}>
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70"
                    aria-hidden
                  />
                  <Input
                    name="company"
                    autoComplete="off"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setDropdownOpen(true);
                    }}
                    onFocus={() => suggestions.length > 0 && setDropdownOpen(true)}
                    placeholder="Enter a company name"
                    className="h-12 border border-black/[0.1] bg-white/80 pl-11 text-[0.9375rem] placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                    aria-labelledby="search-company-heading"
                    autoFocus
                  />

                  {/* Autocomplete dropdown */}
                  {dropdownOpen && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                      {suggestions.map((name) => (
                        <button
                          key={name}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setQuery(name);
                            setDropdownOpen(false);
                            onSearch(name, "company");
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[0.875rem] font-medium text-foreground transition-colors duration-150 hover:bg-primary/[0.05] hover:text-primary"
                        >
                          <CompanyLogo domain={COMPANY_NAME_TO_DOMAIN[name]} name={name} className="h-6 w-6 shrink-0" />
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="h-12 w-full gap-2 text-[0.9375rem] font-semibold"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Running analysis…
                    </>
                  ) : (
                    <>
                      Run profile
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* ── Solution categories ── */}
        <div className="w-full">
          <p className="mb-3 px-1 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-muted-foreground/70">
            Browse by solution type
          </p>
          <div className="overflow-hidden rounded-xl border border-black/[0.07] bg-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.05)] backdrop-blur-sm">
            {/* Group header buttons */}
            <div className="flex flex-wrap gap-x-0 divide-x divide-black/[0.06]">
              {SOLUTION_GROUPS.map((group) => {
                const isOpen = openGroup === group.label;
                return (
                  <button
                    key={group.label}
                    type="button"
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    className={cn(
                      "flex flex-1 items-center justify-between gap-2 px-4 py-3.5 text-left text-[0.75rem] font-semibold transition-colors duration-150",
                      isOpen
                        ? "bg-primary/[0.07] text-primary"
                        : "text-muted-foreground hover:bg-black/[0.03] hover:text-foreground"
                    )}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>

            {/* Expanded company list */}
            {openGroup && (() => {
              const group = SOLUTION_GROUPS.find((g) => g.label === openGroup);
              if (!group) return null;
              return (
                <div className="border-t border-black/[0.06] bg-black/[0.015] px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {group.companies.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => onSearch(name, "company")}
                        className="rounded-lg border border-black/[0.10] bg-white px-3 py-1.5 text-[0.75rem] font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-150 hover:border-primary/40 hover:bg-primary/[0.05] hover:text-primary hover:shadow-[0_2px_8px_rgba(255,105,0,0.12)]"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
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
