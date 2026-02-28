import { AppSidebar } from "@/components/dashboard/AppSidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { Outlet } from "react-router-dom";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

export default function Dashboard() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex z-2 sticky top-0 bg-background h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger itemScope />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 px-6 pt-10 pb-18">
                    <Outlet />
                </div>
                <DashboardFooter />
            </SidebarInset>
        </SidebarProvider>
    )
}
