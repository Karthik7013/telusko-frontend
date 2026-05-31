
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/authBaseQuery';
import { ApiResponse } from '@/lib/api-utils';
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

export const identityApi = createApi({
    reducerPath: 'identityApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['UserProfile'],
    endpoints: (builder) => ({
        me: builder.query<ApiResponse<UserProfile>, void>({
            query: () => '/identity/me',
            providesTags: ['UserProfile'],
        }),
        changePassword: builder.mutation<ApiResponse<{ message: string }>, { currentPassword: string; newPassword: string }>({
            query: (body) => ({
                url: '/identity/change-password',
                method: 'POST',
                body,
            }),
        }),
        updateProfile: builder.mutation<ApiResponse<UserProfile>, { displayName?: string; avatarUrl?: string }>({
            query: (body) => ({
                url: '/identity/me',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['UserProfile'],
        }),
    }),
});

export const {
    useMeQuery,
    useChangePasswordMutation,
    useUpdateProfileMutation,
} = identityApi;