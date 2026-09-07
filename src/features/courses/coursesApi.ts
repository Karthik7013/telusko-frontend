import { ApiResponse } from '@/lib/api-utils';
import { CourseCardProps, CourseDetailProps } from '@/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { catalogBaseQuery } from '@/lib/supabaseBaseQuery';

const wrap = <T>(data: T): ApiResponse<T> => ({ success: true, data, error: null });

interface FunctionResult {
  error?: { message?: string };
  data?: unknown;
}

interface GetCoursesParams {
  category?: string;
  limit?: number;
  cursor?: string;
  search?: string;
  level?: string;
  instructor?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isPublished?: boolean;
}

type SupabaseRow = Record<string, unknown>;

const getString = (row: SupabaseRow, key: string, fallback = ''): string => {
  const value = row[key];
  return value == null ? fallback : String(value);
};

const mapCourseCard = (row: SupabaseRow): CourseCardProps => {
  const category = (row['categories'] as { name?: unknown } | null)?.name;
  const level = getString(row, 'level', 'beginner');
  return {
    id: getString(row, 'id'),
    slug: getString(row, 'slug', getString(row, 'id')),
    title: getString(row, 'title', 'Untitled course'),
    thumbnailUrl: getString(row, 'thumbnail_url', getString(row, 'image_url')),
    instructor: {
      id: getString(row, 'instructor_id'),
      fullName: 'Instructor',
      email: '',
      profilePictureUrl: '',
    },
    category: typeof category === 'string' ? category : '',
    rating: Number(row['rating'] ?? 0),
    totalReviews: Number(row['total_reviews'] ?? 0),
    totalStudents: Number(row['total_students'] ?? 0),
    durationInHours: Number(row['duration_in_hours'] ?? 0),
    level: (level === 'beginner' || level === 'intermediate' || level === 'advanced' ? level : 'beginner') as CourseCardProps['level'],
    totalLessons: Number(row['total_lessons'] ?? 0),
    basePrice: Number(row['price'] ?? row['base_price'] ?? 0),
    lastUpdated: getString(row, 'updated_at', getString(row, 'created_at')),
  };
};

const mapCourseDetail = (row: SupabaseRow): CourseDetailProps => {
  const card = mapCourseCard(row);
  const tags = row['tags'];
  return {
    ...card,
    description: getString(row, 'description'),
    previewVideoUrl: getString(row, 'preview_video_url'),
    instructor: { ...card.instructor, bio: getString(row, 'instructor_bio') },
    language: getString(row, 'language', 'English'),
    whatYouLearn: Array.isArray(row['what_you_learn']) ? (row['what_you_learn'] as unknown[]).map(String) : [],
    requirements: Array.isArray(row['requirements']) ? (row['requirements'] as unknown[]).map(String) : [],
    targetedAudience: Array.isArray(row['targeted_audience']) ? (row['targeted_audience'] as unknown[]).map(String) : [],
    sections: Array.isArray(row['sections']) ? (row['sections'] as CourseDetailProps['sections']) : [],
    tags: Array.isArray(tags) ? (tags as unknown[]).map(String) : [],
  };
};

const toRows = (raw: unknown): SupabaseRow[] => (Array.isArray(raw) ? (raw as SupabaseRow[]) : []);

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: catalogBaseQuery,
  tagTypes: ['Courses'],
  endpoints: (builder) => ({
    getCourses: builder.query<ApiResponse<{ courses: CourseCardProps[], total: number }>, GetCoursesParams | void>({
      query: (params) => {
        // Filter by category NAME via an inner join (the UI works with names,
        // while the courses table only stores category_id).
        const select = params?.category ? '*,categories!inner(name)' : '*,categories(name)';
        const search = new URLSearchParams({ select });
        if (params?.category) search.set('categories.name', `eq.${params.category}`);
        if (params?.search) search.set('title', `ilike.*${params.search}*`);
        if (params?.minPrice != null) search.set('price', `gte.${params.minPrice}`);
        if (params?.maxPrice != null) search.append('price', `lte.${params.maxPrice}`);
        if (params?.limit) search.set('limit', String(params.limit));
        if (params?.cursor) search.set('id', `gt.${params.cursor}`);
        search.set('status', 'eq.published');
        search.set('order', 'created_at.asc');
        return { url: `/courses?${search.toString()}` };
      },
      transformResponse: (raw: unknown) => {
        const courses = toRows(raw).map(mapCourseCard);
        return wrap({ courses, total: courses.length });
      },
      providesTags: ['Courses'],
    }),
    searchCourses: builder.query<ApiResponse<CourseCardProps[]>, string>({
      query: (query: string) => ({
        url: `/courses?select=*,categories(name)&title=ilike.*${encodeURIComponent(query)}*&status=eq.published`,
      }),
      transformResponse: (raw: unknown) => wrap(toRows(raw).map(mapCourseCard)),
      providesTags: ['Courses'],
    }),
    getCourseBySlug: builder.query<{ data: CourseDetailProps | null }, string>({
      query: (courseSlug: string) => ({
        url: `/courses?select=*,categories(name)&slug=eq.${encodeURIComponent(courseSlug)}&limit=1`,
      }),
      transformResponse: (raw: unknown) => {
        const row = toRows(raw)[0];
        return { data: row ? mapCourseDetail(row) : null };
      },
      providesTags: ['Courses'],
    }),
    getFeaturedCourses: builder.query<ApiResponse<CourseCardProps[]>, number | void>({
      query: (limit: number = 10) => ({
        url: `/courses?select=*,categories(name)&status=eq.published&order=created_at.desc&limit=${limit}`,
      }),
      transformResponse: (raw: unknown) => wrap(toRows(raw).map(mapCourseCard)),
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
        const result = data as FunctionResult | null;
        if (result?.error) {
          return { error: { status: 400, data: result.error.message } };
        }
        return { data: wrap((result?.data ?? null) as { approvedAt: string }) };
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
