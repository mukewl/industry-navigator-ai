import { useEffect, useState } from "react";
import {
  GitBranch,
  ArrowDown,
  DatabaseZap,
  Users,
  Globe,
  ShieldCheck,
  BrainCircuit,
  FileSearch,
  Database,
  LineChart,
  Network,
  Bot,
  Server,
  FileText,
  Lock,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Persists across tab switches within a single page session, but resets on
// full page reload — so closing the browser tab and reopening it later in
// the day triggers auto-play again.
let hasAnimatedThisSession = false;

const STEP_TICK_MS = 900;
const TOTAL_STEPS = 5;

const AGENTS = [
  {
    num: "01",
    name: "Scraping Agent",
    icon: FileSearch,
    action: "Crawling Carrefour's 2024 sustainability report and AGEC filings",
  },
  {
    num: "02",
    name: "Filtering Agent",
    icon: Database,
    action: "Retained 12 high-trust sources from 47 crawled documents",
  },
  {
    num: "03",
    name: "Scoring & Scoping Agent",
    icon: LineChart,
    action: "Ranked cold chain energy as top priority challenge",
  },
  {
    num: "04",
    name: "Portfolio Mapping Agent",
    icon: Network,
    action: "Matched Smart Eco Energy to cold chain challenge",
  },
  {
    num: "05",
    name: "Solution Research Agent",
    icon: Bot,
    action: "Compiled tailored engagement brief with 3 solutions",
  },
];

const SectionLabel = ({ num, label }: { num: string; label: string }) => (
  <div className="mb-2 flex items-center gap-1.5">
    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{num}</span>
    <span className="text-[10px] font-normal uppercase tracking-widest text-white/40">{label}</span>
  </div>
);

const FlowArrow = () => (
  <div className="flex justify-center py-1">
    <ArrowDown className="h-4 w-4 text-primary/40" />
  </div>
);

const tooltipClass =
  "max-w-[280px] rounded-xl border border-white/12 bg-[hsl(240_3.8%_10%)] px-3.5 py-3 shadow-apple";

export const ArchitectureView = () => {
  // progress: 0 = idle, 1..5 = step N active, 6 = all done (final state)
  const [progress, setProgress] = useState<number>(() =>
    hasAnimatedThisSession ? TOTAL_STEPS + 1 : 0,
  );
  const [tooltipsDisabled, setTooltipsDisabled] = useState<boolean>(
    () => hasAnimatedThisSession,
  );
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // First mount and we've already animated this session → skip auto-play.
    // Replay (animationKey > 0) always runs.
    if (hasAnimatedThisSession && animationKey === 0) return;

    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        // Mark "animated" on the first real tick (avoids StrictMode setting
        // the flag during a mount that immediately gets cleaned up).
        if (p === 0) hasAnimatedThisSession = true;
        if (p >= TOTAL_STEPS) {
          clearInterval(id);
          return TOTAL_STEPS + 1;
        }
        return p + 1;
      });
    }, STEP_TICK_MS);

    return () => clearInterval(id);
  }, [animationKey]);

  // Once the animation reaches the final state, permanently disable the
  // per-agent hover tooltips — the inline progress panel is the single
  // source of truth from then on.
  useEffect(() => {
    if (progress > TOTAL_STEPS) setTooltipsDisabled(true);
  }, [progress]);

  const handleReplay = () => setAnimationKey((k) => k + 1);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="animate-fade-in pb-10 pt-4">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <GitBranch className="h-[18px] w-[18px] text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-medium tracking-tight text-foreground leading-tight">
                Multi-Agent Architecture
              </h1>
              <p className="text-sm text-muted-foreground">
                Gen AI Sustainability Profiling System
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReplay}
            className="h-9"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Replay
          </Button>
        </div>

        <div>
          {/* 01 — INPUT */}
          <div>
            <SectionLabel num="01" label="Input" />
            <div className="grid grid-cols-3 gap-2">
              <Card className="border-border/50 bg-background shadow-sm">
                <CardContent className="flex items-center gap-2 px-3 py-2.5">
                  <DatabaseZap className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">CRM</span>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background shadow-sm">
                <CardContent className="flex items-center gap-2 px-3 py-2.5">
                  <Users className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">Salesperson Client List</span>
                </CardContent>
              </Card>
              <Card className="border-primary/30 bg-primary/[0.03] shadow-sm">
                <CardContent className="flex items-center gap-2 px-3 py-2.5">
                  <Globe className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="text-xs font-medium text-primary">Web Input</span>
                </CardContent>
              </Card>
            </div>
          </div>

          <FlowArrow />

          {/* 02 — PRE-QUALIFICATION GATE */}
          <div>
            <SectionLabel num="02" label="Pre-Qualification Gate" />
            <Card className="relative overflow-hidden border-dashed border-primary/40 shadow-sm">
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-primary/60" />
              <CardContent className="flex items-center gap-3 py-3 pl-5 pr-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">
                    Sufficient Public Data Available?
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Insufficient footprint is flagged and held.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <FlowArrow />

          {/* 03 — ORCHESTRATOR */}
          <div>
            <SectionLabel num="03" label="Orchestrator" />
            <Card className="border-white/8 bg-[hsl(240_3.8%_10%)] shadow-md">
              <CardContent className="flex items-center gap-3 px-5 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                  <BrainCircuit className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Orchestrator Agent</p>
                  <p className="text-[11px] text-white/50">Manages the full pipeline end to end</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <FlowArrow />

          {/* 04 — AGENT PIPELINE */}
          <div>
            <SectionLabel num="04" label="Agent Pipeline" />
            <div className="space-y-2">
              {/* Inline progress panel — same content/styling as the per-agent
                  hover tooltips, rendered persistently while the auto-play
                  animation runs. Becomes the single source of truth after
                  the first run completes. */}
              {progress > 0 && (
                <div className={cn(tooltipClass, "max-w-none")}>
                  <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                    Carrefour — pipeline progress
                  </p>
                  <div className="space-y-2">
                    {AGENTS.slice(0, Math.min(progress, TOTAL_STEPS)).map((a, i) => {
                      const done = progress > i + 1;
                      return (
                        <div key={a.num} className="flex items-start gap-2">
                          {done ? (
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                          ) : (
                            <div className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                          )}
                          <span
                            className={
                              done
                                ? "text-[11px] leading-snug text-white/45"
                                : "text-[11px] leading-snug text-white font-medium"
                            }
                          >
                            {a.action}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Five agent cards */}
              <div className="flex gap-2">
                {AGENTS.map((agent, idx) => {
                  const Icon = agent.icon;
                  const stepNum = idx + 1;
                  const isActive = progress === stepNum;
                  const isCompleted = progress > stepNum;

                  const cardClasses = cn(
                    "flex-1 cursor-default shadow-sm transition-all duration-200",
                    !isActive && !isCompleted &&
                      "border-border/50 bg-background hover:border-primary/40 hover:bg-primary/[0.02]",
                    isActive &&
                      "border-primary/60 bg-primary/[0.06] ring-2 ring-primary/30 shadow-[0_0_0_3px_rgba(255,105,0,0.08)]",
                    isCompleted && "border-primary/40 bg-primary/[0.03]",
                  );

                  const numBadgeClasses = cn(
                    "flex h-6 w-6 items-center justify-center rounded-md border text-[10px] font-bold font-mono transition-colors duration-200",
                    !isActive && !isCompleted &&
                      "border-border/60 bg-muted text-muted-foreground",
                    isActive && "border-primary bg-primary text-primary-foreground",
                    isCompleted && "border-primary/30 bg-primary/15 text-primary",
                  );

                  const iconClasses = cn(
                    "h-4 w-4 transition-colors duration-200",
                    !isActive && !isCompleted && "text-muted-foreground/60",
                    (isActive || isCompleted) && "text-primary",
                  );

                  return (
                    <Tooltip
                      key={agent.num}
                      open={tooltipsDisabled ? false : undefined}
                    >
                      <TooltipTrigger asChild>
                        <Card className={cardClasses}>
                          <CardContent className="flex flex-col items-center gap-1.5 px-2 py-3 text-center">
                            <div className={numBadgeClasses}>{agent.num}</div>
                            <Icon className={iconClasses} />
                            <span className="text-[11px] font-medium leading-snug text-foreground">
                              {agent.name}
                            </span>
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent side="top" className={tooltipClass}>
                        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                          Carrefour — pipeline progress
                        </p>
                        <div className="space-y-2">
                          {AGENTS.slice(0, idx + 1).map((a, i) => {
                            const done = i < idx;
                            return (
                              <div key={a.num} className="flex items-start gap-2">
                                {done ? (
                                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                ) : (
                                  <div className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                )}
                                <span
                                  className={
                                    done
                                      ? "text-[11px] leading-snug text-white/45"
                                      : "text-[11px] leading-snug text-white font-medium"
                                  }
                                >
                                  {a.action}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>

              {/* Shared State Layer bar */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-default items-center gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-2 transition-colors duration-150 hover:bg-emerald-500/[0.10]">
                    <Server className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-400">Shared State Layer</span>
                    <span className="ml-auto text-[10px] uppercase tracking-wide text-emerald-400/50">
                      All Steps
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className={tooltipClass}>
                  <p className="text-[11px] leading-relaxed text-white/80">
                    All agents read and write to a shared memory object simultaneously. Every change is
                    versioned, preventing context loss and contradictions across the pipeline.
                  </p>
                </TooltipContent>
              </Tooltip>

              {/* Fact-Checker Agent bar */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-default items-center gap-2.5 rounded-lg border border-dashed border-amber-500/30 bg-amber-500/[0.06] px-4 py-2 transition-colors duration-150 hover:bg-amber-500/[0.10]">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                    <span className="text-xs font-medium text-amber-400">Fact-Checker Agent</span>
                    <span className="ml-auto text-[10px] uppercase tracking-wide text-amber-400/50">
                      Steps 1, 2 &amp; Final
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className={tooltipClass}>
                  <p className="text-[11px] leading-relaxed text-white/80">
                    Runs deep validation after Scraping and Filtering stages. Runs a lighter check
                    before final output. Skips mid-pipeline steps to avoid unnecessary latency.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <FlowArrow />

          {/* 05 — OUTPUT */}
          <div>
            <SectionLabel num="05" label="Output" />
            <div className="grid grid-cols-2 gap-3">
              {/* Phase 1 — CRM Engagement Brief */}
              <Card className="relative overflow-hidden border-primary/20 bg-[hsl(240_3.8%_10%)] shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent" />
                <CardContent className="relative px-4 py-3">
                  <div className="mb-1.5 flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="text-[11px] font-semibold text-white">CRM Engagement Brief</span>
                  </div>
                  <Badge className="mb-2 border-primary/30 bg-primary/20 text-[10px] text-primary hover:bg-primary/30">
                    Phase 1
                  </Badge>
                  <div className="space-y-1">
                    {["Top challenges", "Orange solutions", "Impact scores", "Financial case"].map(
                      (item) => (
                        <div key={item} className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3 shrink-0 text-primary/70" />
                          <span className="text-[10px] text-white/55">{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Phase 2 — Account Manager Dashboard */}
              <Card className="border-dashed border-border/50 bg-muted/30 opacity-60">
                <CardContent className="px-4 py-3">
                  <div className="mb-1.5 flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      Account Manager Dashboard
                    </span>
                  </div>
                  <Badge variant="outline" className="mb-2 text-[10px] text-muted-foreground">
                    Phase 2
                  </Badge>
                  <div className="space-y-1">
                    {["Engagement history", "CRM sync", "Trend tracking"].map((item) => (
                      <div key={item} className="flex items-center gap-1.5">
                        <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                        <span className="text-[10px] text-muted-foreground/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
