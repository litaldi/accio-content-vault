
import { SecurityValidator, SecurityMonitor, CSRFManager } from './security';

// Enhanced security utilities - refactored for better organization
export class EnhancedSecurity {
  private static contentRateLimiter = SecurityValidator.checkContentRateLimit;
  private static apiRateLimiter = SecurityValidator.checkApiRateLimit;

  // Validate and sanitize content input with enhanced checks
  static validateContentInput(input: {
    title?: string;
    description?: string;
    content?: string;
    url?: string;
    tags?: string[];
  }): { isValid: boolean; errors: string[]; sanitized: typeof input } {
    return SecurityValidator.validateContentSubmission(input);
  }

  // Rate limit API requests
  static checkApiRateLimit(identifier: string): { allowed: boolean; resetTime?: number } {
    return this.apiRateLimiter(identifier);
  }

  // Rate limit content submissions
  static checkContentRateLimit(identifier: string): { allowed: boolean; resetTime?: number } {
    return this.contentRateLimiter(identifier);
  }

  // Enhanced file upload validation
  static validateFileUpload(file: File): { isValid: boolean; errors: string[] } {
    return SecurityValidator.validateFileUpload(file);
  }

  // Enhanced password validation
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    strength: 'weak' | 'medium' | 'strong' | 'very-strong';
    feedback: string[];
  } {
    const result = SecurityValidator.validatePasswordSecurity(password);
    
    let strength: 'weak' | 'medium' | 'strong' | 'very-strong' = 'weak';
    if (result.score >= 80) strength = 'very-strong';
    else if (result.score >= 60) strength = 'strong';
    else if (result.score >= 40) strength = 'medium';

    return {
      isValid: result.isValid,
      strength,
      feedback: result.feedback
    };
  }

  // Secure form submission helper with enhanced validation
  static prepareSecureFormData(data: Record<string, any>): {
    sanitizedData: Record<string, any>;
    csrfToken: string;
    timestamp: string;
    requestId: string;
  } {
    const sanitizedData: Record<string, any> = {};
    
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Enhanced sanitization based on field type
        if (key.toLowerCase().includes('url')) {
          try {
            const url = new URL(value);
            sanitizedData[key] = url.toString();
          } catch {
            sanitizedData[key] = ''; // Invalid URL becomes empty
          }
        } else if (key.toLowerCase().includes('email')) {
          sanitizedData[key] = value.toLowerCase().trim();
        } else {
          sanitizedData[key] = value.trim();
        }
      } else {
        sanitizedData[key] = value;
      }
    });

    return {
      sanitizedData,
      csrfToken: CSRFManager.generate(),
      timestamp: new Date().toISOString(),
      requestId: crypto.randomUUID()
    };
  }

  // Security health check
  static performSecurityHealthCheck(): {
    score: number;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check if HTTPS is enabled
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      issues.push('Site not using HTTPS');
      recommendations.push('Enable HTTPS for secure communication');
      score -= 30;
    }

    // Check for security headers
    const hasCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!hasCSP) {
      issues.push('Content Security Policy not detected');
      recommendations.push('Implement Content Security Policy headers');
      score -= 20;
    }

    // Check localStorage usage
    try {
      const localStorageSize = new Blob(Object.values(localStorage)).size;
      if (localStorageSize > 1024 * 1024) { // 1MB
        issues.push('Large localStorage usage detected');
        recommendations.push('Review and clean up localStorage data');
        score -= 10;
      }
    } catch (error) {
      // localStorage might be disabled - this is actually good for security
    }

    // Check for mixed content
    if (window.location.protocol === 'https:') {
      const images = Array.from(document.images);
      const hasInsecureImages = images.some(img => img.src.startsWith('http:'));
      if (hasInsecureImages) {
        issues.push('Mixed content detected (insecure images)');
        recommendations.push('Use HTTPS for all resources');
        score -= 15;
      }
    }

    return { score, issues, recommendations };
  }
}

// Security middleware for API calls with enhanced features
export const securityMiddleware = {
  // Intercept and validate API requests
  interceptRequest: (url: string, options: RequestInit) => {
    const headers = new Headers(options.headers);
    
    // Add security headers
    headers.set('X-Requested-With', 'XMLHttpRequest');
    headers.set('X-Request-Timestamp', Date.now().toString());
    headers.set('X-Request-ID', crypto.randomUUID());
    
    // Validate request size
    const body = options.body;
    if (body) {
      const size = typeof body === 'string' ? body.length : 
                   body instanceof FormData ? 1024 * 1024 : // Assume 1MB for FormData
                   JSON.stringify(body).length;
      
      if (size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('Request payload too large');
      }
    }

    // Validate URL
    try {
      const requestUrl = new URL(url, window.location.origin);
      if (requestUrl.protocol !== 'https:' && requestUrl.hostname !== 'localhost') {
        throw new Error('Insecure request URL');
      }
    } catch (error) {
      throw new Error('Invalid request URL');
    }

    return {
      ...options,
      headers
    };
  },

  // Process API responses with security checks
  processResponse: async (response: Response) => {
    // Check for security headers in response
    const securityHeaders = [
      'Content-Security-Policy',
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection'
    ];

    const missingHeaders = securityHeaders.filter(header => 
      !response.headers.get(header)
    );

    if (missingHeaders.length > 0 && response.url.includes(window.location.origin)) {
      console.warn('Security: Missing security headers in API response:', missingHeaders);
      SecurityMonitor.getInstance().reportSuspiciousActivity('missing_security_headers', {
        url: response.url,
        missingHeaders
      });
    }

    // Check response size
    const contentLength = response.headers.get('Content-Length');
    if (contentLength && parseInt(contentLength) > 50 * 1024 * 1024) { // 50MB
      console.warn('Security: Large response detected');
      SecurityMonitor.getInstance().reportSuspiciousActivity('large_response_detected', {
        url: response.url,
        size: contentLength
      });
    }

    return response;
  }
};

// Re-export for backward compatibility
export { SecurityValidator, SecurityMonitor };
