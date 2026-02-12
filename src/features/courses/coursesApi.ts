import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Course } from '@/types/course';
import { fakeApi } from '@/lib/fake-api';

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      queryFn: async () => {
        const response = await fakeApi.getCourses();
        if (response.status === 'error') {
          return { error: { status: 500, data: response.error } };
        }
        return { data: response.data };
      }
    }),
    getCourseById: builder.query<Course, string>({
      queryFn: async (id) => {
        const response = await fakeApi.getCourseById(id);
        if (response.status === 'error') {
          return { error: { status: 404, data: response.error } };
        }
        if (!response.data) {
          return { error: { status: 404, data: 'Course not found' } };
        }
        return { data: response.data };
      }
    }),
    getCoursesByCategory: builder.query<Course[], string>({
      queryFn: async (category) => {
        const response = await fakeApi.getCoursesByCategory(category);
        if (response.status === 'error') {
          return { error: { status: 500, data: response.error } };
        }
        return { data: response.data };
      }
    }),
    getCoursesByLevel: builder.query<Course[], string>({
      queryFn: async (level) => {
        const response = await fakeApi.getCoursesByLevel(level);
        if (response.status === 'error') {
          return { error: { status: 500, data: response.error } };
        }
        return { data: response.data };
      }
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseByIdQuery, useGetCoursesByCategoryQuery, useGetCoursesByLevelQuery } = coursesApi;
