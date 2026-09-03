import { ApiResponse } from '@/lib/api-utils';
import { CourseCardProps, CourseDetailProps } from '@/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { supabaseBaseQuery } from '@/lib/supabaseBaseQuery';

const wrap = <T>(data: T): ApiResponse<T> => ({ success: true, data, error: null });

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: supabaseBaseQuery,
  tagTypes: ['Courses'],
  endpoints: (builder) => ({
    getCourses: builder.query<ApiResponse<{ courses: CourseCardProps[], total: number }>, any>({
      query: (params?: any) => {
        const search = new URLSearchParams({ select: '*,categories(name)' });
        if (params?.category) search.set('category_id', `eq.${params.category}`);
        if (params?.limit) search.set('limit', String(params.limit));
        if (params?.cursor) search.set('id', `gt.${params.cursor}`);
        search.set('status', 'eq.published');
        search.set('order', 'created_at.asc');
        return { url: `/catalog/courses?${search.toString()}` };
      },
      transformResponse: (raw: any) => wrap({ courses: raw ?? [], total: (raw ?? []).length }),
      providesTags: ['Courses'],
    }),
    searchCourses: builder.query({
      query: (query: string) => ({
        url: `/catalog/courses?select=*,categories(name)&title=ilike.*${encodeURIComponent(query)}*&status=eq.published`,
      }),
      transformResponse: (raw: any) => wrap(raw ?? []),
      providesTags: ['Courses'],
    }),
    getCourseBySlug: builder.query<{ data: CourseDetailProps }, string>({
      query: (courseSlug: string) => ({
        url: `/catalog/courses?select=*,categories(name)&slug=eq.${encodeURIComponent(courseSlug)}&limit=1`,
      }),
      transformResponse: (raw: any) => ({ data: (raw ?? [])[0] ?? null }),
      providesTags: ['Courses'],
    }),
    getFeaturedCourses: builder.query({
      query: (limit: number = 10) => ({
        url: `/catalog/courses?select=*,categories(name)&status=eq.published&order=created_at.desc&limit=${limit}`,
      }),
      transformResponse: (raw: any) => wrap(raw ?? []),
      providesTags: ['Courses'],
    }),
    approveCourse: builder.mutation<ApiResponse<{ approvedAt: string }>, string>({
      queryFn: async (courseId) => {
        const { data, error } = await supabase.functions.invoke('approve-course', {
          body: { courseId },
        });
        if (error) {
          return { error: { status: 400, data: error.message } };
        }
        if ((data as any)?.error) {
          return { error: { status: 400, data: (data as any).error.message } };
        }
        return { data: wrap((data as any)?.data ?? null) };
      },
      invalidatesTags: ['Courses'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useSearchCoursesQuery,
  useGetCourseBySlugQuery,
  useGetFeaturedCoursesQuery,
  useApproveCourseMutation
} = coursesApi;
