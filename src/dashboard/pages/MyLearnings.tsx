import { Link } from "react-router-dom";
import { BookOpen, Clock, CheckCircle2, AlertCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyEnrollmentsQuery } from "@/features/enrollments/enrollmentsApi";

const statusConfig: Record<string, { label: string; icon: typeof BookOpen; variant: "default" | "secondary" | "outline" }> = {
    active: { label: "In Progress", icon: BookOpen, variant: "default" },
    completed: { label: "Completed", icon: CheckCircle2, variant: "outline" },
};

export default function MyLearnings() {
    const { data, isLoading, error } = useGetMyEnrollmentsQuery();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Learnings</h1>
                <p className="text-muted-foreground">Keep up the great work! You're making progress.</p>
            </div>

            {isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-20" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : error ? (
                <Card>
                    <CardContent className="flex flex-col items-center py-12 text-center">
                        <AlertCircle className="size-12 text-destructive mb-4" />
                        <h2 className="text-xl font-bold mb-2">Failed to load enrollments</h2>
                        <p className="text-muted-foreground mb-6">Please try again later.</p>
                    </CardContent>
                </Card>
            ) : !data?.data?.length ? (
                <Card>
                    <CardContent className="flex flex-col items-center py-16 text-center">
                        <BookOpen className="size-12 text-muted-foreground mb-4" />
                        <h2 className="text-xl font-bold mb-2">No enrollments yet</h2>
                        <p className="text-muted-foreground mb-6">Start your learning journey by exploring our courses.</p>
                        <Button asChild>
                            <Link to="/search"><Search className="mr-2 size-4" />Browse Courses</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.data.map((enrollment) => {
                        const config = statusConfig[enrollment.status] || { label: enrollment.status, icon: Clock, variant: "secondary" as const };
                        return (
                            <Card key={enrollment.id}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base font-medium">
                                        Course {enrollment.courseId.slice(0, 8)}...
                                    </CardTitle>
                                    <Badge variant={config.variant}>{config.label}</Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="size-4" />
                                        Enrolled {enrollment.enrolledAt
                                            ? new Date(enrollment.enrolledAt).toLocaleDateString()
                                            : "N/A"}
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