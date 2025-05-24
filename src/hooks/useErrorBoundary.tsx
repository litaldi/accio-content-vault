
import React, { useState, useCallback, useEffect } from 'react';
import { logError } from '@/utils/errorHandling';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode | ((error: Error) => React.ReactNode);
  onError?: (error: Error) => void;
}

interface ErrorInfo {
  componentStack: string;
}

/**
 * Enhanced error boundary hook with better error handling and logging
 */
export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);

  const resetError = useCallback(() => {
    setError(null);
    setErrorInfo(null);
  }, []);

  // Handle errors caught by the boundary
  const handleError = useCallback((error: Error, errorInfo?: ErrorInfo) => {
    setError(error);
    setErrorInfo(errorInfo || null);
    logError(error, { errorInfo });
  }, []);

  /**
   * Enhanced ErrorBoundary component that properly catches React errors
   */
  const ErrorBoundary = React.useMemo(() => {
    return class ErrorBoundaryClass extends React.Component<
      ErrorBoundaryProps,
      { hasError: boolean; error: Error | null; errorInfo: ErrorInfo | null }
    > {
      constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
      }

      static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
      }

      componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo });
        logError(error, { errorInfo });
        this.props.onError?.(error);
      }

      componentDidUpdate(prevProps: ErrorBoundaryProps) {
        // Reset error state when children change (for retry functionality)
        if (this.state.hasError && prevProps.children !== this.props.children) {
          this.setState({ hasError: false, error: null, errorInfo: null });
        }
      }

      render() {
        if (this.state.hasError && this.state.error) {
          if (typeof this.props.fallback === 'function') {
            return this.props.fallback(this.state.error);
          }
          return this.props.fallback;
        }

        return this.props.children;
      }
    };
  }, []);

  // Set up global error handlers
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
      handleError(error);
    };

    const handleGlobalError = (event: ErrorEvent) => {
      const error = new Error(event.message);
      error.stack = event.error?.stack;
      handleError(error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleGlobalError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleGlobalError);
    };
  }, [handleError]);

  return {
    error,
    errorInfo,
    setError: handleError,
    resetError,
    ErrorBoundary
  };
}
