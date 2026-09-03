import { ApiResponse } from '@/lib/api-utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { salesBaseQuery } from '@/lib/supabaseBaseQuery';

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

const wrap = <T>(data: T): ApiResponse<T> => ({ success: true, data, error: null });

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: salesBaseQuery,
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    getMyTransactions: builder.query<ApiResponse<Transaction[]>, void>({
      query: () => '/transactions?select=*,courses(title)&order=created_at.desc',
      transformResponse: (raw: any) => wrap(
        (raw ?? []).map((t: any) => ({
          id: t.id,
          orderNumber: t.gateway_txn_id ?? t.id,
          courseId: t.course_id,
          courseName: t.courses?.title ?? t.course_id,
          amount: Number(t.amount ?? 0),
          currency: 'USD',
          status: t.payment_status === 'completed' ? 'completed' : t.payment_status,
          paymentMethod: null,
          createdAt: t.created_at,
        }))
      ),
      providesTags: ['Transactions'],
    }),
  }),
})

export const { useGetMyTransactionsQuery } = transactionsApi
