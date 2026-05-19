import * as React from "react"
import NavMain from "@/dashboard/components/NavMain"
import { NavUser } from "@/dashboard/components/NavUser"
import RoleSwitcher from "@/dashboard/components/RoleSwitch"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { DASHBOARD_NAV as navData } from "@/data/navigation-data"


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
            </SidebarContent>
            <SidebarFooter className="group-data-[collapsible=icon]:p-4">
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
