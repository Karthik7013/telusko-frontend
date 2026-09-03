import { ApiResponse } from '@/lib/api-utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { supabaseBaseQuery } from '@/lib/supabaseBaseQuery';

export interface CreateEnrollmentRequest {
  userId: string
  courseId: string
  couponId?: string
  paidAmount?: number
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  couponId: string | null
  paidAmount: number | null
  status: string
  enrolledAt: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
}

const wrap = <T>(data: T): ApiResponse<T> => ({ success: true, data, error: null });

export const enrollmentsApi = createApi({
  reducerPath: 'enrollmentsApi',
  baseQuery: supabaseBaseQuery,
  tagTypes: ['Enrollments'],
  endpoints: (builder) => ({
    getMyEnrollments: builder.query<ApiResponse<Enrollment[]>, void>({
      query: () => '/sales/enrollments?select=*,catalog/courses(id,title,slug)&order=enrolled_at.desc',
      transformResponse: (raw: any) => wrap(raw ?? []),
      providesTags: ['Enrollments'],
    }),
    createEnrollment: builder.mutation<ApiResponse<Enrollment>, CreateEnrollmentRequest>({
      queryFn: async (body) => {
        const { data, error } = await supabase.functions.invoke('enroll-student', {
          body: { courseId: body.courseId },
        });
        if (error) {
          return { error: { status: 400, data: error.message } };
        }
        if ((data as any)?.error) {
          return { error: { status: 400, data: (data as any).error.message } };
        }
        const payload = (data as any)?.data ?? {};
        const enrollment: Enrollment = {
          id: payload.enrollmentId ?? '',
          userId: body.userId,
          courseId: body.courseId,
          couponId: body.couponId ?? null,
          paidAmount: body.paidAmount ?? payload.amount ?? null,
          status: payload.status ?? 'enrolled',
          enrolledAt: new Date().toISOString(),
          completedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return { data: wrap(enrollment) };
      },
      invalidatesTags: ['Enrollments'],
    }),
  }),
})

export const { useGetMyEnrollmentsQuery, useCreateEnrollmentMutation } = enrollmentsApi
