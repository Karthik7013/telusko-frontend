import { useEffect } from "react";
import { useRefreshTokenMutation } from "@/features/auth/authApi"
import { useSelector } from "react-redux";
import PageLoader from "@/components/common/Loader";
import { RootState } from "@/store/store";

export default function AuthProvider(props: {
    children: React.ReactNode
}) {
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const hasSessionHint = localStorage.getItem('auth_active') === 'true';
    const [refreshToken, { isLoading }] = useRefreshTokenMutation();

    useEffect(() => {
        if (hasSessionHint && !token) {
            refreshToken();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <PageLoader />
    }

    return <>{props.children}</>
}