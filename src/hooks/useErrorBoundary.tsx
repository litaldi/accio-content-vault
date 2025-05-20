
import React, { Component, ErrorInfo, ReactNode } from 'react';

// Updated interface for the fallback prop
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error) => ReactNode);
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function' && this.state.error) {
          // Using a JSX element directly to render the function result
          return <>{(this.props.fallback as Function)(this.state.error)}</>;
        }
        return this.props.fallback;
      }
      
      // Default error UI
      return (
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-center shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Something went wrong</h2>
          <p className="text-blue-600 mb-4">
            The application encountered an unexpected error.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const useErrorBoundary = () => {
  return { ErrorBoundary };
};
