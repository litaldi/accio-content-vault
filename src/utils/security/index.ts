
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

export type { ValidationResult } from './core-security';

// Additional security utilities
export const securityConfig = {
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
  passwordMinLength: 8,
  passwordMaxLength: 128,
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
};

export const createSecureHeaders = () => ({
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
});
