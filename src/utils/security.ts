
// Main Security Utilities Entry Point - Clean and focused
import { SecurityValidator } from './security/validation';
import { SecurityMonitor } from './security/monitoring';
import { createSecureHeaders, securityConfig } from './security/headers';
import { logSecurityEvent } from './security/logging';

// Re-export core security functions
export {
  sanitizeInput,
  validateEmail,
  validatePassword,
  validateUrl,
  CSRFManager,
  UnifiedRateLimiter
} from './security/core-security';

// Re-export organized security utilities
export {
  SecurityValidator,
  SecurityMonitor,
  createSecureHeaders,
  securityConfig,
  logSecurityEvent
};

// Legacy exports for backward compatibility
export const { 
  validateContentSubmission,
  checkContentRateLimit,
  checkApiRateLimit,
  validatePasswordSecurity,
  validateFileUpload
} = SecurityValidator;
