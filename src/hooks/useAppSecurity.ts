
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSecurityHeaders, logSecurityEvent } from '@/utils/security';

export const useAppSecurity = () => {
  const location = useLocation();

  useEffect(() => {
    // Log page navigation for security monitoring
    logSecurityEvent('PAGE_NAVIGATION', { 
      path: location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
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

    // Add other security meta tags
    const securityMetas = [
      { 'http-equiv': 'X-Content-Type-Options', content: headers['X-Content-Type-Options'] },
      { 'http-equiv': 'X-Frame-Options', content: headers['X-Frame-Options'] },
      { 'http-equiv': 'X-XSS-Protection', content: headers['X-XSS-Protection'] },
      { name: 'referrer', content: 'strict-origin-when-cross-origin' }
    ];

    securityMetas.forEach(meta => {
      const existing = document.querySelector(`meta[${Object.keys(meta)[0]}="${Object.values(meta)[0]}"]`);
      if (!existing) {
        const metaElement = document.createElement('meta');
        Object.entries(meta).forEach(([key, value]) => {
          metaElement.setAttribute(key, value);
        });
        document.head.appendChild(metaElement);
      }
    });

  }, [location.pathname]);

  // Return security utilities for components to use
  return {
    logSecurityEvent
  };
};
