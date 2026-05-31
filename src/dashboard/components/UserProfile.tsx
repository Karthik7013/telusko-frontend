import { useMeQuery } from "@/features/identity/identityApi";
import {
    CreditCard,
    Settings,
    LogOut,
    User
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/dashboard/components/UserAvatar";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "@/features/auth/authApi";
import { Spinner } from "@/components/ui/spinner";



type UserProfileProps = {
    id: string,
    avatarUrl: string,
    displayName: string,
    email: string,
}
const UserProfileMenu = ({
    user,
    logout
}: {
    user: UserProfileProps,
    logout: () => void

}) => {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size='icon-lg'
                variant="ghost" className="relative rounded-full">
                <UserAvatar
                    avatarUrl={user.avatarUrl}
                    displayName={user.displayName}
                    className="h-8 w-8 border"
                    fallbackClassName="bg-primary text-accent-foreground"
                />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
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
            <DropdownMenuItem variant="destructive" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default function UserProfile() {
    const { data: response, isLoading: isUserLoading } = useMeQuery();
    const [logout] = useLogoutMutation();
    const handleLogout = () => {
        logout();
    };

    if (isUserLoading) {
        return <Spinner />
    }

    if (response?.data) {
        return <UserProfileMenu
            user={{
                id: response.data.id,
                avatarUrl: response.data.avatarUrl,
                displayName: response.data.displayName,
                email: response.data.email
            }}
            logout={handleLogout} />
    }
}