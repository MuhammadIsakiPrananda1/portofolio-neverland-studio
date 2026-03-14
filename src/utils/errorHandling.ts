/**
 * Error handling utility functions
 */

export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Format error for display to user
 */
export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  
  return 'An unexpected error occurred';
};

/**
 * Log error to console in development mode only
 */
export const logError = (context: string, error: unknown): void => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error);
  }
  
  // In production, you might want to send to error tracking service
  // Example: Sentry.captureException(error);
};

/**
 * Create an AppError object from unknown error
 */
export const createAppError = (error: unknown, context?: string): AppError => {
  const message = formatErrorMessage(error);
  
  return {
    message,
    code: context,
    details: error,
  };
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.toLowerCase().includes('network') ||
           error.message.toLowerCase().includes('fetch');
  }
  return false;
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = String(error.code);
    return code === '401' || code === '403' || code === 'UNAUTHORIZED';
  }
  return false;
};
