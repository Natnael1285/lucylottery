"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Settings, History, Users, TrendingUp } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const participants = [
  {
    id: 1,
    username: "user_7721",
    lotteryNumber: "111222333444",
    purchaseTime: "2025-09-05 11:34:22",
    ticketPrice: "100 ETB",
  },
  {
    id: 2,
    username: "user_3365",
    lotteryNumber: "222333444555",
    purchaseTime: "2025-09-12 15:47:18",
    ticketPrice: "100 ETB",
  },
  {
    id: 3,
    username: "user_8809",
    lotteryNumber: "333444555666",
    purchaseTime: "2025-09-18 09:22:45",
    ticketPrice: "100 ETB",
  },
  {
    id: 4,
    username: "user_1143",
    lotteryNumber: "444555666777",
    purchaseTime: "2025-09-23 17:55:33",
    ticketPrice: "100 ETB",
  },
  {
    id: 5,
    username: "user_6687",
    lotteryNumber: "555666777888",
    purchaseTime: "2025-09-27 13:11:09",
    ticketPrice: "100 ETB",
  },
]

const winners = [
  {
    position: "1st Place",
    username: "user_9921",
    lotteryNumber: "666777888999",
    prize: "500,000 ETB",
    date: "2025-09-30",
  },
  {
    position: "2nd Place",
    username: "user_4465",
    lotteryNumber: "777888999000",
    prize: "300,000 ETB",
    date: "2025-09-30",
  },
  {
    position: "3rd Place",
    username: "user_2209",
    lotteryNumber: "888999000111",
    prize: "200,000 ETB",
    date: "2025-09-30",
  },
]

const drawHistory = [
  {
    date: "2025-08-31",
    winner1: "user_5543 (480,000 ETB)",
    winner2: "user_9887 (288,000 ETB)",
    winner3: "user_2221 (192,000 ETB)",
    totalPool: "960,000 ETB",
    participants: 9600,
  },
  {
    date: "2025-07-31",
    winner1: "user_7765 (520,000 ETB)",
    winner2: "user_3309 (312,000 ETB)",
    winner3: "user_8881 (208,000 ETB)",
    totalPool: "1,040,000 ETB",
    participants: 10400,
  },
  {
    date: "2025-06-30",
    winner1: "user_1123 (450,000 ETB)",
    winner2: "user_6667 (270,000 ETB)",
    winner3: "user_4445 (180,000 ETB)",
    totalPool: "900,000 ETB",
    participants: 9000,
  },
]

const salesData = [
  { month: "Jan", tickets: 8200, revenue: 820000 },
  { month: "Feb", tickets: 8800, revenue: 880000 },
  { month: "Mar", tickets: 9100, revenue: 910000 },
  { month: "Apr", tickets: 9600, revenue: 960000 },
  { month: "May", tickets: 10200, revenue: 1020000 },
  { month: "Jun", tickets: 9000, revenue: 900000 },
]

const chartConfig = {
  tickets: {
    label: "Tickets Sold",
    color: "hsl(var(--chart-4))",
  },
  revenue: {
    label: "Revenue (ETB)",
    color: "hsl(var(--chart-2))",
  },
}

export function MonthlyLottery() {
  const [ticketPrice, setTicketPrice] = useState("100")
  const [govCut, setGovCut] = useState("15")
  const [prize1, setPrize1] = useState("50")
  const [prize2, setPrize2] = useState("30")
  const [prize3, setPrize3] = useState("20")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Monthly Lottery</h2>
        <p className="text-muted-foreground">Monthly draw with 3 winners</p>
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
              <CardTitle>This Month's Participants</CardTitle>
              <CardDescription>Users who purchased monthly lottery tickets</CardDescription>
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
              <CardTitle>This Month's Winners</CardTitle>
              <CardDescription>3 monthly winners with prize breakdown</CardDescription>
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
                    placeholder="100"
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
                <div className="text-2xl font-bold text-foreground">54,900</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">+18.3%</span> from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2,100</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">+15.2%</span> from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Revenue Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">5,490,000 ETB</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">+18.3%</span> from last year
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales & Participant Growth</CardTitle>
              <CardDescription>Ticket sales and revenue for the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="tickets"
                      stroke="hsl(var(--chart-4))"
                      fill="hsl(var(--chart-4))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Draw History</CardTitle>
              <CardDescription>Past monthly draws with winners and prize splits</CardDescription>
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
