
import React from 'react';
import { logError } from '@/utils/errorHandling';

export const useErrorBoundary = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error, errorInfo?: any) => {
    logError(error, errorInfo);
    setError(error);
  }, []);

  return {
    error,
    resetError,
    captureError,
    hasError: error !== null
  };
};
