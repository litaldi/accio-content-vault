
// Re-export enhanced security utilities
export { 
  validateEmailSecurity as validateEmailEnhanced,
  validatePasswordSecurity as validatePassword,
  sanitizeUserInput as sanitizeInput,
  authRateLimiter,
  CSRFTokenManager as CSRFManager,
  SecurityRateLimiter as UnifiedRateLimiter,
  contactRateLimiter,
  apiRateLimiter,
  logSecurityEvent
} from './security-enhanced';

// Legacy compatibility exports
export { sanitizeHtml, validateEmailSecurity as validateEmail } from './security-enhanced';

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

// Backward compatibility aliases
export const validateSecureUrl = isValidSecureUrl;
