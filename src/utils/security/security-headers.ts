
/**
 * Security Headers and Logging Utilities
 */

// Security Headers Helper
export const getSecurityHeaders = (): Record<string, string> => {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
};

// Security logging
export const logSecurityEvent = (event: string, details: any = {}) => {
  const logData = {
    timestamp: new Date().toISOString(),
    event,
    details: typeof details === 'object' ? JSON.stringify(details) : details,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  if (process.env.NODE_ENV === 'development') {
    console.warn('🔒 Security Event:', logData);
  }
  
  // In production, send to monitoring service
};
