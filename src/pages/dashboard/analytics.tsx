import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsPage() {
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Learning Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center border-t border-dashed mt-4">
                        <div className="text-center space-y-2">
                            <TrendingUp className="h-12 w-12 text-muted-foreground/50 mx-auto" />
                            <p className="text-muted-foreground">Activity chart will be visible here.</p>
                            <Badge variant="outline">Coming Soon</Badge>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Trophy className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">Advanced Java Concepts</p>
                                        <p className="text-xs text-muted-foreground">Earned 2 days ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
