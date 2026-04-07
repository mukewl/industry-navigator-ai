import { FileText, CheckCircle2, AlertTriangle, TrendingUp, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ExecutiveSummaryProps {
  query: string;
  searchType: "industry" | "company";
}

export const ExecutiveSummary = ({ query, searchType }: ExecutiveSummaryProps) => {
  const isIndustry = searchType === "industry";

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Executive Summary
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1 text-xs">
              <Shield className="h-3 w-3" />
              Multi-source Validated
            </Badge>
            <Badge className="gap-1 bg-primary/10 text-primary border-primary/20 text-xs">
              <Clock className="h-3 w-3" />
              Updated 2 min ago
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-secondary/30 p-4">
          <p className="text-sm leading-relaxed text-foreground/90">
            {isIndustry ? (
              <>
                The <span className="font-semibold text-primary">{query}</span> sector is experiencing
                rapid sustainability transformation. ESG adoption has grown 156% YoY, with circular
                economy platforms and net-zero manufacturing emerging as dominant themes. Key inflection
                points include the EU Corporate Sustainability Reporting Directive (CSRD) in 2024 and
                industry-wide adoption of carbon digital twins in Q1 2025.
              </>
            ) : (
              <>
                <span className="font-semibold text-primary">{query}</span> demonstrates strong ESG
                positioning with above-benchmark performance in sustainability reporting and green
                operations. Recent signals indicate accelerating investment in renewable energy
                transitions and Scope 3 emissions reduction. Confidence is high for green transformation
                and circular economy initiatives.
              </>
            )}
          </p>
        </div>

        <Separator className="bg-border/50" />

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <TrendingUp className="h-4 w-4" />
              Key ESG Signals
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                <span>Renewable energy adoption (+156% YoY)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                <span>Scope 3 reporting in 72% of top 20 companies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                <span>Carbon digital twin adoption (+89% YoY)</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-warning">
              <AlertTriangle className="h-4 w-4" />
              Watch-outs
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-3 w-3 mt-0.5 text-warning shrink-0" />
                <span>Greenwashing risk in sustainability claims</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-3 w-3 mt-0.5 text-warning shrink-0" />
                <span>Supply chain ESG data gaps</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-3 w-3 mt-0.5 text-warning shrink-0" />
                <span>Talent shortage in sustainability specialists</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-chart-2">
              <CheckCircle2 className="h-4 w-4" />
              Confidence Score
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-chart-2">89%</span>
                <span className="text-xs text-muted-foreground">overall</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-primary to-chart-2"
                  style={{ width: "89%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Based on 28 validated sources
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

