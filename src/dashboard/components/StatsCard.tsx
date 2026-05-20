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
        <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-2xl group border-muted/50">
            {/* Subtly patterned background layer */}
            <div
                className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}
            />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors tracking-tight">
                    {title}
                </CardTitle>
                <div className={`${bg} ${color} p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-sm`}>
                    <Icon className="h-5 w-5" />
                </div>
            </CardHeader>

            <CardContent className="relative z-10">
                <div className="text-3xl font-extrabold tracking-tight mb-1">{value}</div>
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-muted-foreground">
                        {description}
                    </p>
                </div>
            </CardContent>

            {/* Enhanced dynamic background glow */}
            <div className={`absolute -right-12 -bottom-12 h-48 w-48 rounded-3xl ${bg} opacity-60 group-hover:opacity-60 group-hover:scale-125 group-hover:rotate-90 transition-all duration-1000 blur-xl z-0`} />
        </Card>
    );
}