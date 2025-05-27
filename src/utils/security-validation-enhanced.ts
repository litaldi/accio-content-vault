
/**
 * Enhanced Security Validation Utilities - Main Entry Point
 * Re-exports all security utilities from modular files
 */

// Input validation and sanitization
export { 
  sanitizeHtml, 
  sanitizeForDatabase, 
  sanitizeInput,
  type ValidationResult 
} from './security/input-validation';

// Email validation
export { validateEmailSecure } from './security/email-validation';

// Password validation
export { validatePasswordSecure } from './security/password-validation';

// Rate limiting
export { 
  SecurityRateLimiter,
  authRateLimiter,
  apiRateLimiter,
  contactRateLimiter 
} from './security/rate-limiting';

// CSRF protection
export { CSRFTokenManager } from './security/csrf-protection';

// Security headers and logging
export { 
  getSecurityHeaders, 
  logSecurityEvent 
} from './security/security-headers';

// URL validation
export { validateUrlSecure } from './security/url-validation';
