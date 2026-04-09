import { useState } from "react";
import { Plus, TrendingUp, Leaf, ShieldAlert, Target, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { briefData } from "@/data/briefData";
import {
  BRIEF_COMPANY_KEYS,
  sumContractValueLabel,
  aggregateCo2Label,
  type BriefCompanyKey,
} from "@/lib/briefMetrics";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function parseRevenueK(s: string): number {
  const mM = s.match(/€([\d.]+)M/i);
  const mK = s.match(/€([\d.]+)K/i);
  if (mM) return parseFloat(mM[1]) * 1000;
  if (mK) return parseFloat(mK[1]);
  return 0;
}

function revenueProjection(company: (typeof briefData)[BriefCompanyKey]) {
  return ["Year 1", "Year 2", "Year 3"].map((yr) => {
    let total = 0;
    for (const s of company.solutions) {
      const row = s.details?.financialCase.years.find((y) => y.year === yr);
      if (row) total += parseRevenueK(row.revenue);
    }
    return { year: yr, value: total };
  });
}

function formatK(k: number): string {
  if (k >= 1000) return `€${(k / 1000).toFixed(1).replace(/\.0$/, "")}M`;
  return `€${Math.round(k)}K`;
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

interface AccountDashboardProps {
  onNewProfile: () => void;
  onViewBrief: (companyName: string) => void;
}

export const AccountDashboard = ({ onNewProfile, onViewBrief }: AccountDashboardProps) => {
  const [selected, setSelected] = useState<BriefCompanyKey>("renault");
  const data = briefData[selected];
  const barRows = revenueProjection(data);
  const topUrgency = data.challenges[0]?.urgency ?? "—";
  const urgencyValueClass =
    topUrgency === "Critical" ? "text-red-500" : topUrgency === "High" ? "text-amber-500" : "";

  const primaryContact = data.contacts[0] as (typeof data.contacts)[0] & {
    name?: string;
    email?: string;
  };

  const topPlay = [...data.solutions].sort((a, b) => b.impactScore - a.impactScore)[0];

  return (
    <div className="glass-panel-strong -mx-5 flex h-[calc(100dvh-7.5rem)] min-h-[420px] max-h-[920px] overflow-hidden sm:-mx-8 lg:-mx-10">
      {/* Left — client list */}
      <aside className="glass-inset flex w-[min(100%,280px)] shrink-0 flex-col border-r border-black/[0.06] min-h-0">
        <div className="shrink-0 border-b border-black/[0.06] px-4 py-4">
          <Button type="button" className="w-full" onClick={onNewProfile}>
            <Plus className="mr-2 h-4 w-4" />
            New profile
          </Button>
        </div>
        <div className="min-h-0 flex-1 space-y-1 overflow-y-auto p-3">
          {BRIEF_COMPANY_KEYS.map((key) => {
            const c = briefData[key];
            const topRisk = c.challenges[0]?.urgency ?? "—";
            const topPlay = c.solutions[0]?.product ?? "—";
            const active = selected === key;
            const risk = c.challenges[0];
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className={cn(
                  "w-full rounded-lg px-3 py-3 text-left transition-[background,box-shadow] duration-200",
                  active ? "bg-primary/10 shadow-apple-sm ring-1 ring-primary/20" : "hover:bg-black/[0.04]"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-display text-[0.9375rem] font-semibold tracking-tight text-foreground">
                    {c.name}
                  </span>
                  {risk ? (
                    <Badge
                      variant="outline"
                      className={cn(
                        "h-5 shrink-0 border-black/[0.08] bg-white/80 px-1.5 py-0 text-[0.625rem] font-semibold normal-case tracking-normal",
                        risk.urgencyColor
                      )}
                    >
                      {topRisk}
                    </Badge>
                  ) : (
                    <span className="type-eyebrow normal-case">—</span>
                  )}
                </div>
                <p className="mt-1 truncate text-[0.8125rem] font-normal leading-snug text-primary">{topPlay}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Progress value={c.score} className="h-1 flex-1 bg-black/[0.06]" />
                  <span className="type-eyebrow w-7 text-right tabular-nums normal-case">{c.score}</span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right — detail panel */}
      <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-7 overflow-y-auto p-6 sm:p-8">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{data.name}</h2>
          <p className="text-[0.8125rem] font-normal leading-normal text-muted-foreground">Live summary</p>
        </div>

        {/* Stat grid — 4 data cards in 2×2 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Contract value */}
          <div className="flex flex-col gap-2.5 rounded-xl border border-black/[0.06] bg-white/70 p-4">
            <div className="flex items-center justify-between">
              <p className="type-eyebrow text-muted-foreground">Contract value (est.)</p>
              <TrendingUp className="h-3.5 w-3.5 text-primary/50" aria-hidden />
            </div>
            <p className="text-[1.375rem] font-semibold tabular-nums tracking-tight text-foreground leading-none">
              {sumContractValueLabel(data)}
            </p>
            <p className="text-[0.6875rem] leading-none text-muted-foreground">All solutions combined</p>
          </div>

          {/* Confidence score */}
          <div className="flex flex-col gap-2.5 rounded-xl border border-black/[0.06] bg-white/70 p-4">
            <div className="flex items-center justify-between">
              <p className="type-eyebrow text-muted-foreground">Confidence</p>
              <Target className="h-3.5 w-3.5 text-primary/50" aria-hidden />
            </div>
            <p className="text-[1.375rem] font-semibold tabular-nums tracking-tight text-foreground leading-none">
              {data.score}%
            </p>
            <Progress value={data.score} className="h-1 bg-black/[0.06]" />
          </div>

          {/* CO₂ impact */}
          <div className="flex flex-col gap-2.5 rounded-xl border border-black/[0.06] bg-white/70 p-4">
            <div className="flex items-center justify-between">
              <p className="type-eyebrow text-muted-foreground">CO₂ impact (est.)</p>
              <Leaf className="h-3.5 w-3.5 text-emerald-500/60" aria-hidden />
            </div>
            <p className="text-[1.375rem] font-semibold tabular-nums tracking-tight text-foreground leading-none">
              {aggregateCo2Label(data)}
            </p>
            <p className="text-[0.6875rem] leading-none text-muted-foreground">Annual reduction</p>
          </div>

          {/* ESG risk */}
          <div className="flex flex-col gap-2.5 rounded-xl border border-black/[0.06] bg-white/70 p-4">
            <div className="flex items-center justify-between">
              <p className="type-eyebrow text-muted-foreground">ESG risk level</p>
              <ShieldAlert className="h-3.5 w-3.5 text-muted-foreground/40" aria-hidden />
            </div>
            <p className={cn("text-[1.375rem] font-semibold tracking-tight leading-none", urgencyValueClass)}>
              {topUrgency}
            </p>
            <p className="text-[0.6875rem] leading-none text-muted-foreground">Top challenge priority</p>
          </div>
        </div>

        {/* Point of contact + Top play */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* POC card */}
          <div className="flex flex-col gap-3 rounded-xl border border-black/[0.06] bg-white/70 p-4">
            <p className="type-section-label">Point of contact</p>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[0.6875rem] font-semibold text-primary">
                {primaryContact?.name ? initials(primaryContact.name) : "—"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[0.875rem] font-semibold leading-tight text-foreground">
                  {primaryContact?.name ?? "—"}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[0.75rem] leading-snug text-muted-foreground">
                  {primaryContact?.role ?? "—"}
                </p>
              </div>
            </div>
            {primaryContact?.email && (
              <div className="flex items-center gap-1.5 border-t border-black/[0.05] pt-2.5">
                <Mail className="h-3 w-3 shrink-0 text-muted-foreground/60" aria-hidden />
                <span className="truncate text-[0.6875rem] text-muted-foreground">
                  {primaryContact.email}
                </span>
              </div>
            )}
          </div>

          {/* Top recommended play */}
          {topPlay && (
            <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/[0.04] p-4">
              <p className="type-section-label text-primary/70">Top recommended play</p>
              <div className="min-w-0">
                <p className="line-clamp-2 text-[0.875rem] font-semibold leading-tight text-foreground">
                  {topPlay.product}
                </p>
                <p className="mt-0.5 truncate text-[0.75rem] text-muted-foreground">
                  {(topPlay as any).details?.financialCase?.contractValue ?? "—"} contract value
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[0.6875rem] text-muted-foreground">Impact score</span>
                  <span className="text-[0.6875rem] font-semibold tabular-nums text-primary">
                    {topPlay.impactScore}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${topPlay.impactScore}%` }}
                  />
                </div>
              </div>
              <p className="text-[0.6875rem] leading-snug text-muted-foreground">
                {topPlay.metrics?.co2Impact ?? "—"}
              </p>
            </div>
          )}
        </div>

        {/* Revenue projection chart */}
        <div className="flex-1 min-h-[160px]">
          <p className="type-section-label mb-4">Revenue projection (est.)</p>
          <div className="h-[160px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barRows} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barCategoryGap="32%">
                <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.06)" strokeDasharray="0" />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(240 3.8% 46.1%)", fontWeight: 500 }}
                />
                <YAxis
                  tickFormatter={(v) => formatK(v as number)}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(240 3.8% 46.1%)" }}
                  width={52}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="rounded-lg border border-black/[0.06] bg-white/95 px-3 py-2 text-[0.8125rem] shadow-apple-sm backdrop-blur-xl">
                        <p className="font-semibold text-foreground">{label}</p>
                        <p className="text-muted-foreground">{formatK(payload[0].value as number)}</p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="value" fill="hsl(24 100% 50%)" radius={[4, 4, 0, 0]} maxBarSize={56} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto border-t border-black/[0.06] pt-6">
          <Button
            type="button"
            size="lg"
            className="w-full gap-2 sm:w-auto"
            onClick={() => onViewBrief(data.name)}
          >
            Open full brief
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </section>
    </div>
  );
};
