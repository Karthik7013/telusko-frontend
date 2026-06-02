import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/authBaseQuery';
import { ApiResponse } from '@/lib/api-utils';

export interface ActivityLogItem {
    id: string;
    activityType: 'login' | 'course_enrolled' | 'certificate_earned';
    resourceId: string | null;
    resourceType: string | null;
    metadata: Record<string, any>;
    durationMinutes: number;
    createdAt: string;
}

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['ActivityLogs'],
    endpoints: (builder) => ({
        logs: builder.query<ActivityLogItem[], void>({
            query: () => '/identity/logs',
            transformResponse: (response: ApiResponse<{ logs: ActivityLogItem[] }>) =>
                response.data?.logs ?? [],
            providesTags: ['ActivityLogs'],
        }),
    }),
})

export const { useLogsQuery } = dashboardApi
