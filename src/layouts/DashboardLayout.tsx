import * as React from "react"
import { AppSidebar } from "@/dashboard/components/AppSidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { Outlet, Navigate } from "react-router-dom";
import { DashboardFooter } from "@/dashboard/components/DashboardFooter";
import { useGetPreferencesQuery } from "@/features/preferences/preferencesApi";

function OnboardingGuard({ children }: { children: React.ReactNode }) {
    const { data, error, isLoading } = useGetPreferencesQuery()

    if (isLoading) return null

    const isNotFound = error && 'status' in error && error.status === 404

    if (isNotFound || (!isNotFound && data?.data === null)) {
        if (localStorage.getItem("telusko-onboarding-skipped") === "true") {
            return <>{children}</>
        }
        return <Navigate to="/onboarding" replace />
    }

    return <>{children}</>
}

export default function DashboardLayout() {
    return (
        <OnboardingGuard>
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
        </OnboardingGuard>
    )
}
