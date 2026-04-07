import { TrendingUp, TrendingDown, Activity, Zap, AlertTriangle, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface TrendsDashboardProps {
  query: string;
  searchType: "industry" | "company";
}

const sustainabilityData = [
  { month: "Jan", esgScore: 4.2, initiatives: 28 },
  { month: "Feb", esgScore: 5.8, initiatives: 35 },
  { month: "Mar", esgScore: 7.2, initiatives: 42 },
  { month: "Apr", esgScore: 6.5, initiatives: 38 },
  { month: "May", esgScore: 9.1, initiatives: 51 },
  { month: "Jun", esgScore: 12.4, initiatives: 64 },
];

const inflectionPoints = [
  { date: "2024 Q1", event: "EU CSRD (Corporate Sustainability Reporting Directive) enacted", impact: "high", type: "regulatory" },
  { date: "2024 Q2", event: "Scope 3 mandatory reporting for large corporates", impact: "high", type: "regulatory" },
  { date: "2024 Q4", event: "Net-zero pledges hit 50% of Fortune 500", impact: "high", type: "market" },
  { date: "2025 Q1", event: "Carbon digital twin adoption accelerates globally", impact: "high", type: "technology" },
];

const themes = [
  { name: "Circular Economy", trend: "up", score: 96, change: "+156%" },
  { name: "Renewable Energy Transition", trend: "up", score: 88, change: "+72%" },
  { name: "Net-Zero Manufacturing", trend: "up", score: 84, change: "+65%" },
  { name: "Scope 3 Transparency", trend: "up", score: 78, change: "+45%" },
  { name: "Legacy Carbon Reporting", trend: "down", score: 42, change: "-18%" },
];

export const TrendsDashboard = ({ query, searchType }: TrendsDashboardProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sustainability Trends</h2>
          <p className="text-muted-foreground">
            ESG analysis for <span className="text-primary font-medium">{query}</span>
          </p>
        </div>
        <Badge variant="outline" className="gap-1 px-3 py-1">
          <Activity className="h-3 w-3" />
          Live Data
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ESG Score</p>
                <p className="text-2xl font-bold">78.4</p>
                <p className="text-xs text-primary">+12% YoY</p>
              </div>
              <div className="rounded-lg bg-primary/20 p-3">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Green Initiatives</p>
                <p className="text-2xl font-bold">258</p>
                <p className="text-xs text-primary">+54% YoY</p>
              </div>
              <div className="rounded-lg bg-chart-2/20 p-3">
                <Target className="h-5 w-5 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Carbon Reduction</p>
                <p className="text-2xl font-bold">-48%</p>
                <p className="text-xs text-warning">vs. 2019 baseline</p>
              </div>
              <div className="rounded-lg bg-warning/20 p-3">
                <Zap className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ESG Maturity</p>
                <p className="text-2xl font-bold">7.8/10</p>
                <p className="text-xs text-primary">Accelerating</p>
              </div>
              <div className="rounded-lg bg-primary/20 p-3">
                <Activity className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Sustainability Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sustainabilityData}>
                  <defs>
                    <linearGradient id="esgGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6900" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF6900" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 88%)" />
                  <XAxis dataKey="month" stroke="hsl(0, 0%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(0, 0%, 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(0, 0%, 88%)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(0, 0%, 10%)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="esgScore"
                    stroke="#FF6900"
                    strokeWidth={2}
                    fill="url(#esgGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Green Initiative Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sustainabilityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 88%)" />
                  <XAxis dataKey="month" stroke="hsl(0, 0%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(0, 0%, 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(0, 0%, 88%)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(0, 0%, 10%)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="initiatives"
                    stroke="#FF8C00"
                    strokeWidth={2}
                    dot={{ fill: "#FF8C00", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Themes and Inflection Points */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-4 w-4 text-primary" />
              Sustainability Themes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {themes.map((theme) => (
              <div key={theme.name} className="flex items-center justify-between rounded-lg bg-secondary/30 p-3">
                <div className="flex items-center gap-3">
                  {theme.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-primary" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <span className="font-medium">{theme.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 rounded-full bg-secondary h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-chart-2"
                      style={{ width: `${theme.score}%` }}
                    />
                  </div>
                  <Badge variant={theme.trend === "up" ? "default" : "destructive"} className="text-xs">
                    {theme.change}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Regulatory Inflection Points
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {inflectionPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg bg-secondary/30 p-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{point.event}</span>
                    <Badge variant="outline" className="text-xs">
                      {point.date}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground capitalize">
                    {point.type} • {point.impact} impact
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

