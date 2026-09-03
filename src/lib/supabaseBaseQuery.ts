import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store/store';

const prepareSupabaseHeaders = (headers: Headers, { getState }: any) => {
    const state = getState() as RootState;
    const token = state.auth.session?.access_token ?? state.auth.accessToken ?? null;
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('apikey', import.meta.env.VITE_SUPABASE_ANON_KEY || '');
    return headers;
};

const schemaBaseQuery = (schema: 'public' | 'identity' | 'catalog' | 'sales') =>
    fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SUPABASE_URL || ''}/rest/v1`,
        prepareHeaders: (headers, api) => {
            prepareSupabaseHeaders(headers, api);
            headers.set('Accept-Profile', schema);
            headers.set('Content-Profile', schema);
            return headers;
        },
    });

export const supabaseBaseQuery = schemaBaseQuery('public');
export const identityBaseQuery = schemaBaseQuery('identity');
export const catalogBaseQuery = schemaBaseQuery('catalog');
export const salesBaseQuery = schemaBaseQuery('sales');

export default supabaseBaseQuery;
