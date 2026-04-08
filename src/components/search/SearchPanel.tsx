import { useState } from "react";
import { Search, ArrowRight, Leaf, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface SearchPanelProps {
  onSearch: (query: string, type: "industry" | "company") => void;
  isLoading: boolean;
}

const exampleChips = ["Renault", "Carrefour"];

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
    <div className="flex min-h-[calc(100dvh-3rem)] flex-col items-center justify-center px-4 py-16 sm:py-20">
      <div className="w-full max-w-[28rem] animate-fade-in">
        <div className="mb-12 space-y-4">
          <div className="type-section-label flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            New profile
          </div>
          <h1
            id="search-company-heading"
            className="font-display text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-[2rem]"
          >
            Company name
          </h1>
          <p className="text-[1.0625rem] font-normal leading-[1.47] tracking-tight text-muted-foreground">
            5 agents · validated sources · portfolio map
          </p>
        </div>

        <Card className="glass-panel-strong border-0 shadow-none">
          <CardContent className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  placeholder="e.g. Renault, Carrefour…"
                  className="h-11 border-[3px] border-black/[0.04] bg-[#fafafc] pl-10"
                  aria-labelledby="search-company-heading"
                  autoFocus
                />
              </div>
              <Button type="submit" size="sm" disabled={isLoading || !query.trim()} className="h-11 w-full gap-2 rounded-lg">
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

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span className="type-section-label w-full text-center sm:mr-1 sm:inline sm:w-auto">Examples</span>
          {exampleChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChip(chip)}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-[#fafafc] px-4 py-2 text-[0.9375rem] font-normal tracking-tight text-foreground shadow-apple-sm transition-[background,box-shadow] duration-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Building2 className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
