import { ApiResponse } from '@/lib/api-utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/lib/constants';

export interface WishlistItem {
  id: string
  courseId: string
  title: string
  addedAt: string
}

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    getWishlist: builder.query<ApiResponse<WishlistItem[]>, void>({
      query: () => '/wishlist',
      providesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
})

export const { useGetWishlistQuery, useRemoveFromWishlistMutation } = wishlistApi
