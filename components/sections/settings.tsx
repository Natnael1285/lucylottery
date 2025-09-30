"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { SettingsIcon, Bell, Shield, Database, Zap } from "lucide-react"

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [autoDrawEnabled, setAutoDrawEnabled] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Settings</h2>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <SettingsIcon className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Database className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="automation" className="gap-2">
            <Zap className="h-4 w-4" />
            Automation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>General system settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" defaultValue="Lucy Lottery Admin Panel" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" defaultValue="admin@lucylottery.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input id="support-email" type="email" defaultValue="support@lucylottery.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="Africa/Addis_Ababa (EAT)" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable user access</p>
                </div>
                <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>

              <Button className="w-full">Save General Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
                </div>
                <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>

              <div className="space-y-4 p-4 rounded-lg border">
                <Label>Notification Events</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Winner Announced</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Draw Completed</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fraud Alert Detected</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Error</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily Revenue Report</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <Button className="w-full">Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your admin password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="w-full">Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">Require code on login</p>
                  </div>
                  <Switch id="2fa" />
                </div>

                <div className="space-y-2">
                  <Label>Backup Codes</Label>
                  <p className="text-sm text-muted-foreground">Generate backup codes for account recovery</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Generate Backup Codes
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Active Sessions</Label>
                  <p className="text-sm text-muted-foreground">2 active sessions</p>
                  <Button variant="destructive" className="w-full">
                    Revoke All Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Telebirr Integration</CardTitle>
                <CardDescription>Configure Telebirr payment gateway</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="telebirr-api-key">API Key</Label>
                  <Input id="telebirr-api-key" type="password" defaultValue="••••••••••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telebirr-merchant-id">Merchant ID</Label>
                  <Input id="telebirr-merchant-id" defaultValue="LUCY_LOTTERY_001" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <span className="text-sm font-medium">Status</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">Connected</span>
                </div>
                <Button className="w-full">Update Telebirr Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CBEbirr Integration</CardTitle>
                <CardDescription>Configure CBEbirr payment gateway</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cbebirr-api-key">API Key</Label>
                  <Input id="cbebirr-api-key" type="password" defaultValue="••••••••••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cbebirr-merchant-id">Merchant ID</Label>
                  <Input id="cbebirr-merchant-id" defaultValue="LUCY_LOTTERY_002" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <span className="text-sm font-medium">Status</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">Connected</span>
                </div>
                <Button className="w-full">Update CBEbirr Settings</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Database Configuration</CardTitle>
              <CardDescription>Configure database connection settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="db-host">Database Host</Label>
                  <Input id="db-host" defaultValue="localhost" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-port">Port</Label>
                  <Input id="db-port" defaultValue="5432" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-name">Database Name</Label>
                <Input id="db-name" defaultValue="lucy_lottery_db" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm font-medium">Connection Status</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">Healthy</span>
              </div>
              <Button className="w-full">Test Connection</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Processes</CardTitle>
              <CardDescription>Configure automated lottery operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-draw">Automatic Draw Execution</Label>
                  <p className="text-sm text-muted-foreground">Run draws automatically at scheduled times</p>
                </div>
                <Switch id="auto-draw" checked={autoDrawEnabled} onCheckedChange={setAutoDrawEnabled} />
              </div>

              <div className="space-y-4 p-4 rounded-lg border">
                <Label>Draw Schedule</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Transaction-Based Lottery</p>
                      <p className="text-xs text-muted-foreground">Daily at 11:59 PM</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Daily Lottery</p>
                      <p className="text-xs text-muted-foreground">Daily at 8:00 PM</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Weekly Lottery</p>
                      <p className="text-xs text-muted-foreground">Sunday at 9:00 PM</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Monthly Lottery</p>
                      <p className="text-xs text-muted-foreground">Last day of month at 10:00 PM</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-payout">Automatic Prize Payout</Label>
                  <p className="text-sm text-muted-foreground">Automatically transfer prizes to winners</p>
                </div>
                <Switch id="auto-payout" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-report">Automatic Daily Reports</Label>
                  <p className="text-sm text-muted-foreground">Generate and send daily financial reports</p>
                </div>
                <Switch id="auto-report" defaultChecked />
              </div>

              <Button className="w-full">Save Automation Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
