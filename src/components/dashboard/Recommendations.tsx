import { Lightbulb, ArrowRight, TrendingUp, Target, Zap, Star, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecommendationsProps {
  query: string;
}

const recommendations = [
  {
    id: 1,
    title: "AI-Powered Drug Discovery Platform",
    description: "Deploy enterprise-scale AI/ML platform for target identification and lead optimization. Expected to reduce preclinical timelines by 40% and increase success rates.",
    score: 96,
    priority: "high",
    tags: ["AI/ML", "Drug Discovery", "R&D"],
    metrics: {
      roi: "280%",
      timeframe: "18 months",
      risk: "Medium",
    },
  },
  {
    id: 2,
    title: "Cloud Lab Automation Network",
    description: "Implement connected cloud lab platform across R&D sites enabling remote experimentation and automated workflows with real-time data integration.",
    score: 92,
    priority: "high",
    tags: ["Automation", "Cloud", "Lab Tech"],
    metrics: {
      roi: "215%",
      timeframe: "12 months",
      risk: "Low",
    },
  },
  {
    id: 3,
    title: "Manufacturing Digital Twin",
    description: "Deploy digital twin technology across manufacturing sites for predictive maintenance, process optimization, and regulatory compliance.",
    score: 85,
    priority: "medium",
    tags: ["Digital Twin", "Manufacturing", "IoT"],
    metrics: {
      roi: "165%",
      timeframe: "24 months",
      risk: "Medium",
    },
  },
  {
    id: 4,
    title: "Real-World Evidence Platform",
    description: "Build integrated RWE platform connecting EHR, claims, and registry data for post-market surveillance and label expansion studies.",
    score: 78,
    priority: "medium",
    tags: ["RWE", "Data Platform", "Clinical"],
    metrics: {
      roi: "145%",
      timeframe: "18 months",
      risk: "Low",
    },
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-primary/10 text-primary border-primary/20";
    case "medium":
      return "bg-warning/10 text-warning border-warning/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Low":
      return "text-primary";
    case "Medium":
      return "text-warning";
    case "High":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

export const Recommendations = ({ query }: RecommendationsProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Technology Initiatives</h2>
          <p className="text-muted-foreground">
            AI-recommended tech initiatives for <span className="text-primary font-medium">{query}</span>
          </p>
        </div>
        <Badge variant="outline" className="gap-1 px-3 py-1">
          <Lightbulb className="h-3 w-3" />
          4 Recommendations
        </Badge>
      </div>

      {/* Top Recommendation Featured */}
      <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-chart-2/5">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge className={getPriorityColor(recommendations[0].priority)}>
              <Star className="mr-1 h-3 w-3" />
              Top Recommendation
            </Badge>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{recommendations[0].score}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">{recommendations[0].title}</h3>
          <p className="text-muted-foreground mb-4">{recommendations[0].description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {recommendations[0].tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 rounded-lg bg-secondary/30 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{recommendations[0].metrics.roi}</p>
              <p className="text-xs text-muted-foreground">Expected ROI</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-2xl font-bold">{recommendations[0].metrics.timeframe}</p>
              <p className="text-xs text-muted-foreground">Timeframe</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${getRiskColor(recommendations[0].metrics.risk)}`}>
                {recommendations[0].metrics.risk}
              </p>
              <p className="text-xs text-muted-foreground">Risk Level</p>
            </div>
          </div>
          
          <Button variant="glow" className="mt-4 w-full gap-2">
            Explore Initiative
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Other Recommendations */}
      <div className="grid gap-4 md:grid-cols-3">
        {recommendations.slice(1).map((rec) => (
          <Card key={rec.id} className="group hover:border-primary/30 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge className={getPriorityColor(rec.priority)} variant="outline">
                  {rec.priority}
                </Badge>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold">{rec.score}</span>
                  <span className="text-xs text-muted-foreground">/100</span>
                </div>
              </div>
              
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{rec.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{rec.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {rec.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-primary" />
                  <span>{rec.metrics.roi} ROI</span>
                </div>
                <span className={`text-xs ${getRiskColor(rec.metrics.risk)}`}>{rec.metrics.risk} Risk</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Items */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Recommended Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              "Conduct AI/ML vendor landscape assessment and POC planning",
              "Evaluate cloud lab platform providers (Strateos, Emerald, Benchling)",
              "Define digital twin pilot scope for manufacturing sites",
              "Assess RWE data partnership opportunities with payers and registries",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                  {index + 1}
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
