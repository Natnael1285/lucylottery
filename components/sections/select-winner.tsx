// components/sections/select-winner.tsx
"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Ticket,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";

interface WinnerResult {
  message: string;
  winner: {
    ticketId: string;
    ticketCode: string;
    userPhone: string;
    prizeAmount: number;
    drawDate: string;
  };
  lotteryInfo: {
    type: string;
    totalTickets: number;
    prizeAmount: number;
  };
  prizeRecord: {
    id: string;
    isClaimed: boolean;
  };
  transactionId: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const SelectWinner = () => {
  const [selectedLottery, setSelectedLottery] = useState<
    "DAILY" | "WEEKLY" | "MONTHLY"
  >("DAILY");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<WinnerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectWinner = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/lucy/select-winner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lotteryType: selectedLottery,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to select winner");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getLotteryDisplayName = (type: string) => {
    switch (type) {
      case "DAILY":
        return "Daily Lottery";
      case "WEEKLY":
        return "Weekly Lottery";
      case "MONTHLY":
        return "Monthly Lottery";
      default:
        return type;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ET", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Select Lottery Winner
        </h2>
        <p className="text-muted-foreground">
          Manually trigger winner selection for different lottery types
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Selection Card */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Winner Selection
            </CardTitle>
            <CardDescription>
              Choose a lottery type and select the winner
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Lottery Type
              </label>
              <Select
                value={selectedLottery}
                onValueChange={(value: "DAILY" | "WEEKLY" | "MONTHLY") =>
                  setSelectedLottery(value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select lottery type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DAILY">Daily Lottery</SelectItem>
                  <SelectItem value="WEEKLY">Weekly Lottery</SelectItem>
                  <SelectItem value="MONTHLY">Monthly Lottery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSelectWinner}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Selecting Winner...
                </>
              ) : (
                <>
                  <Trophy className="mr-2 h-4 w-4" />
                  Select Winner
                </>
              )}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Lottery Info Card */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Ticket className="h-5 w-5 text-secondary" />
              Lottery Information
            </CardTitle>
            <CardDescription>
              Details about the selected lottery type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type</span>
              <Badge variant="secondary">
                {getLotteryDisplayName(selectedLottery)}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Daily Prize</span>
                <span className="font-medium">10,000 ETB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Weekly Prize</span>
                <span className="font-medium">50,000 ETB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Monthly Prize</span>
                <span className="font-medium">100,000 ETB</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                This action will randomly select one winner from all active
                tickets, mark the winning ticket as WON, expire all other
                tickets, create a prize record, and generate a winning
                transaction.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      {result && (
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-900 dark:text-green-100 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Winner Selected Successfully!
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              {result.message}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Winner Details */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Winner Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket Code</span>
                    <span className="font-mono font-medium">
                      {result.winner.ticketCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone Number</span>
                    <span className="font-medium">
                      {result.winner.userPhone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Draw Date</span>
                    <span className="font-medium">
                      {formatDate(result.winner.drawDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  Prize Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prize Amount</span>
                    <span className="font-bold text-lg text-green-600">
                      {formatCurrency(result.winner.prizeAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lottery Type</span>
                    <Badge variant="outline">
                      {getLotteryDisplayName(result.lotteryInfo.type)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Tickets</span>
                    <span className="font-medium">
                      {result.lotteryInfo.totalTickets.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Information */}
            <div className="pt-4 border-t border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-foreground mb-3">
                System Records
              </h4>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Prize Record ID</span>
                  <span className="font-mono text-xs mt-1">
                    {result.prizeRecord.id}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="font-mono text-xs mt-1">
                    {result.transactionId}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Prize Status</span>
                  <Badge
                    variant={
                      result.prizeRecord.isClaimed ? "default" : "secondary"
                    }
                    className="mt-1 w-fit"
                  >
                    {result.prizeRecord.isClaimed ? "Claimed" : "Pending Claim"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SelectWinner;
