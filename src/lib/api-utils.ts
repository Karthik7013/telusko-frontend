export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  meta?: any;
  errors?: any[];
}