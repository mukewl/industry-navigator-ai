import { useState } from "react";
import {
  ArrowLeft,
  Save,
  Check,
  Presentation,
  Palette,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { SolutionDetail, SolutionData } from "./SolutionDetail";
import { briefData } from "@/data/briefData";
import { cn } from "@/lib/utils";

interface SustainabilityBriefProps {
  companyName: string;
  onBack: () => void;
}

export const SustainabilityBrief = ({ companyName, onBack }: SustainabilityBriefProps) => {
  const { toast } = useToast();
  const [selectedSolution, setSelectedSolution] = useState<SolutionData | null>(null);

  const queryKey = companyName.toLowerCase().includes("carrefour") ? "carrefour" : "renault";
  const data = briefData[queryKey];

  const handleSaveToCRM = () => {
    toast({
      title: "Saved to CRM",
      description: `${data.name} sustainability brief has been saved to your CRM.`,
    });
  };

  const handleExport = (type: "PowerPoint" | "Canva") => {
    toast({
      description:
        type === "PowerPoint"
          ? "Preparing your deck... This feature will be available in the live version."
          : "Connecting to Canva... This feature will be available in the live version.",
      className: "bg-primary text-primary-foreground border-primary font-medium",
      duration: 3000,
    });
  };

  if (selectedSolution) {
    return (
      <SolutionDetail
        companyName={data.name}
        solution={selectedSolution}
        onBack={() => setSelectedSolution(null)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10 animate-fade-in">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <Button type="button" variant="ghost" size="sm" onClick={onBack} className="h-8 px-2 text-muted-foreground shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-0">
            <div className="type-section-label flex items-center gap-2">
              <Leaf className="h-3.5 w-3.5 text-primary shrink-0" />
              Brief
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground truncate leading-tight">{data.name}</h1>
          </div>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex w-full flex-wrap h-auto gap-0 rounded-none border-b border-border bg-transparent p-0 justify-start">
          {(
            [
              ["overview", "Overview"],
              ["challenges", "Challenges"],
              ["solutions", "Solutions"],
              ["export", "Export"],
            ] as const
          ).map(([v, label]) => (
            <TabsTrigger
              key={v}
              value={v}
              className={cn(
                "rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground",
                "data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              )}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6 focus-visible:outline-none">
          <div className="flex flex-wrap gap-6 tabular-nums border-b border-border pb-4 mb-4">
            <div>
              <p className="type-eyebrow">Confidence</p>
              <p className="text-base font-semibold text-foreground mt-1 tracking-tight">{data.score}%</p>
            </div>
            <div>
              <p className="type-eyebrow">Sources</p>
              <p className="text-base font-semibold text-foreground mt-1 tracking-tight">{data.sources}</p>
            </div>
            <div>
              <p className="type-eyebrow">Date</p>
              <p className="text-base font-semibold text-foreground mt-1 tracking-tight">18 Mar 2026</p>
            </div>
          </div>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left type-eyebrow">
                  <th className="px-3 py-2.5 w-8 font-medium">#</th>
                  <th className="px-3 py-2.5 font-medium">Pressure</th>
                  <th className="px-3 py-2.5 font-medium">Matched play</th>
                </tr>
              </thead>
              <tbody>
                {data.challenges.map((c) => {
                  const play = data.solutions.find((s) => s.challengeId === c.id);
                  return (
                    <tr key={c.id} className="border-b border-border last:border-0">
                      <td className="px-3 py-3 tabular-nums text-muted-foreground align-top">{c.id}</td>
                      <td className="px-3 py-3 font-medium text-foreground leading-snug align-top">{c.title}</td>
                      <td className="px-3 py-3 text-primary font-semibold leading-snug align-top">{play?.product ?? "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="mt-6 space-y-2 focus-visible:outline-none">
          {data.challenges.map((c) => {
            const Icon = c.icon;
            return (
              <Collapsible key={c.id} className="rounded-lg border border-border bg-card">
                <CollapsibleTrigger className="group flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&[data-state=open]>svg:first-child]:rotate-180">
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform" />
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="flex-1 min-w-0 text-sm font-semibold text-foreground leading-snug tracking-tight">{c.title}</span>
                  <Badge variant="outline" className={cn("type-eyebrow shrink-0 h-5 px-1.5 py-0 font-medium normal-case tracking-normal border", c.urgencyColor)}>
                    {c.urgency}
                  </Badge>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-3 pb-3 pt-0 pl-[52px] pr-4">
                    <p className="text-base leading-[1.6] text-muted-foreground border-l-2 border-border pl-3 max-w-prose">{c.description}</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </TabsContent>

        <TabsContent value="solutions" className="mt-6 grid gap-3 sm:grid-cols-3 focus-visible:outline-none">
          {data.solutions.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.challengeId}
                type="button"
                onClick={() => setSelectedSolution(s as SolutionData)}
                className="rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="type-eyebrow normal-case tracking-normal text-muted-foreground">#{s.challengeId}</span>
                  </div>
                  <span className="text-xl font-semibold tabular-nums text-primary tracking-tight">{s.impactScore}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground leading-snug tracking-tight">{s.product}</p>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{s.detail}</p>
                <dl className="mt-3 space-y-2 border-t border-border pt-3 text-xs">
                  <div>
                    <dt className="type-eyebrow normal-case">Revenue (est.)</dt>
                    <dd className="font-medium text-foreground mt-1 leading-snug">{s.metrics?.profitability}</dd>
                  </div>
                  <div>
                    <dt className="type-eyebrow normal-case">Client benefit</dt>
                    <dd className="font-medium text-foreground mt-1 leading-snug">{s.metrics?.clientBenefit}</dd>
                  </div>
                  <div>
                    <dt className="type-eyebrow normal-case">CO₂</dt>
                    <dd className="font-medium text-foreground mt-1 leading-snug">{s.metrics?.co2Impact}</dd>
                  </div>
                </dl>
                <div className="mt-3 flex items-center justify-between gap-2 rounded-md border border-dashed border-border px-2 py-1.5 text-xs text-muted-foreground leading-snug">
                  <span className="truncate">Mapped: {s.challengeLabel}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden />
                </div>
                <p className="mt-2 text-xs font-semibold text-primary tracking-tight">Open playbook</p>
              </button>
            );
          })}
        </TabsContent>

        <TabsContent value="export" className="mt-6 space-y-8 focus-visible:outline-none">
          <section className="rounded-lg border border-border p-4 space-y-4">
            <h2 className="type-section-label">Pitch deck</h2>
            <div className="space-y-2">
              {data.solutions.map((s) => (
                <label key={s.challengeId} className="flex items-start gap-3 cursor-pointer rounded-md px-2 py-1.5 -mx-2 hover:bg-muted/40">
                  <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="peer h-4 w-4 appearance-none rounded border border-input bg-background checked:bg-primary checked:border-primary cursor-pointer"
                    />
                    <Check className="absolute h-2.5 w-2.5 text-primary-foreground opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-foreground leading-snug">
                    <span className="font-semibold">{s.product}</span>
                    <span className="text-muted-foreground font-normal"> · {s.challengeLabel}</span>
                    <span className="text-muted-foreground font-normal tabular-nums"> · {s.impactScore}</span>
                  </span>
                </label>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" className="h-9 text-sm font-medium" onClick={() => handleExport("PowerPoint")}>
                <Presentation className="h-3.5 w-3.5 mr-2" />
                PowerPoint
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-9 text-sm font-medium border-border bg-transparent"
                onClick={() => handleExport("Canva")}
              >
                <Palette className="h-3.5 w-3.5 mr-2" />
                Canva
              </Button>
            </div>
          </section>

          <div className="flex flex-wrap gap-2">
            <Button type="button" className="h-9 text-sm font-medium gap-2" onClick={handleSaveToCRM}>
              <Save className="h-3.5 w-3.5" />
              Save to CRM
            </Button>
          </div>

          <section className="rounded-lg border border-border p-4">
            <h2 className="type-section-label mb-3 flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Confidence
            </h2>
            <div className="flex items-end justify-between gap-4">
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                {data.sources} sources · ESG, CSRD, filings, regulatory DBs
              </p>
              <p className="text-3xl font-semibold tabular-nums text-primary leading-none tracking-tight">{data.score}%</p>
            </div>
            <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
              <div className="h-1 rounded-full bg-primary transition-all" style={{ width: `${data.score}%` }} />
            </div>
          </section>

          <section>
            <h2 className="type-section-label mb-2">Benchmarks</h2>
            <div className="rounded-lg border border-border divide-y divide-border">
              {data.benchmarks.map((b) => (
                <div key={b.metric} className="flex flex-wrap items-baseline justify-between gap-2 px-3 py-2.5 text-sm">
                  <span className="text-muted-foreground leading-snug">{b.metric}</span>
                  <span className="font-semibold tabular-nums text-foreground">{b.value}</span>
                  <span className="w-full type-eyebrow normal-case leading-snug text-muted-foreground">{b.context}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="type-section-label mb-2">Targets</h2>
            <div className="rounded-lg border border-border divide-y divide-border">
              {data.contacts.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.role} className="flex items-center gap-3 px-3 py-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">{c.role}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};
