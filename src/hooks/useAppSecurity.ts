
import { useEffect } from 'react';
import { setupGlobalErrorHandlers } from '@/utils/errorHandling';

export const useAppSecurity = () => {
  useEffect(() => {
    // Set up global error handlers for security monitoring
    setupGlobalErrorHandlers();

    // Content Security Policy headers
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;";
    document.head.appendChild(meta);

    // Security headers
    const noSniff = document.createElement('meta');
    noSniff.httpEquiv = 'X-Content-Type-Options';
    noSniff.content = 'nosniff';
    document.head.appendChild(noSniff);

    const frameOptions = document.createElement('meta');
    frameOptions.httpEquiv = 'X-Frame-Options';
    frameOptions.content = 'DENY';
    document.head.appendChild(frameOptions);

    return () => {
      // Cleanup if needed
      document.head.removeChild(meta);
      document.head.removeChild(noSniff);
      document.head.removeChild(frameOptions);
    };
  }, []);
};
