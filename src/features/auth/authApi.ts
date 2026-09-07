import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { setCredentials, setUser, setSession, setLoading, AppUser } from './authSlice';
import type { Session } from '@supabase/supabase-js';

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
        initializeSession: builder.mutation<{ session: Session | null; user: AppUser | null }, void>({
            async queryFn(_arg, api) {
                api.dispatch(setLoading(true));
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                if (sessionError || !session) {
                    api.dispatch(setLoading(false));
                    return { data: { session: null, user: null } };
                }
                const user = await fetchUserProfile(session.user.id);
                api.dispatch(setSession(session));
                api.dispatch(setUser(user));
                api.dispatch(setLoading(false));
                return { data: { session, user } };
            },
        }),
        login: builder.mutation<{ session: Session | null; user: AppUser | null }, LoginRequest>({
            async queryFn({ email, password }, api) {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                    return { error: { status: 400, data: { message: error.message } } };
                }
                const user = await fetchUserProfile(data.user.id);
                api.dispatch(setSession(data.session));
                api.dispatch(setUser(user));
                return { data: { session: data.session, user } };
            },
        }),
        signUp: builder.mutation<{ session: Session | null; user: AppUser | null }, SignUpRequest>({
            async queryFn({ displayName, email, password }, api) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: { display_name: displayName } },
                });
                if (error) {
                    return { error: { status: 400, data: { message: error.message } } };
                }
                const user = data.user ? await fetchUserProfile(data.user.id) : null;
                api.dispatch(setSession(data.session));
                api.dispatch(setUser(user));
                return { data: { session: data.session, user } };
            },
        }),
        logout: builder.mutation<{ success: boolean }, void>({
            async queryFn(_arg, api) {
                await supabase.auth.signOut();
                api.dispatch(setUser(null));
                api.dispatch(setSession(null));
                api.dispatch(setCredentials({ accessToken: '' }));
                return { data: { success: true } };
            },
        }),
        refreshSession: builder.mutation<{ session: Session | null; user: AppUser | null }, void>({
            async queryFn(_arg, api) {
                const { data: { session }, error } = await supabase.auth.refreshSession();
                if (error) {
                    return { error: { status: 401, data: { message: error.message } } };
                }
                const user = session?.user ? await fetchUserProfile(session.user.id) : null;
                api.dispatch(setSession(session));
                api.dispatch(setUser(user));
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