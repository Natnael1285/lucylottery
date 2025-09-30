"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Ticket,
  DollarSign,
  Activity,
  FileText,
  Search,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transaction-lottery", label: "Transaction-Based Lot", icon: Activity },
  { id: "daily-lottery", label: "Daily Lot", icon: Ticket },
  { id: "weekly-lottery", label: "Weekly Lot", icon: Ticket },
  { id: "monthly-lottery", label: "Monthly Lot", icon: Ticket },
  { id: "financials", label: "Financials", icon: DollarSign },
  { id: "institutions", label: "Institution Management", icon: Building2 },
  { id: "settings", label: "Settings", icon: FileText },
]

export function DashboardLayout({ children, activeSection, onSectionChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications] = useState(3)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Lucy Lottery" width={48} height={48} className="rounded-full" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Lucy Lottery</h1>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            )
          })}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50 lg:hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image src="/logo.png" alt="Lucy Lottery" width={48} height={48} className="rounded-full" />
                  <div>
                    <h1 className="text-lg font-bold text-foreground">Lucy Lottery</h1>
                    <p className="text-xs text-muted-foreground">Admin Dashboard</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="p-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "text-foreground hover:bg-accent"
                      }`}
                      onClick={() => {
                        onSectionChange(item.id)
                        setSidebarOpen(false)
                      }}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Button>
                  )
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card px-4 lg:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 bg-background" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-sm">New winner approved</p>
                    <p className="text-xs text-muted-foreground">Prize disbursement pending</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-sm">System alert</p>
                    <p className="text-xs text-muted-foreground">High transaction volume detected</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-sm">Daily draw completed</p>
                    <p className="text-xs text-muted-foreground">View results and winners</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@lucylottery.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
