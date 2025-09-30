"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/sections/dashboard-overview"
import { TransactionLottery } from "@/components/sections/transaction-lottery"
import { DailyLottery } from "@/components/sections/daily-lottery"
import { WeeklyLottery } from "@/components/sections/weekly-lottery"
import { MonthlyLottery } from "@/components/sections/monthly-lottery"
import { FinancialTracking } from "@/components/sections/financial-tracking"
import { InstitutionManagement } from "@/components/sections/institution-management"
import { Settings } from "@/components/sections/settings"

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      setIsLoading(false)
    } else {
      router.push("/login")
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "transaction-lottery":
        return <TransactionLottery />
      case "daily-lottery":
        return <DailyLottery />
      case "weekly-lottery":
        return <WeeklyLottery />
      case "monthly-lottery":
        return <MonthlyLottery />
      case "financials":
        return <FinancialTracking />
      case "institutions":
        return <InstitutionManagement />
      case "settings":
        return <Settings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </DashboardLayout>
  )
}
