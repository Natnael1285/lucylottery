"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Megaphone, Send, Calendar, Eye } from "lucide-react"

const campaigns = [
  {
    id: 1,
    title: "New Year Mega Draw",
    type: "Marketing",
    status: "active",
    startDate: "2025-09-20",
    endDate: "2025-12-31",
    reach: "12,345 users",
  },
  {
    id: 2,
    title: "Winner Announcement - September",
    type: "Announcement",
    status: "completed",
    startDate: "2025-09-29",
    endDate: "2025-09-29",
    reach: "15,230 users",
  },
  {
    id: 3,
    title: "Double Prize Weekend",
    type: "Marketing",
    status: "scheduled",
    startDate: "2025-10-05",
    endDate: "2025-10-07",
    reach: "0 users",
  },
]

const recentNotifications = [
  {
    id: 1,
    title: "Congratulations! You won 50,000 ETB",
    recipient: "Winners",
    sentAt: "2025-09-29 18:45",
    status: "sent",
  },
  {
    id: 2,
    title: "Daily draw starting in 1 hour",
    recipient: "All Participants",
    sentAt: "2025-09-29 17:00",
    status: "sent",
  },
  {
    id: 3,
    title: "Your entry has been confirmed",
    recipient: "New Participants",
    sentAt: "2025-09-29 16:30",
    status: "sent",
  },
]

export function ContentManagement() {
  const [notificationTitle, setNotificationTitle] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationRecipient, setNotificationRecipient] = useState("all")

  const [campaignTitle, setCampaignTitle] = useState("")
  const [campaignDescription, setCampaignDescription] = useState("")
  const [campaignType, setCampaignType] = useState("marketing")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Content Management</h2>
        <p className="text-muted-foreground">Manage notifications, announcements, and marketing campaigns</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="notifications">Push Notifications</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Notification Form */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Send Push Notification
                </CardTitle>
                <CardDescription>Send notifications to winners or all participants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-card-foreground">
                    Recipient
                  </Label>
                  <Select value={notificationRecipient} onValueChange={setNotificationRecipient}>
                    <SelectTrigger id="recipient" className="bg-background text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card text-card-foreground">
                      <SelectItem value="all">All Participants</SelectItem>
                      <SelectItem value="winners">Winners Only</SelectItem>
                      <SelectItem value="active">Active Participants</SelectItem>
                      <SelectItem value="new">New Participants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-card-foreground">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter notification title"
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                    className="bg-background text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-card-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Enter notification message"
                    rows={4}
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    className="bg-background text-foreground"
                  />
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Total Notifications Sent</CardTitle>
                  <Bell className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">1,234</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-card/80 border-secondary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Active Campaigns</CardTitle>
                  <Megaphone className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">3</div>
                  <p className="text-xs text-muted-foreground">Running campaigns</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-sm text-card-foreground">Recent Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentNotifications.slice(0, 3).map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Bell className="h-4 w-4 text-primary mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-card-foreground truncate">{notif.title}</p>
                        <p className="text-xs text-muted-foreground">{notif.recipient}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Campaign Form */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-secondary" />
                  Create Campaign
                </CardTitle>
                <CardDescription>Create announcements and marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-type" className="text-card-foreground">
                    Campaign Type
                  </Label>
                  <Select value={campaignType} onValueChange={setCampaignType}>
                    <SelectTrigger id="campaign-type" className="bg-background text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card text-card-foreground">
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="promotion">Promotion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-title" className="text-card-foreground">
                    Campaign Title
                  </Label>
                  <Input
                    id="campaign-title"
                    placeholder="Enter campaign title"
                    value={campaignTitle}
                    onChange={(e) => setCampaignTitle(e.target.value)}
                    className="bg-background text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-description" className="text-card-foreground">
                    Description
                  </Label>
                  <Textarea
                    id="campaign-description"
                    placeholder="Enter campaign description"
                    rows={4}
                    value={campaignDescription}
                    onChange={(e) => setCampaignDescription(e.target.value)}
                    className="bg-background text-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-card-foreground">
                      Start Date
                    </Label>
                    <Input id="start-date" type="date" className="bg-background text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="text-card-foreground">
                      End Date
                    </Label>
                    <Input id="end-date" type="date" className="bg-background text-foreground" />
                  </div>
                </div>

                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Megaphone className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>

            {/* Campaigns List */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Active Campaigns</CardTitle>
                <CardDescription>Manage your marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Campaign</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-card-foreground">{campaign.title}</p>
                            <p className="text-xs text-muted-foreground">{campaign.type}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {campaign.status === "active" ? (
                            <Badge className="bg-primary text-primary-foreground">Active</Badge>
                          ) : campaign.status === "scheduled" ? (
                            <Badge variant="outline" className="text-secondary border-secondary">
                              Scheduled
                            </Badge>
                          ) : (
                            <Badge variant="outline">Completed</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Notification History</CardTitle>
              <CardDescription>All sent notifications and campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Title</TableHead>
                    <TableHead className="text-foreground">Recipient</TableHead>
                    <TableHead className="text-foreground">Sent At</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentNotifications.map((notif) => (
                    <TableRow key={notif.id}>
                      <TableCell className="font-medium text-card-foreground">{notif.title}</TableCell>
                      <TableCell className="text-card-foreground">{notif.recipient}</TableCell>
                      <TableCell className="text-card-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {notif.sentAt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-primary text-primary-foreground">Sent</Badge>
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
