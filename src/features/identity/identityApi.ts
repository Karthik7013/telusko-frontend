import { createApi } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { supabaseBaseQuery } from '@/lib/supabaseBaseQuery';
import { ApiResponse } from '@/lib/api-utils';
import { setUser, setSession, AppUser } from '../auth/authSlice';

type ROLES = {
    role: 'student' | 'instructor' | 'admin',
    status: 'active' | 'inactive'
}
export type UserProfile = {
    id: string,
    email: string,
    displayName: string,
    avatarUrl: string,
    roles: ROLES[],
    bio: string | null
}

const toUserProfile = (profile: any, email: string, roles: string[]): UserProfile => ({
    id: profile.id,
    email,
    displayName: profile.display_name || '',
    avatarUrl: profile.avatar_url || '',
    roles: roles.map((r) => ({ role: r as ROLES['role'], status: 'active' as const })),
    bio: null,
});

export const identityApi = createApi({
    reducerPath: 'identityApi',
    baseQuery: supabaseBaseQuery,
    tagTypes: ['UserProfile'],
    endpoints: (builder) => ({
        me: builder.query<ApiResponse<UserProfile>, void>({
            queryFn: async (_arg, api) => {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session?.user) {
                    return { error: { status: 401, data: 'Not authenticated' } };
                }
                const { data: profile, error: profileError } = await supabase
                    .schema('identity')
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                if (profileError) {
                    return { error: { status: 404, data: profileError.message } };
                }
                const { data: roleRows } = await supabase
                    .schema('identity')
                    .from('user_roles')
                    .select('role_id, roles(name)')
                    .eq('user_id', session.user.id)
                    .eq('status', 'active');
                const roles = (roleRows || []).map((r: any) => r.roles?.name).filter(Boolean);
                const user: AppUser = {
                    id: session.user.id,
                    email: session.user.email || '',
                    fullName: (profile as any)?.display_name || '',
                    avatarUrl: (profile as any)?.avatar_url || null,
                    roles,
                };
                api.dispatch(setUser(user));
                api.dispatch(setSession(session));
                const wrapped: ApiResponse<UserProfile> = {
                    success: true,
                    data: toUserProfile(profile, session.user.email || '', roles),
                    error: null,
                };
                return { data: wrapped };
            },
            providesTags: ['UserProfile'],
        }),
        changePassword: builder.mutation<ApiResponse<{ message: string }>, { currentPassword: string; newPassword: string }>({
            queryFn: async ({ newPassword }) => {
                const { error } = await supabase.auth.updateUser({ password: newPassword });
                if (error) {
                    return { error: { status: 400, data: error.message } };
                }
                return { data: { success: true, data: { message: 'Password updated' }, error: null } };
            },
        }),
        updateProfile: builder.mutation<ApiResponse<UserProfile>, { displayName?: string; avatarUrl?: string }>({            queryFn: async (body) => {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session?.user) {
                    return { error: { status: 401, data: 'Not authenticated' } };
                }
                const { data, error } = await supabase
                    .schema('identity')
                    .from('profiles')
                    .update({
                        display_name: body.displayName,
                        avatar_url: body.avatarUrl,
                    })
                    .eq('id', session.user.id)
                    .select()
                    .single();
                if (error) {
                    return { error: { status: 400, data: error.message } };
                }
                const wrapped: ApiResponse<UserProfile> = {
                    success: true,
                    data: toUserProfile(data, session.user.email || '', []),
                    error: null,
                };
                return { data: wrapped };
            },
            invalidatesTags: ['UserProfile'],
        }),
        applyInstructor: builder.mutation<ApiResponse<{ roleStatus: string }>, void>({
            queryFn: async () => {
                const { data, error } = await supabase.functions.invoke('apply-instructor', { body: {} });
                if (error) {
                    return { error: { status: 400, data: error.message } };
                }
                if ((data as any)?.error) {
                    return { error: { status: 400, data: (data as any).error.message } };
                }
                const payload = (data as any)?.data ?? {};
                return { data: { success: true, data: { roleStatus: payload.roleStatus ?? 'pending' }, error: null } };
            },
            invalidatesTags: ['UserProfile'],
        }),
    }),
});

export const {
    useMeQuery,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useApplyInstructorMutation,
} = identityApi;
