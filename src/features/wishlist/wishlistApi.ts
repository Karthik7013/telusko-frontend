import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { WishlistItem } from '@/types';
import { fakeApi } from '@/lib/fake-api';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistItem[], void>({
      queryFn: async () => {
        const response = await fakeApi.getWishlist();
        if (response.status === 'error') {
          return { error: { status: 500, data: response.error } };
        }
        return { data: response.data };
      }
    }),
    addToWishlist: builder.mutation<{ success: boolean; message: string }, { courseId: string }>({
      queryFn: async (args) => {
        const response = await fakeApi.addToWishlist(args.courseId);
        if (response.status === 'error') {
          return { error: { status: 500, data: response.error } };
        }
        return { data: response.data };
      }
    }),
    removeFromWishlist: builder.mutation<{ success: boolean; message: string }, string>({
      queryFn: async (courseId) => {
        const response = await fakeApi.removeFromWishlist(courseId);
        if (response.status === 'error') {
          return { error: { status: 500, data: response.error } };
        }
        return { data: response.data };
      }
    }),
  }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } = wishlistApi;