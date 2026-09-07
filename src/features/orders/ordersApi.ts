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

type SupabaseRow = Record<string, unknown>;

const mapOrderItem = (i: SupabaseRow): OrderItem => ({
    id: String(i['id'] ?? ''),
    orderId: String(i['order_id'] ?? ''),
    courseId: String(i['course_id'] ?? ''),
    title: String(i['title'] ?? ''),
    slug: i['slug'] == null ? null : String(i['slug']),
    unitPrice: Number(i['unit_price'] ?? 0),
    quantity: Number(i['quantity'] ?? 1),
    totalAmount: Number(i['total_amount'] ?? 0),
    status: i['status'] as OrderItem['status'],
    createdAt: String(i['created_at'] ?? ''),
    updatedAt: String(i['updated_at'] ?? ''),
});

const mapOrder = (o: SupabaseRow): Order => ({
  id: String(o['id'] ?? ''),
  orderNumber: String(o['order_number'] ?? ''),
  userId: String(o['user_id'] ?? ''),
  subtotalAmount: Number(o['subtotal_amount'] ?? 0),
  taxAmount: Number(o['tax_amount'] ?? 0),
  discountAmount: Number(o['discount_amount'] ?? 0),
  totalAmount: Number(o['total_amount'] ?? 0),
  status: o['status'] as Order['status'],
  currency: String(o['currency'] ?? 'USD'),
  paymentMethod: o['payment_method'] == null ? null : String(o['payment_method']),
  paymentTransactionId: o['payment_transaction_id'] == null ? null : String(o['payment_transaction_id']),
  paymentCompletedAt: o['payment_completed_at'] == null ? null : String(o['payment_completed_at']),
  notes: o['notes'] == null ? null : String(o['notes']),
  createdAt: String(o['created_at'] ?? ''),
  updatedAt: String(o['updated_at'] ?? ''),
  orderItems: ((o['order_items'] as SupabaseRow[] | null) ?? []).map(mapOrderItem),
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
      transformResponse: (raw: unknown) => wrap(mapOrder((Array.isArray(raw) ? raw[0] : raw) as SupabaseRow)),
      invalidatesTags: ['Orders'],
    }),
    getOrderByNumber: builder.query<ApiResponse<Order>, string>({
      query: (orderNumber) => `/orders?select=*,order_items(*)&order_number=eq.${encodeURIComponent(orderNumber)}&limit=1`,
      transformResponse: (raw: unknown) => wrap(mapOrder(((raw ?? []) as SupabaseRow[])[0] ?? {})),
      providesTags: ['Orders'],
    }),
  }),
})

export const { useCreateOrderMutation, useGetOrderByNumberQuery } = ordersApi
