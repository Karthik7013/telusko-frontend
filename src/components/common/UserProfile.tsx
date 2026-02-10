import { useGetUserQuery } from "@/features/auth/authApi";
import {
    User,
    CreditCard,
    Settings,
    LogOut
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useLogout } from "@/hooks/use-logout";

export default function UserProfile() {
    const { error, data: user } = useGetUserQuery();
    const logout = useLogout();

    const handleLogout = () => {
        logout();
    };

    if (error) {
        return 'failed to load profile'
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src={user?.image || "https://github.com/shadcn.png"} alt={user?.firstName} />
                        <AvatarFallback>{user?.firstName?.substring(0, 2).toUpperCase() || "US"}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.firstName || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email || "user@example.com"}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="cursor-pointer w-full flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/dashboard/settings" className="cursor-pointer w-full flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/dashboard/transactions" className="cursor-pointer w-full flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                        </Link>
                    </DropdownMenuItem>

                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}