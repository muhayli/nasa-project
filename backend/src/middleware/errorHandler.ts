import { Request, Response, NextFunction } from 'express';
import { AppError, createAPIError } from '../utils/errors.js';
import { APIResponse } from '../types/index.js';
import logger from '../utils/logger.js';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response<APIResponse<never>>,
  _next: NextFunction
): void => {
  logger.error('Error occurred', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  if (error instanceof AppError) {
    const apiError = createAPIError(error);
    res.status(error.status).json({
      success: false,
      error: apiError,
      timestamp: new Date().toISOString(),
      requestId: res.locals.requestId || 'unknown',
    });
    return;
  }

  // Handle unexpected errors
  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      status: 500,
    },
    timestamp: new Date().toISOString(),
    requestId: res.locals.requestId || 'unknown',
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response<APIResponse<never>>,
  _next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} not found`,
      status: 404,
    },
    timestamp: new Date().toISOString(),
    requestId: res.locals.requestId || 'unknown',
  });
};