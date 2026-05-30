import {
    // BadgeCheck,
    // Bell,
    ChevronsUpDown,
    // CreditCard,
    // LogOut
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    // DropdownMenuContent,
    // DropdownMenuGroup,
    // DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    // useSidebar,
} from "@/components/ui/sidebar"

// import { Link } from "react-router-dom"
import { useMeQuery } from "@/features/identity/identityApi"
// import { useLogoutMutation } from "@/features/auth/authApi"


// const ProfileMenu = () => {
//     const { data: user } = useMeQuery();
//     const [logout] = useLogoutMutation();
//     const handleLogout = () => {
//         logout();
//     };

//     const { isMobile } = useSidebar()
//     return <DropdownMenuContent
//         className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
//         side={isMobile ? "bottom" : "right"}
//         align="end"
//         sideOffset={4}
//     >
//         <DropdownMenuLabel className="p-0 font-normal">
//             <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                 <Avatar className="h-8 w-8 rounded-lg">
//                     <AvatarImage src={user?.data?.profilePictureUrl || 'https://github.com/shadcn.png'} alt={user?.data?.avatarUrl} />
//                     <AvatarFallback className="rounded-lg">
//                         {user?.data?.fullName?.substring(0, 2).toUpperCase() || "US"}
//                     </AvatarFallback>
//                 </Avatar>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                     <span className="truncate font-medium">{user?.data?.fullName}</span>
//                     <span className="truncate text-xs">{user?.data?.email}</span>
//                 </div>

//             </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//             <DropdownMenuItem asChild>
//                 <Link to="/dashboard/settings" className="cursor-pointer w-full flex items-center">
//                     <BadgeCheck className="mr-2 h-4 w-4" />
//                     <span>Account</span>
//                 </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//                 <Link to="/dashboard/transactions" className="cursor-pointer w-full flex items-center">
//                     <CreditCard className="mr-2 h-4 w-4" />
//                     <span>Billing</span>
//                 </Link>
//             </DropdownMenuItem>

//             <DropdownMenuItem>
//                 <Bell />
//                 Notifications
//             </DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem variant="destructive" onClick={handleLogout}>
//             <LogOut />
//             Log out
//         </DropdownMenuItem>
//     </DropdownMenuContent>
// }

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
                                    <AvatarImage src={user.data.avatarUrl} alt={user.data.avatarUrl.split('')[0]} />
                                    <AvatarFallback className="rounded-lg">
                                        {user.data.avatarUrl.split('')[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.data.displayName}</span>
                                    <span className="truncate text-xs">{user.data.email}</span>
                                </div>

                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        {/* <ProfileMenu /> */}
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }
    // return (
    //     <SidebarMenu>
    //         <SidebarMenuItem>
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <SidebarMenuButton
    //                         size="lg"
    //                         className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    //                     >
    //                         <Avatar className="h-8 w-8 rounded-lg">
    //                             <AvatarImage src={user?.data?.profilePictureUrl || 'https://github.com/shadcn.png'} alt={user?.data?.fullName} />
    //                             <AvatarFallback className="rounded-lg">
    //                                 {user?.data?.fullName?.substring(0, 2).toUpperCase() || "US"}
    //                             </AvatarFallback>
    //                         </Avatar>
    //                         <div className="grid flex-1 text-left text-sm leading-tight">
    //                             <span className="truncate font-medium">{user?.data?.fullName}</span>
    //                             <span className="truncate text-xs">{user?.data?.email}</span>
    //                         </div>

    //                         <ChevronsUpDown className="ml-auto size-4" />
    //                     </SidebarMenuButton>
    //                 </DropdownMenuTrigger>
    //                 {/* <ProfileMenu /> */}
    //             </DropdownMenu>
    //         </SidebarMenuItem>
    //     </SidebarMenu>
    // )
}
