"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Settings, History, Users, TrendingUp } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const participants = [
  {
    id: 1,
    username: "user_2341",
    lotteryNumber: "998877665544",
    purchaseTime: "2025-09-23 14:22:11",
    ticketPrice: "50 ETB",
  },
  {
    id: 2,
    username: "user_6785",
    lotteryNumber: "887766554433",
    purchaseTime: "2025-09-24 16:45:32",
    ticketPrice: "50 ETB",
  },
  {
    id: 3,
    username: "user_9023",
    lotteryNumber: "776655443322",
    purchaseTime: "2025-09-25 10:12:55",
    ticketPrice: "50 ETB",
  },
  {
    id: 4,
    username: "user_4562",
    lotteryNumber: "665544332211",
    purchaseTime: "2025-09-26 18:33:47",
    ticketPrice: "50 ETB",
  },
  {
    id: 5,
    username: "user_8906",
    lotteryNumber: "554433221100",
    purchaseTime: "2025-09-27 12:58:23",
    ticketPrice: "50 ETB",
  },
]

const winners = [
  {
    position: "1st Place",
    username: "user_3421",
    lotteryNumber: "443322110099",
    prize: "150,000 ETB",
    date: "2025-09-29",
  },
  {
    position: "2nd Place",
    username: "user_7865",
    lotteryNumber: "332211009988",
    prize: "90,000 ETB",
    date: "2025-09-29",
  },
  {
    position: "3rd Place",
    username: "user_1209",
    lotteryNumber: "221100998877",
    prize: "60,000 ETB",
    date: "2025-09-29",
  },
]

const drawHistory = [
  {
    date: "2025-09-22",
    winner1: "user_5543 (140,000 ETB)",
    winner2: "user_9887 (84,000 ETB)",
    winner3: "user_2221 (56,000 ETB)",
    totalPool: "280,000 ETB",
    participants: 5600,
  },
  {
    date: "2025-09-15",
    winner1: "user_7765 (160,000 ETB)",
    winner2: "user_3309 (96,000 ETB)",
    winner3: "user_8881 (64,000 ETB)",
    totalPool: "320,000 ETB",
    participants: 6400,
  },
  {
    date: "2025-09-08",
    winner1: "user_1123 (125,000 ETB)",
    winner2: "user_6667 (75,000 ETB)",
    winner3: "user_4445 (50,000 ETB)",
    totalPool: "250,000 ETB",
    participants: 5000,
  },
]

const salesData = [
  { week: "Week 1", tickets: 4200, revenue: 210000 },
  { week: "Week 2", tickets: 4800, revenue: 240000 },
  { week: "Week 3", tickets: 5100, revenue: 255000 },
  { week: "Week 4", tickets: 5600, revenue: 280000 },
]

const chartConfig = {
  tickets: {
    label: "Tickets Sold",
    color: "hsl(var(--chart-3))",
  },
  revenue: {
    label: "Revenue (ETB)",
    color: "hsl(var(--chart-2))",
  },
}

export function WeeklyLottery() {
  const [ticketPrice, setTicketPrice] = useState("50")
  const [govCut, setGovCut] = useState("15")
  const [prize1, setPrize1] = useState("50")
  const [prize2, setPrize2] = useState("30")
  const [prize3, setPrize3] = useState("20")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Weekly Lottery</h2>
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
              <CardDescription>Users who purchased weekly lottery tickets</CardDescription>
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
                    {participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">{participant.username}</TableCell>
                        <TableCell className="font-mono text-primary">{participant.lotteryNumber}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{participant.purchaseTime}</TableCell>
                        <TableCell className="font-semibold">{participant.ticketPrice}</TableCell>
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
              <CardDescription>3 weekly winners with prize breakdown</CardDescription>
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
                <CardTitle>Ticket Configuration</CardTitle>
                <CardDescription>Set ticket price and government cut</CardDescription>
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
                <Button className="w-full">Save Configuration</Button>
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Tickets Sold</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">19,700</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">+16.7%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">3,800</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">+13.5%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Revenue Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">985,000 ETB</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">+16.7%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Sales & Participant Growth</CardTitle>
              <CardDescription>Ticket sales and revenue for the last 4 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="tickets" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} />
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
              <CardDescription>Past weekly draws with winners and prize splits</CardDescription>
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
                    {drawHistory.map((draw, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{draw.date}</TableCell>
                        <TableCell className="text-sm">{draw.winner1}</TableCell>
                        <TableCell className="text-sm">{draw.winner2}</TableCell>
                        <TableCell className="text-sm">{draw.winner3}</TableCell>
                        <TableCell className="font-semibold text-primary">{draw.totalPool}</TableCell>
                        <TableCell className="text-muted-foreground">{draw.participants}</TableCell>
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
  )
}
