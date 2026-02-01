import { useGetUserQuery } from "@/features/auth/authApi"
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import FullScreenLoader from "@/components/common/full-screen-loader";

export default function AuthProvider(props: {
    children: React.ReactNode
}) {
    const { isLoading, error } = useGetUserQuery(undefined, {
        skip: !localStorage.getItem('accessToken')
    });

    useEffect(() => {
        if (error) {
            if (localStorage.getItem('refreshToken') || localStorage.getItem('accessToken')) {
                toast.error('Authentication Failed !', {
                    action: true,
                    duration: 1500,
                    dismissible: true,
                    icon: <AlertCircle />
                })
                localStorage.clear();
            }
        }
    }, [error])



    if (isLoading) {
        return <FullScreenLoader />
    }

    return <>
        {
            props.children
        }
    </>
}