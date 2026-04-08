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
    <div className="mx-auto max-w-4xl animate-fade-in pb-16 sm:pb-20">
      <header className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-9 min-w-9 shrink-0 rounded-lg px-2 text-muted-foreground hover:bg-black/[0.05]"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Button>
          <div className="min-w-0">
            <div className="type-section-label flex items-center gap-2">
              <Leaf className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              Brief
            </div>
            <h1 className="truncate font-display text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
              {data.name}
            </h1>
          </div>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="glass-tab-shell mb-10 inline-flex h-auto w-full max-w-full flex-wrap justify-start gap-1 bg-transparent p-1 shadow-apple-sm">
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
                "rounded-lg border-0 px-5 py-3 text-[0.9375rem] font-normal text-muted-foreground shadow-none transition-[background,box-shadow,color] duration-200",
                "data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-apple-sm",
                "data-[state=inactive]:hover:bg-black/[0.04]"
              )}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
          <div className="mb-8 flex flex-wrap gap-10 tabular-nums border-b border-black/[0.06] pb-8 sm:gap-12">
            <div>
              <p className="type-eyebrow">Confidence</p>
              <p className="mt-1 text-base font-medium tracking-tight text-foreground">{data.score}%</p>
            </div>
            <div>
              <p className="type-eyebrow">Sources</p>
              <p className="mt-1 text-base font-medium tracking-tight text-foreground">{data.sources}</p>
            </div>
            <div>
              <p className="type-eyebrow">Date</p>
              <p className="mt-1 text-base font-medium tracking-tight text-foreground">18 Mar 2026</p>
            </div>
          </div>
          <div className="glass-panel overflow-hidden rounded-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="type-eyebrow border-b border-black/[0.06] bg-black/[0.02] text-left backdrop-blur-sm">
                  <th scope="col" className="px-3 py-2.5 w-8 font-medium">
                    #
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Pressure
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Matched play
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.challenges.map((c) => {
                  const play = data.solutions.find((s) => s.challengeId === c.id);
                  return (
                    <tr key={c.id} className="border-b border-black/[0.05] last:border-0">
                      <td className="px-3 py-3 tabular-nums text-muted-foreground align-top">{c.id}</td>
                      <td className="px-3 py-3 font-medium leading-snug text-foreground align-top">{c.title}</td>
                      <td className="px-3 py-3 font-medium leading-snug text-primary align-top">{play?.product ?? "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="mt-0 space-y-4 focus-visible:outline-none">
          {data.challenges.map((c) => {
            const Icon = c.icon;
            return (
              <Collapsible key={c.id} className="glass-panel rounded-xl">
                <CollapsibleTrigger className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&[data-state=open]>svg:first-child]:rotate-180">
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform" aria-hidden />
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-[#fafafc]">
                    <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                  </div>
                  <span className="min-w-0 flex-1 text-sm font-medium leading-snug tracking-tight text-foreground">{c.title}</span>
                  <Badge variant="outline" className={cn("type-eyebrow shrink-0 h-5 px-1.5 py-0 font-medium normal-case tracking-normal border", c.urgencyColor)}>
                    {c.urgency}
                  </Badge>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-3 pb-3 pl-[52px] pr-4 pt-0">
                    <p className="max-w-prose border-l-2 border-primary/25 pl-3 text-base font-normal leading-[1.6] text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </TabsContent>

        <TabsContent value="solutions" className="mt-0 grid gap-5 sm:grid-cols-3 sm:gap-6 focus-visible:outline-none">
          {data.solutions.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.challengeId}
                type="button"
                onClick={() => setSelectedSolution(s as SolutionData)}
                className="glass-panel rounded-xl p-5 text-left shadow-apple-sm transition-[box-shadow,background] duration-200 hover:bg-white hover:shadow-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-[#fafafc]">
                      <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    </div>
                    <span className="type-eyebrow normal-case tracking-normal text-muted-foreground">#{s.challengeId}</span>
                  </div>
                  <span className="text-xl font-medium tabular-nums tracking-tight text-primary">{s.impactScore}</span>
                </div>
                <p className="mt-2 text-sm font-medium leading-snug tracking-tight text-foreground">{s.product}</p>
                <p className="mt-1.5 line-clamp-2 text-sm font-normal leading-relaxed text-muted-foreground">{s.detail}</p>
                <dl className="mt-4 space-y-2 border-t border-black/[0.06] pt-4 text-xs">
                  <div>
                    <dt className="type-eyebrow normal-case">Revenue (est.)</dt>
                    <dd className="mt-1 font-medium leading-snug text-foreground">{s.metrics?.profitability}</dd>
                  </div>
                  <div>
                    <dt className="type-eyebrow normal-case">Client benefit</dt>
                    <dd className="mt-1 font-medium leading-snug text-foreground">{s.metrics?.clientBenefit}</dd>
                  </div>
                  <div>
                    <dt className="type-eyebrow normal-case">CO₂</dt>
                    <dd className="mt-1 font-medium leading-snug text-foreground">{s.metrics?.co2Impact}</dd>
                  </div>
                </dl>
                <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-dashed border-black/[0.1] bg-[#fafafc] px-2 py-1.5 text-xs leading-snug text-muted-foreground">
                  <span className="truncate">Mapped: {s.challengeLabel}</span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                </div>
                <p className="mt-2 text-xs font-medium tracking-tight text-primary">Open playbook</p>
              </button>
            );
          })}
        </TabsContent>

        <TabsContent value="export" className="mt-0 space-y-12 focus-visible:outline-none">
          <section className="glass-panel-strong space-y-6 rounded-xl p-8 sm:p-10">
            <h2 className="type-section-label">Pitch deck</h2>
            <div className="space-y-2">
              {data.solutions.map((s) => (
                <label
                  key={s.challengeId}
                  className="-mx-2 flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 hover:bg-black/[0.04]"
                >
                  <div className="relative mt-0.5 flex shrink-0 items-center justify-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-black/[0.12] bg-white checked:border-primary checked:bg-primary"
                    />
                    <Check className="absolute h-2.5 w-2.5 text-primary-foreground opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                  </div>
                  <span className="text-sm leading-snug text-foreground">
                    <span className="font-medium">{s.product}</span>
                    <span className="text-muted-foreground font-normal"> · {s.challengeLabel}</span>
                    <span className="text-muted-foreground font-normal tabular-nums"> · {s.impactScore}</span>
                  </span>
                </label>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" className="h-11" onClick={() => handleExport("PowerPoint")}>
                <Presentation className="h-3.5 w-3.5 mr-2" />
                PowerPoint
              </Button>
              <Button type="button" variant="outline" className="h-11" onClick={() => handleExport("Canva")}>
                <Palette className="h-3.5 w-3.5 mr-2" />
                Canva
              </Button>
            </div>
          </section>

          <div className="flex flex-wrap gap-2">
            <Button type="button" className="h-11 gap-2" onClick={handleSaveToCRM}>
              <Save className="h-3.5 w-3.5" />
              Save to CRM
            </Button>
          </div>

          <section className="glass-panel rounded-xl p-8 sm:p-10">
            <h2 className="type-section-label mb-4 flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              Confidence
            </h2>
            <div className="flex items-end justify-between gap-4">
              <p className="max-w-md text-sm font-normal leading-relaxed text-muted-foreground">
                {data.sources} sources · ESG, CSRD, filings, regulatory DBs
              </p>
              <p className="text-3xl font-medium tabular-nums leading-none tracking-tight text-primary">{data.score}%</p>
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-black/[0.06]">
              <div className="h-1 rounded-full bg-primary transition-[width] duration-300" style={{ width: `${data.score}%` }} />
            </div>
          </section>

          <section>
            <h2 className="type-section-label mb-2">Benchmarks</h2>
            <div className="glass-panel divide-y divide-black/[0.06] overflow-hidden rounded-xl">
              {data.benchmarks.map((b) => (
                <div key={b.metric} className="flex flex-wrap items-baseline justify-between gap-2 px-3 py-2.5 text-sm">
                  <span className="leading-snug text-muted-foreground">{b.metric}</span>
                  <span className="font-medium tabular-nums text-foreground">{b.value}</span>
                  <span className="w-full type-eyebrow normal-case leading-snug text-muted-foreground">{b.context}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="type-section-label mb-2">Targets</h2>
            <div className="glass-panel divide-y divide-black/[0.06] overflow-hidden rounded-xl">
              {data.contacts.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.role} className="flex items-center gap-3 px-3 py-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-[#fafafc]">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                    </div>
                    <span className="text-sm font-medium text-foreground">{c.role}</span>
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
