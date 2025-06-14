
/**
 * Main Security Utilities Entry Point
 * Consolidated and enhanced security functions for production use
 */

export { 
  sanitizeInput,
  validateEmail,
  validatePassword,
  validateUrl,
  isValidSecureUrl,
  UnifiedRateLimiter,
  CSRFManager,
  escapeHtml
} from './core-security';

export {
  SecurityRateLimiter,
  authRateLimiter,
  apiRateLimiter,
  contactRateLimiter
} from './rate-limiting';

export {
  validateFileUpload,
  sanitizeFilename
} from './file-validation';

export {
  getSecurityHeaders,
  logSecurityEvent
} from './security-headers';

export type { ValidationResult } from './types';
