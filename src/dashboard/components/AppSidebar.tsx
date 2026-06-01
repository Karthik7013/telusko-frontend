import * as React from "react"
import NavMain from "@/dashboard/components/NavMain"
import { NavUser } from "@/dashboard/components/NavUser"
import RoleSwitcher from "@/dashboard/components/RoleSwitch"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { DASHBOARD_NAV as navData } from "@/data/navigation-data"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border-0 border-r-0 py-2"
            style={{ borderRightWidth: 0, "--sidebar-width-icon": "4rem" } as React.CSSProperties}
            collapsible="icon" {...props}>
            <SidebarHeader className="group-data-[collapsible=icon]:p-4">
                <RoleSwitcher />
            </SidebarHeader>
            <SidebarContent className="group-data-[collapsible=icon]:px-2">
                <NavMain items={navData} />
                <SidebarGroup>
                    <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-linear-to-br from-primary/20 via-primary/5 to-transparent p-4">
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
                        <Sparkles className="h-5 w-5 text-primary" />
                        <p className="mt-2 font-display text-base font-semibold leading-tight">Upgrade to Pro</p>
                        <p className="mt-1 text-xs text-muted-foreground">Unlock all 300+ courses & live mentorship.</p>
                        <Button size="sm" className="mt-3 h-8 w-full bg-gradient-primary text-primary-foreground hover:opacity-90">Go Pro</Button>
                    </div>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="group-data-[collapsible=icon]:p-4">
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar
