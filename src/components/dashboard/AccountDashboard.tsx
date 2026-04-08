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
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const CHART_COLORS = ["hsl(24 100% 50%)", "hsl(215 14% 34%)", "hsl(215 14% 26%)"];

interface AccountDashboardProps {
  onNewProfile: () => void;
  onViewBrief: (companyName: string) => void;
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-muted/15 px-3 py-2.5">
      <p className="type-eyebrow">{label}</p>
      <p
        className={cn(
          "mt-1.5 font-semibold text-foreground leading-snug tabular-nums tracking-tight",
          small ? "text-xs line-clamp-2" : "text-sm"
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
    <div className="flex h-[calc(100dvh-5.5rem)] min-h-[420px] max-h-[900px] -mx-4 lg:-mx-6 rounded-lg border border-border overflow-hidden bg-card">
      <aside className="flex w-[min(100%,280px)] shrink-0 flex-col border-r border-border bg-zinc-950/40 min-h-0">
        <div className="p-3 border-b border-border shrink-0">
          <Button type="button" className="w-full h-9 text-sm font-medium" onClick={onNewProfile}>
            <Plus className="h-4 w-4 mr-2" />
            New profile
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto min-h-0 p-2 space-y-1">
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
                    "w-full text-left rounded-md px-3 py-2.5 transition-colors border-l-2",
                    active
                      ? "border-primary bg-zinc-800/60"
                      : "border-transparent hover:bg-muted/40"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold truncate tracking-tight">{c.name}</span>
                    {risk ? (
                      <Badge variant="outline" className={cn("type-eyebrow shrink-0 h-5 px-1.5 py-0 font-medium normal-case tracking-normal border", risk.urgencyColor)}>
                        {topRisk}
                      </Badge>
                    ) : (
                      <span className="type-eyebrow normal-case">—</span>
                    )}
                  </div>
                  <p className="text-xs text-primary mt-1 truncate font-medium leading-snug">{topPlay}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={c.score} className="h-1 flex-1 bg-muted" />
                    <span className="type-eyebrow tabular-nums normal-case w-7 text-right">{c.score}</span>
                  </div>
                </button>
              );
            })}
        </div>
      </aside>

      <section className="flex-1 min-w-0 min-h-0 overflow-y-auto p-5 lg:p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">{data.name}</h2>
          <p className="text-xs font-medium text-muted-foreground mt-1 leading-snug">Live summary</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label="Contract value (est.)" value={sumContractValueLabel(data)} />
          <Stat label="Confidence" value={`${data.score}%`} />
          <Stat label="CO₂ impact (est.)" value={aggregateCo2Label(data)} />
          <Stat label="Top challenge" value={data.challenges[0]?.title ?? "—"} small />
        </div>

        <div className="flex-1 min-h-[220px] grid lg:grid-cols-2 gap-6 items-center">
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
                      <div className="rounded-md border border-border bg-popover px-2 py-1.5 text-xs shadow-md">
                        <p className="font-medium text-popover-foreground">{p.label}</p>
                        <p className="text-muted-foreground">{p.urgency}</p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 text-xs min-w-0">
            <p className="type-section-label">Challenge breakdown</p>
            <ul className="space-y-2">
              {pieRows.map((row, i) => (
                <li key={row.id} className="flex items-center gap-2 min-w-0 text-sm leading-snug">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                  />
                  <span className="text-muted-foreground tabular-nums shrink-0 font-medium">{row.id}.</span>
                  <span className="truncate text-foreground">{row.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-auto pt-2 border-t border-border">
          <Button
            type="button"
            size="lg"
            className="w-full sm:w-auto min-w-[220px] h-11 text-sm font-semibold"
            onClick={() => onViewBrief(data.name)}
          >
            Open full brief
          </Button>
        </div>
      </section>
    </div>
  );
};
