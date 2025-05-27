
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';
import { logSecurityEvent } from '@/utils/security-validation-enhanced';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId: string;
  errorCount: number;
}

/**
 * Secure error boundary that handles errors gracefully without exposing
 * sensitive information while providing useful feedback to users
 */
export class SecureErrorBoundary extends Component<Props, State> {
  private errorCountThreshold = 3;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorId: '',
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const newErrorCount = this.state.errorCount + 1;
    
    // Create sanitized error report
    const sanitizedError = {
      message: error.message,
      name: error.name,
      stack: error.stack?.split('\n').slice(0, 5).join('\n'), // Limit stack trace
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorCount: newErrorCount,
      componentStack: errorInfo.componentStack?.split('\n').slice(0, 3).join('\n')
    };

    // Log security event
    logSecurityEvent('APPLICATION_ERROR', sanitizedError);

    // Update error count
    this.setState({ errorCount: newErrorCount });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      console.error('Application Error (Sanitized):', {
        errorId: sanitizedError.errorId,
        message: sanitizedError.message,
        timestamp: sanitizedError.timestamp
      });
    } else {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorId: '',
      errorCount: Math.max(0, this.state.errorCount - 1)
    });
  };

  handleReload = () => {
    // Clear any potentially corrupted state
    try {
      localStorage.removeItem('accio-temp-state');
      sessionStorage.clear();
    } catch (e) {
      // Ignore storage errors
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Show different UI based on error frequency
      const isRecurringError = this.state.errorCount >= this.errorCountThreshold;

      return (
        <div 
          className="min-h-screen flex items-center justify-center p-4 bg-background"
          role="alert"
          aria-live="assertive"
        >
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle 
                  className={`h-16 w-16 ${isRecurringError ? 'text-red-500' : 'text-destructive'}`}
                  aria-hidden="true"
                />
              </div>
              <CardTitle className="text-2xl">
                {isRecurringError ? 'Persistent Error Detected' : 'Something went wrong'}
              </CardTitle>
              <CardDescription>
                {isRecurringError 
                  ? 'Multiple errors have occurred. This may indicate a deeper issue.'
                  : 'We encountered an unexpected error. Please try refreshing the page.'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-4 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                    Technical Details (Development Mode)
                  </summary>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <p className="text-xs font-mono text-red-600 mb-2">
                      {this.state.error.name}: {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <pre className="text-xs text-muted-foreground overflow-auto whitespace-pre-wrap">
                        {this.state.error.stack.split('\n').slice(0, 5).join('\n')}
                      </pre>
                    )}
                  </div>
                </details>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {!isRecurringError && (
                  <Button 
                    onClick={this.handleRetry}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  onClick={this.handleReload}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Page
                </Button>
                
                <Button 
                  variant="outline"
                  asChild
                >
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
              </div>
              
              {isRecurringError && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <div className="flex items-start gap-2">
                    <Bug className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">
                        Recurring Error Detected
                      </p>
                      <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                        If this persists, please contact support with error ID: 
                        <code className="ml-1 px-1 py-0.5 bg-yellow-100 dark:bg-yellow-800 rounded text-xs">
                          {this.state.errorId}
                        </code>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="text-center text-xs text-muted-foreground space-y-1">
                <p>Error ID: <code>{this.state.errorId}</code></p>
                {this.state.errorCount > 1 && (
                  <p>Error Count: {this.state.errorCount}</p>
                )}
                <p>
                  Need help? <Link to="/contact" className="text-primary hover:underline">Contact support</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SecureErrorBoundary;
