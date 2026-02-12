import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
// import { ApiError } from "@/components/common/ApiError";
import { EmptyState } from "@/components/common/EmptyState";
import { useGetTransactionsQuery } from "@/features/transactions/transactionsApi";

export default function TransactionsPage() {
    const {
        data: transactions,
        isLoading,
        // error,
        // refetch,
    } = useGetTransactionsQuery();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                    <p className="text-muted-foreground">Manage your billing and purchase history.</p>
                </div>

                <div className="border rounded-lg bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">Transaction ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        <Skeleton className="h-4 w-20" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-4 w-24" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-4 w-32" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-4 w-16" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-4 w-12" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Skeleton className="h-4 w-12" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }

    if (!transactions || transactions.length === 0) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                    <p className="text-muted-foreground">Manage your billing and purchase history.</p>
                </div>
                <EmptyState
                    title="No Transactions Yet"
                    description="You haven't made any purchases yet. Start exploring courses to begin your learning journey!"
                    action={{
                        label: "Browse Courses",
                        onClick: () => window.location.href = "/"
                    }}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                <p className="text-muted-foreground">Manage your billing and purchase history.</p>
            </div>

            <div className="border rounded-lg bg-card overflow-hidden">
                <Table>
                    <TableHeader className="bg-sidebar-accent">
                        <TableRow>
                            <TableHead className="w-[120px]">Transaction ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="font-medium">{transaction.id}</TableCell>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.course}</TableCell>
                                <TableCell>{transaction.method}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                        {transaction.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
