"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, Trophy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const scheduledDraws = [
  { id: 1, date: "2025-09-29", time: "18:00", status: "completed", entries: 2650, prizePool: "150,000 ETB" },
  { id: 2, date: "2025-09-30", time: "18:00", status: "scheduled", entries: 2340, prizePool: "145,000 ETB" },
  { id: 3, date: "2025-10-01", time: "18:00", status: "scheduled", entries: 0, prizePool: "140,000 ETB" },
  { id: 4, date: "2025-10-02", time: "18:00", status: "scheduled", entries: 0, prizePool: "140,000 ETB" },
]

const latestWinners = [
  {
    id: 1,
    name: "Abebe Kebede",
    phone: "+251-91-234-5678",
    prize: "50,000 ETB",
    drawDate: "2025-09-29",
    approvalStatus: "approved",
    disbursementStatus: "completed",
  },
  {
    id: 2,
    name: "Tigist Haile",
    phone: "+251-91-345-6789",
    prize: "30,000 ETB",
    drawDate: "2025-09-29",
    approvalStatus: "approved",
    disbursementStatus: "pending",
  },
  {
    id: 3,
    name: "Dawit Tesfaye",
    phone: "+251-91-456-7890",
    prize: "20,000 ETB",
    drawDate: "2025-09-29",
    approvalStatus: "pending",
    disbursementStatus: "pending",
  },
  {
    id: 4,
    name: "Meron Alemayehu",
    phone: "+251-91-567-8901",
    prize: "15,000 ETB",
    drawDate: "2025-09-28",
    approvalStatus: "approved",
    disbursementStatus: "completed",
  },
]

const pastDraws = [
  { id: 1, date: "2025-09-28", entries: 2890, winners: 18, totalPrizes: "155,000 ETB" },
  { id: 2, date: "2025-09-27", entries: 2340, winners: 15, totalPrizes: "145,000 ETB" },
  { id: 3, date: "2025-09-26", entries: 1920, winners: 12, totalPrizes: "135,000 ETB" },
  { id: 4, date: "2025-09-25", entries: 1680, winners: 10, totalPrizes: "125,000 ETB" },
  { id: 5, date: "2025-09-24", entries: 1450, winners: 9, totalPrizes: "120,000 ETB" },
]

export function LotteryManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Lottery Management</h2>
        <p className="text-muted-foreground">Manage draws, winners, and lottery operations</p>
      </div>

      <Tabs defaultValue="draws" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="draws">Scheduled Draws</TabsTrigger>
          <TabsTrigger value="winners">Winners</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="draws" className="space-y-4">
          {/* Latest Draw Results */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-card-foreground">Latest Draw Results</CardTitle>
                  <CardDescription>September 29, 2025 - 18:00</CardDescription>
                </div>
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Entries</p>
                  <p className="text-2xl font-bold text-card-foreground">2,650</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prize Pool</p>
                  <p className="text-2xl font-bold text-card-foreground">150,000 ETB</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Winners</p>
                  <p className="text-2xl font-bold text-card-foreground">15</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Draws Table */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Scheduled Daily Draws</CardTitle>
              <CardDescription>Upcoming lottery draws and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Date</TableHead>
                    <TableHead className="text-foreground">Time</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">Entries</TableHead>
                    <TableHead className="text-foreground">Prize Pool</TableHead>
                    <TableHead className="text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledDraws.map((draw) => (
                    <TableRow key={draw.id}>
                      <TableCell className="text-card-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {draw.date}
                        </div>
                      </TableCell>
                      <TableCell className="text-card-foreground">{draw.time}</TableCell>
                      <TableCell>
                        {draw.status === "completed" ? (
                          <Badge className="bg-primary text-primary-foreground">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-secondary border-secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Scheduled
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-card-foreground">{draw.entries.toLocaleString()}</TableCell>
                      <TableCell className="text-card-foreground">{draw.prizePool}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="winners" className="space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Winners List</CardTitle>
              <CardDescription>Recent lottery winners and disbursement status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Name</TableHead>
                    <TableHead className="text-foreground">Phone</TableHead>
                    <TableHead className="text-foreground">Prize</TableHead>
                    <TableHead className="text-foreground">Draw Date</TableHead>
                    <TableHead className="text-foreground">Approval</TableHead>
                    <TableHead className="text-foreground">Disbursement</TableHead>
                    <TableHead className="text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latestWinners.map((winner) => (
                    <TableRow key={winner.id}>
                      <TableCell className="font-medium text-card-foreground">{winner.name}</TableCell>
                      <TableCell className="text-card-foreground">{winner.phone}</TableCell>
                      <TableCell className="font-semibold text-primary">{winner.prize}</TableCell>
                      <TableCell className="text-card-foreground">{winner.drawDate}</TableCell>
                      <TableCell>
                        {winner.approvalStatus === "approved" ? (
                          <Badge className="bg-primary text-primary-foreground">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approved
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-secondary border-secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {winner.disbursementStatus === "completed" ? (
                          <Badge className="bg-primary text-primary-foreground">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-secondary border-secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {winner.approvalStatus === "pending" && (
                            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                              Approve
                            </Button>
                          )}
                          {winner.disbursementStatus === "pending" && winner.approvalStatus === "approved" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-secondary border-secondary hover:bg-secondary/10 bg-transparent"
                            >
                              Disburse
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Past Draws</CardTitle>
              <CardDescription>Historical lottery draw results</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Date</TableHead>
                    <TableHead className="text-foreground">Total Entries</TableHead>
                    <TableHead className="text-foreground">Winners</TableHead>
                    <TableHead className="text-foreground">Total Prizes</TableHead>
                    <TableHead className="text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastDraws.map((draw) => (
                    <TableRow key={draw.id}>
                      <TableCell className="text-card-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {draw.date}
                        </div>
                      </TableCell>
                      <TableCell className="text-card-foreground">{draw.entries.toLocaleString()}</TableCell>
                      <TableCell className="text-card-foreground">{draw.winners}</TableCell>
                      <TableCell className="font-semibold text-primary">{draw.totalPrizes}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          View Details
                        </Button>
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
  )
}
