export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: any[] | null;
  meta?: any;
}