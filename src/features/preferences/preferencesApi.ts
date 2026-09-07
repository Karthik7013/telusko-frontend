import { ApiResponse } from '@/lib/api-utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { UserPreferences } from '@/onboarding/types';
import { identityBaseQuery } from '@/lib/supabaseBaseQuery';

const wrap = <T>(data: T): ApiResponse<T> => ({ success: true, data, error: null });

type SupabaseRow = Record<string, unknown>;

const extractPreferenceData = (raw: unknown): UserPreferences | null => {
  if (Array.isArray(raw)) {
    return ((raw[0] as SupabaseRow | undefined)?.['data'] ?? null) as UserPreferences | null;
  }
  return ((raw as SupabaseRow | null)?.['data'] ?? null) as UserPreferences | null;
};

export const preferencesApi = createApi({
  reducerPath: 'preferencesApi',
  baseQuery: identityBaseQuery,
  tagTypes: ['Preferences'],
  endpoints: (builder) => ({
    getPreferences: builder.query<ApiResponse<UserPreferences | null>, void>({
      query: () => '/preferences?select=data&limit=1',
      transformResponse: (raw: unknown) => wrap(extractPreferenceData(raw)),
      providesTags: ['Preferences'],
    }),
    savePreferences: builder.mutation<ApiResponse<UserPreferences | null>, UserPreferences>({
      query: (body) => ({
        url: '/preferences',
        method: 'POST',
        body: { data: body },
        headers: { Prefer: 'return=representation,resolution=merge-duplicates' },
      }),
      transformResponse: (raw: unknown) => wrap(extractPreferenceData(raw)),
      invalidatesTags: ['Preferences'],
    }),
    updatePreferences: builder.mutation<ApiResponse<UserPreferences | null>, UserPreferences>({
      query: (body) => ({
        url: '/preferences',
        method: 'PATCH',
        body: { data: body },
        headers: { Prefer: 'return=representation' },
      }),
      transformResponse: (raw: unknown) => wrap(extractPreferenceData(raw)),
      invalidatesTags: ['Preferences'],
    }),
  }),
})

export const {
  useGetPreferencesQuery,
  useLazyGetPreferencesQuery,
  useSavePreferencesMutation,
  useUpdatePreferencesMutation,
} = preferencesApi

export default preferencesApi
