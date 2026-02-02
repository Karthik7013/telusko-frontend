import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Course } from '@/types/course';

import { ALL_COURSES } from '@/data/courses-data';

// Simulating a network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }), // We're using local mock data
    endpoints: (builder) => ({
        getCourses: builder.query<Course[], void>({
            queryFn: async () => {
                await delay(800);
                return { data: ALL_COURSES };
            }
        }),
        getCourseById: builder.query<Course, string>({
            queryFn: async (id) => {
                await delay(1200);
                const course = ALL_COURSES.find(c => c.id === id);
                if (course) {
                    return { data: course };
                }
                return { error: { status: 404, data: 'Course not found' } as any };
            }
        }),
    }),
});

export const { useGetCoursesQuery, useGetCourseByIdQuery } = coursesApi;
