import { ApiResponse } from '@/lib/api-utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { supabaseBaseQuery } from '@/lib/supabaseBaseQuery';

export interface Coupon {
  id: string
  code: string
  name: string | null
  description: string | null
  discountPercent: number
  discountAmount: number | null
  usageLimit: number
  usageCount: number
  validFrom: string | null
  validUntil: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const wrap = <T>(data: T): ApiResponse<T> => ({ success: true, data, error: null });

const mapCoupon = (c: any): Coupon => ({
  id: c.id,
  code: c.code,
  name: c.name,
  description: c.description,
  discountPercent: Number(c.discount_percent ?? 0),
  discountAmount: c.discount_amount != null ? Number(c.discount_amount) : null,
  usageLimit: c.usage_limit ?? 0,
  usageCount: c.usage_count ?? 0,
  validFrom: c.valid_from,
  validUntil: c.valid_until,
  isActive: c.is_active,
  createdAt: c.created_at,
  updatedAt: c.updated_at,
});

export const couponsApi = createApi({
  reducerPath: 'couponsApi',
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    validateCoupon: builder.query<ApiResponse<Coupon>, string>({
      query: (code) => `/sales/coupons?select=*&code=eq.${encodeURIComponent(code)}&is_active=eq.true&limit=1`,
      transformResponse: (raw: any) => wrap(mapCoupon((raw ?? [])[0])),
    }),
  }),
})

export const { useLazyValidateCouponQuery } = couponsApi
