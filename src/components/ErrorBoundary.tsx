
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// This component cannot be a function component because it needs to use lifecycle methods
class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback was provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 border border-destructive/20 rounded-lg bg-destructive/5 text-center">
          <h2 className="text-xl font-semibold text-destructive mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            An error occurred while rendering this component.
          </p>
          {this.state.error && (
            <pre className="bg-card p-4 rounded text-xs overflow-auto max-w-full mb-4">
              {this.state.error.toString()}
            </pre>
          )}
          <Button 
            variant="outline" 
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create a wrapper that provides translations
export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps): JSX.Element {
  return (
    <ErrorBoundaryClass fallback={fallback}>
      {children}
    </ErrorBoundaryClass>
  );
}

// Custom error fallback component with translations
export function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }): JSX.Element {
  const { t } = useTranslation();
  
  return (
    <div role="alert" className="flex flex-col items-center justify-center min-h-[200px] p-6 border border-destructive/20 rounded-lg bg-destructive/5 text-center">
      <h2 className="text-xl font-semibold text-destructive mb-2">
        {t('common.error.title', 'Something went wrong')}
      </h2>
      <p className="text-muted-foreground mb-4">
        {t('common.error.description', 'An error occurred while rendering this component.')}
      </p>
      <pre className="bg-card p-4 rounded text-xs overflow-auto max-w-full mb-4">
        {error.message}
      </pre>
      <Button 
        variant="outline" 
        onClick={resetErrorBoundary}
      >
        {t('common.error.retry', 'Try again')}
      </Button>
    </div>
  );
}
