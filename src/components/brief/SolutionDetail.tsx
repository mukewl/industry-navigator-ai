import { ArrowLeft, CheckCircle2, Leaf, TrendingUp, ShieldCheck, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface SolutionData {
  challengeId: number;
  challengeLabel: string;
  product: string;
  detail: string;
  icon: LucideIcon;
  impactScore: number;
  metrics?: {
    profitability: string;
    clientBenefit: string;
    co2Impact: string;
  };
  details?: {
    overview: string[];
    financialCase: {
      contractValue: string;
      revenueType: string;
      upsellPotential: string;
      years: { year: string; revenue: string }[];
    };
    esgCase: string[];
    keySellingPoints: string[];
    nextSteps: string[];
  };
}

interface SolutionDetailProps {
  companyName: string;
  solution: SolutionData;
  onBack: () => void;
}

export const SolutionDetail = ({ companyName, solution, onBack }: SolutionDetailProps) => {
  if (!solution.details) return null;

  return (
    <div className="mx-auto max-w-5xl animate-fade-in space-y-6 pb-10 text-base">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-[#fafafc] shadow-apple-sm">
              <solution.icon className="h-4 w-4 text-primary" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground">
                {solution.product}
              </h1>
              <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                {companyName} · <span className="font-medium text-foreground">{solution.challengeLabel}</span>
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="type-eyebrow mt-2 h-6 border-black/[0.08] bg-white px-2 py-0.5 normal-case tracking-normal shadow-apple-sm"
          >
            Impact {solution.impactScore}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="h-9 shrink-0 gap-2 rounded-lg border-black/[0.08] bg-white text-xs shadow-apple-sm hover:bg-[#fafafc]"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Brief
        </Button>
      </div>

      <Separator className="bg-black/[0.06]" />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <section>
            <h2 className="type-section-label mb-3">Overview</h2>
            <Card className="glass-panel border-0 shadow-none">
              <CardContent className="p-4 sm:p-5">
                <ul className="list-none space-y-2">
                  {solution.details.overview.map((p, i) => (
                    <li key={i} className="flex gap-3 text-base leading-[1.6] text-foreground">
                      <span className="shrink-0 font-medium tabular-nums text-muted-foreground">{i + 1}.</span>
                      <span className="max-w-prose font-normal">{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="type-section-label mb-3 flex items-center gap-2">
              <Leaf className="h-3.5 w-3.5 text-primary" aria-hidden />
              ESG / business case
            </h2>
            <Card className="glass-panel border-0 shadow-none">
              <CardContent className="p-4 sm:p-5">
                <ul className="space-y-2">
                  {solution.details.esgCase.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="type-section-label mb-3 flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
              Angles
            </h2>
            <Card className="glass-panel border-0 shadow-none">
              <CardContent className="p-4 sm:p-5">
                <ul className="space-y-2">
                  {solution.details.keySellingPoints.map((point, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                      <span className="w-4 shrink-0 font-semibold tabular-nums text-muted-foreground">{i + 1}</span>
                      <span className="font-medium text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="type-section-label mb-3 flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-primary" aria-hidden />
              Revenue
            </h2>
            <Card className="glass-panel-strong border-0 shadow-none">
              <CardHeader className="space-y-0 px-4 pb-2 pt-4">
                <CardTitle className="type-section-label">Orange</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4">
                <div>
                  <div className="text-2xl font-medium tabular-nums tracking-tight text-foreground">
                    {solution.details.financialCase.contractValue}
                  </div>
                  <div className="type-eyebrow mt-1">Est. contract</div>
                </div>

                <div className="space-y-3 rounded-lg border border-black/[0.06] bg-[#fafafc] p-4 text-sm">
                  <div>
                    <span className="type-eyebrow">Type</span>
                    <p className="mt-1 font-medium leading-snug text-foreground">{solution.details.financialCase.revenueType}</p>
                  </div>
                  <Separator className="bg-black/[0.06]" />
                  <div>
                    <span className="type-eyebrow">Upsell</span>
                    <p className="mt-1 font-medium leading-snug text-primary">{solution.details.financialCase.upsellPotential}</p>
                  </div>
                </div>

                <div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="type-eyebrow border-b border-black/[0.06] text-left">
                        <th className="pb-2 font-medium">Year</th>
                        <th className="pb-2 text-right font-medium">Rev</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.05]">
                      {solution.details.financialCase.years.map((y) => (
                        <tr key={y.year}>
                          <td className="py-2.5 font-medium tabular-nums text-foreground">{y.year}</td>
                          <td className="py-2.5 text-right font-medium tabular-nums">{y.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="type-section-label mb-3">Next</h2>
            <Card className="glass-panel border-0 shadow-none">
              <CardContent className="p-4 sm:p-5">
                <ol className="list-none space-y-3">
                  {solution.details.nextSteps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="type-eyebrow flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-[#fafafc] font-semibold normal-case tabular-nums text-muted-foreground">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 font-medium">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};
