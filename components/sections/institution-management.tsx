"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Building2, Settings, DollarSign, Users, Ticket } from "lucide-react"
import { 
  Institution, 
  ProfitSharingConfig, 
  Participant,
  DEFAULT_PROFIT_SHARING,
  SAMPLE_TRANSACTIONS,
  SAMPLE_PARTICIPANTS 
} from "@/lib/transaction-types"
import { 
  calculateInstitutionStats, 
  getTransactionsByInstitution,
  calculateParticipantStats,
  getParticipantsByInstitution,
  formatCurrency,
  getInstitutionDisplayName,
  getInstitutionColor
} from "@/lib/transaction-utils"

export function InstitutionManagement() {
  const [profitSharingConfigs, setProfitSharingConfigs] = useState<ProfitSharingConfig[]>(DEFAULT_PROFIT_SHARING)
  const [selectedInstitution, setSelectedInstitution] = useState<Institution>('telebirr')
  const [transactions] = useState(SAMPLE_TRANSACTIONS)
  const [participants] = useState<Participant[]>(SAMPLE_PARTICIPANTS)

  const institutionStats = calculateInstitutionStats(transactions)
  const participantStats = calculateParticipantStats(participants)
  const selectedStats = institutionStats.find(stats => stats.institution === selectedInstitution)
  const selectedTransactions = getTransactionsByInstitution(transactions, selectedInstitution)
  const selectedParticipants = getParticipantsByInstitution(participants, selectedInstitution)

  const updateProfitSharing = (institution: Institution, lucyShare: number) => {
    setProfitSharingConfigs(prev => 
      prev.map(config => 
        config.institution === institution 
          ? { ...config, lucyShare, partnerShare: 100 - lucyShare, lastUpdated: new Date().toISOString() }
          : config
      )
    )
  }

  const toggleInstitutionStatus = (institution: Institution) => {
    setProfitSharingConfigs(prev => 
      prev.map(config => 
        config.institution === institution 
          ? { ...config, isActive: !config.isActive, lastUpdated: new Date().toISOString() }
          : config
      )
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Institution Management</h2>
        <p className="text-muted-foreground">Manage partnerships and profit sharing agreements</p>
      </div>

      {/* Institution Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {institutionStats.map((stats) => (
          <Card 
            key={stats.institution}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedInstitution === stats.institution ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedInstitution(stats.institution)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {getInstitutionDisplayName(stats.institution)}
              </CardTitle>
              <Building2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {formatCurrency(stats.totalRevenue)}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>{stats.totalTransactions} transactions</span>
                <span className="text-primary">{stats.activeUsers} users</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="settings">Partnership Settings</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Profit Sharing Configuration */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Profit Sharing Configuration</CardTitle>
                <CardDescription>Configure profit distribution for each partner</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profitSharingConfigs.map((config) => (
                  <div key={config.institution} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: getInstitutionColor(config.institution) }}
                        />
                        <span className="font-medium">{config.partnerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={config.isActive}
                          onCheckedChange={() => toggleInstitutionStatus(config.institution)}
                        />
                        <Badge variant={config.isActive ? "default" : "secondary"}>
                          {config.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                    
                    {config.isActive && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`lucy-share-${config.institution}`}>
                            Lucy Lottery Share (%)
                          </Label>
                          <Input
                            id={`lucy-share-${config.institution}`}
                            type="number"
                            min="0"
                            max="100"
                            value={config.lucyShare}
                            onChange={(e) => updateProfitSharing(config.institution, parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`partner-share-${config.institution}`}>
                            Partner Share (%)
                          </Label>
                          <Input
                            id={`partner-share-${config.institution}`}
                            type="number"
                            min="0"
                            max="100"
                            value={config.partnerShare}
                            disabled
                            className="bg-muted"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Current Agreement Summary */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Current Agreements</CardTitle>
                <CardDescription>Active partnership terms and conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profitSharingConfigs.filter(config => config.isActive).map((config) => (
                    <div key={config.institution} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: getInstitutionColor(config.institution) }}
                          />
                          <span className="font-medium">{config.partnerName}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Updated: {new Date(config.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Lucy Lottery:</span>
                          <span className="ml-2 font-semibold text-primary">{config.lucyShare}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Partner:</span>
                          <span className="ml-2 font-semibold text-secondary">{config.partnerShare}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="participants" className="space-y-4">
          {/* Participant Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{participantStats.totalParticipants}</div>
                <p className="text-xs text-muted-foreground">
                  {participantStats.activeParticipants} active
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Total Tickets</CardTitle>
                <Ticket className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">{participantStats.totalTicketsPurchased}</div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(participantStats.totalAmountSpent)} spent
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-chart-1/10 to-chart-1/5 border-chart-1/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium" style={{ color: 'hsl(var(--chart-1))' }}>
                  {getInstitutionDisplayName(selectedInstitution)} Users
                </CardTitle>
                <Building2 className="h-4 w-4" style={{ color: 'hsl(var(--chart-1))' }} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" style={{ color: 'hsl(var(--chart-1))' }}>
                  {selectedParticipants.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedParticipants.filter(p => p.isActive).length} active
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Participant List */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                {getInstitutionDisplayName(selectedInstitution)} Participants
              </CardTitle>
              <CardDescription>Manage participants for the selected institution</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Name</TableHead>
                    <TableHead className="text-foreground">Email</TableHead>
                    <TableHead className="text-foreground">Phone</TableHead>
                    <TableHead className="text-foreground">Tickets</TableHead>
                    <TableHead className="text-foreground">Amount Spent</TableHead>
                    <TableHead className="text-foreground">Lottery Types</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium text-card-foreground">
                        {participant.name}
                      </TableCell>
                      <TableCell className="text-card-foreground">
                        {participant.email}
                      </TableCell>
                      <TableCell className="text-card-foreground">
                        {participant.phone}
                      </TableCell>
                      <TableCell className="text-card-foreground">
                        {participant.totalTicketsPurchased}
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        {formatCurrency(participant.totalAmountSpent)}
                      </TableCell>
                      <TableCell className="text-card-foreground">
                        <div className="flex gap-1 flex-wrap">
                          {participant.lotteryTypes.map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={participant.isActive ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {participant.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                {getInstitutionDisplayName(selectedInstitution)} Transactions
              </CardTitle>
              <CardDescription>Transaction history for the selected institution</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Transaction ID</TableHead>
                    <TableHead className="text-foreground">Date</TableHead>
                    <TableHead className="text-foreground">Type</TableHead>
                    <TableHead className="text-foreground">Amount</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-card-foreground">
                        {transaction.id}
                      </TableCell>
                      <TableCell className="text-card-foreground">
                        {new Date(transaction.date).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-card-foreground">
                        <Badge variant="outline" className="text-xs">
                          {transaction.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {transaction.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Performance Metrics */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators for {getInstitutionDisplayName(selectedInstitution)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedStats && (
                  <>
                    <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Total Revenue</span>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        {formatCurrency(selectedStats.totalRevenue)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-secondary" />
                        <span className="text-sm font-medium">Active Users</span>
                      </div>
                      <span className="text-lg font-bold text-secondary">
                        {selectedStats.activeUsers}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Ticket Sales</span>
                      </div>
                      <span className="text-lg font-bold text-foreground">
                        {selectedStats.ticketSales}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Partnership Summary */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Partnership Summary</CardTitle>
                <CardDescription>Current partnership status and terms</CardDescription>
              </CardHeader>
              <CardContent>
                {(() => {
                  const config = profitSharingConfigs.find(c => c.institution === selectedInstitution)
                  return config ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Partnership Status</span>
                          <Badge variant={config.isActive ? "default" : "secondary"}>
                            {config.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Last updated: {new Date(config.lastUpdated).toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Lucy Lottery Share</span>
                          <span className="font-semibold text-primary">{config.lucyShare}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Partner Share</span>
                          <span className="font-semibold text-secondary">{config.partnerShare}%</span>
                        </div>
                      </div>
                    </div>
                  ) : null
                })()}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
