import { Link } from "react-router-dom";
import {
  ReceiptText, AlertCircle, Search,
  CheckCircle2, XCircle, Clock, RotateCcw, Ban
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyTransactionsQuery } from "@/features/transactions/transactionsApi";

const statusConfig: Record<string, { label: string; icon: typeof Clock; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  completed: { label: "Completed", icon: CheckCircle2, variant: "default" },
  confirmed: { label: "Confirmed", icon: CheckCircle2, variant: "default" },
  pending: { label: "Pending", icon: Clock, variant: "secondary" },
  cancelled: { label: "Cancelled", icon: XCircle, variant: "outline" },
  refunded: { label: "Refunded", icon: RotateCcw, variant: "secondary" },
};

function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = { INR: "₹", USD: "$", EUR: "€" };
  return `${symbols[currency] || currency} ${amount}`;
}

export default function Transactions() {
  const { data, isLoading, error, refetch } = useGetMyTransactionsQuery();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">View your purchase history and payment details.</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <div className="space-y-2 text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                    <Skeleton className="h-3 w-20 ml-auto" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <AlertCircle className="size-12 text-destructive mb-4" />
            <h2 className="text-xl font-bold mb-2">Failed to load transactions</h2>
            <p className="text-muted-foreground mb-6">Please try again later.</p>
            <Button onClick={refetch}>Try Again</Button>
          </CardContent>
        </Card>
      ) : !data?.data?.length ? (
        <Card>
          <CardContent className="flex flex-col items-center py-16 text-center">
            <ReceiptText className="size-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">No transactions yet</h2>
            <p className="text-muted-foreground mb-6">Start your learning journey by exploring our courses.</p>
            <Button asChild>
              <Link to="/search"><Search className="mr-2 size-4" />Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {data.data.map((tx) => {
            const config = statusConfig[tx.status] || { label: tx.status, icon: Ban, variant: "secondary" as const };
            return (
              <Card key={tx.id}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-medium">{tx.courseName}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{tx.orderNumber}</span>
                        <span>•</span>
                        <span>{tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "N/A"}</span>
                        {tx.paymentMethod && (
                          <>
                            <span>•</span>
                            <span>{tx.paymentMethod}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-lg tabular-nums">
                        {formatCurrency(tx.amount, tx.currency)}
                      </span>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
