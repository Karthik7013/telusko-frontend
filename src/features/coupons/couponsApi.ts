import { ApiResponse } from '@/lib/api-utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:3000';

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

export const couponsApi = createApi({
  reducerPath: 'couponsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    validateCoupon: builder.query<ApiResponse<Coupon>, string>({
      query: (code) => `/coupons/code/${code}`,
    }),
  }),
})

export const { useLazyValidateCouponQuery } = couponsApi
