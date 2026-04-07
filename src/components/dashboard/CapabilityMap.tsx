import { Grid3X3, TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CapabilityMapProps {
  query: string;
}

const capabilities = [
  {
    category: "AI & Machine Learning",
    items: [
      { name: "Drug Discovery AI", score: 88, benchmark: 72, trend: "up" },
      { name: "Clinical Trial AI", score: 76, benchmark: 68, trend: "up" },
      { name: "NLP & Text Mining", score: 82, benchmark: 75, trend: "up" },
      { name: "Computer Vision", score: 70, benchmark: 65, trend: "neutral" },
      { name: "MLOps & Deployment", score: 65, benchmark: 70, trend: "down" },
    ],
  },
  {
    category: "Data & Cloud",
    items: [
      { name: "Cloud Infrastructure", score: 85, benchmark: 78, trend: "up" },
      { name: "Data Lake Platform", score: 82, benchmark: 75, trend: "up" },
      { name: "Real-World Data", score: 78, benchmark: 72, trend: "up" },
      { name: "Data Governance", score: 68, benchmark: 74, trend: "down" },
      { name: "API Integration", score: 75, benchmark: 70, trend: "neutral" },
    ],
  },
  {
    category: "Lab & R&D Tech",
    items: [
      { name: "Lab Automation", score: 80, benchmark: 72, trend: "up" },
      { name: "LIMS/ELN Systems", score: 76, benchmark: 74, trend: "neutral" },
      { name: "High-Throughput Screen", score: 84, benchmark: 78, trend: "up" },
      { name: "Biomarker Platforms", score: 72, benchmark: 70, trend: "up" },
      { name: "Imaging & Microscopy", score: 78, benchmark: 75, trend: "neutral" },
    ],
  },
  {
    category: "Manufacturing & Supply",
    items: [
      { name: "Digital Twin", score: 72, benchmark: 62, trend: "up" },
      { name: "Connected Manufacturing", score: 68, benchmark: 65, trend: "up" },
      { name: "Predictive Maintenance", score: 74, benchmark: 68, trend: "up" },
      { name: "Track & Trace", score: 82, benchmark: 78, trend: "neutral" },
      { name: "Quality Systems", score: 86, benchmark: 80, trend: "up" },
    ],
  },
];

const getHeatColor = (score: number, benchmark: number) => {
  const diff = score - benchmark;
  if (diff >= 10) return "bg-primary/40 text-primary border-primary/30";
  if (diff >= 0) return "bg-primary/20 text-primary/80 border-primary/20";
  if (diff >= -10) return "bg-warning/20 text-warning border-warning/20";
  return "bg-destructive/20 text-destructive border-destructive/20";
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-3 w-3 text-primary" />;
    case "down":
      return <TrendingDown className="h-3 w-3 text-destructive" />;
    default:
      return <Minus className="h-3 w-3 text-muted-foreground" />;
  }
};

export const CapabilityMap = ({ query }: CapabilityMapProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Technology Capability Heatmap</h2>
          <p className="text-muted-foreground">
            Tech capability analysis for <span className="text-primary font-medium">{query}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-primary/40" />
            <span className="text-xs text-muted-foreground">Strong</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-primary/20" />
            <span className="text-xs text-muted-foreground">On Par</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-warning/20" />
            <span className="text-xs text-muted-foreground">Below</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-destructive/20" />
            <span className="text-xs text-muted-foreground">Weak</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Above Benchmark</p>
            <p className="text-3xl font-bold text-primary">16</p>
            <p className="text-xs text-muted-foreground mt-1">capabilities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">At Benchmark</p>
            <p className="text-3xl font-bold">2</p>
            <p className="text-xs text-muted-foreground mt-1">capabilities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Below Benchmark</p>
            <p className="text-3xl font-bold text-warning">2</p>
            <p className="text-xs text-muted-foreground mt-1">capabilities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Overall Score</p>
            <p className="text-3xl font-bold gradient-text">77.1</p>
            <p className="text-xs text-muted-foreground mt-1">vs 72.3 benchmark</p>
          </CardContent>
        </Card>
      </div>

      {/* Capability Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {capabilities.map((category) => (
          <Card key={category.category}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Grid3X3 className="h-4 w-4 text-primary" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {category.items.map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-all hover:scale-[1.02] ${getHeatColor(
                        item.score,
                        item.benchmark
                      )}`}
                    >
                      <div className="flex items-center gap-2">
                        {getTrendIcon(item.trend)}
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-lg font-bold">{item.score}</span>
                          <span className="text-xs text-muted-foreground ml-1">/ 100</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.score >= item.benchmark ? "+" : ""}
                          {item.score - item.benchmark}
                        </Badge>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-xs">
                    <div className="space-y-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Score: {item.score} | Benchmark: {item.benchmark}
                      </p>
                      <p className="text-xs">
                        {item.score >= item.benchmark
                          ? `Outperforming benchmark by ${item.score - item.benchmark} points`
                          : `Underperforming benchmark by ${item.benchmark - item.score} points`}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Insights */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4 text-primary" />
            Key Technology Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-primary/10 p-4">
              <h4 className="font-medium text-primary mb-2">Top Tech Strengths</h4>
              <ul className="space-y-1 text-sm">
                <li>• Drug Discovery AI (+16 vs benchmark)</li>
                <li>• Digital Twin (+10 vs benchmark)</li>
                <li>• High-Throughput Screening (+6 vs benchmark)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-warning/10 p-4">
              <h4 className="font-medium text-warning mb-2">Technology Gaps</h4>
              <ul className="space-y-1 text-sm">
                <li>• Data Governance (-6 vs benchmark)</li>
                <li>• MLOps & Deployment (-5 vs benchmark)</li>
                <li>• API Integration (+5, but room to grow)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
