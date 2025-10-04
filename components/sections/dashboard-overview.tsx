// components/dashboard-overview.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Activity,
  DollarSign,
  Ticket,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface StatsData {
  totalParticipants: number;
  participantGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  activeTickets: number;
  ticketGrowth: number;
  prizePool: number;
  prizeGrowth: number;
  todayRevenue: number;
  pendingDraws: number;
  winnersThisWeek: number;
}

interface RevenueData {
  date: string;
  transaction: number;
  daily: number;
  weekly: number;
  monthly: number;
}

interface ParticipantData {
  type: string;
  count: number;
}

interface SystemMetrics {
  participationRate: number;
  averageEntryValue: number;
  winRate: number;
  systemStatus: {
    telebirr: string;
    cbeBirr: string;
    rng: string;
  };
}

interface ApiResponse {
  stats: StatsData;
  revenueData: RevenueData[];
  participantData: ParticipantData[];
  systemMetrics: SystemMetrics;
}

const chartConfig = {
  transaction: {
    label: "Transaction-Based",
    color: "hsl(var(--chart-1))",
  },
  daily: {
    label: "Daily",
    color: "hsl(var(--chart-2))",
  },
  weekly: {
    label: "Weekly",
    color: "hsl(var(--chart-3))",
  },
  monthly: {
    label: "Monthly",
    color: "hsl(var(--chart-4))",
  },
};

const participantChartConfig = {
  count: {
    label: "Participants",
    color: "hsl(var(--chart-1))",
  },
};
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function DashboardOverview() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/lucy/dashboard`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
        {/* Loading skeletons can be added here */}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground">
          Welcome to Lucy Lottery Admin Panel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Total Participants
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {data.stats.totalParticipants.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">
                +{data.stats.participantGrowth}%
              </span>{" "}
              from last week
            </p>
            <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
              <span>
                Transaction:{" "}
                {data.participantData
                  .find((p) => p.type === "Transaction")
                  ?.count.toLocaleString() || 0}
              </span>
              <span>
                Daily:{" "}
                {data.participantData
                  .find((p) => p.type === "Daily")
                  ?.count.toLocaleString() || 0}{" "}
                | Weekly:{" "}
                {data.participantData
                  .find((p) => p.type === "Weekly")
                  ?.count.toLocaleString() || 0}{" "}
                | Monthly:{" "}
                {data.participantData
                  .find((p) => p.type === "Monthly")
                  ?.count.toLocaleString() || 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {Math.round(data.stats.totalRevenue).toLocaleString()} ETB
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-secondary">
                +{data.stats.revenueGrowth}%
              </span>{" "}
              from last week
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              Today: {Math.round(data.stats.todayRevenue).toLocaleString()} ETB
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Active Tickets
            </CardTitle>
            <Ticket className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {data.stats.activeTickets.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+{data.stats.ticketGrowth}%</span>{" "}
              from last week
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              Pending draws: {data.stats.pendingDraws.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Total Prize Pool
            </CardTitle>
            <Trophy className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {Math.round(data.stats.prizePool).toLocaleString()} ETB
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-secondary">+{data.stats.prizeGrowth}%</span>{" "}
              from last week
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              Winners this week: {data.stats.winnersThisWeek}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Revenue by Lottery Type
          </CardTitle>
          <CardDescription>
            Daily revenue breakdown for the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="transaction"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="daily"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="weekly"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-3))", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="monthly"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-4))", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Participants by Type */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Participants by Lottery Type
            </CardTitle>
            <CardDescription>Current active participants</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={participantChartConfig}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.participantData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="type"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--chart-1))"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card className="bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-card-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Participation Rate
                </span>
                <span className="text-sm font-bold text-foreground">
                  {data.systemMetrics.participationRate}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Average Entry Value
                </span>
                <span className="text-sm font-bold text-foreground">
                  {data.systemMetrics.averageEntryValue.toFixed(1)} ETB
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="text-sm font-bold text-foreground">
                  {data.systemMetrics.winRate}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-card-foreground flex items-center gap-2">
                <Activity className="h-4 w-4 text-secondary" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Telebirr API
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">
                  {data.systemMetrics.systemStatus.telebirr}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  CBEbirr API
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">
                  {data.systemMetrics.systemStatus.cbeBirr}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  RNG System
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">
                  {data.systemMetrics.systemStatus.rng}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
