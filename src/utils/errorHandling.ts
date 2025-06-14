
import { logSecurityEvent } from './security';

export const logError = (error: Error, errorInfo?: any) => {
  console.error('Error logged:', error, errorInfo);
  
  logSecurityEvent('application_error', {
    message: error.message,
    stack: error.stack,
    errorInfo,
    timestamp: new Date().toISOString()
  });
};

export const setupGlobalErrorHandlers = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    logSecurityEvent('unhandled_promise_rejection', {
      error: event.reason?.toString(),
      stack: event.reason?.stack,
      timestamp: new Date().toISOString()
    });
    
    // Prevent the default browser behavior
    event.preventDefault();
  });

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
    
    logSecurityEvent('uncaught_error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error?.toString(),
      stack: event.error?.stack,
      timestamp: new Date().toISOString()
    });
  });

  // Handle console errors for development
  if (process.env.NODE_ENV === 'development') {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Call original console.error
      originalConsoleError.apply(console, args);
      
      // Log security event for React errors
      if (args[0]?.toString().includes('React') || args[0]?.toString().includes('Warning')) {
        logSecurityEvent('react_error', {
          message: args.join(' '),
          timestamp: new Date().toISOString()
        });
      }
    };
  }
};
