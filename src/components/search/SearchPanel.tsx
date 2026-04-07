import { useState } from "react";
import { Search, ArrowRight, Leaf, Sparkles, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <div className="w-full max-w-2xl animate-fade-in">

        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-glow">
              <Leaf className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Gen AI Sustainability Profiling System
          </h1>
          <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Identify client sustainability challenges and map them to Orange Business solutions automatically
          </p>
        </div>

        {/* Search card */}
        <Card className="overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl shadow-card">
          <CardContent className="p-5 sm:p-7">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter a company name, e.g. Renault, Carrefour..."
                  className="h-12 pl-12 text-base rounded-lg border-border focus-visible:ring-primary"
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isLoading || !query.trim()}
                className="gap-2 h-12 px-6 bg-primary hover:bg-primary/90 text-white font-semibold w-full sm:w-auto rounded-lg shadow-glow transition-all"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    Run Profile
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Example chips */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">Try an example</p>
          <div className="flex gap-3">
            {exampleChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChip(chip)}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-5 py-2 text-sm font-medium text-primary hover:bg-primary/15 hover:border-primary transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Building2 className="h-3.5 w-3.5" />
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Badge row */}
        <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
          <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3 w-3 text-primary" />
            5 AI Agents
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-xs font-medium">
            Multi-source Validated
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-xs font-medium">
            Orange Portfolio Mapped
          </Badge>
        </div>

      </div>
    </div>
  );
};

