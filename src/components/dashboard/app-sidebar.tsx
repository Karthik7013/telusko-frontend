"use client"

import * as React from "react"




import NavMain from "./nav-main"
import { NavUser } from "./nav-user"
import RoleSwitcher from "./team-switcher"
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
