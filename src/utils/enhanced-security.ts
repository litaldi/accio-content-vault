
// Re-export security utilities for backward compatibility
export { 
  validateEmailEnhanced, 
  validatePassword as validatePasswordComplexity, 
  sanitizeInput,
  authRateLimiter,
  CSRFManager 
} from './unified-security';
