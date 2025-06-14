
import { useEffect } from 'react';
import { setupGlobalErrorHandlers } from '@/utils/errorHandling';
import { createSecureHeaders, logSecurityEvent } from '@/utils/security';

export const useAppSecurity = () => {
  useEffect(() => {
    // Set up global error handlers
    setupGlobalErrorHandlers();

    // Set up security headers (for CSP and other security measures)
    const headers = createSecureHeaders();
    
    // Log security initialization
    logSecurityEvent('Security system initialized', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    // Set up content security policy
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = headers['Content-Security-Policy'];
    document.head.appendChild(meta);

    // Monitor for suspicious activity
    const monitorSuspiciousActivity = () => {
      // Monitor for rapid form submissions
      let formSubmissions = 0;
      const resetSubmissions = () => { formSubmissions = 0; };
      
      document.addEventListener('submit', () => {
        formSubmissions++;
        if (formSubmissions > 5) {
          logSecurityEvent('Suspicious form submission rate detected', {
            submissions: formSubmissions,
            timestamp: new Date().toISOString()
          });
        }
        setTimeout(resetSubmissions, 60000); // Reset after 1 minute
      });

      // Monitor for XSS attempts
      const originalWrite = document.write;
      document.write = function(...args) {
        logSecurityEvent('document.write called - potential XSS', {
          content: args.join(''),
          stack: new Error().stack
        });
        return originalWrite.apply(document, args);
      };
    };

    monitorSuspiciousActivity();

    // Cleanup function
    return () => {
      // Remove the CSP meta tag if needed
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      if (cspMeta) {
        cspMeta.remove();
      }
    };
  }, []);

  return {
    logSecurityEvent
  };
};
