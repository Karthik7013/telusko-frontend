// import { Course } from '@/types/course';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = 'http://localhost:3000';
export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (params?: any) => ({
        url: '/courses',
        params,
      }),
    }),
    searchCourses: builder.query({
      query: (query: string) => ({
        url: '/courses/search',
        params: { q: query },
      }),
    }),
    getCourseBySlug: builder.query({
      query: (courseSlug: string) => ({
        url: `/courses/${courseSlug}`,
      }),
    }),
    getFeaturedCourses: builder.query({
      query: (limit: number = 10) => ({
        url: '/courses/featured',
        params: { limit },
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useSearchCoursesQuery,
  useGetCourseBySlugQuery,
  useGetFeaturedCoursesQuery
} = coursesApi;