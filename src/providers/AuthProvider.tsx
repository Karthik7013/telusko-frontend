import { useRefreshTokenQuery } from "@/features/auth/authApi"
import { useSelector } from "react-redux";
import PageLoader from "@/components/common/Loader";
import { RootState } from "@/store/store";

export default function AuthProvider(props: {
    children: React.ReactNode
}) {
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const hasSessionHint = localStorage.getItem('auth_active') === 'true';
    const { isLoading } = useRefreshTokenQuery(undefined, {
        skip: !hasSessionHint || !!token,
    });

    if (isLoading) {
        return <PageLoader />
    }

    return <>
        {
            props.children
        }
    </>
}