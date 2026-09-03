import { ApiResponse } from '@/lib/api-utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { salesBaseQuery } from '@/lib/supabaseBaseQuery';

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

const wrap = <T>(data: T): ApiResponse<T> => ({ success: true, data, error: null });

const mapOrder = (o: any): Order => ({
  id: o.id,
  orderNumber: o.order_number,
  userId: o.user_id,
  subtotalAmount: Number(o.subtotal_amount ?? 0),
  taxAmount: Number(o.tax_amount ?? 0),
  discountAmount: Number(o.discount_amount ?? 0),
  totalAmount: Number(o.total_amount ?? 0),
  status: o.status,
  currency: o.currency ?? 'USD',
  paymentMethod: o.payment_method,
  paymentTransactionId: o.payment_transaction_id,
  paymentCompletedAt: o.payment_completed_at,
  notes: o.notes,
  createdAt: o.created_at,
  updatedAt: o.updated_at,
  orderItems: (o.order_items ?? []).map((i: any) => ({
    id: i.id,
    orderId: i.order_id,
    courseId: i.course_id,
    title: i.title,
    slug: i.slug,
    unitPrice: Number(i.unit_price ?? 0),
    quantity: i.quantity ?? 1,
    totalAmount: Number(i.total_amount ?? 0),
    status: i.status,
    createdAt: i.created_at,
    updatedAt: i.updated_at,
  })),
});

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: salesBaseQuery,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation<ApiResponse<Order>, CreateOrderRequest>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body: {
          order_number: `ORD-${Date.now()}`,
          user_id: body.userId,
          subtotal_amount: body.subtotalAmount,
          tax_amount: body.taxAmount ?? 0,
          discount_amount: body.discountAmount ?? 0,
          total_amount: body.totalAmount,
          currency: body.currency ?? 'USD',
          notes: body.notes ?? null,
          status: 'pending',
        },
        headers: { Prefer: 'return=representation' },
      }),
      transformResponse: (raw: any) => wrap(mapOrder(Array.isArray(raw) ? raw[0] : raw)),
      invalidatesTags: ['Orders'],
    }),
    getOrderByNumber: builder.query<ApiResponse<Order>, string>({
      query: (orderNumber) => `/orders?select=*,order_items(*)&order_number=eq.${encodeURIComponent(orderNumber)}&limit=1`,
      transformResponse: (raw: any) => wrap(mapOrder((raw ?? [])[0])),
      providesTags: ['Orders'],
    }),
  }),
})

export const { useCreateOrderMutation, useGetOrderByNumberQuery } = ordersApi
