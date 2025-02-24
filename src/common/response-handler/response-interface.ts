export interface BaseResponse {
  status: string;
  message: string;
  timestamp: string;
}

export interface SuccessResponse<T> extends BaseResponse {
  data: T;
}

export interface ErrorResponse extends BaseResponse {
  error?: string;
  errorCode?: string;
  details: string;
}
