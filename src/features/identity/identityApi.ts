
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth/authBaseQuery';
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
    roles: ROLES[]
}

export const identityApi = createApi({
    reducerPath: 'identityApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        me: builder.query<ApiResponse<UserProfile>, void>({
            query: () => '/identity/me'
        }),
        changePassword: builder.mutation<ApiResponse<{ message: string }>, { currentPassword: string; newPassword: string }>({
            query: (body) => ({
                url: '/identity/change-password',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useMeQuery,
    useChangePasswordMutation
} = identityApi;