
// Re-export all security utilities from the enhanced security validation
export { 
  validateEmailSecure as validateEmailEnhanced,
  validatePasswordSecure as validatePassword,
  sanitizeInput,
  sanitizeHtml,
  sanitizeForDatabase,
  validateUrlSecure as validateUrl,
  authRateLimiter,
  apiRateLimiter,
  contactRateLimiter,
  CSRFTokenManager as CSRFManager,
  SecurityRateLimiter as UnifiedRateLimiter,
  logSecurityEvent,
  getSecurityHeaders
} from './security-validation-enhanced';

// Additional utilities for backward compatibility
export { 
  validateInput,
  RateLimiter
} from './security';

/**
 * Simple email validation for backward compatibility
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254 && email.length >= 5;
};

/**
 * URL validation with security checks
 */
export const isValidSecureUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch {
    return false;
  }
};

/**
 * Generate secure random token
 */
export const generateSecureToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
