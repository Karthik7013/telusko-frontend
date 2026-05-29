import { Outlet } from "react-router-dom";
import { } from "@/features/identity/identityApi";
// import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
    requiredRoles?: string[];
}
// const ROLES = [
//     {
//         "id": 14,
//         "name": "admin"
//     },
//     {
//         "id": 15,
//         "name": "instructor"
//     },
//     {
//         "id": 16,
//         "name": "student"
//     }
// ]
export const ProtectedComponent = ({ requiredRoles = [] }: ProtectedRouteProps) => {
    // const { data: user, isLoading, isError } = useGetUserQuery();
    console.log(requiredRoles)

    // if (isLoading) {
    //     return (
    //         <div className="flex items-center justify-center h-screen bg-background">
    //             <div className="space-y-4 w-full max-w-md p-4">
    //                 <Skeleton className="h-12 w-3/4 mx-auto" />
    //                 <Skeleton className="h-75 w-full" />
    //                 <Skeleton className="h-10 w-1/2 mx-auto" />
    //             </div>
    //         </div>
    //     );
    // }

    // if (isError || !user) {
    //     return <Navigate to="/" replace />;
    // }

    // Check role-based access if requiredRoles are specified
    // if (requiredRoles.length > 0 && ROLES) {
    //     const userHasRole = ROLES.some(role => requiredRoles.includes(role.name));
    //     if (!userHasRole) {
    //         return <Navigate to="/dashboard" replace />;
    //     }
    // }

    return <Outlet />;
};
