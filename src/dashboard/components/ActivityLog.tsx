import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Trophy,
    BookOpen,
    CheckCircle2,
    Clock,
    LogIn,
    FileText,
    LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

type ActivityType = 'course_enrollment' | 'lesson_completion' | 'quiz_submission' | 'achievement' | 'login';

interface ActivityLogItem {
    id: string;
    activity_type: ActivityType | string;
    resource_type?: string;
    metadata: {
        title?: string;
        course_name?: string;
        achievement_name?: string;
        [key: string]: any;
    };
    duration_minutes?: number;
    created_at: string;
}

const activityConfig: Record<string, { icon: LucideIcon; color: string; bg: string; label: string }> = {
    course_enrollment: { icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10", label: "Enrolled in Course" },
    lesson_completion: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", label: "Lesson Completed" },
    quiz_submission: { icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10", label: "Quiz Submitted" },
    achievement: { icon: Trophy, color: "text-orange-500", bg: "bg-orange-500/10", label: "Achievement Earned" },
    login: { icon: LogIn, color: "text-slate-500", bg: "bg-slate-500/10", label: "Logged In" },
    default: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted", label: "Activity" }
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

export default function ActivityLog() {
    // This would typically come from a useGetActivityLogsQuery() hook
    const activities: ActivityLogItem[] = [
        {
            id: "1",
            activity_type: 'course_enrollment',
            metadata: { title: "Full Stack Web Development" },
            created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
        },
        {
            id: "2",
            activity_type: 'lesson_completion',
            metadata: { title: "Introduction to React Hooks" },
            duration_minutes: 15,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        },
        {
            id: "3",
            activity_type: 'login',
            metadata: {},
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        },
        {
            id: "4",
            activity_type: 'quiz_submission',
            metadata: { title: "Advanced State Management" },
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        },
        {
            id: "5",
            activity_type: 'achievement',
            metadata: { achievement_name: "Fast Learner" },
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        }
    ];

    return (
        <Card className="col-span-4 lg:col-span-4">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={cn(activities.length > 0 && "divide-y divide-border")}>
                    {activities.length > 0 ? activities.map((log) => {
                        const config = activityConfig[log.activity_type] || activityConfig.default;
                        const Icon = config.icon;
                        const title = log.metadata.title || log.metadata.course_name || log.metadata.achievement_name || config.label;

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
                                        <span>{formatRelativeTime(log.created_at)}</span>
                                        {log.duration_minutes ? (
                                            <>
                                                <span>•</span>
                                                <span>{log.duration_minutes} mins spent</span>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            No recent activity found.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}