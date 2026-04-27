"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Presentation, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { briefData } from "@/data/briefData";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type BriefData = (typeof briefData)[keyof typeof briefData];
type Solution = BriefData["solutions"][number];

interface PitchDeckModalProps {
  open: boolean;
  onClose: () => void;
  brief: BriefData;
  selectedSolutions: Solution[];
}

const SLIDE_COUNT = 5;

// ── helpers ───────────────────────────────────────────────────────────────

// Parses "€2.4M" / "€900K" → number of euros. Returns null on unparseable.
function parseEuros(s: string | undefined): number | null {
  if (!s) return null;
  const m = s.match(/€([\d.]+)\s*([MK])/i);
  if (!m) return null;
  const n = parseFloat(m[1]);
  if (isNaN(n)) return null;
  return n * (m[2].toUpperCase() === "M" ? 1_000_000 : 1_000);
}

// Parses "-12,400 tCO2e/year estimated" → -12400. Returns null when no number.
function parseCO2(s: string | undefined): number | null {
  if (!s) return null;
  const m = s.match(/-([\d,]+)\s*tCO2e/i);
  if (!m) return null;
  const n = parseInt(m[1].replace(/,/g, ""), 10);
  return isNaN(n) ? null : -n;
}

function formatEuros(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `€${m.toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (n >= 1_000) return `€${Math.round(n / 1_000)}K`;
  return `€${n}`;
}

function formatCO2(n: number): string {
  return `${n.toLocaleString("en-US")} tCO₂e/yr`;
}

function getTodayFormatted(): string {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── chrome ────────────────────────────────────────────────────────────────

function BrandMark() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary text-[10px] font-bold leading-none text-primary-foreground">
        O
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        Orange Business
      </span>
    </div>
  );
}

function SlideShell({
  children,
  slideNum,
  total,
}: {
  children: React.ReactNode;
  slideNum: number;
  total: number;
}) {
  return (
    <div className="relative h-full w-full bg-[#fafafa]">
      <div className="absolute left-10 top-8 z-10">
        <BrandMark />
      </div>
      <div className="absolute bottom-6 right-10 z-10 text-[11px] font-medium tabular-nums text-muted-foreground/60">
        {slideNum} / {total}
      </div>
      <div className="h-full w-full px-16 pb-16 pt-20">{children}</div>
    </div>
  );
}

// ── slides ────────────────────────────────────────────────────────────────

function SlideTitle({ brief }: { brief: BriefData }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
        Sustainability Partnership Proposal
      </p>
      <h1 className="text-balance text-[5rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-foreground">
        {brief.name}
      </h1>
      <p className="mt-6 text-lg font-normal text-muted-foreground">
        Prepared for the {brief.sector} sector
      </p>
      <p className="mt-12 text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground/70">
        {getTodayFormatted()}
      </p>
    </div>
  );
}

function SlideChallenge({ brief }: { brief: BriefData }) {
  const challenges = brief.challenges.slice(0, 3);
  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-10 text-[2rem] font-bold tracking-tight text-foreground">
        The Challenge
      </h2>
      <div className="flex-1 space-y-6">
        {challenges.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.id}
              className="flex items-start gap-5 border-l-2 border-primary/30 pl-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-balance text-lg font-semibold leading-tight text-foreground">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SlideSolutions({ solutions }: { solutions: Solution[] }) {
  if (solutions.length === 1) {
    const s = solutions[0];
    const Icon = s.icon;
    return (
      <div className="flex h-full flex-col">
        <h2 className="mb-10 text-[2rem] font-bold tracking-tight text-foreground">
          Our Recommended Approach
        </h2>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/[0.1]">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground">
            {s.product}
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            {s.detail}
          </p>
          <div className="mt-8 flex items-center gap-3 rounded-full bg-primary/[0.08] px-5 py-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              Impact score
            </span>
            <span className="text-2xl font-bold tabular-nums text-primary">
              {s.impactScore}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const cols = solutions.length === 2 ? "grid-cols-2" : "grid-cols-3";
  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-8 text-[2rem] font-bold tracking-tight text-foreground">
        Our Recommended Approach
      </h2>
      <div className={cn("grid flex-1 gap-4", cols)}>
        {solutions.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.product}
              className="flex flex-col rounded-xl border border-black/[0.08] bg-white p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.1]">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                    Score
                  </p>
                  <p className="text-xl font-bold leading-none tabular-nums text-primary">
                    {s.impactScore}
                  </p>
                </div>
              </div>
              <h3
                className={cn(
                  "text-balance font-semibold leading-tight text-foreground",
                  solutions.length === 2 ? "text-xl" : "text-base",
                )}
              >
                {s.product}
              </h3>
              <p
                className={cn(
                  "mt-2 leading-relaxed text-muted-foreground",
                  solutions.length === 2 ? "text-sm" : "text-[12px]",
                )}
              >
                {s.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SlideFinancial({
  brief,
  solutions,
}: {
  brief: BriefData;
  solutions: Solution[];
}) {
  const contractValues = solutions
    .map((s) => parseEuros(s.details?.financialCase?.contractValue))
    .filter((v): v is number => v !== null);
  const totalContract =
    contractValues.length > 0
      ? contractValues.reduce((a, b) => a + b, 0)
      : null;

  const co2Values = solutions
    .map((s) => parseCO2(s.metrics?.co2Impact))
    .filter((v): v is number => v !== null);
  const totalCO2 =
    co2Values.length > 0 ? co2Values.reduce((a, b) => a + b, 0) : null;

  const revenueModel = solutions[0]?.details?.financialCase?.revenueType ?? null;

  const stats: { label: string; value: string }[] = [];
  if (totalContract !== null) {
    stats.push({
      label: "Estimated contract value",
      value: formatEuros(totalContract),
    });
  }
  if (totalCO2 !== null) {
    stats.push({
      label: "Annual CO₂ reduction",
      value: formatCO2(totalCO2),
    });
  }
  if (revenueModel) {
    stats.push({ label: "Revenue model", value: revenueModel });
  }

  const benchmark = brief.benchmarks[0];

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-12 text-[2rem] font-bold tracking-tight text-foreground">
        The Business Case
      </h2>
      <div className="flex flex-1 flex-col justify-center">
        {stats.length > 0 ? (
          <div
            className={cn(
              "grid gap-8",
              stats.length === 1
                ? "grid-cols-1 max-w-md"
                : stats.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3",
            )}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70">
                  {stat.label}
                </p>
                <p
                  className={cn(
                    "mt-3 text-balance font-extrabold leading-[1.05] tracking-[-0.02em] text-primary",
                    stats.length === 3 ? "text-[2.25rem]" : "text-5xl",
                  )}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base text-muted-foreground">
            Financial details available on request.
          </p>
        )}
        {benchmark && (
          <div className="mt-12 border-t border-black/[0.06] pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {benchmark.metric}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                {benchmark.value}
              </span>{" "}
              · {benchmark.context}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SlideContacts({ brief }: { brief: BriefData }) {
  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-3 text-[2rem] font-bold tracking-tight text-foreground">
        Let&apos;s Talk
      </h2>
      <p className="mb-10 text-base text-muted-foreground">
        Key stakeholders we&apos;d like to engage
      </p>
      <div className="flex-1 space-y-3">
        {brief.contacts.map((c) => {
          const Icon = c.icon;
          const primaryLine = c.name ?? c.role;
          const showSecondLine = Boolean(c.name || c.email);
          return (
            <div
              key={c.role}
              className="flex items-center gap-4 rounded-lg border border-black/[0.06] bg-white px-5 py-3.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold leading-tight text-foreground">
                  {primaryLine}
                </p>
                {showSecondLine && (
                  <p className="mt-0.5 text-[12px] text-muted-foreground">
                    {c.name && c.role}
                    {c.name && c.email && " · "}
                    {c.email && (
                      <span className="text-primary">{c.email}</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-center gap-2.5 border-t border-black/[0.06] pt-6">
        <span className="text-base font-semibold text-foreground">
          Schedule a follow-up call
        </span>
        <ArrowRight className="h-4 w-4 text-primary" />
      </div>
    </div>
  );
}

// ── modal ─────────────────────────────────────────────────────────────────

export function PitchDeckModal({
  open,
  onClose,
  brief,
  selectedSolutions,
}: PitchDeckModalProps) {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset to first slide every time the modal opens.
  useEffect(() => {
    if (open) setCurrentSlide(0);
  }, [open]);

  // Arrow-key navigation (only while open).
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlide((s) => Math.max(0, s - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((s) => Math.min(SLIDE_COUNT - 1, s + 1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const renderSlide = (idx: number) => {
    switch (idx) {
      case 0:
        return <SlideTitle brief={brief} />;
      case 1:
        return <SlideChallenge brief={brief} />;
      case 2:
        return <SlideSolutions solutions={selectedSolutions} />;
      case 3:
        return <SlideFinancial brief={brief} solutions={selectedSolutions} />;
      case 4:
        return <SlideContacts brief={brief} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-5xl gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">
          Pitch deck preview — {brief.name}
        </DialogTitle>

        {/* Slide content area, 16:9 */}
        <div className="relative aspect-video w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <SlideShell slideNum={currentSlide + 1} total={SLIDE_COUNT}>
                {renderSlide(currentSlide)}
              </SlideShell>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav controls */}
        <div className="flex items-center justify-between border-t border-black/[0.08] bg-white px-6 py-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="mr-1 h-3.5 w-3.5" />
            Previous
          </Button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentSlide(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  i === currentSlide
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-black/20 hover:bg-black/40",
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentSlide < SLIDE_COUNT - 1 ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentSlide((s) => Math.min(SLIDE_COUNT - 1, s + 1))
                }
              >
                Next
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled
                className="opacity-40"
              >
                Next
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              onClick={() => toast({ title: "Coming soon" })}
            >
              <Presentation className="mr-1.5 h-3.5 w-3.5" />
              Send to PowerPoint
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
