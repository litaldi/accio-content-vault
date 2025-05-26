
// Re-export security utilities for backward compatibility
export { 
  validateEmailEnhanced, 
  validatePasswordComplexity, 
  sanitizeInput,
  authRateLimiter,
  CSRFManager 
} from './unified-security';
