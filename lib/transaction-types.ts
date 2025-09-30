export type Institution = 'telebirr' | 'cbe' | 'lucy-lottery'

export interface Transaction {
  id: string
  date: string
  type: 'entry-purchase' | 'prize-payout' | 'profit-share' | 'refund'
  amount: number
  institution: Institution
  userId?: string
  lotteryType?: 'daily' | 'weekly' | 'monthly' | 'transaction'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  description?: string
  metadata?: Record<string, any>
}

export interface Participant {
  id: string
  name: string
  email: string
  phone: string
  institution: Institution
  registrationDate: string
  totalTicketsPurchased: number
  totalAmountSpent: number
  lotteryTypes: ('daily' | 'weekly' | 'monthly' | 'transaction')[]
  isActive: boolean
  lastActivity: string
}

export interface LotteryParticipation {
  lotteryId: string
  lotteryType: 'daily' | 'weekly' | 'monthly' | 'transaction'
  institution: Institution
  participantId: string
  ticketCount: number
  totalAmount: number
  participationDate: string
  isWinner: boolean
  prizeAmount?: number
}

export interface ProfitSharingConfig {
  institution: Institution
  partnerName: string
  lucyShare: number // Lucy Lottery's percentage
  partnerShare: number // Partner's percentage
  isActive: boolean
  lastUpdated: string
}

export interface InstitutionStats {
  institution: Institution
  totalTransactions: number
  totalRevenue: number
  totalPayouts: number
  netProfit: number
  activeUsers: number
  ticketSales: number
}

export interface ProfitDistribution {
  institution: Institution
  partnerName: string
  totalRevenue: number
  lucyShare: number
  partnerShare: number
  lucyAmount: number
  partnerAmount: number
  status: 'pending' | 'paid' | 'received'
  lastDistribution: string
}

// Default profit sharing configurations
export const DEFAULT_PROFIT_SHARING: ProfitSharingConfig[] = [
  {
    institution: 'telebirr',
    partnerName: 'Telebirr',
    lucyShare: 40, // Lucy gets 40%
    partnerShare: 60, // Telebirr gets 60%
    isActive: true,
    lastUpdated: new Date().toISOString()
  },
  {
    institution: 'cbe',
    partnerName: 'CBE',
    lucyShare: 30, // Lucy gets 30%
    partnerShare: 70, // CBE gets 70%
    isActive: true,
    lastUpdated: new Date().toISOString()
  },
  {
    institution: 'lucy-lottery',
    partnerName: 'Lucy Lottery',
    lucyShare: 100, // Lucy keeps 100% of direct transactions
    partnerShare: 0,
    isActive: true,
    lastUpdated: new Date().toISOString()
  }
]

// Sample participant data by institution
export const SAMPLE_PARTICIPANTS: Participant[] = [
  // Telebirr participants
  {
    id: 'user-tb-001',
    name: 'Alemayehu Tadesse',
    email: 'alemayehu.t@telebirr.com',
    phone: '+251911234567',
    institution: 'telebirr',
    registrationDate: '2025-01-01T00:00:00Z',
    totalTicketsPurchased: 45,
    totalAmountSpent: 2250,
    lotteryTypes: ['daily', 'weekly'],
    isActive: true,
    lastActivity: '2025-01-15T10:30:00Z'
  },
  {
    id: 'user-tb-002',
    name: 'Meron Getachew',
    email: 'meron.g@telebirr.com',
    phone: '+251922345678',
    institution: 'telebirr',
    registrationDate: '2025-01-05T00:00:00Z',
    totalTicketsPurchased: 32,
    totalAmountSpent: 1600,
    lotteryTypes: ['daily', 'monthly'],
    isActive: true,
    lastActivity: '2025-01-15T11:15:00Z'
  },
  // CBE participants
  {
    id: 'user-cbe-001',
    name: 'Tigist Assefa',
    email: 'tigist.a@cbe.com',
    phone: '+251933456789',
    institution: 'cbe',
    registrationDate: '2025-01-02T00:00:00Z',
    totalTicketsPurchased: 28,
    totalAmountSpent: 1400,
    lotteryTypes: ['daily', 'weekly'],
    isActive: true,
    lastActivity: '2025-01-15T09:45:00Z'
  },
  {
    id: 'user-cbe-002',
    name: 'Yonas Bekele',
    email: 'yonas.b@cbe.com',
    phone: '+251944567890',
    institution: 'cbe',
    registrationDate: '2025-01-08T00:00:00Z',
    totalTicketsPurchased: 15,
    totalAmountSpent: 3000,
    lotteryTypes: ['monthly'],
    isActive: true,
    lastActivity: '2025-01-15T12:20:00Z'
  },
  // Lucy Lottery direct participants
  {
    id: 'user-ll-001',
    name: 'Sara Mohammed',
    email: 'sara.m@lucylottery.com',
    phone: '+251955678901',
    institution: 'lucy-lottery',
    registrationDate: '2025-01-03T00:00:00Z',
    totalTicketsPurchased: 20,
    totalAmountSpent: 500,
    lotteryTypes: ['transaction'],
    isActive: true,
    lastActivity: '2025-01-15T14:10:00Z'
  }
]

// Sample transaction data by institution
export const SAMPLE_TRANSACTIONS: Transaction[] = [
  // Telebirr transactions
  {
    id: 'TXN-TB-001',
    date: '2025-01-15T10:30:00Z',
    type: 'entry-purchase',
    amount: 50,
    institution: 'telebirr',
    userId: 'user-tb-001',
    lotteryType: 'daily',
    status: 'completed',
    description: 'Daily lottery entry via Telebirr'
  },
  {
    id: 'TXN-TB-002',
    date: '2025-01-15T11:15:00Z',
    type: 'entry-purchase',
    amount: 100,
    institution: 'telebirr',
    userId: 'user-tb-002',
    lotteryType: 'weekly',
    status: 'completed',
    description: 'Weekly lottery entry via Telebirr'
  },
  // CBE transactions
  {
    id: 'TXN-CBE-001',
    date: '2025-01-15T09:45:00Z',
    type: 'entry-purchase',
    amount: 75,
    institution: 'cbe',
    userId: 'user-cbe-001',
    lotteryType: 'daily',
    status: 'completed',
    description: 'Daily lottery entry via CBE'
  },
  {
    id: 'TXN-CBE-002',
    date: '2025-01-15T12:20:00Z',
    type: 'entry-purchase',
    amount: 200,
    institution: 'cbe',
    userId: 'user-cbe-002',
    lotteryType: 'monthly',
    status: 'completed',
    description: 'Monthly lottery entry via CBE'
  },
  // Lucy Lottery direct transactions
  {
    id: 'TXN-LL-001',
    date: '2025-01-15T14:10:00Z',
    type: 'entry-purchase',
    amount: 25,
    institution: 'lucy-lottery',
    userId: 'user-ll-001',
    lotteryType: 'transaction',
    status: 'completed',
    description: 'Direct lottery entry via Lucy Lottery'
  },
  // Prize payouts
  {
    id: 'TXN-PAYOUT-001',
    date: '2025-01-15T15:00:00Z',
    type: 'prize-payout',
    amount: 50000,
    institution: 'telebirr',
    userId: 'user-tb-001',
    status: 'completed',
    description: 'Daily lottery winner payout via Telebirr'
  },
  {
    id: 'TXN-PAYOUT-002',
    date: '2025-01-15T16:30:00Z',
    type: 'prize-payout',
    amount: 100000,
    institution: 'cbe',
    userId: 'user-cbe-001',
    status: 'completed',
    description: 'Weekly lottery winner payout via CBE'
  }
]
