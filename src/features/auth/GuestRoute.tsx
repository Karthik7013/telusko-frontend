import { Navigate, Outlet } from "react-router-dom";
import { useGetUserQuery } from "@/features/auth/authApi";
import { Skeleton } from "@/components/ui/skeleton";

export const GuestRoute = () => {
    const { data: user, isLoading } = useGetUserQuery();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <div className="space-y-4 w-full max-w-md p-4">
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <Skeleton className="h-[200px] w-full" />
                </div>
            </div>
        );
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};
