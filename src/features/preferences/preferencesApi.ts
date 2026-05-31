import { ApiResponse } from '@/lib/api-utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { UserPreferences } from '@/onboarding/types';
import { baseQueryWithReauth } from '../auth/authBaseQuery';

export const preferencesApi = createApi({
  reducerPath: 'preferencesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Preferences'],
  endpoints: (builder) => ({
    getPreferences: builder.query<ApiResponse<UserPreferences>, void>({
      query: () => '/preferences',
      providesTags: ['Preferences'],
    }),
    savePreferences: builder.mutation<ApiResponse<UserPreferences>, UserPreferences>({
      query: (body) => ({
        url: '/preferences',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Preferences'],
    }),
    updatePreferences: builder.mutation<ApiResponse<UserPreferences>, UserPreferences>({
      query: (body) => ({
        url: '/preferences',
        method: 'PUT',
        body,
      }),
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
