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
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const TAB_ORDER = ["overview", "challenges", "solutions", "export"] as const;
type TabId = (typeof TAB_ORDER)[number];

export const SustainabilityBrief = ({ companyName, onBack }: SustainabilityBriefProps) => {
  const { toast } = useToast();
  const [selectedSolution, setSelectedSolution] = useState<SolutionData | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [slideKey, setSlideKey] = useState(0);
  const [slideDir, setSlideDir] = useState<"right" | "left">("right");

  const nameMap: Record<string, keyof typeof briefData> = {
    renault: "renault",
    carrefour: "carrefour",
    stellantis: "stellantis",
    totalenergies: "totalenergies",
    "total energies": "totalenergies",
    "saint-gobain": "saintgobain",
    "saint gobain": "saintgobain",
    saintgobain: "saintgobain",
    "schneider electric": "schneiderelectric",
    schneiderelectric: "schneiderelectric",
    schneider: "schneiderelectric",
    veolia: "veolia",
    "air france": "airfranceklm",
    "air france-klm": "airfranceklm",
    "air france klm": "airfranceklm",
    airfranceklm: "airfranceklm",
    danone: "danone",
    "l'oréal": "loreal",
    loreal: "loreal",
    "l'oreal": "loreal",
  };
  const queryKey = nameMap[companyName.toLowerCase()] ?? null;
  const data = queryKey ? briefData[queryKey] : null;

  const handleTabChange = (tab: string) => {
    const fromIdx = TAB_ORDER.indexOf(tab as TabId);
    const toIdx = TAB_ORDER.indexOf(activeTab);
    setSlideDir(fromIdx > toIdx ? "right" : "left");
    setActiveTab(tab as TabId);
    setSlideKey((k) => k + 1);
  };

  const handleSaveToCRM = () => {
    toast({
      title: "Saved to CRM",
      description: `${data!.name} sustainability brief has been saved to your CRM.`,
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

  if (!data) {
    return (
      <div className="mx-auto max-w-4xl animate-fade-in pb-16 sm:pb-20">
        <header className="mb-10 flex items-center gap-3">
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
          <div className="type-section-label flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            Brief
          </div>
        </header>
        <div className="glass-panel-strong rounded-2xl px-8 py-14 text-center">
          <p className="font-display text-lg font-semibold tracking-tight text-foreground">
            No brief available for &ldquo;{companyName}&rdquo;
          </p>
          <p className="mt-2 text-[0.9375rem] text-muted-foreground">
            This demo includes profiles for Renault, Carrefour, Stellantis, TotalEnergies,
            Saint-Gobain, Schneider Electric, Veolia, Air France-KLM, Danone, and L&apos;Oréal.
          </p>
          <Button type="button" className="mt-8" onClick={onBack}>
            Back to dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (selectedSolution) {
    return (
      <SolutionDetail
        companyName={data.name}
        solution={selectedSolution}
        onBack={() => setSelectedSolution(null)}
      />
    );
  }

  // Derived data for overview additions
  const topPlay = [...data.solutions].sort((a, b) => b.impactScore - a.impactScore)[0];
  const chartData = data.solutions.map((s) => ({
    label: `#${s.challengeId}`,
    fullName: s.product,
    score: s.impactScore,
  }));

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

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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

        {/* Animated tab content — keyed to re-mount on each tab change, direction drives animation */}
        <div
          key={slideKey}
          role="tabpanel"
          className={slideDir === "right" ? "animate-tab-from-right" : "animate-tab-from-left"}
        >
          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="focus-visible:outline-none">
              {/* Meta row */}
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

              {/* Pressure / play table */}
              <div className="glass-panel overflow-hidden rounded-xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="type-eyebrow border-b border-black/[0.06] bg-black/[0.02] text-left backdrop-blur-sm">
                      <th scope="col" className="w-8 px-3 py-2.5 font-medium">#</th>
                      <th scope="col" className="px-3 py-2.5 font-medium">Pressure</th>
                      <th scope="col" className="px-3 py-2.5 font-medium">Matched play</th>
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

              {/* ── Solution impact scores bar chart ── */}
              <section className="mt-8">
                <p className="type-section-label mb-3">Solution impact scores</p>
                <div className="glass-panel rounded-xl p-4 sm:p-5">
                  <div className="h-[140px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                        barCategoryGap="36%"
                      >
                        <CartesianGrid
                          vertical={false}
                          stroke="rgba(0,0,0,0.06)"
                          strokeDasharray="0"
                        />
                        <XAxis
                          dataKey="label"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11, fill: "hsl(240 3.8% 46.1%)", fontWeight: 500 }}
                        />
                        <YAxis
                          domain={[0, 100]}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11, fill: "hsl(240 3.8% 46.1%)" }}
                          width={32}
                        />
                        <Tooltip
                          cursor={{ fill: "rgba(0,0,0,0.04)" }}
                          content={({ active, payload }) => {
                            if (!active || !payload?.length) return null;
                            const d = payload[0].payload as (typeof chartData)[number];
                            return (
                              <div className="rounded-lg border border-black/[0.06] bg-white/95 px-3 py-2 text-[0.8125rem] shadow-apple-sm backdrop-blur-xl">
                                <p className="font-semibold text-foreground">{d.fullName}</p>
                                <p className="text-muted-foreground">Impact score: {d.score}</p>
                              </div>
                            );
                          }}
                        />
                        <Bar
                          dataKey="score"
                          fill="hsl(24 100% 50%)"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={80}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              {/* ── Key contacts ── */}
              <section className="mt-6">
                <p className="type-section-label mb-3">Key contacts</p>
                <div className="flex flex-wrap gap-2">
                  {data.contacts.map((c) => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={c.role}
                        className="glass-panel flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.875rem] font-medium text-foreground"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                        {c.role}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ── Top recommended play ── */}
              <section className="mt-6">
                <p className="type-section-label mb-3">Top recommended play</p>
                <div className="glass-panel-strong rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug tracking-tight text-foreground">
                        {topPlay.product}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{topPlay.challengeLabel}</p>
                    </div>
                    <span className="shrink-0 text-2xl font-semibold tabular-nums tracking-tight text-primary">
                      {topPlay.impactScore}
                    </span>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-black/[0.06] pt-4">
                    <div>
                      <dt className="type-eyebrow">Contract value</dt>
                      <dd className="mt-1 text-xs font-medium text-foreground">
                        {(topPlay as any).details?.financialCase?.contractValue ?? "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="type-eyebrow">CO₂ impact</dt>
                      <dd className="mt-1 text-xs font-medium text-foreground">
                        {topPlay.metrics?.co2Impact ?? "—"}
                      </dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => setSelectedSolution(topPlay as SolutionData)}
                    className="mt-4 text-xs font-medium tracking-tight text-primary transition-opacity hover:opacity-75"
                  >
                    Open playbook →
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* ── CHALLENGES ── */}
          {activeTab === "challenges" && (
            <div className="space-y-4 focus-visible:outline-none">
              {data.challenges.map((c) => {
                const Icon = c.icon;
                return (
                  <Collapsible key={c.id} className="glass-panel rounded-xl">
                    <CollapsibleTrigger className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&[data-state=open]>svg:first-child]:rotate-180">
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform"
                        aria-hidden
                      />
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-[#fafafc]">
                        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                      </div>
                      <span className="min-w-0 flex-1 text-sm font-medium leading-snug tracking-tight text-foreground">
                        {c.title}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "type-eyebrow h-5 shrink-0 border px-1.5 py-0 font-medium normal-case tracking-normal",
                          c.urgencyColor
                        )}
                      >
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
            </div>
          )}

          {/* ── SOLUTIONS ── */}
          {activeTab === "solutions" && (
            <div className="grid gap-5 focus-visible:outline-none sm:grid-cols-3 sm:gap-6">
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
                        <span className="type-eyebrow normal-case tracking-normal text-muted-foreground">
                          #{s.challengeId}
                        </span>
                      </div>
                      <span className="text-xl font-medium tabular-nums tracking-tight text-primary">
                        {s.impactScore}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium leading-snug tracking-tight text-foreground">
                      {s.product}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-sm font-normal leading-relaxed text-muted-foreground">
                      {s.detail}
                    </p>
                    <dl className="mt-4 space-y-2 border-t border-black/[0.06] pt-4 text-xs">
                      <div>
                        <dt className="type-eyebrow normal-case">Revenue (est.)</dt>
                        <dd className="mt-1 font-medium leading-snug text-foreground">
                          {s.metrics?.profitability}
                        </dd>
                      </div>
                      <div>
                        <dt className="type-eyebrow normal-case">Client benefit</dt>
                        <dd className="mt-1 font-medium leading-snug text-foreground">
                          {s.metrics?.clientBenefit}
                        </dd>
                      </div>
                      <div>
                        <dt className="type-eyebrow normal-case">CO₂</dt>
                        <dd className="mt-1 font-medium leading-snug text-foreground">
                          {s.metrics?.co2Impact}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-dashed border-black/[0.1] bg-[#fafafc] px-2 py-1.5 text-xs leading-snug text-muted-foreground">
                      <span className="truncate">Mapped: {s.challengeLabel}</span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                    </div>
                    <p className="mt-2 text-xs font-medium tracking-tight text-primary">
                      Open playbook
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── EXPORT ── */}
          {activeTab === "export" && (
            <div className="space-y-12 focus-visible:outline-none">
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
                        <Check
                          className="pointer-events-none absolute h-2.5 w-2.5 text-primary-foreground opacity-0 peer-checked:opacity-100"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-sm leading-snug text-foreground">
                        <span className="font-medium">{s.product}</span>
                        <span className="font-normal text-muted-foreground"> · {s.challengeLabel}</span>
                        <span className="tabular-nums font-normal text-muted-foreground"> · {s.impactScore}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" className="h-11" onClick={() => handleExport("PowerPoint")}>
                    <Presentation className="mr-2 h-3.5 w-3.5" />
                    PowerPoint
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11"
                    onClick={() => handleExport("Canva")}
                  >
                    <Palette className="mr-2 h-3.5 w-3.5" />
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
                  <p className="text-3xl font-medium tabular-nums leading-none tracking-tight text-primary">
                    {data.score}%
                  </p>
                </div>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-black/[0.06]">
                  <div
                    className="h-1 rounded-full bg-primary transition-[width] duration-300"
                    style={{ width: `${data.score}%` }}
                  />
                </div>
              </section>

              <section>
                <h2 className="type-section-label mb-2">Benchmarks</h2>
                <div className="glass-panel divide-y divide-black/[0.06] overflow-hidden rounded-xl">
                  {data.benchmarks.map((b) => (
                    <div
                      key={b.metric}
                      className="flex flex-wrap items-baseline justify-between gap-2 px-3 py-2.5 text-sm"
                    >
                      <span className="leading-snug text-muted-foreground">{b.metric}</span>
                      <span className="tabular-nums font-medium text-foreground">{b.value}</span>
                      <span className="type-eyebrow w-full normal-case leading-snug text-muted-foreground">
                        {b.context}
                      </span>
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
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};
