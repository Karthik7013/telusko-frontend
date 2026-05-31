import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PreferenceBanner() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("telusko-onboarding-skipped") === "true") {
            setVisible(true)
        }
    }, [])

    if (!visible) return null

    return (
        <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
            <div className="flex-1 space-y-1">
                <p className="font-medium leading-none">Complete your learning preferences</p>
                <p className="text-muted-foreground">
                    Set your role, interests, and goals so we can recommend the right courses for you.
                </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <Button asChild size="sm" variant="outline">
                    <Link to="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Go to Settings
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setVisible(false)}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
