import {
  History,
  Users,
  LineChart,
  RefreshCcw,
  Lock,
} from "lucide-react";

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

export const RoadmapView = () => {
  return (
    <div className="max-w-2xl space-y-6 animate-fade-in pb-10">
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-muted-foreground" />
        <h1 className="text-xl font-semibold tracking-tight text-foreground leading-tight">Roadmap</h1>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mt-1">Phase 2 — not available in this build</p>
      <ul className="space-y-3 border border-border rounded-lg divide-y divide-border bg-card">
        {phase2Features.map((f) => {
          const Icon = f.icon;
          return (
            <li key={f.title} className="flex gap-3 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground leading-snug tracking-tight">{f.title}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{f.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
