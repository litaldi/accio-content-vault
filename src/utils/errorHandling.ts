/**
 * Centralized error handling utilities - optimized and secure
 */

import React from 'react';

export class AppError extends Error {
  public readonly isOperational: boolean;
  public readonly statusCode: number;
  public readonly timestamp: string;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred') {
    super(message, 503);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429);
  }
}

// Secure error logging that doesn't expose sensitive information
export const logError = (error: Error, context?: Record<string, any>) => {
  const errorInfo: Record<string, any> = {
    message: error.message,
    name: error.name,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    context: context ? sanitizeContext(context) : undefined
  };

  // Only log stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorInfo.stack = error.stack;
  }

  console.error('Application Error:', errorInfo);
};

// Sanitize context to remove sensitive information
const sanitizeContext = (context: Record<string, any>): Record<string, any> => {
  const sanitized = { ...context };
  const sensitiveKeys = ['password', 'token', 'key', 'secret', 'auth'];
  
  Object.keys(sanitized).forEach(key => {
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
      sanitized[key] = '[REDACTED]';
    }
  });
  
  return sanitized;
};

// Enhanced async error handler with retry logic
export const withErrorHandling = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: {
    onError?: (error: Error) => void;
    maxRetries?: number;
    retryDelay?: number;
  } = {}
): T => {
  const { onError, maxRetries = 0, retryDelay = 1000 } = options;

  return (async (...args: Parameters<T>) => {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error instanceof Error ? error : new AppError(
          error instanceof Error ? error.message : 'Unknown error occurred'
        );
        
        logError(lastError, { 
          functionName: fn.name, 
          attempt: attempt + 1,
          maxRetries 
        });
        
        if (attempt === maxRetries) {
          break;
        }
        
        // Exponential backoff for retries
        await new Promise(resolve => 
          setTimeout(resolve, retryDelay * Math.pow(2, attempt))
        );
      }
    }
    
    if (onError) {
      onError(lastError);
    } else {
      throw lastError;
    }
  }) as T;
};

// Get user-friendly error message
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// Global error handler setup with security considerations
export const setupGlobalErrorHandlers = () => {
  if (typeof window === 'undefined') return;

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    
    logError(error, { type: 'unhandledrejection' });
    event.preventDefault();
  });
  
  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    const error = new Error(event.message);
    if (event.error?.stack) {
      error.stack = event.error.stack;
    }
    
    logError(error, {
      type: 'uncaughterror',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });
};

// Error boundary helper for React components
export const createErrorBoundary = (fallbackComponent: React.ComponentType<{ error: Error }>) => {
  return class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: Error }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      logError(error, { 
        type: 'react-error-boundary',
        componentStack: errorInfo.componentStack 
      });
    }

    render() {
      if (this.state.hasError && this.state.error) {
        return React.createElement(fallbackComponent, { error: this.state.error });
      }

      return this.props.children;
    }
  };
};
