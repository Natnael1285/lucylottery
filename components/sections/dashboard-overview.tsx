"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Ticket, Trophy, TrendingUp, Activity } from "lucide-react"
import { Line, LineChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const revenueData = [
  { date: "Mon", transaction: 45000, daily: 32000, weekly: 18000, monthly: 12000 },
  { date: "Tue", transaction: 52000, daily: 38000, weekly: 22000, monthly: 15000 },
  { date: "Wed", transaction: 48000, daily: 35000, weekly: 20000, monthly: 13000 },
  { date: "Thu", transaction: 61000, daily: 42000, weekly: 25000, monthly: 18000 },
  { date: "Fri", transaction: 55000, daily: 39000, weekly: 23000, monthly: 16000 },
  { date: "Sat", transaction: 72000, daily: 51000, weekly: 30000, monthly: 22000 },
  { date: "Sun", transaction: 68000, daily: 48000, weekly: 28000, monthly: 20000 },
]

const participantData = [
  { type: "Transaction", count: 8500 },
  { type: "Daily", count: 6200 },
  { type: "Weekly", count: 3800 },
  { type: "Monthly", count: 2100 },
]

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
}

const participantChartConfig = {
  count: {
    label: "Participants",
    color: "hsl(var(--chart-1))",
  }
}

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome to Lucy Lottery Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">20,600</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+18.2%</span> from last week
            </p>
            <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
              <span>Transaction: 8,500</span>
              <span>Daily: 6,200 | Weekly: 3,800 | Monthly: 2,100</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">3,456,789 ETB</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-secondary">+22.5%</span> from last week
            </p>
            <div className="mt-2 text-xs text-muted-foreground">Today: 68,000 ETB</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Active Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">52,340</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+15.8%</span> from last week
            </p>
            <div className="mt-2 text-xs text-muted-foreground">Pending draws: 48,120</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Prize Pool</CardTitle>
            <Trophy className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">2,145,000 ETB</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-secondary">+19.3%</span> from last week
            </p>
            <div className="mt-2 text-xs text-muted-foreground">Winners this week: 84</div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Revenue by Lottery Type</CardTitle>
          <CardDescription>Daily revenue breakdown for the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
            <CardTitle className="text-card-foreground">Participants by Lottery Type</CardTitle>
            <CardDescription>Current active participants</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={participantChartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={participantData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
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
                <span className="text-sm text-muted-foreground">Participation Rate</span>
                <span className="text-sm font-bold text-foreground">92.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average Entry Value</span>
                <span className="text-sm font-bold text-foreground">167.8 ETB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="text-sm font-bold text-foreground">4.1%</span>
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
                <span className="text-sm text-muted-foreground">Telebirr API</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">CBEbirr API</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">RNG System</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">Operational</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
