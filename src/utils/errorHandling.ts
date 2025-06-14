/**
 * Global error handling utilities
 */

import React from 'react';

export interface ErrorInfo {
  message: string;
  stack?: string;
  timestamp: number;
  url: string;
  userAgent: string;
  userId?: string;
}

class ErrorHandler {
  private errors: ErrorInfo[] = [];
  private maxErrors = 50;

  logError(error: Error | ErrorEvent, userId?: string): void {
    const errorInfo: ErrorInfo = {
      message: error.message || 'Unknown error',
      stack: 'stack' in error ? error.stack : undefined,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId
    };

    this.errors.push(errorInfo);
    
    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorInfo);
    }

    // Here you could send to an error tracking service
    // this.sendToErrorService(errorInfo);
  }

  getErrors(): ErrorInfo[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }

  private sendToErrorService(errorInfo: ErrorInfo): void {
    // Implementation for sending to error tracking service
    // e.g., Sentry, LogRocket, etc.
  }
}

export const errorHandler = new ErrorHandler();

export const setupGlobalErrorHandlers = (): void => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    errorHandler.logError(new Error(event.reason));
    event.preventDefault();
  });

  // Handle JavaScript errors
  window.addEventListener('error', (event) => {
    errorHandler.logError(event.error || new Error(event.message));
  });

  // Handle React errors (if not caught by error boundary)
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('React')) {
      errorHandler.logError(new Error(args.join(' ')));
    }
    originalConsoleError.apply(console, args);
  };
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
