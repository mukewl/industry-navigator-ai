import { 
  Building2, 
  ArrowRight, 
  Plus, 
  Lock, 
  History, 
  Users, 
  LineChart, 
  RefreshCcw,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AccountDashboardProps {
  onNewProfile: () => void;
  onViewBrief: (companyName: string) => void;
}

const clientProfiles = [
  {
    id: "renault",
    name: "Renault",
    confidence: 87,
    challenge: "Fleet Electrification and Lifecycle Emissions",
    solution: "Ocean + Circular Mobility",
    status: "Brief Ready",
  },
  {
    id: "carrefour",
    name: "Carrefour",
    confidence: 91,
    challenge: "Cold Chain Energy Efficiency",
    solution: "Smart Eco Energy",
    status: "Brief Ready",
  },
];

const phase2Features = [
  {
    title: "Engagement History & Notes",
    description: "Track previous pitching interactions and log account manager notes.",
    icon: History,
  },
  {
    title: "Team Collaboration View",
    description: "Share intelligence briefs privately within your sales pod.",
    icon: Users,
  },
  {
    title: "Trend & Performance Tracking",
    description: "Monitor changes in client ESG scores over consecutive quarters.",
    icon: LineChart,
  },
  {
    title: "CRM Sync",
    description: "Automatic bidirectional sync with Salesforce and Dynamics 365.",
    icon: RefreshCcw,
  },
];

export const AccountDashboard = ({ onNewProfile, onViewBrief }: AccountDashboardProps) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-10">
      
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Client Portfolio
          </h1>
          <p className="text-muted-foreground mt-1">
            2 profiles completed
          </p>
        </div>
        <Button onClick={onNewProfile} className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-md">
          <Plus className="h-4 w-4" />
          Run New Profile
        </Button>
      </div>

      <Separator />

      {/* ── Client Cards ── */}
      <div className="grid gap-6 md:grid-cols-2">
        {clientProfiles.map((client) => (
          <Card key={client.id} className="border-border/60 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md group">
            <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border shadow-sm">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{client.name}</CardTitle>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {client.confidence}% Confidence
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-500/10 text-green-700 border-green-500/20 hover:bg-green-500/20 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Top Sustainability Challenge
                  </p>
                  <p className="text-sm font-medium leading-snug">
                    {client.challenge}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Primary Orange Solution
                  </p>
                  <p className="text-sm text-primary font-medium leading-snug">
                    {client.solution}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  variant="outline"
                  onClick={() => onViewBrief(client.name)}
                >
                  View Full Brief
                  <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Phase 2 Features ── */}
      <div className="mt-12 pt-8 border-t border-border/40">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="h-5 w-5 text-muted-foreground/60" />
          <h2 className="text-xl font-semibold text-muted-foreground/80">Phase 2 Features — Coming Soon</h2>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phase2Features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="border-dashed border-border/60 bg-muted/30 opacity-70">
                <CardHeader className="p-4 pb-2">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center mb-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-sm font-semibold text-muted-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription className="text-xs leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
