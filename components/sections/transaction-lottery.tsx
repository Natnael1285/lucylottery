"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Trophy, Settings, History, Users, AlertTriangle } from "lucide-react"

const participants = [
  {
    id: 1,
    username: "user_8234",
    account: "0912345678",
    lotteryNumber: "123456789012",
    transactionTime: "2025-09-29 14:23:45",
    amount: "50 ETB",
  },
  {
    id: 2,
    username: "user_5621",
    account: "0923456789",
    lotteryNumber: "234567890123",
    transactionTime: "2025-09-29 14:25:12",
    amount: "100 ETB",
  },
  {
    id: 3,
    username: "user_9847",
    account: "0934567890",
    lotteryNumber: "345678901234",
    transactionTime: "2025-09-29 14:27:33",
    amount: "75 ETB",
  },
  {
    id: 4,
    username: "user_3421",
    account: "0945678901",
    lotteryNumber: "456789012345",
    transactionTime: "2025-09-29 14:30:18",
    amount: "200 ETB",
  },
  {
    id: 5,
    username: "user_7654",
    account: "0956789012",
    lotteryNumber: "567890123456",
    transactionTime: "2025-09-29 14:32:55",
    amount: "150 ETB",
  },
]

const winners = [
  {
    position: "1st Place",
    username: "user_4521",
    lotteryNumber: "789012345678",
    prize: "50,000 ETB",
    date: "2025-09-29",
  },
  {
    position: "2nd Place",
    username: "user_8932",
    lotteryNumber: "890123456789",
    prize: "30,000 ETB",
    date: "2025-09-29",
  },
  {
    position: "3rd Place",
    username: "user_2341",
    lotteryNumber: "901234567890",
    prize: "20,000 ETB",
    date: "2025-09-29",
  },
]

const drawHistory = [
  {
    date: "2025-09-28",
    winner1: "user_1234 (45,000 ETB)",
    winner2: "user_5678 (27,000 ETB)",
    winner3: "user_9012 (18,000 ETB)",
    totalPool: "90,000 ETB",
  },
  {
    date: "2025-09-27",
    winner1: "user_3456 (48,000 ETB)",
    winner2: "user_7890 (28,800 ETB)",
    winner3: "user_2345 (19,200 ETB)",
    totalPool: "96,000 ETB",
  },
  {
    date: "2025-09-26",
    winner1: "user_6789 (42,000 ETB)",
    winner2: "user_0123 (25,200 ETB)",
    winner3: "user_4567 (16,800 ETB)",
    totalPool: "84,000 ETB",
  },
]

const fraudAlerts = [
  {
    id: 1,
    type: "Suspicious Pattern",
    user: "user_9999",
    description: "Multiple transactions from same IP",
    severity: "high",
    time: "10 mins ago",
  },
  {
    id: 2,
    type: "Failed Transaction",
    user: "user_7777",
    description: "Payment gateway timeout",
    severity: "medium",
    time: "25 mins ago",
  },
]

export function TransactionLottery() {
  const [govCut, setGovCut] = useState("15")
  const [prize1, setPrize1] = useState("50")
  const [prize2, setPrize2] = useState("30")
  const [prize3, setPrize3] = useState("20")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Transaction-Based Lottery</h2>
        <p className="text-muted-foreground">Automatic deduction lottery system</p>
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
              <CardDescription>Users automatically enrolled through transactions</CardDescription>
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
                    {participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">{participant.username}</TableCell>
                        <TableCell>{participant.account}</TableCell>
                        <TableCell className="font-mono text-primary">{participant.lotteryNumber}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{participant.transactionTime}</TableCell>
                        <TableCell className="font-semibold">{participant.amount}</TableCell>
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
              <CardDescription>3 daily winners with prize breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {winners.map((winner, index) => (
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
                        <p className="font-semibold text-foreground">{winner.position}</p>
                        <p className="text-sm text-muted-foreground">{winner.username}</p>
                        <p className="text-xs font-mono text-muted-foreground">{winner.lotteryNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{winner.prize}</p>
                      <p className="text-xs text-muted-foreground">{winner.date}</p>
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
                <CardDescription>Set the percentage for government revenue</CardDescription>
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
                <Button className="w-full">Save Government Cut</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prize Pool Configuration</CardTitle>
                <CardDescription>Configure prize distribution among 3 winners</CardDescription>
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
                <Button className="w-full">Save Prize Configuration</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Draw History</CardTitle>
              <CardDescription>Past draws with winners and prize splits</CardDescription>
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
                    {drawHistory.map((draw, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{draw.date}</TableCell>
                        <TableCell className="text-sm">{draw.winner1}</TableCell>
                        <TableCell className="text-sm">{draw.winner2}</TableCell>
                        <TableCell className="text-sm">{draw.winner3}</TableCell>
                        <TableCell className="font-semibold text-primary">{draw.totalPool}</TableCell>
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
                <CardDescription>Suspicious activity and fraud detection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {fraudAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 rounded-lg border bg-card/50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm text-foreground">{alert.type}</p>
                          <p className="text-xs text-muted-foreground">{alert.user}</p>
                        </div>
                        <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
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
                      <p className="text-xs text-muted-foreground">Last checked: 2 mins ago</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-semibold text-sm">CBEbirr API</p>
                      <p className="text-xs text-muted-foreground">Last checked: 3 mins ago</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-semibold text-sm">Failed Transactions</p>
                      <p className="text-xs text-muted-foreground">Last 24 hours</p>
                    </div>
                    <span className="text-lg font-bold text-foreground">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
