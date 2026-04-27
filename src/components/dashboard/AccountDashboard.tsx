import { useState } from "react";
import { Plus, TrendingUp, Leaf, ShieldAlert, Target, Mail, ArrowRight, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { briefData, type Contact } from "@/data/briefData";
import {
  BRIEF_COMPANY_KEYS,
  sumContractValueLabel,
  aggregateCo2Label,
  type BriefCompanyKey,
} from "@/lib/briefMetrics";
import { CompanyLogo, COMPANY_DOMAINS } from "@/lib/companyLogos";

const SECTOR_OPTIONS = [
  { label: "All sectors",    value: "__all__" },
  { label: "Automotive",     value: "Automotive" },
  { label: "Retail",         value: "Retail & Consumer" },
  { label: "Energy",         value: "Energy & Resources" },
  { label: "Industrial",     value: "Industry & Technology" },
  { label: "Travel",         value: "Aviation" },
  { label: "Food & Beverage",value: "Food & Beverage" },
] as const;
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
  const [filterSector,     setFilterSector]     = useState("__all__");
  const [filterClient,     setFilterClient]     = useState("");
  const [filterConfidence, setFilterConfidence] = useState("");
  const [filterEsg,        setFilterEsg]        = useState("");

  const filteredKeys = BRIEF_COMPANY_KEYS.filter((key) => {
    const c = briefData[key];
    if (filterSector !== "__all__" && c.sector !== filterSector) return false;
    if (filterClient && (c as any).clientStatus !== filterClient) return false;
    if (filterConfidence === "high"   && c.score < 80) return false;
    if (filterConfidence === "medium" && (c.score < 60 || c.score >= 80)) return false;
    if (filterConfidence === "low"    && c.score >= 60) return false;
    if (filterEsg && c.esgRiskLevel !== filterEsg) return false;
    return true;
  });

  const data = briefData[selected];
  const barRows = revenueProjection(data);
  const topUrgency = data.challenges[0]?.urgency ?? "—";
  const urgencyValueClass =
    topUrgency === "Critical" ? "text-red-500" : topUrgency === "High" ? "text-amber-500" : "";

  const primaryContact: Contact | undefined = data.contacts[0];

  const topPlay = [...data.solutions].sort((a, b) => b.impactScore - a.impactScore)[0];

  return (
    <div className="-mx-5 flex h-[calc(100dvh-7.5rem)] min-h-[420px] max-h-[920px] overflow-hidden rounded-2xl border border-black/[0.07] bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl sm:-mx-8 lg:-mx-10">
      {/* Left — client list */}
      <aside className="flex w-[min(100%,280px)] shrink-0 flex-col border-r border-black/[0.07] bg-black/[0.02] min-h-0">
        <div className="shrink-0 border-b border-black/[0.06] px-4 py-4">
          <Button type="button" className="w-full" onClick={onNewProfile}>
            <Plus className="mr-2 h-4 w-4" />
            New profile
          </Button>
        </div>

        {/* Filter bar */}
        <div className="shrink-0 space-y-3 border-b border-black/[0.07] px-3 py-3.5">
          <Select value={filterSector} onValueChange={setFilterSector}>
            <SelectTrigger className="h-8 w-full border-black/[0.08] bg-white text-[0.6875rem] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SECTOR_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-[0.6875rem]">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Client type */}
          <div>
            <p className="mb-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60">Client type</p>
            <div className="flex flex-wrap gap-1">
              {([["All", ""], ["Existing", "existing"], ["Prospect", "prospect"]] as const).map(([label, val]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setFilterClient(val)}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-[0.625rem] font-semibold transition-all duration-150",
                    filterClient === val
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:border-black/[0.08] hover:bg-white hover:text-foreground"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Confidence */}
          <div>
            <p className="mb-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60">Confidence</p>
            <div className="flex flex-wrap gap-1">
              {([["All", ""], ["High", "high"], ["Med", "medium"], ["Low", "low"]] as const).map(([label, val]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setFilterConfidence(val)}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-[0.625rem] font-semibold transition-all duration-150",
                    filterConfidence === val
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:border-black/[0.08] hover:bg-white hover:text-foreground"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ESG risk */}
          <div>
            <p className="mb-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60">ESG risk</p>
            <div className="flex flex-wrap gap-1">
              {([["All", ""], ["Critical", "Critical"], ["High", "High"], ["Med", "Medium"]] as const).map(([label, val]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setFilterEsg(val)}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-[0.625rem] font-semibold transition-all duration-150",
                    filterEsg === val
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:border-black/[0.08] hover:bg-white hover:text-foreground"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-1 overflow-y-auto p-3">
          {filteredKeys.length === 0 ? (
            <p className="px-2 py-6 text-center text-[0.75rem] italic text-muted-foreground/60">
              No companies match filters
            </p>
          ) : filteredKeys.map((key) => {
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
                  "w-full rounded-xl px-3 py-3 text-left transition-all duration-150",
                  active
                    ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_2px_0_0_0_hsl(24_100%_50%)] ring-1 ring-black/[0.06]"
                    : "hover:bg-white/60"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <CompanyLogo domain={COMPANY_DOMAINS[key]} name={c.name} className="h-6 w-6 shrink-0" />
                    <span className={cn("truncate text-[0.875rem] font-semibold tracking-tight", active ? "text-foreground" : "text-foreground/80")}>
                      {c.name}
                    </span>
                  </div>
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
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <h2 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{data.name}</h2>
            <p className="text-[0.8125rem] font-normal leading-normal text-muted-foreground">Live summary</p>
          </div>
          <Button
            type="button"
            size="sm"
            className="shrink-0 gap-1.5"
            onClick={() => onViewBrief(data.name)}
          >
            Open full brief
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Button>
        </div>

        {/* Stat grid — 4 data cards in 2×2 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Contract value */}
          <div className="flex flex-col gap-3 rounded-xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60">Contract value</p>
              <TrendingUp className="h-3.5 w-3.5 text-primary/50" aria-hidden />
            </div>
            <p className="text-[1.5rem] font-bold tabular-nums tracking-tight text-foreground leading-none">
              {sumContractValueLabel(data)}
            </p>
            <p className="text-[0.6875rem] leading-none text-muted-foreground">All solutions combined</p>
          </div>

          {/* Confidence score */}
          <div className="flex flex-col gap-3 rounded-xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60">Confidence</p>
              <Target className="h-3.5 w-3.5 text-primary/50" aria-hidden />
            </div>
            <p className="text-[1.5rem] font-bold tabular-nums tracking-tight text-foreground leading-none">
              {data.score}%
            </p>
            <Progress value={data.score} className="h-1.5 bg-black/[0.06]" />
          </div>

          {/* CO₂ impact */}
          <div className="flex flex-col gap-3 rounded-xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60">CO₂ impact (est.)</p>
              <Leaf className="h-3.5 w-3.5 text-emerald-500/60" aria-hidden />
            </div>
            <p className="text-[1.5rem] font-bold tabular-nums tracking-tight text-foreground leading-none">
              {aggregateCo2Label(data)}
            </p>
            <p className="text-[0.6875rem] leading-none text-muted-foreground">Annual reduction</p>
          </div>

          {/* ESG risk */}
          <div className="flex flex-col gap-3 rounded-xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60">ESG risk level</p>
              <ShieldAlert className="h-3.5 w-3.5 text-muted-foreground/40" aria-hidden />
            </div>
            <p className={cn("text-[1.5rem] font-bold tracking-tight leading-none", urgencyValueClass)}>
              {topUrgency}
            </p>
            <p className="text-[0.6875rem] leading-none text-muted-foreground">Top challenge priority</p>
          </div>
        </div>

        {/* Point of contact + Top play */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* POC card */}
          <div className="flex flex-col gap-3 rounded-xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60">Point of contact</p>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-[0.6875rem] font-bold text-primary">
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
            <div className="flex flex-col gap-3 rounded-xl border border-primary/25 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] p-4 shadow-[0_2px_8px_rgba(255,105,0,0.08)]">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-primary/60">Top recommended play</p>
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
                  <span className="text-[0.6875rem] font-bold tabular-nums text-primary">
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
        <div className="min-h-[160px]">
          <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60">Revenue projection (est.)</p>
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

        {/* Presentation Details */}
        {(() => {
          const pres = (data as any).presentation as { status: "Presented" | "Scheduled" | "Not Started"; date: string; solution: string } | undefined;
          if (!pres) return null;
          const badgeClass =
            pres.status === "Presented"
              ? "text-emerald-700 bg-emerald-50 border border-emerald-200/80"
              : pres.status === "Scheduled"
              ? "text-amber-600 bg-amber-50 border border-amber-200/80"
              : "text-muted-foreground bg-black/[0.04] border border-black/[0.06]";
          return (
            <div className="rounded-xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <div className="mb-3 flex items-center gap-2">
                <Presentation className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground/60">Presentation Details</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[0.75rem] text-muted-foreground">Status</p>
                  <span className={`rounded-md px-2 py-0.5 text-[0.6875rem] font-medium ${badgeClass}`}>
                    {pres.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[0.75rem] text-muted-foreground">Date</p>
                  <p className="text-[0.75rem] font-medium text-foreground">{pres.date}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[0.75rem] text-muted-foreground">Solution</p>
                  <p className="text-[0.75rem] font-medium text-foreground">{pres.solution}</p>
                </div>
              </div>
            </div>
          );
        })()}

      </section>
    </div>
  );
};
