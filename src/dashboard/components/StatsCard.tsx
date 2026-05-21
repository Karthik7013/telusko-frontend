import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ElementType } from "react";

interface StatsCardProps {
    title: string;
    value: string;
    icon: ElementType;
    description: string;
    color: string;
    bg: string;
}

export default function StatsCard({ title, value, icon: Icon, description, color, bg }: StatsCardProps) {
    return (
        <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-2xl group border-muted/40 bg-card/60 backdrop-blur-md">
            {/* Background Pattern: Modern Grid Layer */}
            <div className={`absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none ${color}`}
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Geometric Accent: Large Skewed Square Frame (Replacement for circle) */}
            <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-3xl border border-current opacity-[0.03] group-hover:opacity-[0.08] group-hover:rotate-45 group-hover:scale-150 transition-all duration-700 ${color}`} />

            <CardHeader className="flex flex-row items-start justify-between space-y-0 relative z-10 pb-2">
                <CardTitle className="text-[10px] font-bold text-muted-foreground/80 group-hover:text-foreground transition-colors tracking-[0.15em] uppercase pt-1">
                    {title}
                </CardTitle>
                <div className={`${bg} ${color} p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-black/5 ring-1 ring-white/10`}>
                    <Icon className="h-4 w-4" />
                </div>
            </CardHeader>

            <CardContent className="relative z-10 pt-0">
                <div className="text-4xl font-black tracking-tighter mb-1">
                    {value}
                </div>
                <div className="flex items-center gap-1.5">
                    {/* Status pulse dot indicating activity/trend */}
                    <div className={`h-1.5 w-1.5 rounded-full bg-current ${color} animate-pulse shadow-sm`} />
                    <p className="text-xs font-bold text-muted-foreground/60">
                        {description}
                    </p>
                </div>
            </CardContent>

            {/* Mesh Glow Blob (Replacing original glow shape) */}
            <div className={`absolute -right-20 -bottom-20 h-64 w-64 ${bg} opacity-30 group-hover:opacity-50 blur-[100px] rounded-full transition-all duration-1000 -z-0`} />

            {/* Surface Highlight for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
        </Card>
    );
}