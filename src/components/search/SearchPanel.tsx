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
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8">
          <div className="type-section-label flex items-center gap-2 mb-3">
            <Leaf className="h-3.5 w-3.5 text-primary" />
            New profile
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground leading-tight">
            Company name
          </h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            5 agents · validated sources · portfolio map
          </p>
        </div>

        <Card className="border-border bg-card shadow-none">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Renault, Carrefour"
                  className="h-11 pl-9 text-base border-border bg-background focus-visible:ring-1 focus-visible:ring-ring"
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={isLoading || !query.trim()}
                className="gap-2 h-9 w-full font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Running
                  </>
                ) : (
                  <>
                    Run profile
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="type-section-label w-full text-center sm:w-auto sm:inline mr-0 sm:mr-1">Examples</span>
          {exampleChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChip(chip)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Building2 className="h-3 w-3 text-muted-foreground" />
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
