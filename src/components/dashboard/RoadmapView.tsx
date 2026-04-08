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
    <div className="max-w-2xl animate-fade-in space-y-6 pb-10">
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-muted-foreground" aria-hidden />
        <h1 className="text-xl font-medium tracking-tight text-foreground leading-tight">Roadmap</h1>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Phase 2 — not available in this build</p>
      <ul className="glass-panel divide-y divide-white/45 overflow-hidden rounded-2xl">
        {phase2Features.map((f) => {
          const Icon = f.icon;
          return (
            <li key={f.title} className="flex gap-3 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/50 bg-white/45 backdrop-blur-sm">
                <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-snug tracking-tight text-foreground">{f.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
