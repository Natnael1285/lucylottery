// components/financial-tracking.tsx
"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, DollarSign, Ticket, Users } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Types matching your frontend data structure
interface Transaction {
  id: string;
  institution: "telebirr" | "cbe" | "lucy-lottery";
  date: string;
  type: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  userId?: string;
  userPhone?: string;
  ticketCode?: string;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  institution: "telebirr" | "cbe" | "lucy-lottery";
  totalTicketsPurchased: number;
  totalAmountSpent: number;
  isActive: boolean;
  phoneNumber: string;
}

interface InstitutionStats {
  institution: "telebirr" | "cbe" | "lucy-lottery";
  totalRevenue: number;
  totalTransactions: number;
  activeUsers: number;
  ticketSales: number;
  netProfit: number;
}

interface ProfitDistribution {
  institution: "telebirr" | "cbe" | "lucy-lottery";
  partnerName: string;
  totalRevenue: number;
  lucyShare: number;
  partnerShare: number;
  lucyAmount: number;
  partnerAmount: number;
  status: "paid" | "pending";
}

interface ParticipantStats {
  totalParticipants: number;
  activeParticipants: number;
  totalTicketsPurchased: number;
  totalAmountSpent: number;
  participantsByInstitution: {
    telebirr: number;
    cbe: number;
  };
}

interface RevenueData {
  day: string;
  telebirr: number;
  cbe: number;
  lucy: number;
}

interface ApiResponse {
  institutionStats: InstitutionStats[];
  revenueData: RevenueData[];
  profitDistributions: ProfitDistribution[];
  participantStats: ParticipantStats;
  transactions: Transaction[];
  participants: Participant[];
  profitSharingConfigs: any[];
}

const chartConfig = {
  telebirr: {
    label: "Telebirr",
    color: "hsl(var(--chart-1))",
  },
  cbe: {
    label: "CBE",
    color: "hsl(var(--chart-2))",
  },
  lucy: {
    label: "Lucy Lottery",
    color: "hsl(var(--chart-3))",
  },
};

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getInstitutionDisplayName = (institution: string): string => {
  switch (institution) {
    case "telebirr":
      return "Telebirr";
    case "cbe":
      return "CBE";
    case "lucy-lottery":
      return "Lucy Lottery";
    default:
      return institution;
  }
};

const getInstitutionColor = (institution: string): string => {
  switch (institution) {
    case "telebirr":
      return "hsl(var(--chart-1))";
    case "cbe":
      return "hsl(var(--chart-2))";
    case "lucy-lottery":
      return "hsl(var(--chart-3))";
    default:
      return "hsl(var(--muted-foreground))";
  }
};

const generateInstitutionPieData = (
  participants: Participant[],
  transactions: Transaction[]
) => {
  const result: Record<
    string,
    Array<{ name: string; value: number; color: string }>
  > = {
    telebirr: [],
    cbe: [],
    "lucy-lottery": [],
  };

  // For each institution, generate pie data based on transaction types
  ["telebirr", "cbe", "lucy-lottery"].forEach((institution) => {
    const instParticipants = participants.filter(
      (p) => p.institution === institution
    );
    const totalTickets = instParticipants.reduce(
      (sum, p) => sum + p.totalTicketsPurchased,
      0
    );

    if (totalTickets > 0) {
      result[institution] = [
        {
          name: "Daily",
          value: Math.floor(totalTickets * 0.4),
          color: "hsl(var(--chart-1))",
        },
        {
          name: "Weekly",
          value: Math.floor(totalTickets * 0.35),
          color: "hsl(var(--chart-2))",
        },
        {
          name: "Monthly",
          value: Math.floor(totalTickets * 0.25),
          color: "hsl(var(--chart-3))",
        },
      ];
    }
  });

  return result;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function FinancialTracking() {
  const [profitSharingEnabled, setProfitSharingEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInstitution, setSelectedInstitution] = useState<
    "telebirr" | "cbe" | "lucy-lottery" | "all"
  >("all");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/lucy/financial-tracking`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching financial tracking data:", error);
      setError("Failed to load financial data");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Financial Tracking
          </h2>
          <p className="text-muted-foreground">Loading financial data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Financial Tracking
          </h2>
          <p className="text-muted-foreground">Failed to load financial data</p>
        </div>
      </div>
    );
  }

  const {
    institutionStats,
    revenueData,
    profitDistributions,
    participantStats,
    transactions,
    participants,
  } = data;

  // Filter transactions by selected institution
  const filteredTransactions =
    selectedInstitution === "all"
      ? transactions
      : transactions.filter((t) => t.institution === selectedInstitution);

  // Filter participants by selected institution
  const filteredParticipants =
    selectedInstitution === "all"
      ? participants
      : participants.filter((p) => p.institution === selectedInstitution);

  // Generate separate pie chart data for each institution
  const institutionPieData = generateInstitutionPieData(
    participants,
    transactions
  );

  // Calculate pie chart data for profit distribution
  const pieData = profitDistributions.map((dist) => ({
    name: dist.partnerName,
    value: dist.totalRevenue,
    color: getInstitutionColor(dist.institution),
    lucyShare: dist.lucyShare,
    partnerShare: dist.partnerShare,
  }));

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Financial Tracking
          </h2>
          <p className="text-muted-foreground">
            Monitor revenue, transactions, and profit sharing
          </p>
        </div>

        {/* Institution Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {institutionStats.map((stats, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-card to-card/80 border-primary/20"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">
                  {getInstitutionDisplayName(stats.institution)}
                </CardTitle>
                <Building2 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">
                  {formatCurrency(stats.totalRevenue)}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>{stats.totalTransactions} transactions</span>
                  <span className="text-primary">
                    {stats.activeUsers} users
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{stats.ticketSales} tickets</span>
                  <span className="text-secondary">
                    {formatCurrency(stats.netProfit)} profit
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Total Summary Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">
                Total System
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(
                  institutionStats.reduce(
                    (sum, stats) => sum + stats.totalRevenue,
                    0
                  )
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>
                  {institutionStats.reduce(
                    (sum, stats) => sum + stats.totalTransactions,
                    0
                  )}{" "}
                  total transactions
                </span>
                <span className="text-primary">+12.5%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="revenue">Revenue Reports</TabsTrigger>
            <TabsTrigger value="profit">Profit Sharing</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Multi-Institution Bar Chart */}
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">
                    Daily Revenue by Institution
                  </CardTitle>
                  <CardDescription>
                    Revenue breakdown by partner for the last 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                        />
                        <XAxis
                          dataKey="day"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                          dataKey="telebirr"
                          fill="hsl(var(--chart-1))"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="cbe"
                          fill="hsl(var(--chart-2))"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="lucy"
                          fill="hsl(var(--chart-3))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Institution Performance Stats */}
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">
                    Institution Performance
                  </CardTitle>
                  <CardDescription>
                    Key metrics by partner institution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {institutionStats.map((stats, index) => (
                    <div
                      key={stats.institution}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: getInstitutionColor(
                              stats.institution
                            ),
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium text-card-foreground">
                            {getInstitutionDisplayName(stats.institution)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {stats.totalTransactions} transactions •{" "}
                            {stats.activeUsers} users
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-card-foreground">
                          {formatCurrency(stats.totalRevenue)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(stats.netProfit)} profit
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Total System Revenue
                      </span>
                      <span className="font-semibold text-primary">
                        {formatCurrency(
                          institutionStats.reduce(
                            (sum, stats) => sum + stats.totalRevenue,
                            0
                          )
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Total Active Users
                      </span>
                      <span className="font-semibold text-primary">
                        {institutionStats.reduce(
                          (sum, stats) => sum + stats.activeUsers,
                          0
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profit" className="space-y-4">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-card-foreground">
                      Profit Sharing Settings
                    </CardTitle>
                    <CardDescription>
                      Enable or disable automatic profit distribution
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Label
                      htmlFor="profit-sharing-toggle"
                      className="text-sm font-medium text-card-foreground"
                    >
                      {profitSharingEnabled ? "Enabled" : "Disabled"}
                    </Label>
                    <Switch
                      id="profit-sharing-toggle"
                      checked={profitSharingEnabled}
                      onCheckedChange={setProfitSharingEnabled}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {profitSharingEnabled
                    ? "Automatic profit sharing is currently active. Partners will receive their share according to the distribution percentages."
                    : "Automatic profit sharing is currently disabled. Manual distribution is required."}
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-2">
              {/* Pie Chart */}
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">
                    Profit Distribution
                  </CardTitle>
                  <CardDescription>
                    Revenue sharing breakdown by partner
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error ? (
                    <div className="h-[300px] flex items-center justify-center text-destructive">
                      <p>Error loading chart: {error}</p>
                    </div>
                  ) : (
                    <ChartContainer
                      config={chartConfig}
                      className="h-[300px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(props: any) => {
                              try {
                                const { name, percent } = props;
                                return `${name} ${(percent * 100).toFixed(0)}%`;
                              } catch (err) {
                                console.error("Error in pie chart label:", err);
                                return `${props.name || "Unknown"} ${(
                                  (props.percent || 0) * 100
                                ).toFixed(0)}%`;
                              }
                            }}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  )}
                </CardContent>
              </Card>

              {/* Partner Profit Sharing Table */}
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">
                    Partner Profit Sharing
                  </CardTitle>
                  <CardDescription>
                    Revenue distribution based on partnership agreements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground">
                          Partner
                        </TableHead>
                        <TableHead className="text-foreground">
                          Total Revenue
                        </TableHead>
                        <TableHead className="text-foreground">
                          Lucy Share
                        </TableHead>
                        <TableHead className="text-foreground">
                          Partner Share
                        </TableHead>
                        <TableHead className="text-foreground">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profitDistributions.map((distribution, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-card-foreground">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: getInstitutionColor(
                                    distribution.institution
                                  ),
                                }}
                              />
                              {distribution.partnerName}
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-primary">
                            {formatCurrency(distribution.totalRevenue)}
                          </TableCell>
                          <TableCell className="text-card-foreground">
                            <div>
                              <div className="font-medium">
                                {formatCurrency(distribution.lucyAmount)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {distribution.lucyShare}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-card-foreground">
                            <div>
                              <div className="font-medium">
                                {formatCurrency(distribution.partnerAmount)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {distribution.partnerShare}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                distribution.status === "paid"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {distribution.status === "paid"
                                ? "Paid"
                                : "Pending"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="participants" className="space-y-4">
            {/* Participant Overview Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-primary">
                    Total Participants
                  </CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {participantStats.totalParticipants}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {participantStats.activeParticipants} active
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-secondary">
                    Total Tickets
                  </CardTitle>
                  <Ticket className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">
                    {participantStats.totalTicketsPurchased}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(participantStats.totalAmountSpent)} spent
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-chart-1/10 to-chart-1/5 border-chart-1/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle
                    className="text-sm font-medium"
                    style={{ color: "hsl(var(--chart-1))" }}
                  >
                    Telebirr Users
                  </CardTitle>
                  <Building2
                    className="h-4 w-4"
                    style={{ color: "hsl(var(--chart-1))" }}
                  />
                </CardHeader>
                <CardContent>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "hsl(var(--chart-1))" }}
                  >
                    {participantStats.participantsByInstitution.telebirr}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (participantStats.participantsByInstitution.telebirr /
                        participantStats.totalParticipants) *
                      100
                    ).toFixed(1)}
                    % of total
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle
                    className="text-sm font-medium"
                    style={{ color: "hsl(var(--chart-2))" }}
                  >
                    CBE Users
                  </CardTitle>
                  <Building2
                    className="h-4 w-4"
                    style={{ color: "hsl(var(--chart-2))" }}
                  />
                </CardHeader>
                <CardContent>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "hsl(var(--chart-2))" }}
                  >
                    {participantStats.participantsByInstitution.cbe}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {(
                      (participantStats.participantsByInstitution.cbe /
                        participantStats.totalParticipants) *
                      100
                    ).toFixed(1)}
                    % of total
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Institution-specific Pie Charts */}
            <div className="grid gap-4 lg:grid-cols-3">
              {(["telebirr", "cbe", "lucy-lottery"] as const).map(
                (institution) => {
                  const pieData = institutionPieData[institution];
                  const institutionParticipants = participants.filter(
                    (p) => p.institution === institution
                  );

                  return (
                    <Card key={institution} className="bg-card">
                      <CardHeader>
                        <CardTitle className="text-card-foreground flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: getInstitutionColor(institution),
                            }}
                          />
                          {getInstitutionDisplayName(institution)} Participants
                        </CardTitle>
                        <CardDescription>
                          Lottery participation breakdown by type
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {pieData && pieData.length > 0 ? (
                          <ChartContainer
                            config={chartConfig}
                            className="h-[250px] w-full"
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={pieData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={(props: any) => {
                                    try {
                                      const { name, percent } = props;
                                      return `${name} ${(percent * 100).toFixed(
                                        0
                                      )}%`;
                                    } catch (err) {
                                      console.error(
                                        "Error in pie chart label:",
                                        err
                                      );
                                      return `${props.name || "Unknown"} ${(
                                        (props.percent || 0) * 100
                                      ).toFixed(0)}%`;
                                    }
                                  }}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {pieData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.color}
                                    />
                                  ))}
                                </Pie>
                                <ChartTooltip
                                  content={<ChartTooltipContent />}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        ) : (
                          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                            No participation data available
                          </div>
                        )}

                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Total Participants
                            </span>
                            <span className="font-semibold">
                              {institutionParticipants.length}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Active Users
                            </span>
                            <span className="font-semibold text-primary">
                              {
                                institutionParticipants.filter(
                                  (p) => p.isActive
                                ).length
                              }
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Total Spent
                            </span>
                            <span className="font-semibold text-secondary">
                              {formatCurrency(
                                institutionParticipants.reduce(
                                  (sum, p) => sum + p.totalAmountSpent,
                                  0
                                )
                              )}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
              )}
            </div>

            {/* Participant List */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Participant Details
                </CardTitle>
                <CardDescription>
                  {selectedInstitution === "all"
                    ? "All participants across all institutions"
                    : `${getInstitutionDisplayName(
                        selectedInstitution
                      )} participants`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Name</TableHead>
                      <TableHead className="text-foreground">
                        Institution
                      </TableHead>
                      <TableHead className="text-foreground">Email</TableHead>
                      <TableHead className="text-foreground">Tickets</TableHead>
                      <TableHead className="text-foreground">
                        Amount Spent
                      </TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium text-card-foreground">
                          {participant.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: getInstitutionColor(
                                  participant.institution
                                ),
                              }}
                            />
                            <span className="text-sm font-medium">
                              {getInstitutionDisplayName(
                                participant.institution
                              )}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-card-foreground">
                          {participant.email}
                        </TableCell>
                        <TableCell className="text-card-foreground">
                          {participant.totalTicketsPurchased}
                        </TableCell>
                        <TableCell className="font-semibold text-primary">
                          {formatCurrency(participant.totalAmountSpent)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              participant.isActive ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {participant.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            {/* Institution Filter */}
            <Card className="bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-card-foreground">
                      Transaction History
                    </CardTitle>
                    <CardDescription>
                      Filter transactions by institution
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        selectedInstitution === "all" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedInstitution("all")}
                    >
                      All Institutions
                    </Button>
                    <Button
                      variant={
                        selectedInstitution === "telebirr"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedInstitution("telebirr")}
                    >
                      Telebirr
                    </Button>
                    <Button
                      variant={
                        selectedInstitution === "cbe" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedInstitution("cbe")}
                    >
                      CBE
                    </Button>
                    <Button
                      variant={
                        selectedInstitution === "lucy-lottery"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedInstitution("lucy-lottery")}
                    >
                      Lucy Lottery
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">
                        Transaction ID
                      </TableHead>
                      <TableHead className="text-foreground">
                        Institution
                      </TableHead>
                      <TableHead className="text-foreground">Date</TableHead>
                      <TableHead className="text-foreground">Type</TableHead>
                      <TableHead className="text-foreground">Amount</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-card-foreground">
                          {transaction.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: getInstitutionColor(
                                  transaction.institution
                                ),
                              }}
                            />
                            <span className="text-sm font-medium">
                              {getInstitutionDisplayName(
                                transaction.institution
                              )}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-card-foreground">
                          {new Date(transaction.date).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-card-foreground">
                          <Badge variant="outline" className="text-xs">
                            {transaction.type.replace("-", " ").toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-primary">
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {transaction.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
}
