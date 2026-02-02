import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const transactions = [
    {
        id: "TX-1001",
        date: "Feb 1, 2026",
        course: "Mastering Spring Boot 3.0",
        amount: "₹499",
        status: "Completed",
        method: "Credit Card"
    },
    {
        id: "TX-1002",
        date: "Jan 15, 2026",
        course: "Docker & Kubernetes for Java Devs",
        amount: "₹499",
        status: "Completed",
        method: "UPI"
    },
    {
        id: "TX-1003",
        date: "Dec 10, 2025",
        course: "Advanced Java Concepts",
        amount: "₹299",
        status: "Completed",
        method: "Net Banking"
    }
];

export default function TransactionsPage() {
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
