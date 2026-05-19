import { AppSidebar } from "@/dashboard/components/AppSidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { Outlet } from "react-router-dom";
import { DashboardFooter } from "@/dashboard/components/DashboardFooter";

export default function Dashboard() {
    return (
        <SidebarProvider className="flex bg-sidebar">
            <AppSidebar />
            <div className="lg:py-4 min-h-svh flex-1 min-w-0 bg-sidebar md:peer-data-[state=collapsed]:ml-4 transition-all duration-300">
                <SidebarInset
                    className="overflow-hidden lg:bg-sidebar-background h-full rounded-3xl border-0"
                    style={{ borderRightWidth: 0 }}
                >
                    <header className="flex z-2 top-0 bg-background h-12 shrink-0 items-center justify-between gap-2 p-2 border-b">
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
