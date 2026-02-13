import { Navigate, Outlet } from "react-router-dom";
import { useGetUserQuery } from "@/features/auth/authApi";
import { Skeleton } from "@/components/ui/skeleton";

export const ProtectedRoute = () => {
    const { data: user, isLoading, isError } = useGetUserQuery();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <div className="space-y-4 w-full max-w-md p-4">
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <Skeleton className="h-[300px] w-full" />
                    <Skeleton className="h-10 w-1/2 mx-auto" />
                </div>
            </div>
        );
    }

    if (isError || !user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
