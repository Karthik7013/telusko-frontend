
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth/authBaseQuery';

export const identityApi = createApi({
    reducerPath: 'identityApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        me: builder.query({
            query: () => ({
                url: '/identity/me',
                method: 'GET'
            })
        })
    }),
});

export const {
    useMeQuery
} = identityApi;