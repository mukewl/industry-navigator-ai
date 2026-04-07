import { 
  Network, Database, BrainCircuit, Bot, FileSearch, LineChart, 
  ShieldCheck, ArrowDown, DatabaseZap, Users, Globe, Lock,
  PlayCircle, Server, FileText, CheckCircle2, ChevronDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const SystemArchitecture = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16 pt-4">
      
      <div className="flex flex-col items-center text-center gap-2 mb-10">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <Network className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          System Architecture
        </h1>
        <p className="text-muted-foreground w-full max-w-xl">
          End-to-end Gen AI Sustainability Profiling Pipeline
        </p>
      </div>

      <div className="relative space-y-4">
        
        {/* Step 01 - INPUT AND TRIGGER */}
        <div className="relative space-y-2">
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 01</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Input and Trigger</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-border/50 bg-background shadow-sm hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <DatabaseZap className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm font-medium">CRM</span>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-background shadow-sm hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <Users className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm font-medium">Salesperson Client List</span>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-background shadow-sm border-primary/40 bg-primary/[0.02]">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-primary">Web Input</span>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center py-2">
          <ArrowDown className="h-6 w-6 text-border" />
        </div>

        {/* Step 02 - PRE-QUALIFICATION GATE */}
        <div className="relative space-y-2">
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 02</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Pre-Qualification Gate</span>
          </div>
          <Card className="border-border/60 shadow-sm overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500" />
            <CardContent className="p-5 pl-7 flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-amber-500/10 flex shrink-0 items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Sufficient Public Data Available?</h3>
                <p className="text-sm text-muted-foreground">Companies with insufficient public footprint are flagged and held.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center py-2">
          <ArrowDown className="h-6 w-6 text-border" />
        </div>

        {/* Step 03 - ORCHESTRATOR */}
        <div className="relative space-y-2">
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 03</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Orchestrator</span>
          </div>
          <Card className="border-border bg-sidebar shadow-md">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg tracking-tight mb-2">Orchestrator Agent</h3>
                <p className="text-sidebar-foreground/70 text-sm leading-relaxed">
                  Manages the full pipeline end to end. Delegates tasks, tracks state, handles errors.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center py-2">
          <ArrowDown className="h-6 w-6 text-border" />
        </div>

        {/* Step 04 - AGENT PIPELINE */}
        <div className="relative space-y-2">
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 04</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Execution Pipeline</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Sequential Agents (Left Column) */}
            <div className="md:col-span-2 space-y-3">
              {[
                { num: "01", name: "Scraping Agent", icon: FileSearch },
                { num: "02", name: "Filtering Agent", icon: Database },
                { num: "03", name: "Scoring & Scoping Agent", icon: LineChart },
                { num: "04", name: "Portfolio Mapping Agent", icon: Network },
                { num: "05", name: "Solution Research Agent", icon: Bot },
              ].map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <div key={agent.num} className="relative">
                    {i !== 4 && (
                      <div className="absolute left-6 top-10 bottom-[-16px] w-[1px] border-l-2 border-dashed border-border z-0" />
                    )}
                    <Card className="relative z-10 border-border/50 shadow-sm bg-background">
                      <CardContent className="p-4 py-3 flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-xs font-bold font-mono text-muted-foreground border">
                          {agent.num}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{agent.name}</h4>
                        </div>
                        <Icon className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Parallel Agents (Right Column) */}
            <div className="md:col-span-1 flex flex-col gap-4">
              <Card className="flex-1 border-dashed border-primary/30 bg-primary/[0.02]">
                <CardContent className="p-5 flex flex-col h-full gap-3 justify-center items-center text-center">
                  <Server className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-primary">Shared State Layer</h4>
                    <p className="text-[11px] font-medium text-primary/70 uppercase tracking-widest">All Steps</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1 border-dashed border-sidebar bg-sidebar/5">
                <CardContent className="p-5 flex flex-col h-full gap-3 justify-center items-center text-center">
                  <ShieldCheck className="h-6 w-6 text-sidebar" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-sidebar">Fact-Checker Agent</h4>
                    <p className="text-[11px] font-medium text-sidebar/70 uppercase tracking-widest">Steps 1, 2 and Final</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
          </div>
        </div>

        <div className="flex justify-center py-2">
          <ArrowDown className="h-6 w-6 text-border" />
        </div>

        {/* Step 05 - OUTPUT */}
        <div className="relative space-y-2">
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 05</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Output</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phase 1 Output */}
            <Card className="border-sidebar/20 bg-sidebar shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-lg">CRM Engagement Brief</h3>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30">Phase 1</Badge>
                </div>
                <div className="space-y-2">
                  {[
                    "Top 3 challenges",
                    "Industry benchmarks",
                    "Orange solutions",
                    "Key contacts",
                    "Confidence score"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="text-sm font-medium text-sidebar-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Phase 2 Output */}
            <Card className="border-border/60 bg-muted/40 opacity-70 border-dashed relative">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-muted-foreground text-lg">Account Manager Dashboard</h3>
                  <Badge variant="outline" className="text-muted-foreground flex items-center gap-1"><Lock className="h-3 w-3" />Phase 2</Badge>
                </div>
                <div className="space-y-2">
                  {[
                    "Engagement history",
                    "Team collaboration view",
                    "Trend & performance tracking",
                    "CRM sync"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};
