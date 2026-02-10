"use client"

import * as React from "react"
import { ChevronsUpDown, GraduationCap, Presentation, UserCog } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

// Define the modes specifically for your app
const modes = [
    {
        name: "Learning Mode",
        logo: GraduationCap,
        description: "Access courses & labs",
    },
    {
        name: "Instructor Mode",
        logo: Presentation,
        description: "Manage content & students",
    },
]

export  default function RoleSwitcher() {
    const { isMobile } = useSidebar()
    const [activeMode, setActiveMode] = React.useState(modes[0])

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <activeMode.logo className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{activeMode.name}</span>
                                <span className="truncate text-xs text-muted-foreground">Switch Perspective</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4 opacity-50" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-muted-foreground text-xs px-2 py-1.5">
                            Account View
                        </DropdownMenuLabel>
                        {modes.map((mode) => (
                            <DropdownMenuItem
                                key={mode.name}
                                onClick={() => setActiveMode(mode)}
                                className="gap-2 p-2 cursor-pointer"
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <mode.logo className="size-3.5 shrink-0" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{mode.name}</span>
                                    <span className="text-[10px] text-muted-foreground">{mode.description}</span>
                                </div>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-muted">
                                <UserCog className="size-3.5" />
                            </div>
                            <div className="font-medium text-sm">Account Settings</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}