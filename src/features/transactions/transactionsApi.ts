import { ApiResponse } from '@/lib/api-utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/lib/constants';

export interface Transaction {
  id: string
  orderNumber: string
  courseId: string
  courseName: string
  amount: number
  currency: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
  paymentMethod: string | null
  createdAt: string
}

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    getMyTransactions: builder.query<ApiResponse<Transaction[]>, void>({
      query: () => '/transactions',
      providesTags: ['Transactions'],
    }),
  }),
})

export const { useGetMyTransactionsQuery } = transactionsApi
