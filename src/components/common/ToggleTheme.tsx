import { LaptopMinimal, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { useTheme } from "../../providers/ThemeProvider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SwitchTheme() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Prevent hydration mismatch in SSR
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <Tabs defaultValue={theme} onValueChange={(value: string) => setTheme(value as "light" | "dark" | "system")}>
            <TabsList>
                <TabsTrigger value="light">
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                </TabsTrigger>
                <TabsTrigger value="dark"><Moon className="h-[1.2rem] w-[1.2rem]" /></TabsTrigger>
                <TabsTrigger value="system"><LaptopMinimal className="h-[1.2rem] w-[1.2rem]" />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}



import { Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ToggleTheme() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
                <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                    <Monitor className="mr-2 h-4 w-4" />
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
