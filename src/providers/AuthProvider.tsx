import { useEffect, useRef } from "react";
import { useRefreshTokenMutation } from "@/features/auth/authApi"
import { useSelector } from "react-redux";
import PageLoader from "@/components/common/PageLoader";
import { RootState } from "@/store/store";

export default function SessionInitializer(props: {
    children: React.ReactNode
}) {
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const hasSessionHint = localStorage.getItem('auth_active') === 'true';
    const [refreshToken, { isLoading }] = useRefreshTokenMutation();
    const initialized = useRef(false);

    useEffect(() => {
        if (hasSessionHint && !token && !initialized.current) {
            initialized.current = true;
            refreshToken();
        }
    }, [hasSessionHint, token, refreshToken]);

    if (isLoading) {
        return <PageLoader />
    }

    return <>{props.children}</>
}
