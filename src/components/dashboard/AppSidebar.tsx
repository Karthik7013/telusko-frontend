"use client"

import * as React from "react"




import NavMain from "@/components/dashboard/NavMain"
import { NavUser } from "@/components/dashboard/NavUser"
import RoleSwitcher from "@/components/dashboard/TeamSwitcher"
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
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <RoleSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navData} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
