import { 
  Brain, 
  FileSearch, 
  ShieldCheck, 
  TrendingUp, 
  Lightbulb, 
  AlertTriangle, 
  Newspaper,
  CheckCircle2,
  Loader2,
  Circle,
  Cpu,
  Cloud,
  Leaf,
  Factory,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AgentStatus {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "active" | "idle" | "processing" | "complete";
  lastRun?: string;
}

interface AgentStatusPanelProps {
  isAnalyzing?: boolean;
  hasSearched?: boolean;
}

const agents: AgentStatus[] = [
  {
    id: "esg-intelligence",
    name: "ESG Intelligence",
    description: "ESG scoring, sustainability ratings, CSRD compliance",
    icon: Brain,
    status: "idle",
  },
  {
    id: "climate-data",
    name: "Climate & Data",
    description: "Carbon data lakes, emissions tracking, climate reporting",
    icon: Cloud,
    status: "idle",
  },
  {
    id: "green-ops",
    name: "Green Operations",
    description: "Circular economy, waste reduction, energy efficiency",
    icon: Leaf,
    status: "idle",
  },
  {
    id: "supply-chain",
    name: "Supply Chain ESG",
    description: "Scope 3 emissions, supplier ESG, due diligence",
    icon: Factory,
    status: "idle",
  },
  {
    id: "validation",
    name: "Validation Agent",
    description: "Multi-source sustainability signal verification",
    icon: ShieldCheck,
    status: "idle",
  },
  {
    id: "market-signal",
    name: "Market Signal",
    description: "ESG investment trends and green M&A activity",
    icon: TrendingUp,
    status: "idle",
  },
  {
    id: "recommendation",
    name: "ESG Recommendations",
    description: "Sustainability initiatives with ROI scoring",
    icon: Lightbulb,
    status: "idle",
  },
  {
    id: "news-alert",
    name: "Sustainability News",
    description: "ESG regulation news and sustainability announcements",
    icon: Newspaper,
    status: "idle",
  },
];

const getStatusConfig = (status: AgentStatus["status"], isAnalyzing?: boolean, hasSearched?: boolean) => {
  if (isAnalyzing) {
    return {
      icon: Loader2,
      color: "text-chart-2",
      bgColor: "bg-chart-2/20",
      label: "Processing",
      animate: true,
    };
  }
  if (hasSearched) {
    return {
      icon: CheckCircle2,
      color: "text-primary",
      bgColor: "bg-primary/20",
      label: "Complete",
      animate: false,
    };
  }
  return {
    icon: Circle,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    label: "Idle",
    animate: false,
  };
};

export const AgentStatusPanel = ({ isAnalyzing, hasSearched }: AgentStatusPanelProps) => {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Cpu className="h-4 w-4 text-primary" />
            Sustainability AI Agents
          </CardTitle>
          <Badge 
            variant="outline" 
            className={cn(
              "gap-1 text-xs",
              isAnalyzing && "border-chart-2/50 text-chart-2",
              hasSearched && !isAnalyzing && "border-primary/50 text-primary"
            )}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Analyzing
              </>
            ) : hasSearched ? (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Ready
              </>
            ) : (
              <>
                <Circle className="h-3 w-3" />
                Standby
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-4">
          {agents.map((agent, index) => {
            const statusConfig = getStatusConfig(
              agent.status,
              isAnalyzing && index <= (agents.length * (Math.random() * 0.5 + 0.5)),
              hasSearched
            );
            const StatusIcon = statusConfig.icon;
            const AgentIcon = agent.icon;

            return (
              <div
                key={agent.id}
                className={cn(
                  "group relative flex flex-col items-center gap-2 rounded-lg border border-border/50 p-3 transition-all duration-300",
                  "hover:border-primary/30 hover:bg-card/50",
                  isAnalyzing && "animate-pulse"
                )}
                style={{
                  animationDelay: isAnalyzing ? `${index * 100}ms` : undefined,
                }}
              >
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                  statusConfig.bgColor
                )}>
                  <AgentIcon className={cn("h-5 w-5", statusConfig.color)} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium leading-tight">{agent.name}</p>
                </div>
                <div className="absolute right-2 top-2">
                  <StatusIcon 
                    className={cn(
                      "h-3 w-3",
                      statusConfig.color,
                      statusConfig.animate && "animate-spin"
                    )} 
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Specialized agents for ESG and sustainability intelligence
        </p>
      </CardContent>
    </Card>
  );
};

