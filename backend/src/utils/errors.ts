import { APIError } from '../types/index.js';

export class AppError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(message: string, status: number = 500, code?: string, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class NASAAPIError extends AppError {
  constructor(message: string, status: number = 502, details?: unknown) {
    super(message, status, 'NASA_API_ERROR', details);
    this.name = 'NASAAPIError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_ERROR');
    this.name = 'RateLimitError';
  }
}

export const createAPIError = (error: AppError): APIError => ({
  message: error.message,
  code: error.code,
  status: error.status,
  details: error.details,
});