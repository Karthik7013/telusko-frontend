import { ApiResponse } from '@/lib/api-utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { salesBaseQuery } from '@/lib/supabaseBaseQuery';

export interface WishlistItem {
  id: string
  courseId: string
  title: string
  addedAt: string
}

const wrap = <T>(data: T): ApiResponse<T> => ({ success: true, data, error: null });

type SupabaseRow = Record<string, unknown>;

const mapWishlistItem = (w: SupabaseRow): WishlistItem => ({
  id: String(w['id'] ?? ''),
  courseId: String(w['course_id'] ?? ''),
  title: String((w['courses'] as SupabaseRow | null)?.['title'] ?? w['course_id'] ?? ''),
  addedAt: String(w['added_at'] ?? ''),
});

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: salesBaseQuery,
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    getWishlist: builder.query<ApiResponse<WishlistItem[]>, void>({
      query: () => '/wishlist?select=*,courses(title)&order=added_at.desc',
      transformResponse: (raw: unknown) => wrap(
        ((raw ?? []) as SupabaseRow[]).map(mapWishlistItem)
      ),
      providesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/wishlist?id=eq.${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
})

export const { useGetWishlistQuery, useRemoveFromWishlistMutation } = wishlistApi
