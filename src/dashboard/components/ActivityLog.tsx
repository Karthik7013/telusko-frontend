import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function ActivityLog() {

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Learning Activity</CardTitle>
            </CardHeader>
            <CardContent className="h-75 flex items-center justify-center border-t border-dashed mt-4">
                <div className="text-center space-y-2">
                    <TrendingUp className="h-12 w-12 text-muted-foreground/50 mx-auto" />
                    <p className="text-muted-foreground">Activity chart will be visible here.</p>
                    <Badge variant="outline">Coming Soon</Badge>
                </div>
            </CardContent>
        </Card>
    )
}