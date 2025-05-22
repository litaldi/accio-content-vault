
import React from 'react';
import { Button } from './button';
import { Alert, AlertTitle, AlertDescription } from './alert';
import { RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  description?: string;
}

/**
 * Fallback UI displayed when an error occurs within an ErrorBoundary
 * Provides users with information and recovery options
 */
export const ErrorFallback = ({
  error,
  resetErrorBoundary,
  description = "Something went wrong. We've been notified and are working to fix the issue."
}: ErrorFallbackProps) => {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
      <Alert variant="destructive" className="mb-4 max-w-md">
        <AlertTitle className="mb-2">Error Occurred</AlertTitle>
        <AlertDescription>
          {description}
        </AlertDescription>
      </Alert>
      
      <div className="flex gap-4 mt-4">
        <Button 
          onClick={resetErrorBoundary}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
        
        <Button 
          onClick={() => window.location.href = '/'}
          variant="secondary"
        >
          <span>Return Home</span>
        </Button>
      </div>
      
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-4 bg-muted rounded text-left overflow-auto max-w-full max-h-[200px] text-xs">
          <p className="font-semibold mb-2">Error details (development only):</p>
          <pre>{error.message}</pre>
          {error.stack && <pre className="mt-2 text-muted-foreground">{error.stack}</pre>}
        </div>
      )}
    </div>
  );
};
