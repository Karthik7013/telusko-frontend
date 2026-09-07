export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: unknown[] | null;
  meta?: unknown;
}

export interface ApiErrorPayload {
  data?: {
    message?: string;
  };
  message?: string;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === 'object' && error !== null) {
    const payload = error as ApiErrorPayload;
    if (typeof payload.data?.message === 'string') return payload.data.message;
    if (typeof payload.message === 'string') return payload.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}