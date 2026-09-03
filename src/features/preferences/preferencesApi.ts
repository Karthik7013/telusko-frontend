import { ApiResponse } from '@/lib/api-utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { UserPreferences } from '@/onboarding/types';
import { identityBaseQuery } from '@/lib/supabaseBaseQuery';

const wrap = <T>(data: T): ApiResponse<T> => ({ success: true, data, error: null });

export const preferencesApi = createApi({
  reducerPath: 'preferencesApi',
  baseQuery: identityBaseQuery,
  tagTypes: ['Preferences'],
  endpoints: (builder) => ({
    getPreferences: builder.query<ApiResponse<UserPreferences>, void>({
      query: () => '/preferences?select=data&limit=1',
      transformResponse: (raw: any) => wrap((Array.isArray(raw) ? raw[0]?.data : raw?.data) ?? null),
      providesTags: ['Preferences'],
    }),
    savePreferences: builder.mutation<ApiResponse<UserPreferences>, UserPreferences>({
      query: (body) => ({
        url: '/preferences',
        method: 'POST',
        body: { data: body },
        headers: { Prefer: 'return=representation,resolution=merge-duplicates' },
      }),
      transformResponse: (raw: any) => wrap((Array.isArray(raw) ? raw[0]?.data : raw?.data) ?? null),
      invalidatesTags: ['Preferences'],
    }),
    updatePreferences: builder.mutation<ApiResponse<UserPreferences>, UserPreferences>({
      query: (body) => ({
        url: '/preferences',
        method: 'PATCH',
        body: { data: body },
        headers: { Prefer: 'return=representation' },
      }),
      transformResponse: (raw: any) => wrap((Array.isArray(raw) ? raw[0]?.data : raw?.data) ?? null),
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
