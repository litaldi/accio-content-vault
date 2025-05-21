
import React from 'react';
import { useErrorBoundary } from '@/hooks/useErrorBoundary';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

/**
 * App-wide error boundary component that catches and displays errors gracefully
 * Uses the useErrorBoundary hook for error state management
 */
const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const { ErrorBoundary: ErrorBoundaryComponent } = useErrorBoundary();

  // Error fallback UI
  const fallback = (error: Error) => (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-lg border border-border text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-600" aria-hidden="true" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-4">
          We've encountered an unexpected error and are working to fix it.
        </p>
        <div className="bg-muted rounded p-4 mb-4 overflow-x-auto">
          <code className="text-sm">{error.message}</code>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => window.location.reload()}
            className="w-full"
            variant="default"
          >
            Refresh Page
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            className="w-full"
            variant="outline"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <ErrorBoundaryComponent fallback={fallback}>
      {children}
    </ErrorBoundaryComponent>
  );
};

export default ErrorBoundary;
