import { createApi } from '@reduxjs/toolkit/query/react';
import { supabaseBaseQuery } from '@/lib/supabaseBaseQuery';
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

const mapLog = (l: any): ActivityLogItem => ({
    id: l.id,
    activityType: l.activity_type,
    resourceId: l.resource_id,
    resourceType: l.resource_type,
    metadata: l.metadata ?? {},
    durationMinutes: l.duration_minutes ?? 0,
    createdAt: l.created_at,
});

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: supabaseBaseQuery,
    tagTypes: ['ActivityLogs'],
    endpoints: (builder) => ({
        logs: builder.query<ActivityLogItem[], void>({
            query: () => '/identity/activity_logs?select=*&order=created_at.desc&limit=50',
            transformResponse: (response: ApiResponse<any[]> | any[]) => {
                const raw = Array.isArray(response) ? response : (response as ApiResponse<any[]>)?.data ?? [];
                return (raw ?? []).map(mapLog);
            },
            providesTags: ['ActivityLogs'],
        }),
    }),
})

export const { useLogsQuery } = dashboardApi
