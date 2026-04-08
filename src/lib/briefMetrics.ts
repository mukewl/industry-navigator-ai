import { briefData } from "@/data/briefData";

export type BriefCompanyKey = keyof typeof briefData;

export const BRIEF_COMPANY_KEYS: BriefCompanyKey[] = ["renault", "carrefour"];

export function sumContractValueLabel(company: (typeof briefData)[BriefCompanyKey]): string {
  let sumM = 0;
  for (const s of company.solutions) {
    const cv = s.details?.financialCase.contractValue ?? "";
    const mM = cv.match(/€([\d.]+)M/i);
    const mK = cv.match(/€([\d.]+)K/i);
    if (mM) sumM += parseFloat(mM[1]);
    else if (mK) sumM += parseFloat(mK[1]) / 1000;
  }
  if (sumM >= 1) {
    const rounded = Math.abs(sumM % 1) < 0.05 ? sumM.toFixed(0) : sumM.toFixed(1);
    return `€${rounded}M`;
  }
  return `€${Math.round(sumM * 1000)}K`;
}

export function aggregateCo2Label(company: (typeof briefData)[BriefCompanyKey]): string {
  let t = 0;
  for (const s of company.solutions) {
    const raw = s.metrics?.co2Impact ?? "";
    const m = raw.match(/([\d,]+)\s*tCO/i);
    if (m) t += parseInt(m[1].replace(/,/g, ""), 10);
  }
  if (t >= 1000) return `~${(t / 1000).toFixed(1)}k tCO₂e/yr`;
  if (t > 0) return `~${t.toLocaleString()} tCO₂e/yr`;
  return "—";
}

export function urgencyWeight(urgency: string): number {
  if (urgency === "Critical") return 3;
  if (urgency === "High") return 2;
  return 1;
}

export function challengeBreakdownChart(company: (typeof briefData)[BriefCompanyKey]) {
  return company.challenges.map((c) => ({
    id: String(c.id),
    label: c.title.length > 28 ? `${c.title.slice(0, 28)}…` : c.title,
    value: urgencyWeight(c.urgency),
    urgency: c.urgency,
  }));
}
