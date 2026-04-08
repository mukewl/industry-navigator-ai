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
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-10 text-base">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted border border-border">
              <solution.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight leading-tight">
                {solution.product}
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5 leading-snug">
                {companyName} · <span className="text-foreground font-medium">{solution.challengeLabel}</span>
              </p>
            </div>
          </div>
          <Badge variant="outline" className="type-eyebrow normal-case tracking-normal border-border mt-2 px-2 py-0.5 h-6">
            Impact {solution.impactScore}
          </Badge>
        </div>
        <Button variant="outline" size="sm" onClick={onBack} className="gap-2 h-8 text-xs shrink-0 border-border">
          <ArrowLeft className="h-3.5 w-3.5" />
          Brief
        </Button>
      </div>

      <Separator className="bg-border" />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <section>
            <h2 className="type-section-label mb-3">Overview</h2>
            <Card className="border-border bg-card shadow-none">
              <CardContent className="p-4">
                <ul className="space-y-2 list-none">
                  {solution.details.overview.map((p, i) => (
                    <li key={i} className="flex gap-3 text-base text-foreground leading-[1.6]">
                      <span className="text-muted-foreground tabular-nums shrink-0 font-medium">{i + 1}.</span>
                      <span className="max-w-prose">{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="type-section-label mb-3 flex items-center gap-2">
              <Leaf className="h-3.5 w-3.5 text-primary" />
              ESG / business case
            </h2>
            <Card className="border-border bg-card shadow-none">
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {solution.details.esgCase.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="type-section-label mb-3 flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Angles
            </h2>
            <Card className="border-border bg-card shadow-none">
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {solution.details.keySellingPoints.map((point, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                      <span className="text-muted-foreground tabular-nums font-semibold shrink-0 w-4">{i + 1}</span>
                      <span className="text-foreground font-medium">{point}</span>
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
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              Revenue
            </h2>
            <Card className="border-border bg-muted/20 shadow-none">
              <CardHeader className="pb-2 pt-4 px-4 space-y-0">
                <CardTitle className="type-section-label">Orange</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-4">
                <div>
                  <div className="text-2xl font-semibold tabular-nums text-foreground tracking-tight">{solution.details.financialCase.contractValue}</div>
                  <div className="type-eyebrow mt-1">Est. contract</div>
                </div>
                
                <div className="space-y-3 rounded-md border border-border bg-card p-3 text-sm">
                  <div>
                    <span className="type-eyebrow">Type</span>
                    <p className="font-medium mt-1 leading-snug">{solution.details.financialCase.revenueType}</p>
                  </div>
                  <Separator className="bg-border" />
                  <div>
                    <span className="type-eyebrow">Upsell</span>
                    <p className="font-medium text-primary mt-1 leading-snug">{solution.details.financialCase.upsellPotential}</p>
                  </div>
                </div>

                <div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left type-eyebrow border-b border-border">
                        <th className="pb-2 font-medium">Year</th>
                        <th className="pb-2 text-right font-medium">Rev</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {solution.details.financialCase.years.map((y) => (
                        <tr key={y.year}>
                          <td className="py-2.5 font-medium text-foreground tabular-nums">{y.year}</td>
                          <td className="py-2.5 text-right tabular-nums font-semibold">{y.revenue}</td>
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
            <Card className="border-border bg-card shadow-none">
              <CardContent className="p-4">
                <ol className="space-y-3 list-none">
                  {solution.details.nextSteps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-border bg-muted type-eyebrow normal-case font-semibold tabular-nums text-muted-foreground">
                        {i + 1}
                      </span>
                      <span className="font-medium pt-0.5">{step}</span>
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
