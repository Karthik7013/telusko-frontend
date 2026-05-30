import { ChevronsUpDown } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useMeQuery } from "@/features/identity/identityApi"

export function NavUser() {
    const { data: user } = useMeQuery();

    if (user?.data) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.data.avatarUrl} alt={user.data.displayName} />
                                    <AvatarFallback className="rounded-lg">
                                        {user.data.displayName?.substring(0, 2).toUpperCase() || "US"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.data.displayName}</span>
                                    <span className="truncate text-xs">{user.data.email}</span>
                                </div>

                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }
}