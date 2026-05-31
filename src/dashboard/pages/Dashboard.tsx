import { BookOpen, Trophy, Clock, TrendingUp } from "lucide-react";
import ActivityLog from "@/dashboard/components/ActivityLog";
import StatsCard from "@/dashboard/components/StatsCard";
import PreferenceBanner from "@/dashboard/components/PreferenceBanner";
import { RecommendedCourses } from "@/dashboard/components/RecommendedCourses";

export default function Dashboard() {
    const stats = [
        {
            title: "Courses in Progress",
            value: "4",
            icon: BookOpen,
            description: "2 nearing completion",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Total Hours Learnt",
            value: "128h",
            icon: Clock,
            description: "+12h this week",
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        },
        {
            title: "Certificates Earned",
            value: "7",
            icon: Trophy,
            description: "View credentials",
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "Learning Streak",
            value: "12 Days",
            icon: TrendingUp,
            description: "Personal best: 15",
            color: "text-green-500",
            bg: "bg-green-500/10"
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening with your learning journey.</p>
            </div>

            <PreferenceBanner />

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
                {stats.map((stat) => (
                    <div key={stat.title} className="lg:col-span-3">
                        <StatsCard {...stat} />
                    </div>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <ActivityLog />
            </div>

            <RecommendedCourses />
        </div>
    );
}
