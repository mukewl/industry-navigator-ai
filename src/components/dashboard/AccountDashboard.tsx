import { useState } from "react";
import { Plus } from "lucide-react";
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

interface AccountDashboardProps {
  onNewProfile: () => void;
  onViewBrief: (companyName: string) => void;
}

function Stat({ label, value, small, valueClassName }: { label: string; value: string; small?: boolean; valueClassName?: string }) {
  return (
    <div className="glass-stat">
      <p className="type-eyebrow">{label}</p>
      <p
        className={cn(
          "mt-2.5 font-semibold leading-snug tabular-nums tracking-tight text-foreground",
          small ? "line-clamp-2 text-[0.8125rem]" : "text-[0.9375rem]",
          valueClassName
        )}
      >
        {value}
      </p>
    </div>
  );
}

export const AccountDashboard = ({ onNewProfile, onViewBrief }: AccountDashboardProps) => {
  const [selected, setSelected] = useState<BriefCompanyKey>("renault");
  const data = briefData[selected];
  const barRows = revenueProjection(data);
  const topUrgency = data.challenges[0]?.urgency ?? "—";
  const urgencyValueClass =
    topUrgency === "Critical" ? "text-red-500" : topUrgency === "High" ? "text-amber-500" : "";

  return (
    <div className="glass-panel-strong -mx-5 flex h-[calc(100dvh-7.5rem)] min-h-[420px] max-h-[920px] overflow-hidden sm:-mx-8 lg:-mx-10">
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

      <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-10 overflow-y-auto p-6 sm:p-8 lg:p-10">
        <div className="space-y-2">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{data.name}</h2>
          <p className="text-[0.8125rem] font-normal leading-normal text-muted-foreground">Live summary</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <Stat label="Contract value (est.)" value={sumContractValueLabel(data)} />
          <Stat label="Confidence" value={`${data.score}%`} />
          <Stat label="CO₂ impact (est.)" value={aggregateCo2Label(data)} />
          <Stat label="Top challenge" value={data.challenges[0]?.title ?? "—"} small />
          <Stat label="Point of contact" value={data.contacts[0]?.role ?? "—"} small />
          <Stat label="ESG risk level" value={topUrgency} valueClassName={urgencyValueClass} />
        </div>

        <div className="flex-1 min-h-[180px]">
          <p className="type-section-label mb-4">Revenue projection (est.)</p>
          <div className="h-[180px] w-full min-w-0">
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

        <div className="mt-auto border-t border-black/[0.06] pt-8">
          <Button type="button" size="lg" className="w-full min-w-[220px] sm:w-auto" onClick={() => onViewBrief(data.name)}>
            Open full brief
          </Button>
        </div>
      </section>
    </div>
  );
};
