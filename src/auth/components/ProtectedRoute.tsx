import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "@/features/identity/identityApi";
import { Skeleton } from "@/components/ui/skeleton";
// import { Skeleton } from "@/components/ui/skeleton";

type rolesType = 'admin' | 'instructor' | 'student';
interface ProtectedRouteProps {
    requiredRole: rolesType;
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
    const { data, isLoading, isError } = useMeQuery();
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <div className="space-y-4 w-full max-w-md p-4">
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <Skeleton className="h-75 w-full" />
                    <Skeleton className="h-10 w-1/2 mx-auto" />
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return <Navigate to="/" replace />;
    }

    const userRoles = data.data?.roles || [];
    const hasRequiredRole = userRoles.some(
        (role) => role.role === requiredRole && role.status === "active"
    );

    if (hasRequiredRole) {
        return <Outlet />;
    }
    return <Navigate to="/" replace />;
};
