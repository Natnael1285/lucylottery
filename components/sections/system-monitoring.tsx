"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, XCircle, Activity, Server, Database } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "High Transaction Volume",
    description: "Transaction volume is 150% above normal. System performance may be affected.",
    timestamp: "2025-09-29 18:45",
    severity: "medium",
  },
  {
    id: 2,
    type: "info",
    title: "Scheduled Maintenance",
    description: "System maintenance scheduled for October 1, 2025 at 02:00 AM.",
    timestamp: "2025-09-29 16:30",
    severity: "low",
  },
  {
    id: 3,
    type: "critical",
    title: "Fraud Detection Alert",
    description: "Suspicious activity detected from IP 192.168.1.100. Multiple failed login attempts.",
    timestamp: "2025-09-29 14:20",
    severity: "high",
  },
]

const failedTransactions = [
  {
    id: 1,
    transactionId: "TXN-2025-0001240",
    timestamp: "2025-09-29 18:50",
    user: "Abebe Kebede",
    amount: "50 ETB",
    reason: "Insufficient balance",
    provider: "Telebirr",
  },
  {
    id: 2,
    transactionId: "TXN-2025-0001238",
    timestamp: "2025-09-29 18:35",
    user: "Tigist Haile",
    amount: "100 ETB",
    reason: "Network timeout",
    provider: "CBEbirr",
  },
  {
    id: 3,
    transactionId: "TXN-2025-0001235",
    timestamp: "2025-09-29 17:45",
    user: "Dawit Tesfaye",
    amount: "75 ETB",
    reason: "Invalid account",
    provider: "Telebirr",
  },
  {
    id: 4,
    transactionId: "TXN-2025-0001230",
    timestamp: "2025-09-29 16:20",
    user: "Meron Alemayehu",
    amount: "50 ETB",
    reason: "Service unavailable",
    provider: "CBEbirr",
  },
]

const apiStatus = [
  { name: "Telebirr API", status: "operational", uptime: "99.9%", responseTime: "120ms", lastCheck: "2 min ago" },
  { name: "CBEbirr API", status: "operational", uptime: "99.7%", responseTime: "145ms", lastCheck: "2 min ago" },
  { name: "Database", status: "operational", uptime: "99.99%", responseTime: "15ms", lastCheck: "1 min ago" },
  { name: "SMS Gateway", status: "degraded", uptime: "98.5%", responseTime: "350ms", lastCheck: "3 min ago" },
]

export function SystemMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">System Monitoring</h2>
        <p className="text-muted-foreground">Monitor system health, alerts, and API integrations</p>
      </div>

      {/* System Health Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">System Status</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Operational</div>
            <p className="text-xs text-muted-foreground">All systems running normally</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Uptime</CardTitle>
            <Server className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">99.9%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">3</div>
            <p className="text-xs text-muted-foreground">1 critical, 2 warnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Panel */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">System Alerts</CardTitle>
          <CardDescription>Recent alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              variant={alert.type === "critical" ? "destructive" : "default"}
              className={
                alert.type === "critical"
                  ? "border-destructive/50 bg-destructive/10"
                  : alert.type === "warning"
                    ? "border-secondary/50 bg-secondary/10"
                    : "border-primary/50 bg-primary/10"
              }
            >
              {alert.type === "critical" ? (
                <XCircle className="h-4 w-4" />
              ) : alert.type === "warning" ? (
                <AlertTriangle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertTitle className="text-card-foreground">{alert.title}</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                {alert.description}
                <span className="block text-xs mt-1">{alert.timestamp}</span>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* API Integration Health */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">API Integration Health</CardTitle>
          <CardDescription>Status of external service integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Service</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-foreground">Uptime</TableHead>
                <TableHead className="text-foreground">Response Time</TableHead>
                <TableHead className="text-foreground">Last Check</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiStatus.map((api, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-card-foreground">
                    <div className="flex items-center gap-2">
                      {api.name === "Database" ? (
                        <Database className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Server className="h-4 w-4 text-muted-foreground" />
                      )}
                      {api.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    {api.status === "operational" ? (
                      <Badge className="bg-primary text-primary-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Operational
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-secondary border-secondary">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Degraded
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-card-foreground">{api.uptime}</TableCell>
                  <TableCell className="text-card-foreground">{api.responseTime}</TableCell>
                  <TableCell className="text-muted-foreground">{api.lastCheck}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Failed Transactions */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Failed Transaction Logs</CardTitle>
          <CardDescription>Recent failed transactions requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Transaction ID</TableHead>
                <TableHead className="text-foreground">Timestamp</TableHead>
                <TableHead className="text-foreground">User</TableHead>
                <TableHead className="text-foreground">Amount</TableHead>
                <TableHead className="text-foreground">Provider</TableHead>
                <TableHead className="text-foreground">Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {failedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono text-card-foreground">{transaction.transactionId}</TableCell>
                  <TableCell className="text-card-foreground">{transaction.timestamp}</TableCell>
                  <TableCell className="text-card-foreground">{transaction.user}</TableCell>
                  <TableCell className="font-semibold text-card-foreground">{transaction.amount}</TableCell>
                  <TableCell className="text-card-foreground">{transaction.provider}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-destructive border-destructive">
                      {transaction.reason}
                    </Badge>
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
