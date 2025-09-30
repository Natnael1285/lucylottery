import { 
  Transaction, 
  Institution, 
  InstitutionStats, 
  ProfitDistribution, 
  ProfitSharingConfig,
  Participant,
  LotteryParticipation,
  DEFAULT_PROFIT_SHARING 
} from './transaction-types'

export function calculateInstitutionStats(transactions: Transaction[]): InstitutionStats[] {
  const statsMap = new Map<Institution, InstitutionStats>()

  // Initialize stats for each institution
  const institutions: Institution[] = ['telebirr', 'cbe', 'lucy-lottery']
  institutions.forEach(institution => {
    statsMap.set(institution, {
      institution,
      totalTransactions: 0,
      totalRevenue: 0,
      totalPayouts: 0,
      netProfit: 0,
      activeUsers: 0,
      ticketSales: 0
    })
  })

  // Process transactions
  const userSet = new Set<string>()
  
  transactions.forEach(transaction => {
    const stats = statsMap.get(transaction.institution)
    if (!stats) return

    stats.totalTransactions++
    
    if (transaction.type === 'entry-purchase') {
      stats.totalRevenue += transaction.amount
      stats.ticketSales++
      if (transaction.userId) {
        userSet.add(`${transaction.institution}-${transaction.userId}`)
      }
    } else if (transaction.type === 'prize-payout') {
      stats.totalPayouts += transaction.amount
    }

    stats.netProfit = stats.totalRevenue - stats.totalPayouts
  })

  // Update active users count
  statsMap.forEach((stats, institution) => {
    stats.activeUsers = Array.from(userSet).filter(user => user.startsWith(institution)).length
  })

  return Array.from(statsMap.values())
}

export function calculateProfitDistribution(
  transactions: Transaction[],
  profitSharingConfigs: ProfitSharingConfig[] = DEFAULT_PROFIT_SHARING
): ProfitDistribution[] {
  const distributions: ProfitDistribution[] = []
  
  // Group transactions by institution
  const institutionTransactions = new Map<Institution, Transaction[]>()
  transactions.forEach(transaction => {
    if (!institutionTransactions.has(transaction.institution)) {
      institutionTransactions.set(transaction.institution, [])
    }
    institutionTransactions.get(transaction.institution)!.push(transaction)
  })

  // Calculate distribution for each institution
  profitSharingConfigs.forEach(config => {
    if (!config.isActive) return

    const institutionTxs = institutionTransactions.get(config.institution) || []
    const totalRevenue = institutionTxs
      .filter(tx => tx.type === 'entry-purchase')
      .reduce((sum, tx) => sum + tx.amount, 0)

    if (totalRevenue > 0) {
      const lucyAmount = (totalRevenue * config.lucyShare) / 100
      const partnerAmount = (totalRevenue * config.partnerShare) / 100

      distributions.push({
        institution: config.institution,
        partnerName: config.partnerName,
        totalRevenue,
        lucyShare: config.lucyShare,
        partnerShare: config.partnerShare,
        lucyAmount,
        partnerAmount,
        status: 'pending',
        lastDistribution: new Date().toISOString()
      })
    }
  })

  return distributions
}

export function getTransactionsByInstitution(
  transactions: Transaction[],
  institution: Institution
): Transaction[] {
  return transactions.filter(tx => tx.institution === institution)
}

export function getTransactionSummary(transactions: Transaction[]) {
  const totalTransactions = transactions.length
  const totalRevenue = transactions
    .filter(tx => tx.type === 'entry-purchase')
    .reduce((sum, tx) => sum + tx.amount, 0)
  const totalPayouts = transactions
    .filter(tx => tx.type === 'prize-payout')
    .reduce((sum, tx) => sum + tx.amount, 0)
  const netProfit = totalRevenue - totalPayouts

  return {
    totalTransactions,
    totalRevenue,
    totalPayouts,
    netProfit
  }
}

export function formatCurrency(amount: number, currency: string = 'ETB'): string {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export function getInstitutionDisplayName(institution: Institution): string {
  const names = {
    'telebirr': 'Telebirr',
    'cbe': 'CBE',
    'lucy-lottery': 'Lucy Lottery'
  }
  return names[institution]
}

export function getInstitutionColor(institution: Institution): string {
  const colors = {
    'telebirr': 'hsl(var(--chart-1))',
    'cbe': 'hsl(var(--chart-2))',
    'lucy-lottery': 'hsl(var(--chart-3))'
  }
  return colors[institution]
}

// Participant management functions
export function getParticipantsByInstitution(
  participants: Participant[],
  institution: Institution
): Participant[] {
  return participants.filter(participant => participant.institution === institution)
}

export function calculateParticipantStats(participants: Participant[]): {
  totalParticipants: number
  activeParticipants: number
  participantsByInstitution: Record<Institution, number>
  totalTicketsPurchased: number
  totalAmountSpent: number
} {
  const participantsByInstitution = {
    'telebirr': 0,
    'cbe': 0,
    'lucy-lottery': 0
  }

  let totalTicketsPurchased = 0
  let totalAmountSpent = 0

  participants.forEach(participant => {
    participantsByInstitution[participant.institution]++
    totalTicketsPurchased += participant.totalTicketsPurchased
    totalAmountSpent += participant.totalAmountSpent
  })

  return {
    totalParticipants: participants.length,
    activeParticipants: participants.filter(p => p.isActive).length,
    participantsByInstitution,
    totalTicketsPurchased,
    totalAmountSpent
  }
}

export function getLotteryParticipationByInstitution(
  participations: LotteryParticipation[],
  institution: Institution
): LotteryParticipation[] {
  return participations.filter(participation => participation.institution === institution)
}

export function calculateLotteryStats(participations: LotteryParticipation[]): {
  totalParticipations: number
  totalTickets: number
  totalAmount: number
  winnersByInstitution: Record<Institution, number>
  participationsByType: Record<string, number>
} {
  const winnersByInstitution = {
    'telebirr': 0,
    'cbe': 0,
    'lucy-lottery': 0
  }

  const participationsByType = {
    'daily': 0,
    'weekly': 0,
    'monthly': 0,
    'transaction': 0
  }

  let totalTickets = 0
  let totalAmount = 0

  participations.forEach(participation => {
    totalTickets += participation.ticketCount
    totalAmount += participation.totalAmount
    participationsByType[participation.lotteryType]++
    
    if (participation.isWinner) {
      winnersByInstitution[participation.institution]++
    }
  })

  return {
    totalParticipations: participations.length,
    totalTickets,
    totalAmount,
    winnersByInstitution,
    participationsByType
  }
}

// Generate pie chart data for each institution
export function generateInstitutionPieData(
  participants: Participant[],
  transactions: Transaction[]
): Record<Institution, Array<{ name: string; value: number; color: string }>> {
  const result: Record<Institution, Array<{ name: string; value: number; color: string }>> = {
    'telebirr': [],
    'cbe': [],
    'lucy-lottery': []
  }

  // Calculate lottery type participation for each institution
  Object.keys(result).forEach(institution => {
    const inst = institution as Institution
    const instParticipants = getParticipantsByInstitution(participants, inst)
    const instTransactions = getTransactionsByInstitution(transactions, inst)
    
    // Group by lottery type
    const lotteryTypes = ['daily', 'weekly', 'monthly', 'transaction'] as const
    const typeData = lotteryTypes.map(type => {
      const typeTransactions = instTransactions.filter(tx => tx.lotteryType === type)
      const totalAmount = typeTransactions.reduce((sum, tx) => sum + tx.amount, 0)
      return {
        name: type.charAt(0).toUpperCase() + type.slice(1),
        value: totalAmount,
        color: getInstitutionColor(inst)
      }
    }).filter(item => item.value > 0)

    result[inst] = typeData
  })

  return result
}
