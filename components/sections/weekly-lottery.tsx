// components/weekly-lottery.tsx
"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Settings, TrendingUp, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Participant {
  id: number;
  username: string;
  lotteryNumber: string;
  purchaseTime: string;
  ticketPrice: string;
}

interface Winner {
  position: string;
  username: string;
  lotteryNumber: string;
  prize: string;
  date: string;
}

interface DrawHistory {
  date: string;
  winner1: string;
  winner2: string;
  winner3: string;
  totalPool: string;
  participants: number;
}

interface SalesData {
  week: string;
  tickets: number;
  revenue: number;
}

interface Analytics {
  totalTickets: number;
  ticketGrowth: number;
  totalParticipants: number;
  participantGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
}

interface SettingsData {
  ticketPrice: string;
  govCut: string;
  prize1: string;
  prize2: string;
  prize3: string;
}

interface ApiResponse {
  participants: Participant[];
  winners: Winner[];
  drawHistory: DrawHistory[];
  analytics: Analytics;
  salesData: SalesData[];
  settings: SettingsData;
}

const chartConfig = {
  tickets: {
    label: "Tickets Sold",
    color: "hsl(var(--chart-3))",
  },
  revenue: {
    label: "Revenue (ETB)",
    color: "hsl(var(--chart-2))",
  },
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function WeeklyLottery() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticketPrice, setTicketPrice] = useState("50");
  const [govCut, setGovCut] = useState("15");
  const [prize1, setPrize1] = useState("50");
  const [prize2, setPrize2] = useState("30");
  const [prize3, setPrize3] = useState("20");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/lucy/weekly-lottery`);
      const result = await response.json();
      setData(result);

      // Initialize form values with current settings
      if (result.settings) {
        setTicketPrice(result.settings.ticketPrice);
        setGovCut(result.settings.govCut);
        setPrize1(result.settings.prize1);
        setPrize2(result.settings.prize2);
        setPrize3(result.settings.prize3);
      }
    } catch (error) {
      console.error("Error fetching weekly lottery data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/lucy/weekly-lottery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketPrice,
          govCut,
          prize1,
          prize2,
          prize3,
        }),
      });

      if (response.ok) {
        // Refresh data to get updated settings
        fetchData();
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings");
    }
  };

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Weekly Lottery
          </h2>
          <p className="text-muted-foreground">
            Loading weekly lottery data...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Weekly Lottery
          </h2>
          <p className="text-muted-foreground">
            Failed to load weekly lottery data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Weekly Lottery
        </h2>
        <p className="text-muted-foreground">Weekly draw with 3 winners</p>
      </div>

      <Tabs defaultValue="participants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="participants" className="gap-2">
            <Users className="h-4 w-4" />
            Participants
          </TabsTrigger>
          <TabsTrigger value="winners" className="gap-2">
            <Trophy className="h-4 w-4" />
            Winners
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="participants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Participants</CardTitle>
              <CardDescription>
                Users who purchased weekly lottery tickets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Lottery Number</TableHead>
                      <TableHead>Purchase Time</TableHead>
                      <TableHead>Ticket Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">
                          {participant.username}
                        </TableCell>
                        <TableCell className="font-mono text-primary">
                          {participant.lotteryNumber}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {participant.purchaseTime}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {participant.ticketPrice}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="winners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Winners</CardTitle>
              <CardDescription>
                3 weekly winners with prize breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.winners.map((winner, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-card to-card/50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${
                          index === 0
                            ? "bg-primary/20 text-primary"
                            : index === 1
                            ? "bg-secondary/20 text-secondary"
                            : "bg-accent/20 text-accent"
                        }`}
                      >
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {winner.position}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {winner.username}
                        </p>
                        <p className="text-xs font-mono text-muted-foreground">
                          {winner.lotteryNumber}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        {winner.prize}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {winner.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Configuration</CardTitle>
                <CardDescription>
                  Set ticket price and government cut
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ticket-price">Ticket Price (ETB)</Label>
                  <Input
                    id="ticket-price"
                    type="number"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    placeholder="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gov-cut">Government Cut (%)</Label>
                  <Input
                    id="gov-cut"
                    type="number"
                    value={govCut}
                    onChange={(e) => setGovCut(e.target.value)}
                    placeholder="15"
                  />
                </div>
                <Button className="w-full" onClick={handleSaveSettings}>
                  Save Configuration
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prize Pool Configuration</CardTitle>
                <CardDescription>
                  Configure prize distribution among 3 winners
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prize-1">1st Place (%)</Label>
                  <Input
                    id="prize-1"
                    type="number"
                    value={prize1}
                    onChange={(e) => setPrize1(e.target.value)}
                    placeholder="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prize-2">2nd Place (%)</Label>
                  <Input
                    id="prize-2"
                    type="number"
                    value={prize2}
                    onChange={(e) => setPrize2(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prize-3">3rd Place (%)</Label>
                  <Input
                    id="prize-3"
                    type="number"
                    value={prize3}
                    onChange={(e) => setPrize3(e.target.value)}
                    placeholder="20"
                  />
                </div>
                <Button className="w-full" onClick={handleSaveSettings}>
                  Save Prize Configuration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Tickets Sold</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {data.analytics.totalTickets.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">
                    +{data.analytics.ticketGrowth}%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {data.analytics.totalParticipants.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">
                    +{data.analytics.participantGrowth}%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Revenue Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(data.analytics.totalRevenue).toLocaleString()} ETB
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">
                    +{data.analytics.revenueGrowth}%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Sales & Participant Growth</CardTitle>
              <CardDescription>
                Ticket sales and revenue for the last 4 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.salesData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="week"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="tickets"
                      fill="hsl(var(--chart-3))"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Draw History</CardTitle>
              <CardDescription>
                Past weekly draws with winners and prize splits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>1st Winner</TableHead>
                      <TableHead>2nd Winner</TableHead>
                      <TableHead>3rd Winner</TableHead>
                      <TableHead>Total Pool</TableHead>
                      <TableHead>Participants</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.drawHistory.map((draw, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {draw.date}
                        </TableCell>
                        <TableCell className="text-sm">
                          {draw.winner1}
                        </TableCell>
                        <TableCell className="text-sm">
                          {draw.winner2}
                        </TableCell>
                        <TableCell className="text-sm">
                          {draw.winner3}
                        </TableCell>
                        <TableCell className="font-semibold text-primary">
                          {draw.totalPool}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {draw.participants.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
