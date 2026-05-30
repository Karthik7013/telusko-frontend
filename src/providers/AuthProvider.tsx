import { useRefreshTokenQuery } from "@/features/auth/authApi"
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "@/components/common/Loader";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { logOut } from "@/features/auth/authSlice";

export default function AuthProvider(props: {
    children: React.ReactNode
}) {
    const dispatch: AppDispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.accessToken); // get access token from store
    const hasSessionHint = localStorage.getItem('auth_active') === 'true'; // get session hint from local storage
    // skip api call on token && sessionsHint present
    const { isLoading, isError } = useRefreshTokenQuery(undefined, {
        skip: !hasSessionHint && !!token,
    });

    // if error show alert and dispatch logout()
    // useEffect(() => {
    //     if (isError) {
    //         dispatch(logOut());
    //         localStorage.removeItem('auth_active');
    //         toast.error('Session Expired', {
    //             description: 'Please log in again.',
    //             icon: <AlertCircle />
    //         });
    //     }
    // }, [isError, dispatch]);

    if (isLoading) {
        return <PageLoader />
    }

    return <>
        {
            props.children
        }
    </>
}