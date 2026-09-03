import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store/store';

export const supabaseBaseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SUPABASE_URL || ''}/rest/v1`,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.session?.access_token ?? state.auth.accessToken ?? null;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('apikey', import.meta.env.VITE_SUPABASE_ANON_KEY || '');
        return headers;
    },
});

export default supabaseBaseQuery;
