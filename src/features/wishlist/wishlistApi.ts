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

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: salesBaseQuery,
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    getWishlist: builder.query<ApiResponse<WishlistItem[]>, void>({
      query: () => '/wishlist?select=*,courses(title)&order=added_at.desc',
      transformResponse: (raw: any) => wrap(
        (raw ?? []).map((w: any) => ({
          id: w.id,
          courseId: w.course_id,
          title: w.courses?.title ?? w.course_id,
          addedAt: w.added_at,
        }))
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
