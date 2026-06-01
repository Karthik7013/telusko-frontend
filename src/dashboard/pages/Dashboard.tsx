import ActivityLog from "@/dashboard/components/ActivityLog";
import { StatsCards } from "@/dashboard/components/StatsCard";
import PreferenceBanner from "@/dashboard/components/PreferenceBanner";
import { RecommendedCourses } from "@/dashboard/components/RecommendedCourses";

export default function Dashboard() {

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening with your learning journey.</p>
            </div>

            <PreferenceBanner />
            <StatsCards />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <ActivityLog />
            </div>

            <RecommendedCourses />
        </div>
    );
}
