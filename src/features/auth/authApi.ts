import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Use 'import type' for these specific interfaces
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

// --- Interfaces ---
export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken?: string;
    refreshToken?: string;
    address?: {
        address: string;
        city: string;
        state: string;
        stateCode: string;
        postalCode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        country: string;
    };
    company?: {
        department: string;
        name: string;
        title: string;
        address: {
            address: string;
            city: string;
            state: string;
            stateCode: string;
            postalCode: string;
            coordinates: {
                lat: number;
                lng: number;
            };
            country: string;
        };
    };
    role: string;
}

export interface LoginRequest {
    username: string;
    password: string;
    expiresInMins?: number;
}

export interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}

export interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password?: string;
}

const BASE_URL = 'https://dummyjson.com'

// --- 1. The Standard Base Query ---
const rawBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// --- 2. The Interceptor (Refresh Logic) ---
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    // Attempt the actual request
    let result = await rawBaseQuery(args, api, extraOptions);

    // If request fails with 401, try to refresh
    if (result.error && result.error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            // Call the refresh endpoint
            const refreshResult = await rawBaseQuery(
                {
                    url: '/auth/refresh',
                    method: 'POST',
                    body: { refreshToken, expiresInMins: 30 },
                },
                api,
                extraOptions
            );

            if (refreshResult.data) {
                const data = refreshResult.data as RefreshResponse;

                // Save new tokens
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);

                // Retry the original request
                result = await rawBaseQuery(args, api, extraOptions);
            } else {
                // Refresh failed: Clear storage and force login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
    }
    return result;
};

// --- 3. The API Definition ---
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<User, LoginRequest>({
            query: (payload) => ({
                url: '/auth/login',
                method: 'POST',
                body: payload,
            }),
        }),
        signUp: builder.mutation<User, SignUpRequest>({
            query: (payload) => ({
                url: '/users/add',
                method: 'POST',
                body: payload,
            }),
        }),
        getUser: builder.query<User, void>({
            query: () => '/auth/me',
        }),
        // Manual refresh if ever needed
        refreshToken: builder.mutation<RefreshResponse, { refreshToken: string }>({
            query: (payload) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: payload,
            }),
        }),
    })
})

export const {
    useLoginMutation,
    useSignUpMutation,
    useGetUserQuery,
    useLazyGetUserQuery,
    useRefreshTokenMutation
} = authApi;

export default authApi;
