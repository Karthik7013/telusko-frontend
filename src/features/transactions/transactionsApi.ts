import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Transaction } from '@/types';
import { fakeApi } from '@/lib/fake-api';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      queryFn: async () => {
        const response = await fakeApi.getTransactions();
        if (response.status === 'error') {
          return { error: { status: 500, data: response.error } };
        }
        return { data: response.data };
      }
    }),
    getTransactionById: builder.query<Transaction, string>({
      queryFn: async (id) => {
        const response = await fakeApi.getTransactionById(id);
        if (response.status === 'error') {
          return { error: { status: 404, data: response.error } };
        }
        if (!response.data) {
          return { error: { status: 404, data: 'Transaction not found' } };
        }
        return { data: response.data };
      }
    }),
  }),
});

export const { useGetTransactionsQuery, useGetTransactionByIdQuery } = transactionsApi;