import { Building2, TrendingUp, TrendingDown, Calendar, Users, DollarSign, BarChart3, Cpu, Server } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

interface CompanyAnalysisProps {
  query: string;
}

const signalsTimeline = [
  { date: "Jan 2024", event: "Launched AI-powered drug discovery platform", type: "technology", impact: "positive" },
  { date: "Feb 2024", event: "Cloud lab partnership with Strateos announced", type: "partnership", impact: "positive" },
  { date: "Mar 2024", event: "Digital twin deployment in 3 manufacturing sites", type: "technology", impact: "positive" },
  { date: "Apr 2024", event: "Legacy ERP migration delays reported", type: "operations", impact: "negative" },
  { date: "May 2024", event: "Acquired AI biotech startup for $2.1B", type: "M&A", impact: "positive" },
  { date: "Jun 2024", event: "RWE platform integration with clinical ops", type: "technology", impact: "positive" },
];

const peerBenchmark = [
  { metric: "AI/ML Maturity", company: 88, peer1: 72, peer2: 65, peer3: 78 },
  { metric: "Cloud Adoption", company: 82, peer1: 85, peer2: 70, peer3: 75 },
  { metric: "Lab Automation", company: 76, peer1: 68, peer2: 72, peer3: 80 },
  { metric: "Data Platform", company: 85, peer1: 78, peer2: 82, peer3: 72 },
  { metric: "Digital Mfg", company: 72, peer1: 65, peer2: 58, peer3: 68 },
];

const radarData = [
  { metric: "AI/ML", value: 88, fullMark: 100 },
  { metric: "Cloud & Data", value: 82, fullMark: 100 },
  { metric: "Lab Tech", value: 76, fullMark: 100 },
  { metric: "Digital Mfg", value: 72, fullMark: 100 },
  { metric: "Connected Devices", value: 68, fullMark: 100 },
  { metric: "Cybersecurity", value: 85, fullMark: 100 },
];

export const CompanyAnalysis = ({ query }: CompanyAnalysisProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-2 shadow-glow">
            <Cpu className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{query}</h2>
            <p className="text-muted-foreground">Technology Capability Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="gap-1 bg-primary/10 text-primary border-primary/20">
            <TrendingUp className="h-3 w-3" />
            Tech Leader
          </Badge>
          <Badge variant="outline" className="gap-1">
            Score: 8.2/10
          </Badge>
        </div>
      </div>

      {/* Company Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-primary/20 p-2">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tech Budget</p>
              <p className="text-lg font-bold">$4.2B</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-chart-2/20 p-2">
              <Users className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tech Workforce</p>
              <p className="text-lg font-bold">8,500</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-warning/20 p-2">
              <Server className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cloud Spend</p>
              <p className="text-lg font-bold">$890M</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-chart-4/20 p-2">
              <Cpu className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">AI Models</p>
              <p className="text-lg font-bold">47</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Signals Timeline */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4 text-primary" />
            Technology Signals Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-4">
              {signalsTimeline.map((signal, index) => (
                <div key={index} className="relative flex items-start gap-4 pl-8">
                  <div
                    className={`absolute left-1.5 top-1.5 h-3 w-3 rounded-full ${
                      signal.impact === "positive" ? "bg-primary" : "bg-destructive"
                    }`}
                  />
                  <div className="flex flex-1 items-center justify-between rounded-lg bg-secondary/30 p-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{signal.event}</span>
                        {signal.impact === "positive" ? (
                          <TrendingUp className="h-4 w-4 text-primary" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground capitalize">{signal.type}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {signal.date}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Peer Benchmark */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tech Capability Benchmark</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peerBenchmark} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
                  <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <YAxis dataKey="metric" type="category" width={100} stroke="hsl(215, 20%, 55%)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 8%)",
                      border: "1px solid hsl(217, 33%, 17%)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(210, 40%, 98%)" }}
                  />
                  <Bar dataKey="company" fill="hsl(160, 84%, 39%)" radius={[0, 4, 4, 0]} name={query} />
                  <Bar dataKey="peer1" fill="hsl(199, 89%, 48%)" radius={[0, 4, 4, 0]} name="Peer A" />
                  <Bar dataKey="peer2" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} name="Peer B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Technology Strength Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(217, 33%, 17%)" />
                  <PolarAngleAxis dataKey="metric" stroke="hsl(215, 20%, 55%)" fontSize={11} />
                  <Radar
                    name="Company"
                    dataKey="value"
                    stroke="hsl(160, 84%, 39%)"
                    fill="hsl(160, 84%, 39%)"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
