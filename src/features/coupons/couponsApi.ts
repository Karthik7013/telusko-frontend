import { ApiResponse } from '@/lib/api-utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { salesBaseQuery } from '@/lib/supabaseBaseQuery';

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

type SupabaseRow = Record<string, unknown>;

const getString = (row: SupabaseRow, key: string): string => String(row[key] ?? '');
const getNullableString = (row: SupabaseRow, key: string): string | null =>
  row[key] == null ? null : String(row[key]);

const mapCoupon = (c: SupabaseRow): Coupon => ({
  id: getString(c, 'id'),
  code: getString(c, 'code'),
  name: getNullableString(c, 'name'),
  description: getNullableString(c, 'description'),
  discountPercent: Number(c['discount_percent'] ?? 0),
  discountAmount: c['discount_amount'] != null ? Number(c['discount_amount']) : null,
  usageLimit: Number(c['usage_limit'] ?? 0),
  usageCount: Number(c['usage_count'] ?? 0),
  validFrom: getNullableString(c, 'valid_from'),
  validUntil: getNullableString(c, 'valid_until'),
  isActive: Boolean(c['is_active']),
  createdAt: getString(c, 'created_at'),
  updatedAt: getString(c, 'updated_at'),
});

export const couponsApi = createApi({
  reducerPath: 'couponsApi',
  baseQuery: salesBaseQuery,
  endpoints: (builder) => ({
    validateCoupon: builder.query<ApiResponse<Coupon>, string>({
      query: (code) => `/coupons?select=*&code=eq.${encodeURIComponent(code)}&is_active=eq.true&limit=1`,
      transformResponse: (raw: unknown) => {
        const row = ((raw ?? []) as SupabaseRow[])[0];
        if (!row || row['code'] == null) {
          return { success: false, data: null, error: [{ message: 'Invalid or expired coupon code' }] };
        }
        return wrap(mapCoupon(row));
      },
    }),
  }),
})

export const { useLazyValidateCouponQuery } = couponsApi
