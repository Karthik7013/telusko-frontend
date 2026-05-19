import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// --- 1. The Standard Base Query ---
const BASE_URL = 'http://localhost:3000';

// --- 2. Base Query with Error Handling ---
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// --- 3. The API Definition ---
export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery,
    endpoints: () => ({

    }),
});

export const {

} = adminApi;

export default adminApi;