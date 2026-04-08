import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Loader2,
  Circle,
  ArrowRight,
  Globe,
  Filter,
  BarChart3,
  Layers,
  FileText,
  Link2,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PipelineViewProps {
  companyName: string;
  onComplete: () => void;
}

const STEPS = [
  {
    id: 1,
    name: "Scraping Agent",
    description: "Public ESG + filings crawl",
    icon: Globe,
    duration: 2200,
  },
  {
    id: 2,
    name: "Filtering Agent",
    description: "Source quality + cross-check",
    icon: Filter,
    duration: 1800,
  },
  {
    id: 3,
    name: "Scoring and Scoping Agent",
    description: "Challenge ranking · regulatory exposure",
    icon: BarChart3,
    duration: 2000,
  },
  {
    id: 4,
    name: "Portfolio Mapping Agent",
    description: "Challenge → Orange catalog",
    icon: Layers,
    duration: 1800,
  },
  {
    id: 5,
    name: "Solution Research Agent",
    description: "Brief assembly",
    icon: FileText,
    duration: 1600,
  },
];

// 0 = not started, 1–5 = running that step, 6 = all complete
type StepState = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const getStepStatus = (stepId: number, current: StepState) => {
  if (current === 0) return "pending";
  if (stepId < current) return "complete";
  if (stepId === current) return "running";
  return "pending";
};

export const PipelineView = ({ companyName, onComplete }: PipelineViewProps) => {
  const [currentStep, setCurrentStep] = useState<StepState>(0);
  const [progressWidths, setProgressWidths] = useState<number[]>([0, 0, 0, 0, 0]);

  useEffect(() => {
    let cancelled = false;

    const runPipeline = async () => {
      for (let i = 0; i < STEPS.length; i++) {
        if (cancelled) return;
        const stepIdx = i;
        setCurrentStep((i + 1) as StepState);

        // Animate progress bar for this step
        const duration = STEPS[stepIdx].duration;
        const startTime = Date.now();
        const tick = () => {
          if (cancelled) return;
          const elapsed = Date.now() - startTime;
          const pct = Math.min(100, (elapsed / duration) * 100);
          setProgressWidths((prev) => {
            const next = [...prev];
            next[stepIdx] = pct;
            return next;
          });
          if (pct < 100) {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);

        await new Promise((resolve) => setTimeout(resolve, duration));
      }
      if (!cancelled) {
        setCurrentStep(6);
      }
    };

    // Small initial delay so the component renders first
    const timer = setTimeout(runPipeline, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const allDone = currentStep === 6;

  return (
    <div className="py-8 px-2 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {allDone ? "Pipeline Complete" : "Pipeline Running"}
          </span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Profile · <span className="text-primary">{companyName}</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Public data · 5 agents
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Main pipeline steps */}
        <div className="space-y-4">
          {STEPS.map((step, idx) => {
            const status = getStepStatus(step.id, currentStep);
            const StepIcon = step.icon;
            const progress = progressWidths[idx];

            return (
              <Card
                key={step.id}
                className={cn(
                  "border transition-all duration-500 overflow-hidden shadow-none bg-card",
                  status === "running" && "border-primary/50",
                  status === "complete" && "border-emerald-500/25 bg-emerald-950/20",
                  status === "pending" && "border-border opacity-45"
                )}
              >
                <CardContent className="p-0">
                  {/* Progress bar at top */}
                  <div className="h-1 w-full bg-border/30">
                    <div
                      className={cn(
                        "h-1 transition-all",
                        status === "complete"
                          ? "bg-emerald-500 w-full"
                          : "bg-primary"
                      )}
                      style={{
                        width: status === "complete" ? "100%" : `${progress}%`,
                        transition: "width 0.1s linear",
                      }}
                    />
                  </div>

                  <div className="flex items-start gap-4 p-5">
                    {/* Step number / status icon */}
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors",
                        status === "running" && "bg-primary/15",
                        status === "complete" && "bg-emerald-500/15",
                        status === "pending" && "bg-muted"
                      )}
                    >
                      {status === "complete" ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                      ) : status === "running" ? (
                        <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground/40" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <div
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-md",
                            status === "running" && "bg-primary/10",
                            status === "complete" && "bg-emerald-500/10",
                            status === "pending" && "bg-muted"
                          )}
                        >
                          <StepIcon
                            className={cn(
                              "h-4 w-4",
                              status === "running" && "text-primary",
                              status === "complete" && "text-emerald-500",
                              status === "pending" && "text-muted-foreground/40"
                            )}
                          />
                        </div>
                        <p
                          className={cn(
                            "text-sm font-semibold",
                            status === "pending" && "text-muted-foreground"
                          )}
                        >
                          Step {step.id} — {step.name}
                        </p>
                        {status === "complete" && (
                          <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 text-xs px-2 py-0 h-5 font-medium bg-emerald-950/30">
                            Done
                          </Badge>
                        )}
                        {status === "running" && (
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-0 h-5 font-medium animate-pulse">
                            Running
                          </Badge>
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-sm",
                          status === "pending"
                            ? "text-muted-foreground/50"
                            : "text-muted-foreground"
                        )}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Step number pill */}
                    <span
                      className={cn(
                        "text-xs font-bold tabular-nums shrink-0",
                        status === "complete" && "text-emerald-500",
                        status === "running" && "text-primary",
                        status === "pending" && "text-muted-foreground/30"
                      )}
                    >
                      {String(step.id).padStart(2, "0")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Complete button */}
          <div
            className={cn(
              "transition-all duration-700 overflow-hidden",
              allDone ? "max-h-32 opacity-100 mt-6" : "max-h-0 opacity-0"
            )}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-emerald-500/25 bg-emerald-950/25 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-7 w-7 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Complete</p>
                  <p className="text-xs text-muted-foreground">
                    {companyName} · 5 agents
                  </p>
                </div>
              </div>
              <Button
                onClick={onComplete}
                className="gap-2 font-medium px-4 shrink-0 h-9 text-sm"
              >
                Open brief
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar — parallel agents */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1">
            Parallel Agents
          </p>

          {/* Shared State Layer */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                  <Link2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold">Shared State Layer</p>
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Active across all steps
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded font-mono font-semibold tabular-nums",
                          getStepStatus(s, currentStep) === "complete"
                            ? "bg-emerald-500/15 text-emerald-500"
                            : getStepStatus(s, currentStep) === "running"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground/50"
                        )}
                      >
                        S{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fact-Checker Agent */}
          <Card className="border-amber-400/30 bg-amber-50/40">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/15">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold">Fact-Checker Agent</p>
                    {(currentStep === 1 || currentStep === 2 || currentStep === 6) && (
                      <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Running on steps 1, 2 and final
                  </p>
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 5].map((s) => (
                      <span
                        key={s}
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded font-mono font-semibold tabular-nums",
                          getStepStatus(s, currentStep) === "complete"
                            ? "bg-emerald-500/15 text-emerald-500"
                            : getStepStatus(s, currentStep) === "running"
                            ? "bg-amber-400/30 text-amber-700"
                            : "bg-muted text-muted-foreground/50"
                        )}
                      >
                        S{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live stats */}
          <Card className="border-border/40">
            <CardContent className="p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Live Stats
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Steps complete</span>
                  <span className="font-semibold tabular-nums">
                    {Math.min(currentStep === 6 ? 5 : currentStep - 1, 5)}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sources scraped</span>
                  <span className="font-semibold tabular-nums text-primary">
                    {currentStep >= 2 ? "142" : currentStep === 1 ? "…" : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Challenges found</span>
                  <span className="font-semibold tabular-nums text-primary">
                    {currentStep >= 4 ? "9" : currentStep >= 3 ? "…" : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Solutions matched</span>
                  <span className="font-semibold tabular-nums text-primary">
                    {currentStep === 6 ? "6" : currentStep === 5 ? "…" : "—"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
