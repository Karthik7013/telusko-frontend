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

type SupabaseRow = Record<string, unknown>;

const mapTransaction = (t: SupabaseRow): Transaction => ({
  id: String(t['id'] ?? ''),
  orderNumber: String(t['gateway_txn_id'] ?? t['id'] ?? ''),
  courseId: String(t['course_id'] ?? ''),
  courseName: String((t['courses'] as SupabaseRow | null)?.['title'] ?? t['course_id'] ?? ''),
  amount: Number(t['amount'] ?? 0),
  currency: 'USD',
  status: (t['payment_status'] === 'completed' ? 'completed' : String(t['payment_status'] ?? 'pending')) as Transaction['status'],
  paymentMethod: null,
  createdAt: String(t['created_at'] ?? ''),
});

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: salesBaseQuery,
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    getMyTransactions: builder.query<ApiResponse<Transaction[]>, void>({
      query: () => '/transactions?select=*,courses(title)&order=created_at.desc',
      transformResponse: (raw: unknown) => wrap(
        ((raw ?? []) as SupabaseRow[]).map(mapTransaction)
      ),
      providesTags: ['Transactions'],
    }),
  }),
})

export const { useGetMyTransactionsQuery } = transactionsApi
