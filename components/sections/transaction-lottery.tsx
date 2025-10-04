// components/transaction-lottery.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  History,
  Settings,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Participant {
  id: number;
  username: string;
  account: string;
  lotteryNumber: string;
  transactionTime: string;
  amount: string;
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
}

interface FraudAlert {
  id: number;
  type: string;
  user: string;
  description: string;
  severity: string;
  time: string;
}

interface Settings {
  govCut: string;
  prize1: string;
  prize2: string;
  prize3: string;
}

interface ApiHealth {
  telebirr: {
    status: string;
    lastChecked: string;
  };
  cbeBirr: {
    status: string;
    lastChecked: string;
  };
  failedTransactions: number;
}

interface ApiResponse {
  participants: Participant[];
  winners: Winner[];
  drawHistory: DrawHistory[];
  fraudAlerts: FraudAlert[];
  settings: Settings;
  apiHealth: ApiHealth;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function TransactionLottery() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
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
      const response = await fetch(
        `${API_BASE_URL}/api/lucy/transaction-lottery`
      );
      const result = await response.json();
      setData(result);

      // Initialize form values with current settings
      if (result.settings) {
        setGovCut(result.settings.govCut);
        setPrize1(result.settings.prize1);
        setPrize2(result.settings.prize2);
        setPrize3(result.settings.prize3);
      }
    } catch (error) {
      console.error("Error fetching transaction lottery data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/lucy/transaction-lottery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            govCut,
            prize1,
            prize2,
            prize3,
          }),
        }
      );

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
            Transaction-Based Lottery
          </h2>
          <p className="text-muted-foreground">
            Loading transaction lottery data...
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
            Transaction-Based Lottery
          </h2>
          <p className="text-muted-foreground">
            Failed to load transaction lottery data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Transaction-Based Lottery
        </h2>
        <p className="text-muted-foreground">
          Automatic deduction lottery system
        </p>
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
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="participants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Participants</CardTitle>
              <CardDescription>
                Users automatically enrolled through transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Lottery Number</TableHead>
                      <TableHead>Transaction Time</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">
                          {participant.username}
                        </TableCell>
                        <TableCell>{participant.account}</TableCell>
                        <TableCell className="font-mono text-primary">
                          {participant.lotteryNumber}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {participant.transactionTime}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {participant.amount}
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
              <CardTitle>Today's Winners</CardTitle>
              <CardDescription>
                3 daily winners with prize breakdown
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
                <CardTitle>Government Cut</CardTitle>
                <CardDescription>
                  Set the percentage for government revenue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  Save Government Cut
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

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Draw History</CardTitle>
              <CardDescription>
                Past draws with winners and prize splits
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Fraud Alerts
                </CardTitle>
                <CardDescription>
                  Suspicious activity and fraud detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.fraudAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-lg border bg-card/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            {alert.type}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {alert.user}
                          </p>
                        </div>
                        <Badge
                          variant={
                            alert.severity === "high"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {alert.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {alert.time}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  API Health Status
                </CardTitle>
                <CardDescription>Payment gateway monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-semibold text-sm">Telebirr API</p>
                      <p className="text-xs text-muted-foreground">
                        Last checked: {data.apiHealth.telebirr.lastChecked}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        data.apiHealth.telebirr.status === "Healthy"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {data.apiHealth.telebirr.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-semibold text-sm">CBEbirr API</p>
                      <p className="text-xs text-muted-foreground">
                        Last checked: {data.apiHealth.cbeBirr.lastChecked}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        data.apiHealth.cbeBirr.status === "Healthy"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {data.apiHealth.cbeBirr.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-semibold text-sm">
                        Failed Transactions
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last 24 hours
                      </p>
                    </div>
                    <span className="text-lg font-bold text-foreground">
                      {data.apiHealth.failedTransactions}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
