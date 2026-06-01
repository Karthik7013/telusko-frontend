import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Flame, TrendingUp, Trophy } from "lucide-react";
import { ElementType } from "react";

interface StatsCardProps {
    title: string;
    value: string;
    icon: ElementType;
    description: string;
    color: string;
    bg: string;
}
const stats = [
    { label: "Courses in progress", value: "4", sub: "2 nearing completion", icon: BookOpen, accent: "from-amber-400/30 to-orange-500/10", iconBg: "bg-amber-500/15 text-amber-400", trend: "+1 this month" },
    { label: "Hours learnt", value: "128h", sub: "+12h this week", icon: Clock, accent: "from-sky-400/25 to-blue-500/10", iconBg: "bg-sky-500/15 text-sky-400", trend: "+9%" },
    { label: "Certificates", value: "7", sub: "View credentials", icon: Trophy, accent: "from-violet-400/25 to-fuchsia-500/10", iconBg: "bg-violet-500/15 text-violet-400", trend: "Top 8%" },
    { label: "Learning streak", value: "12", suffix: "days", sub: "Personal best: 15", icon: Flame, accent: "from-rose-400/25 to-orange-500/10", iconBg: "bg-rose-500/15 text-rose-400", trend: "On fire" },
];
export function StatsCards() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s) => (
                <div key={s.label} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-elegant">
                    <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-linear-to-br ${s.accent} blur-2xl opacity-70`} />
                    <div className="relative flex items-start justify-between">
                        <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">{s.label}</p>
                        <span className={`grid h-9 w-9 place-items-center rounded-xl ${s.iconBg}`}>
                            <s.icon className="h-4 w-4" />
                        </span>
                    </div>
                    <p className="relative mt-4 font-display text-4xl font-bold tracking-tight">
                        {s.value}{s.suffix && <span className="ml-1 text-lg text-muted-foreground font-medium">{s.suffix}</span>}
                    </p>
                    <div className="relative mt-2 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{s.sub}</p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-500">
                            <TrendingUp className="h-3 w-3" /> {s.trend}
                        </span>
                    </div>
                </div>
            ))}
        </section>
    )
}