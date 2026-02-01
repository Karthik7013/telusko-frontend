"use client"

import * as React from "react"
import {
    BookOpen,
    Heart,
    ReceiptText,
} from "lucide-react"


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

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },


}
import { LayoutDashboard, Settings } from "lucide-react"

const navData = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
    },
    {
        title: "My Courses",
        url: "/dashboard/my-learnings",
        icon: BookOpen,

    },
    {
        title: "Wishlist",
        url: "/dashboard/whishlist",
        icon: Heart,

    },
    {
        title: "Transactions",
        url: "/dashboard/transactions",
        icon: ReceiptText,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    }
]


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
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
