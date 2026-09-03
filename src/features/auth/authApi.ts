import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { setCredentials, setUser, setSession, setLoading, AppUser } from './authSlice';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    displayName: string;
    email: string;
    password: string;
}

const fetchUserProfile = async (userId: string): Promise<AppUser | null> => {
    const { data } = await supabase.schema('identity').from('profiles').select('*').eq('id', userId).single();
    if (!data) return null;
    const { data: roleData } = await supabase.schema('identity').from('user_roles').select('role_id').eq('user_id', userId).eq('status', 'active');
    const { data: roles } = await supabase.schema('identity').from('roles').select('name').in('id', roleData?.map((r) => r.role_id) || []);
    return {
        id: data.id,
        email: data.email || '',
        fullName: data.display_name || '',
        avatarUrl: data.avatar_url,
        roles: roles?.map((r) => r.name) || [],
    };
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    }),
    endpoints: (builder) => ({
        initializeSession: builder.mutation<{ session: any; user: AppUser | null }, void>({
            async queryFn() {
                setLoading(true);
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                if (sessionError || !session) {
                    setLoading(false);
                    return { data: { session: null, user: null } };
                }
                const user = await fetchUserProfile(session.user.id);
                setSession(session);
                setUser(user);
                setLoading(false);
                return { data: { session, user } };
            },
        }),
        login: builder.mutation<{ session: any; user: AppUser | null }, LoginRequest>({
            async queryFn({ email, password }) {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                const user = await fetchUserProfile(data.user.id);
                setSession(data.session);
                setUser(user);
                return { data: { session: data.session, user } };
            },
        }),
        signUp: builder.mutation<{ session: any; user: AppUser | null }, SignUpRequest>({
            async queryFn({ displayName, email, password }) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: { display_name: displayName } },
                });
                if (error) throw error;
                const user = data.user ? await fetchUserProfile(data.user.id) : null;
                setSession(data.session);
                setUser(user);
                return { data: { session: data.session, user } };
            },
        }),
        logout: builder.mutation<{ success: boolean }, void>({
            async queryFn() {
                await supabase.auth.signOut();
                setUser(null);
                setSession(null);
                setCredentials({ accessToken: '' });
                return { data: { success: true } };
            },
        }),
        refreshSession: builder.mutation<{ session: any; user: AppUser | null }, void>({
            async queryFn() {
                const { data: { session }, error } = await supabase.auth.refreshSession();
                if (error) throw error;
                const user = session?.user ? await fetchUserProfile(session.user.id) : null;
                setSession(session);
                setUser(user);
                return { data: { session, user } };
            },
        }),
    }),
});

export const {
    useInitializeSessionMutation,
    useLoginMutation,
    useSignUpMutation,
    useLogoutMutation,
    useRefreshSessionMutation,
} = authApi;

export default authApi;