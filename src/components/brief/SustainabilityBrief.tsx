import { useState, useEffect } from "react";
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
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { SolutionDetail, SolutionData } from "./SolutionDetail";
import { briefData } from "@/data/briefData";
import { winStrategyData } from "@/data/winStrategyData";
import { cn } from "@/lib/utils";

interface SustainabilityBriefProps {
  companyName: string;
  onBack: (returnTo: string) => void;
  returnTo: string;
}

interface CustomSolution {
  title: string;
  challengeAddressed: string;
  divisions: string[];
  description: string;
  feasibilityNotes: string;
}

const TAB_ORDER = ["overview", "challenges", "solutions", "export"] as const;
type TabId = (typeof TAB_ORDER)[number];

type ContactEntry = (typeof briefData)[keyof typeof briefData]["contacts"][number];

function impactBadgeClass(score: number): string {
  if (score >= 90) return "text-emerald-600 bg-emerald-50 border border-emerald-200/80";
  if (score >= 75) return "text-amber-600 bg-amber-50 border border-amber-200/80";
  return "text-red-600 bg-red-50 border border-red-200/80";
}

function buildDraftEmail(
  contactRole: string,
  companyName: string,
  challenge: { title: string; description: string },
  solution: { product: string; detail: string; metrics?: { clientBenefit: string } }
): string {
  return `Subject: Orange Business × ${companyName} — ${solution.product}

Dear ${contactRole},

I'm reaching out from Orange Business regarding ${companyName}'s sustainability priorities, particularly around ${challenge.title}.

${solution.detail}

${solution.metrics?.clientBenefit ?? ""}

I'd welcome a brief discovery call to explore how Orange Business can support your ESG objectives.

Best regards,
[Your name]
Orange Business`;
}

export const SustainabilityBrief = ({ companyName, onBack, returnTo }: SustainabilityBriefProps) => {
  const { toast } = useToast();
  const [selectedSolution, setSelectedSolution] = useState<SolutionData | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [slideKey, setSlideKey] = useState(0);
  const [slideDir, setSlideDir] = useState<"right" | "left">("right");
  const [draftContact, setDraftContact] = useState<ContactEntry | null>(null);
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const [highlightedSolutionId, setHighlightedSolutionId] = useState<number | null>(null);
  const [feasibilityCustom, setFeasibilityCustom] = useState<CustomSolution | null>(null);
  const [isFeasibilityOpen, setIsFeasibilityOpen] = useState(false);
  const [focusedCustomIdx, setFocusedCustomIdx] = useState<number | null>(null);
  const [winStrategyModal, setWinStrategyModal] = useState<SolutionData | null>(null);

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

  // Scroll to focused custom solution after tab animation completes
  useEffect(() => {
    if (activeTab === "solutions" && focusedCustomIdx !== null) {
      const timer = setTimeout(() => {
        document.getElementById(`custom-solution-${focusedCustomIdx}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 280);
      return () => clearTimeout(timer);
    }
  }, [activeTab, focusedCustomIdx, slideKey]);

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
            onClick={() => onBack(returnTo)}
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
          <Button type="button" className="mt-8" onClick={() => onBack(returnTo)}>
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
  const rankedSolutions = [...data.solutions].sort((a, b) => b.impactScore - a.impactScore);
  const topPlay = rankedSolutions[0];
  const topChallenge = data.challenges[0];
  const topChallengeSolution =
    data.solutions.find((s) => s.challengeId === topChallenge?.id) ?? topPlay;

  return (
    <div className="mx-auto max-w-4xl animate-fade-in pb-16 sm:pb-20">
      <header className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onBack(returnTo)}
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
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-apple-sm",
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
                        <tr
                          key={c.id}
                          className="group/row border-b border-black/[0.05] transition-colors duration-100 hover:bg-primary/[0.04] last:border-0"
                        >
                          <td className="px-3 py-3 tabular-nums text-muted-foreground align-top">{c.id}</td>
                          <td className="px-3 py-3 font-medium leading-snug text-foreground align-top">{c.title}</td>
                          <td className="px-3 py-3 align-top">
                            {play ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setHighlightedSolutionId(play.challengeId);
                                    handleTabChange("solutions");
                                  }}
                                  className="font-medium leading-snug text-primary text-left hover:underline"
                                >
                                  {play.product}
                                </button>
                                <div className="mt-0.5 flex items-center gap-1.5 opacity-0 transition-opacity duration-150 group-hover/row:opacity-100">
                                  <span className="text-[0.6875rem] tabular-nums text-muted-foreground">
                                    {(play as any).details?.financialCase?.contractValue ?? "—"}
                                  </span>
                                  <span className="text-[0.6875rem] text-muted-foreground">·</span>
                                  <span className="text-[0.6875rem] font-semibold tabular-nums text-primary">
                                    score {play.impactScore}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <span className="font-medium leading-snug text-muted-foreground">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ── Solution impact scores ── */}
              <section className="mt-8">
                <p className="type-section-label mb-3">Solution impact scores</p>
                <div className="glass-panel divide-y divide-black/[0.05] overflow-hidden rounded-xl">
                  {rankedSolutions.map((s, idx) => (
                    <div key={s.challengeId} className="flex items-center gap-4 px-4 py-3">
                      <span className="type-eyebrow w-4 shrink-0 tabular-nums text-muted-foreground/60 normal-case">
                        {idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug text-foreground">{s.product}</p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">{s.challengeLabel}</p>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${impactBadgeClass(s.impactScore)}`}
                      >
                        {s.impactScore}
                      </span>
                    </div>
                  ))}
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
                    className="mt-4 inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    View Full Solution →
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
            <div className="focus-visible:outline-none">
              <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
                {(() => {
                  const ws = winStrategyData[queryKey ?? ""] ?? null;
                  return data.solutions.map((s) => {
                  const Icon = s.icon;
                  const isHighlighted = highlightedSolutionId === s.challengeId;
                  return (
                    <button
                      key={s.challengeId}
                      type="button"
                      onClick={() => { setHighlightedSolutionId(null); setSelectedSolution(s as SolutionData); }}
                      className={cn(
                        "glass-panel flex flex-col rounded-xl p-5 text-left shadow-apple-sm transition-[box-shadow,background,outline] duration-200 hover:bg-white hover:shadow-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isHighlighted && "ring-2 ring-primary/40 bg-primary/[0.03]"
                      )}
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
                      <div className="mt-3 flex-1 flex items-end gap-2">
                        <div className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                          View Full Solution →
                        </div>
                        {ws && (
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              setWinStrategyModal(s as SolutionData);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.stopPropagation();
                                e.preventDefault();
                                setWinStrategyModal(s as SolutionData);
                              }
                            }}
                            className="inline-flex items-center gap-1 rounded-md border border-black/[0.12] bg-transparent px-3 py-1.5 text-xs font-semibold text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            Win Strategy
                          </div>
                        )}
                      </div>
                    </button>
                  );
                  });
                })()}
              </div>

              {/* ── Custom Solutions via OBS Capabilities ── */}
              {(() => {
                const customSolutions = (data as any).customSolutions as CustomSolution[] | undefined;
                if (!customSolutions?.length) return null;
                return (
                  <section className="mt-10">
                    <div className="mb-4 flex flex-wrap items-baseline gap-3">
                      <p className="type-section-label">Custom Solutions via OBS Capabilities</p>
                      <span className="rounded-full border border-sky-200/80 bg-sky-50 px-2.5 py-0.5 text-[0.6875rem] font-medium text-sky-700">
                        Built with OBS Capabilities — not in current portfolio
                      </span>
                    </div>
                    <div className="rounded-2xl border border-sky-200/50 bg-sky-50/60 p-5 sm:p-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {customSolutions.map((cs, idx) => (
                          <div
                            id={`custom-solution-${idx}`}
                            key={idx}
                            className={cn(
                              "glass-panel rounded-xl p-5 transition-[box-shadow,ring] duration-300",
                              focusedCustomIdx === idx && "ring-2 ring-primary/40"
                            )}
                          >
                            <p className="text-sm font-semibold leading-snug tracking-tight text-foreground">
                              {cs.title}
                            </p>
                            <p className="mt-2 text-sm font-normal leading-relaxed text-muted-foreground">
                              {cs.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {cs.divisions.map((d) => (
                                <span
                                  key={d}
                                  className="rounded-full border border-sky-200/70 bg-sky-100/70 px-2 py-0.5 text-[0.6875rem] font-medium text-sky-700"
                                >
                                  {d}
                                </span>
                              ))}
                            </div>
                            <p className="mt-3 text-xs text-muted-foreground">
                              <span className="font-medium text-foreground">Challenge: </span>
                              {cs.challengeAddressed}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setFocusedCustomIdx(null);
                                setFeasibilityCustom(cs);
                                setIsFeasibilityOpen(true);
                              }}
                              className="mt-4 inline-flex h-7 items-center gap-1 rounded-md border border-primary/40 px-3 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
                            >
                              Explore Feasibility
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })()}
            </div>
          )}

          {/* ── EXPORT ── */}
          {activeTab === "export" && (
            <div className="space-y-12 focus-visible:outline-none">
              {/* ── Next Steps ── */}
              <section>
                <h2 className="type-section-label mb-4">Next Steps</h2>
                {data.solutions.map((s) => {
                  const steps = (s as any).details?.nextSteps as string[] | undefined;
                  if (!steps?.length) return null;
                  const Icon = s.icon;
                  return (
                    <section key={s.challengeId} className="mb-8 last:mb-0">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-black/[0.06] bg-[#fafafc]">
                          <Icon className="h-3 w-3 text-primary" aria-hidden />
                        </div>
                        <p className="type-section-label">{s.product}</p>
                      </div>
                      <ol className="space-y-2">
                        {steps.slice(0, 3).map((step, idx) => (
                          <li key={idx} className="glass-panel flex items-start gap-3 rounded-xl px-4 py-3">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                            <span className="text-sm leading-snug text-foreground">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </section>
                  );
                })}
              </section>

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

      {/* ── Feasibility Modal ── */}
      {/* ── Win Strategy Modal ── */}
      {(() => {
        const ws = winStrategyData[queryKey ?? ""] ?? null;
        const obsCard = winStrategyModal
          ? (ws?.whyOBS.find((c) => c.solution === winStrategyModal.product) ?? null)
          : null;
        return (
          <Dialog open={!!winStrategyModal} onOpenChange={(open) => { if (!open) setWinStrategyModal(null); }}>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="leading-snug tracking-tight">
                  {winStrategyModal?.product}
                </DialogTitle>
                <DialogDescription>Win Strategy</DialogDescription>
              </DialogHeader>
              {ws && winStrategyModal && (
                <div className="mt-2 space-y-6">

                  {/* Why Now */}
                  <div>
                    <p className="type-eyebrow mb-2 flex items-center gap-1.5">
                      <AlertCircle className="h-3 w-3 text-primary" aria-hidden /> Why Now
                    </p>
                    <div className="space-y-2">
                      {ws.whyNow.map((sig, i) => (
                        <div key={i} className="glass-panel rounded-xl px-4 py-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium leading-snug text-foreground">{sig.title}</p>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{sig.description}</p>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-1.5">
                              <span className={cn(
                                "inline-flex items-center rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.06em]",
                                sig.urgency === "Critical" && "text-red-600 bg-red-50 border-red-200/80",
                                sig.urgency === "High" && "text-amber-600 bg-amber-50 border-amber-200/80",
                                sig.urgency === "Medium" && "text-yellow-700 bg-yellow-50 border-yellow-200/80",
                              )}>
                                {sig.urgency}
                              </span>
                              {sig.daysUntilDeadline !== undefined && (
                                <span className={cn(
                                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold tabular-nums",
                                  sig.daysUntilDeadline <= 30
                                    ? "border-red-200/80 bg-red-50 text-red-600"
                                    : "border-black/[0.08] bg-[#fafafc] text-muted-foreground"
                                )}>
                                  <Calendar className="h-2.5 w-2.5" aria-hidden />
                                  {sig.daysUntilDeadline}d
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why OBS — only if a card matches this solution */}
                  {obsCard && (
                    <div>
                      <p className="type-eyebrow mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="h-3 w-3 text-primary" aria-hidden /> Why OBS
                      </p>
                      <div className="glass-panel rounded-xl px-4 py-4">
                        <p className="type-eyebrow normal-case mb-2 text-muted-foreground">
                          vs {obsCard.competitors.join(" · ")}
                        </p>
                        <ul className="space-y-2">
                          {obsCard.differentiators.map((d, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                              <span className="text-foreground">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* How to Win */}
                  <div>
                    <p className="type-eyebrow mb-2 flex items-center gap-1.5">
                      <Users className="h-3 w-3 text-primary" aria-hidden /> How to Win
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {ws.howToWin.map((st, i) => (
                        <div key={i} className="glass-panel rounded-xl px-4 py-4">
                          <p className="type-eyebrow mb-1">{st.archetype}</p>
                          <p className="text-sm font-semibold leading-snug text-foreground">{st.title}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{st.concern}</p>
                          <div className="mt-3 rounded-lg border border-primary/20 bg-primary/[0.04] px-3 py-2">
                            <p className="text-xs leading-relaxed text-foreground">"{st.opener}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </DialogContent>
          </Dialog>
        );
      })()}

      <Dialog open={isFeasibilityOpen} onOpenChange={setIsFeasibilityOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="leading-snug tracking-tight">
              {feasibilityCustom?.title}
            </DialogTitle>
            <DialogDescription className="mt-1 leading-relaxed">
              {feasibilityCustom?.description}
            </DialogDescription>
          </DialogHeader>
          {feasibilityCustom && (
            <div className="mt-1 space-y-5">
              {/* Divisions */}
              <div>
                <p className="type-eyebrow mb-2">OBS Divisions Involved</p>
                <div className="flex flex-wrap gap-1.5">
                  {feasibilityCustom.divisions.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-sky-200/70 bg-sky-50 px-2.5 py-0.5 text-[0.75rem] font-medium text-sky-700"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feasibility Notes */}
              <div>
                <p className="type-eyebrow mb-2">Feasibility Notes</p>
                <p className="rounded-lg border border-black/[0.06] bg-[#fafafc] px-4 py-3 text-[0.8125rem] leading-relaxed text-foreground">
                  {feasibilityCustom.feasibilityNotes}
                </p>
              </div>

              {/* Challenge addressed */}
              <div>
                <p className="type-eyebrow mb-1">Challenge Addressed</p>
                <p className="text-sm text-muted-foreground">{feasibilityCustom.challengeAddressed}</p>
              </div>

              {/* CTA row */}
              <div className="flex items-center justify-between gap-3 border-t border-black/[0.06] pt-4">
                <button
                  type="button"
                  onClick={() => setIsFeasibilityOpen(false)}
                  className="inline-flex h-9 items-center rounded-lg border border-black/[0.1] bg-transparent px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-black/[0.04]"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-primary px-4 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                  Schedule Internal Review
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Draft Email Modal ── */}
      <Dialog open={isDraftOpen} onOpenChange={setIsDraftOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Draft Email</DialogTitle>
            <DialogDescription>
              {draftContact?.role} · {companyName}
            </DialogDescription>
          </DialogHeader>
          {draftContact && topChallenge && (
            <>
              <pre className="mt-2 max-h-80 overflow-y-auto whitespace-pre-wrap rounded-lg border border-black/[0.06] bg-[#fafafc] p-4 font-sans text-[0.8125rem] leading-relaxed text-foreground">
                {buildDraftEmail(
                  draftContact.role,
                  companyName,
                  topChallenge,
                  topChallengeSolution
                )}
              </pre>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      buildDraftEmail(
                        draftContact.role,
                        companyName,
                        topChallenge,
                        topChallengeSolution
                      )
                    );
                    toast({ title: "Copied", description: "Email draft copied to clipboard." });
                  }}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Copy to clipboard
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
