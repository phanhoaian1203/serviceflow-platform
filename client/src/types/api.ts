export interface ErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: ErrorDetail[] | null;
  traceId?: string;
}
