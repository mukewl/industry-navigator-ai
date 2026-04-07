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
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <solution.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold leading-tight">
                {solution.product} for {companyName}
              </h1>
              <p className="text-sm font-medium text-muted-foreground mt-1 border-l-2 border-primary pl-2">
                Mapped to: {solution.challengeLabel}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3 pl-[60px]">
            <Badge className="bg-primary/10 text-primary border-primary/30 gap-1.5 font-bold px-3 py-1">
              Impact Score: {solution.impactScore}/100
            </Badge>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Brief
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content Column (2/3 width) */}
        <div className="md:col-span-2 space-y-6">
          {/* Section 1 - Solution Overview */}
          <section>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-foreground">
              <solution.icon className="h-5 w-5 text-primary" />
              Solution Overview
            </h2>
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-6 space-y-4">
                {solution.details.overview.map((p, i) => (
                  <p key={i} className="text-[15px] text-foreground/90 leading-relaxed">
                    {p}
                  </p>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Section 3 - ESG and Business Case */}
          <section>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-foreground">
              <Leaf className="h-5 w-5 text-green-600" />
              ESG & Business Case for Client
            </h2>
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {solution.details.esgCase.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-[2px] shrink-0" />
                      <span className="text-[15px] font-medium text-foreground/90 leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 - Key Selling Points */}
          <section>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-foreground">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              Key Selling Points
            </h2>
            <Card className="border-border/50 shadow-sm bg-blue-50/30">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {solution.details.keySellingPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 shrink-0">
                        <span className="text-xs font-bold text-blue-700">{i + 1}</span>
                      </div>
                      <span className="text-[15px] font-bold text-blue-900 leading-snug pt-[2px]">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Sidebar Column (1/3 width) */}
        <div className="space-y-6">
          {/* Section 2 - Financial Case */}
          <section>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Financial Case
            </h2>
            <Card className="border-primary/20 bg-primary/[0.03] shadow-sm">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-sm font-semibold text-primary uppercase tracking-wider">Orange Revenue Profile</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-5">
                <div>
                  <div className="text-3xl font-extrabold text-foreground tracking-tight">{solution.details.financialCase.contractValue}</div>
                  <div className="text-xs text-muted-foreground uppercase font-semibold mt-1">Est. Contract Value</div>
                </div>
                
                <div className="space-y-3 bg-white/60 p-3 rounded-md border border-primary/10">
                  <div className="flex flex-col text-sm">
                    <span className="text-muted-foreground text-xs uppercase mb-0.5">Revenue Type</span>
                    <span className="font-semibold">{solution.details.financialCase.revenueType}</span>
                  </div>
                  <Separator className="bg-primary/10" />
                  <div className="flex flex-col text-sm">
                    <span className="text-muted-foreground text-xs uppercase mb-0.5">Upsell Potential</span>
                    <span className="font-bold text-primary">{solution.details.financialCase.upsellPotential}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-primary/70 text-[10px] uppercase font-bold border-b border-primary/20">
                        <th className="pb-2 pl-2">Year</th>
                        <th className="pb-2 text-right pr-2">Proj. Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10">
                      {solution.details.financialCase.years.map((y) => (
                        <tr key={y.year} className="hover:bg-primary/5 transition-colors">
                          <td className="py-3 pl-2 font-medium text-foreground/80">{y.year}</td>
                          <td className="py-3 text-right pr-2 font-bold text-foreground">{y.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 - Next Steps */}
          <section>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-foreground">
              <ArrowLeft className="h-5 w-5 text-primary rotate-180" />
              Suggested Next Steps
            </h2>
            <Card className="border-border/50 shadow-sm bg-orange-50/30">
              <CardContent className="p-5">
                <div className="space-y-4">
                  {solution.details.nextSteps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 font-bold text-xs text-primary">
                        {i + 1}
                      </div>
                      <p className="text-sm font-medium leading-snug">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};
