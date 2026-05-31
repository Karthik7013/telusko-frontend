import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Trophy,
    BookOpen,
    LogIn,
    LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiError } from "@/components/common/ApiError";
import { useLogsQuery } from "@/features/dashboard/dashboardApi";

const activityConfig: Record<string, { icon: LucideIcon; color: string; bg: string; label: string }> = {
    login: { icon: LogIn, color: "text-slate-500", bg: "bg-slate-500/10", label: "Logged In" },
    course_enrolled: { icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10", label: "Enrolled in Course" },
    certificate_earned: { icon: Trophy, color: "text-orange-500", bg: "bg-orange-500/10", label: "Certificate Earned" },
};

function formatRelativeTime(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
}

function SkeletonRow() {
    return (
        <div className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
            <Skeleton className="mt-1 h-9 w-9 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>
    );
}

export default function ActivityLog() {
    const { data, isLoading, error, refetch } = useLogsQuery();
    const activities = data?.data;

    return (
        <Card className="col-span-4 lg:col-span-4">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="divide-y divide-border">
                        {Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}
                    </div>
                ) : error ? (
                    <ApiError error="Failed to load activity logs" onRetry={refetch} />
                ) : !activities?.length ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No recent activity found.
                    </p>
                ) : (
                    <div className="divide-y divide-border">
                        {activities.map((log) => {
                            const config = activityConfig[log.activityType] || activityConfig.login;
                            const Icon = config.icon;
                            const title = log.metadata?.title || log.metadata?.course_name || log.metadata?.achievement_name || config.label;

                            return (
                                <div key={log.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                                    <div className={cn("mt-1 h-9 w-9 rounded-xl flex items-center justify-center shrink-0", config.bg)}>
                                        <Icon className={cn("h-5 w-5", config.color)} />
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <p className="text-sm font-medium leading-none truncate">
                                            {title}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>{formatRelativeTime(log.createdAt)}</span>
                                            {log.durationMinutes ? (
                                                <>
                                                    <span>•</span>
                                                    <span>{log.durationMinutes} mins spent</span>
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
