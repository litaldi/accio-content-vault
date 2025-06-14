
// Main Security Utilities Entry Point - Enhanced and consolidated
import { SecurityValidator } from './security/validation';
import { SecurityMonitor } from './security/monitoring';
import { createSecureHeaders, securityConfig } from './security/headers';
import { logSecurityEvent } from './security/logging';
import { 
  validateFileUploadSecurity, 
  validateContentSecurity,
  enhancedRateLimiters,
  EnhancedRateLimiter
} from './security/enhanced-validation';

// Re-export core security functions with enhancements
export {
  sanitizeInput,
  validateEmail,
  validatePassword,
  validateUrl,
  CSRFManager,
  UnifiedRateLimiter,
  performSecurityHealthCheck
} from './security/core-security';

// Re-export enhanced validation utilities
export {
  validateFileUploadSecurity,
  validateContentSecurity,
  enhancedRateLimiters,
  EnhancedRateLimiter
};

// Re-export organized security utilities
export {
  SecurityValidator,
  SecurityMonitor,
  createSecureHeaders,
  securityConfig,
  logSecurityEvent
};

// Enhanced security utilities
export const SecurityUtils = {
  // File validation with enhanced security
  validateFile: validateFileUploadSecurity,
  
  // Content validation with malware detection
  validateContent: validateContentSecurity,
  
  // Rate limiting
  checkRateLimit: (identifier: string, operation: 'content' | 'auth' | 'api' | 'fileUpload') => {
    return enhancedRateLimiters[operation].checkAttempt(identifier, operation);
  },
  
  // Security health check
  healthCheck: () => {
    const { performSecurityHealthCheck } = require('./security/core-security');
    return performSecurityHealthCheck();
  },
  
  // CSRF token management
  generateCSRFToken: (operation?: string) => {
    const { CSRFManager } = require('./security/core-security');
    return CSRFManager.generate(operation);
  },
  
  validateCSRFToken: (token: string, operation?: string) => {
    const { CSRFManager } = require('./security/core-security');
    return CSRFManager.validate(token, operation);
  }
};

// Legacy exports for backward compatibility
export const { 
  validateContentSubmission,
  checkContentRateLimit,
  checkApiRateLimit,
  validatePasswordSecurity,
  validateFileUpload
} = SecurityValidator;

// Enhanced security middleware
export const createSecurityMiddleware = () => ({
  // Request interceptor with enhanced validation
  interceptRequest: (url: string, options: RequestInit) => {
    const headers = new Headers(options.headers);
    
    // Add enhanced security headers
    headers.set('X-Requested-With', 'XMLHttpRequest');
    headers.set('X-Request-Timestamp', Date.now().toString());
    headers.set('X-Request-ID', crypto.randomUUID());
    headers.set('X-Content-Type-Options', 'nosniff');
    
    // Add CSRF token for state-changing operations
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method?.toUpperCase() || '')) {
      const csrfToken = SecurityUtils.generateCSRFToken();
      headers.set('X-CSRF-Token', csrfToken);
    }
    
    return { ...options, headers };
  },
  
  // Response processor with security validation
  processResponse: async (response: Response) => {
    // Log security events for failed requests
    if (!response.ok) {
      logSecurityEvent('api_request_failed', {
        status: response.status,
        url: response.url,
        timestamp: new Date().toISOString()
      });
    }
    
    return response;
  }
});
