
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSecurityHeaders, logSecurityEvent } from '@/utils/security-validation-enhanced';
import { runFullPageValidation } from '@/utils/page-validation';

export const useAppSecurity = () => {
  const location = useLocation();

  useEffect(() => {
    // Log page navigation for security monitoring
    logSecurityEvent('PAGE_NAVIGATION', { 
      path: location.pathname,
      timestamp: new Date().toISOString()
    });

    // Set security headers (where possible in client-side)
    const headers = getSecurityHeaders();
    
    // Add meta tags for security
    const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!existingCSP) {
      const cspMeta = document.createElement('meta');
      cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
      cspMeta.setAttribute('content', headers['Content-Security-Policy']);
      document.head.appendChild(cspMeta);
    }

    // Run validation in development
    if (process.env.NODE_ENV === 'development') {
      // Delay validation to allow page to fully load
      const timer = setTimeout(() => {
        runFullPageValidation().catch(error => {
          console.warn('Page validation failed:', error);
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
};
