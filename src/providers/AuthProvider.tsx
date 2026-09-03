import { useEffect, useRef } from "react";
import { useRefreshSessionMutation } from "@/features/auth/authApi";
import PageLoader from "@/components/common/PageLoader";
import { supabase } from "@/lib/supabase";

export default function SessionInitializer(props: {
    children: React.ReactNode
}) {
    const [refreshSession, { isLoading }] = useRefreshSessionMutation();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            refreshSession();
        }
    }, [refreshSession]);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                refreshSession();
            }
        });
        return () => { subscription.unsubscribe(); };
    }, []);

    if (isLoading) {
        return <PageLoader />;
    }

    return <>{props.children}</>;
}