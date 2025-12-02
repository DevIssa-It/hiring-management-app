/**
 * Centralized error handling utilities
 * Provides type-safe error handling and logging across the application
 */

export enum ErrorType {
  NETWORK = 'NETWORK_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  SERVER = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR'
}

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: unknown;
  timestamp: Date;
  stack?: string;
}

/**
 * Custom error class for application-specific errors
 */
export class ApplicationError extends Error {
  public readonly type: ErrorType;
  public readonly code?: string;
  public readonly details?: unknown;
  public readonly timestamp: Date;

  constructor(
    type: ErrorType,
    message: string,
    code?: string,
    details?: unknown
  ) {
    super(message);
    this.name = 'ApplicationError';
    this.type = type;
    this.code = code;
    this.details = details;
    this.timestamp = new Date();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError);
    }
  }

  toJSON(): AppError {
    return {
      type: this.type,
      message: this.message,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp,
      stack: this.stack
    };
  }
}

/**
 * Creates a network error
 */
export const createNetworkError = (message: string, details?: unknown): ApplicationError => {
  return new ApplicationError(ErrorType.NETWORK, message, 'ERR_NETWORK', details);
};

/**
 * Creates a validation error
 */
export const createValidationError = (message: string, details?: unknown): ApplicationError => {
  return new ApplicationError(ErrorType.VALIDATION, message, 'ERR_VALIDATION', details);
};

/**
 * Creates an authentication error
 */
export const createAuthError = (message: string, details?: unknown): ApplicationError => {
  return new ApplicationError(ErrorType.AUTHENTICATION, message, 'ERR_AUTH', details);
};

/**
 * Creates an authorization error
 */
export const createAuthorizationError = (message: string, details?: unknown): ApplicationError => {
  return new ApplicationError(ErrorType.AUTHORIZATION, message, 'ERR_FORBIDDEN', details);
};

/**
 * Creates a not found error
 */
export const createNotFoundError = (resource: string, details?: unknown): ApplicationError => {
  return new ApplicationError(
    ErrorType.NOT_FOUND,
    `${resource} not found`,
    'ERR_NOT_FOUND',
    details
  );
};

/**
 * Creates a server error
 */
export const createServerError = (message: string, details?: unknown): ApplicationError => {
  return new ApplicationError(ErrorType.SERVER, message, 'ERR_SERVER', details);
};

/**
 * Type guard to check if an error is an ApplicationError
 */
export const isApplicationError = (error: unknown): error is ApplicationError => {
  return error instanceof ApplicationError;
};

/**
 * Safely extracts error message from unknown error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (isApplicationError(error)) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unknown error occurred';
};

/**
 * Logger utility for errors
 */
export const logError = (error: unknown, context?: string): void => {
  const errorMessage = getErrorMessage(error);
  const timestamp = new Date().toISOString();
  
  if (isApplicationError(error)) {
    console.error(`[${timestamp}] ${context ? `[${context}] ` : ''}${error.type}:`, {
      message: errorMessage,
      code: error.code,
      details: error.details,
      stack: error.stack
    });
  } else {
    console.error(`[${timestamp}] ${context ? `[${context}] ` : ''}Error:`, error);
  }
};

/**
 * Async error handler wrapper for better error handling in async functions
 */
export const asyncHandler = <T extends (...args: any[]) => Promise<any>>(
  fn: T
): ((...args: Parameters<T>) => Promise<ReturnType<T> | undefined>) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(error, fn.name || 'Anonymous Function');
      throw error;
    }
  };
};

/**
 * Retry mechanism for failed operations
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: unknown;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};

/**
 * Error boundary fallback component props helper
 */
export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

/**
 * Format error for user display (hide sensitive information)
 */
export const formatErrorForUser = (error: unknown): string => {
  if (isApplicationError(error)) {
    // Return user-friendly messages based on error type
    switch (error.type) {
      case ErrorType.NETWORK:
        return 'Network connection issue. Please check your internet connection.';
      case ErrorType.AUTHENTICATION:
        return 'Authentication failed. Please log in again.';
      case ErrorType.AUTHORIZATION:
        return 'You do not have permission to perform this action.';
      case ErrorType.VALIDATION:
        return error.message; // Validation messages are usually safe to show
      case ErrorType.NOT_FOUND:
        return error.message;
      case ErrorType.SERVER:
        return 'Server error. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
  
  return 'An unexpected error occurred. Please try again.';
};
