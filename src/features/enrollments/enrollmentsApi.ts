import { ApiResponse } from '@/lib/api-utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/lib/constants';

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

export const enrollmentsApi = createApi({
  reducerPath: 'enrollmentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Enrollments'],
  endpoints: (builder) => ({
    getMyEnrollments: builder.query<ApiResponse<Enrollment[]>, void>({
      query: () => '/enrollments',
      providesTags: ['Enrollments'],
    }),
    createEnrollment: builder.mutation<ApiResponse<Enrollment>, CreateEnrollmentRequest>({
      query: (body) => ({
        url: '/enrollments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Enrollments'],
    }),
  }),
})

export const { useGetMyEnrollmentsQuery, useCreateEnrollmentMutation } = enrollmentsApi
