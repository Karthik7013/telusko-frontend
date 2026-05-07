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
        <SidebarProvider className="flex bg-sidebar gap-4 transition-all duration-300">
            <AppSidebar />
            <div className="lg:py-2 min-h-svh w-full flex-1 bg-sidebar">
                <SidebarInset className="overflow-hidden lg:bg-sidebar-background h-full rounded-3xl border-0" style={{ borderRightWidth: 0 }}>
                    <header className="flex z-2 top-0 bg-background h-12 shrink-0 items-center justify-between gap-2 p-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger itemScope />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 px-6 pt-10 pb-18">
                        <Outlet />
                    </div>
                    <DashboardFooter />
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
