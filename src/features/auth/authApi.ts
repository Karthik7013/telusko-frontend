import { ApiResponse } from '@/lib/api-utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth, RefreshResponse } from './authBaseQuery';
import { setCredentials, logOut } from './authSlice';

type ROLES = 'admin' | 'student' | 'instructor';
// --- Interfaces ---
export interface User {
    id: string,
    email: string,
    fullName: string;
    roles: ROLES[]
    profilePictureUrl: null | string;
    bio: string | null;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface LogoutResponse {
    message: string;
}

export interface SignUpRequest {
    displayName: string;
    email: string;
    password: string;
}
// --- 3. The API Definition ---
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
            query: (payload) => ({
                url: '/auth/login',
                method: 'POST',
                body: payload,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data: response } = await queryFulfilled;
                    if (response.data?.accessToken) {
                        dispatch(setCredentials({
                            accessToken: response.data?.accessToken,
                        }));
                        localStorage.setItem('auth_active', 'true');
                    }
                } catch (err) {
                    localStorage.removeItem('auth_active');
                }
            }
        }),
        signUp: builder.mutation<ApiResponse<LoginResponse>, SignUpRequest>({
            query: (payload) => ({
                url: '/auth/register',
                method: 'POST',
                body: payload,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data: response } = await queryFulfilled;
                    if (response.data?.accessToken) {
                        dispatch(setCredentials({
                            accessToken: response.data?.accessToken,
                        }));
                        localStorage.setItem('auth_active', 'true');
                    }
                } catch (err) {
                    localStorage.removeItem('auth_active');
                }
            }
        }),
        refreshToken: builder.query<ApiResponse<RefreshResponse>, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.data?.accessToken) {
                        dispatch(setCredentials({ accessToken: data.data.accessToken }));
                        localStorage.setItem('auth_active', 'true');
                    }
                } catch (err) {
                    localStorage.removeItem('auth_active');
                }
            }
        }),
        logout: builder.mutation<ApiResponse<LogoutResponse>, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data: response } = await queryFulfilled;
                    if (response.success) {
                        dispatch(logOut());
                        localStorage.removeItem('auth_active');
                        window.location.href = '/auth/login';
                    }
                } catch {
                    // failed to logout 
                }
            }
        }),
    })
});

export const {
    useLoginMutation,
    useSignUpMutation,
    useRefreshTokenQuery,
    useLogoutMutation
} = authApi;

export default authApi;
