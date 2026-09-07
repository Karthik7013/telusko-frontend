import { createApi } from '@reduxjs/toolkit/query/react';
import { identityBaseQuery } from '@/lib/supabaseBaseQuery';
import { ApiResponse } from '@/lib/api-utils';

export interface ActivityLogItem {
    id: string;
    activityType: 'login' | 'course_enrolled' | 'certificate_earned';
    resourceId: string | null;
    resourceType: string | null;
    metadata: Record<string, unknown>;
    durationMinutes: number;
    createdAt: string;
}

type SupabaseRow = Record<string, unknown>;

const mapLog = (l: SupabaseRow): ActivityLogItem => ({
    id: String(l['id'] ?? ''),
    activityType: l['activity_type'] as ActivityLogItem['activityType'],
    resourceId: l['resource_id'] == null ? null : String(l['resource_id']),
    resourceType: l['resource_type'] == null ? null : String(l['resource_type']),
    metadata: (l['metadata'] as Record<string, unknown> | null) ?? {},
    durationMinutes: Number(l['duration_minutes'] ?? 0),
    createdAt: String(l['created_at'] ?? ''),
});

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: identityBaseQuery,
    tagTypes: ['ActivityLogs'],
    endpoints: (builder) => ({
        logs: builder.query<ActivityLogItem[], void>({
            query: () => '/activity_logs?select=*&order=created_at.desc&limit=50',
            transformResponse: (response: unknown) => {
                const raw = Array.isArray(response)
                  ? (response as SupabaseRow[])
                  : ((response as ApiResponse<SupabaseRow[]> | null)?.data ?? []);
                return (raw ?? []).map(mapLog);
            },
            providesTags: ['ActivityLogs'],
        }),
    }),
})

export const { useLogsQuery } = dashboardApi
