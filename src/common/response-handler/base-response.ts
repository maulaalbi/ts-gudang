import { BaseResponse } from './response-interface';

export class ResponseHandler {
  static createTimestamp(): string {
    return new Date().toISOString();
  }
}

export class SuccessResponse<T> implements BaseResponse {
  status: string;
  message: string;
  timestamp: string;
  data: T;

  constructor(data: T, message: string = 'Request was successful') {
    this.status = 'success';
    this.message = message;
    this.timestamp = ResponseHandler.createTimestamp();
    this.data = data;
  }
}

export class ErrorResponse implements BaseResponse {
  status: string;
  message: string;
  timestamp: string;
  error?: string;
  errorCode?: number;
  details?: string;

  constructor(
    message: string,
    errorCode: number = 400,
    error?: string,
    details?: string,
  ) {
    this.status = 'error';
    this.message = message;
    this.timestamp = ResponseHandler.createTimestamp();
    this.errorCode = errorCode;
    this.error = error;
    this.details = details;
  }
}
