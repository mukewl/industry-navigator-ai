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
  challengeBreakdownChart,
  type BriefCompanyKey,
} from "@/lib/briefMetrics";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const CHART_COLORS = ["hsl(24 100% 50%)", "hsl(240 3% 38%)", "hsl(240 3% 62%)"];

interface AccountDashboardProps {
  onNewProfile: () => void;
  onViewBrief: (companyName: string) => void;
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="glass-stat">
      <p className="type-eyebrow">{label}</p>
      <p
        className={cn(
          "mt-2.5 font-semibold leading-snug tabular-nums tracking-tight text-foreground",
          small ? "line-clamp-2 text-[0.8125rem]" : "text-[0.9375rem]"
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
  const pieRows = challengeBreakdownChart(data);

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
        </div>

        <div className="grid min-h-[220px] flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="h-[220px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieRows}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={52}
                  outerRadius={78}
                  strokeWidth={0}
                  paddingAngle={2}
                >
                  {pieRows.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const p = payload[0].payload as (typeof pieRows)[0];
                    return (
                      <div className="rounded-lg border border-black/[0.06] bg-white/95 px-3 py-2 text-[0.8125rem] shadow-apple-sm backdrop-blur-xl">
                        <p className="font-semibold text-foreground">{p.label}</p>
                        <p className="text-muted-foreground">{p.urgency}</p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="min-w-0 space-y-4">
            <p className="type-section-label">Challenge breakdown</p>
            <ul className="space-y-3">
              {pieRows.map((row, i) => (
                <li key={row.id} className="flex min-w-0 items-center gap-2.5 text-[0.9375rem] leading-snug">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                  />
                  <span className="shrink-0 font-medium tabular-nums text-muted-foreground">{row.id}.</span>
                  <span className="truncate text-foreground">{row.label}</span>
                </li>
              ))}
            </ul>
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
