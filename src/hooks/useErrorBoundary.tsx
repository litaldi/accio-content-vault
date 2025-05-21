
import React, { useState, useCallback } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode | ((error: Error) => React.ReactNode);
}

/**
 * Custom hook for creating an error boundary to gracefully handle errors in React components
 * @returns an object with ErrorBoundary component and other utility functions
 */
export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * A component that renders fallback UI when an error is caught
   */
  const FallbackComponent = ({ children, error }: { children: React.ReactNode, error: Error }) => {
    return <>{children}</>;
  };

  /**
   * ErrorBoundary component that catches errors in its children
   * and displays a fallback UI when an error occurs
   */
  const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
    if (error) {
      // If the fallback is a function, render it with the error
      if (typeof fallback === 'function') {
        // Wrap the function result in a fragment to ensure it's a valid ReactNode
        return (
          <FallbackComponent error={error}>
            {fallback(error)}
          </FallbackComponent>
        );
      }
      // Otherwise, render the fallback directly
      return <>{fallback}</>;
    }

    // We need to use React.Fragment to properly handle children
    return (
      <React.Fragment>
        {React.Children.map(children, child => {
          // If child is not a valid React element, return as is
          if (!React.isValidElement(child)) {
            return child;
          }

          // Clone the element and add error handling
          return React.cloneElement(child as React.ReactElement, {
            onError: (e: Error) => {
              console.error('Error caught by ErrorBoundary:', e);
              setError(e);
            }
          });
        })}
      </React.Fragment>
    );
  };

  return {
    error,
    setError,
    resetError,
    ErrorBoundary
  };
}
