import { ApiResponse } from '@/lib/api-utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:3000';

export interface CreateOrderRequest {
  userId: string
  subtotalAmount: number
  taxAmount?: number
  discountAmount?: number
  totalAmount: number
  currency?: string
  notes?: string
}

export interface OrderItem {
  id: string
  orderId: string
  courseId: string
  title: string
  slug: string | null
  unitPrice: number
  quantity: number
  totalAmount: number
  status: 'active' | 'cancelled' | 'refunded'
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  subtotalAmount: number
  taxAmount: number
  discountAmount: number
  totalAmount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
  currency: string
  paymentMethod: string | null
  paymentTransactionId: string | null
  paymentCompletedAt: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
  orderItems?: OrderItem[]
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<ApiResponse<Order>, CreateOrderRequest>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),
    getOrderByNumber: builder.query<ApiResponse<Order>, string>({
      query: (orderNumber) => `/orders/number/${orderNumber}`,
    }),
  }),
})

export const { useCreateOrderMutation, useGetOrderByNumberQuery } = ordersApi
