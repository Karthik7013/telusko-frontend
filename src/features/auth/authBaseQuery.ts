import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';
import { setCredentials, logOut } from './authSlice';

export interface RefreshResponse {
    accessToken: string;
}

export const BASE_URL = 'http://localhost:3000';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState, arg }) => {
        const token = (getState() as RootState).auth.accessToken; // get token from authslice
        // Detect if the current request is for the refresh token (dont pass accesstoken for refresh endpoint)
        const isRefreshRequest = typeof arg === 'object' ? arg.url === '/auth/refresh' : arg === '/auth/refresh';

        if (token && !isRefreshRequest) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include'
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    // Attempt the actual request
    let result = await rawBaseQuery(args, api, extraOptions);

    // If request fails with 401, try to refresh
    if (result.error && result.error.status === 401) {
        // Call the refresh endpoint (cookies handled automatically by browser)
        const refreshResult = await rawBaseQuery(
            {
                url: '/auth/refresh',
                method: 'POST',
            },
            api,
            { ...extraOptions, skipAuth: true }
        );

        if (refreshResult.data) {
            const data = refreshResult.data as RefreshResponse;
            console.log(data);
            // Update Redux state with the new token

            api.dispatch(setCredentials({ accessToken: data.accessToken }));
            localStorage.setItem('auth_active', 'true');

            // Retry the original request
            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            // Refresh failed: Clear Redux state
            api.dispatch(logOut());
        }
    }
    return result;
};