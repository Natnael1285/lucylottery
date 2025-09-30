"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, UserCheck, UserX, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const users = [
  {
    id: 1,
    name: "Abebe Kebede",
    phone: "+251-91-234-5678",
    email: "abebe.k@email.com",
    status: "opted-in",
    totalEntries: 45,
    totalSpent: "2,340 ETB",
    wins: 2,
    joinDate: "2025-08-15",
  },
  {
    id: 2,
    name: "Tigist Haile",
    phone: "+251-91-345-6789",
    email: "tigist.h@email.com",
    status: "opted-in",
    totalEntries: 32,
    totalSpent: "1,680 ETB",
    wins: 1,
    joinDate: "2025-08-20",
  },
  {
    id: 3,
    name: "Dawit Tesfaye",
    phone: "+251-91-456-7890",
    email: "dawit.t@email.com",
    status: "opted-out",
    totalEntries: 18,
    totalSpent: "920 ETB",
    wins: 0,
    joinDate: "2025-09-01",
  },
  {
    id: 4,
    name: "Meron Alemayehu",
    phone: "+251-91-567-8901",
    email: "meron.a@email.com",
    status: "opted-in",
    totalEntries: 56,
    totalSpent: "2,890 ETB",
    wins: 3,
    joinDate: "2025-07-10",
  },
  {
    id: 5,
    name: "Yohannes Bekele",
    phone: "+251-91-678-9012",
    email: "yohannes.b@email.com",
    status: "opted-in",
    totalEntries: 28,
    totalSpent: "1,450 ETB",
    wins: 1,
    joinDate: "2025-08-25",
  },
]

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">User Management</h2>
        <p className="text-muted-foreground">Manage participants and their lottery activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Users</CardTitle>
            <UserCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">12,345</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+234</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Opted In</CardTitle>
            <UserCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">10,802</div>
            <p className="text-xs text-muted-foreground">87.5% of total users</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Opted Out</CardTitle>
            <UserX className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">1,543</div>
            <p className="text-xs text-muted-foreground">12.5% of total users</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Participants</CardTitle>
          <CardDescription>Search and manage lottery participants</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, or email..."
              className="pl-10 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Name</TableHead>
                <TableHead className="text-foreground">Phone</TableHead>
                <TableHead className="text-foreground">Email</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-foreground">Total Entries</TableHead>
                <TableHead className="text-foreground">Total Spent</TableHead>
                <TableHead className="text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-card-foreground">{user.name}</TableCell>
                  <TableCell className="text-card-foreground">{user.phone}</TableCell>
                  <TableCell className="text-card-foreground">{user.email}</TableCell>
                  <TableCell>
                    {user.status === "opted-in" ? (
                      <Badge className="bg-primary text-primary-foreground">
                        <UserCheck className="h-3 w-3 mr-1" />
                        Opted In
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-secondary border-secondary">
                        <UserX className="h-3 w-3 mr-1" />
                        Opted Out
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-card-foreground">{user.totalEntries}</TableCell>
                  <TableCell className="font-semibold text-primary">{user.totalSpent}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card text-card-foreground">
                        <DialogHeader>
                          <DialogTitle className="text-card-foreground">User Details</DialogTitle>
                          <DialogDescription>Participation history and account information</DialogDescription>
                        </DialogHeader>
                        {selectedUser && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium text-card-foreground">{selectedUser.name}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium text-card-foreground">{selectedUser.phone}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium text-card-foreground">{selectedUser.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Join Date</p>
                                <p className="font-medium text-card-foreground">{selectedUser.joinDate}</p>
                              </div>
                            </div>

                            <div className="border-t border-border pt-4">
                              <h4 className="font-semibold mb-3 text-card-foreground">Participation Statistics</h4>
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Total Entries</p>
                                  <p className="text-2xl font-bold text-primary">{selectedUser.totalEntries}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Total Spent</p>
                                  <p className="text-2xl font-bold text-primary">{selectedUser.totalSpent}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Wins</p>
                                  <p className="text-2xl font-bold text-secondary">{selectedUser.wins}</p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-border pt-4">
                              <h4 className="font-semibold mb-3 text-card-foreground">Recent Activity</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Last entry</span>
                                  <span className="text-card-foreground">2025-09-29</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Last win</span>
                                  <span className="text-card-foreground">
                                    {selectedUser.wins > 0 ? "2025-09-25" : "Never"}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Average entry value</span>
                                  <span className="text-card-foreground">52 ETB</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
