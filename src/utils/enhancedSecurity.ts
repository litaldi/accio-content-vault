
import { sanitizeInput, validateEmail, validatePassword, UnifiedRateLimiter, CSRFManager } from './security';

// Enhanced security utilities
export class EnhancedSecurity {
  private static requestSizeLimiter = new UnifiedRateLimiter(100, 60000); // 100 requests per minute
  private static contentLengthLimiter = new UnifiedRateLimiter(10, 300000); // 10 large content submissions per 5 minutes

  // Validate and sanitize content input
  static validateContentInput(input: {
    title?: string;
    description?: string;
    content?: string;
    url?: string;
  }): { isValid: boolean; errors: string[]; sanitized: typeof input } {
    const errors: string[] = [];
    const sanitized = { ...input };

    // Title validation
    if (input.title) {
      if (input.title.length > 200) {
        errors.push('Title is too long (max 200 characters)');
      }
      sanitized.title = sanitizeInput(input.title, { maxLength: 200, allowHtml: false });
    }

    // Description validation
    if (input.description) {
      if (input.description.length > 1000) {
        errors.push('Description is too long (max 1000 characters)');
      }
      sanitized.description = sanitizeInput(input.description, { maxLength: 1000, allowHtml: false });
    }

    // Content validation
    if (input.content) {
      if (input.content.length > 50000) { // 50KB limit
        errors.push('Content is too long (max 50KB)');
      }
      sanitized.content = sanitizeInput(input.content, { maxLength: 50000, allowHtml: true });
    }

    // URL validation
    if (input.url) {
      try {
        const url = new URL(input.url);
        // Check for dangerous protocols
        if (!['http:', 'https:'].includes(url.protocol)) {
          errors.push('Invalid URL protocol');
        }
        // Check for suspicious patterns
        if (url.hostname.includes('localhost') && window.location.hostname !== 'localhost') {
          errors.push('Localhost URLs not allowed in production');
        }
        sanitized.url = url.toString();
      } catch {
        errors.push('Invalid URL format');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized
    };
  }

  // Rate limit API requests
  static checkApiRateLimit(identifier: string): { allowed: boolean; resetTime?: number } {
    return this.requestSizeLimiter.canAttempt(identifier);
  }

  // Rate limit content submissions
  static checkContentRateLimit(identifier: string): { allowed: boolean; resetTime?: number } {
    return this.contentLengthLimiter.canAttempt(identifier);
  }

  // Validate file uploads (if implemented later)
  static validateFileUpload(file: File): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      errors.push('File type not allowed');
    }

    if (file.size > maxSize) {
      errors.push('File size too large (max 10MB)');
    }

    // Check for suspicious file names
    if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
      errors.push('Invalid file name');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Enhanced password validation
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    strength: 'weak' | 'medium' | 'strong' | 'very-strong';
    feedback: string[];
  } {
    const result = validatePassword(password);
    const feedback: string[] = [];
    let strength: 'weak' | 'medium' | 'strong' | 'very-strong' = 'weak';

    if (!result.isValid) {
      return { isValid: false, strength: 'weak', feedback: [result.message] };
    }

    const score = result.strength || 0;

    if (score < 40) {
      strength = 'weak';
      feedback.push('Password is weak. Consider adding more complexity.');
    } else if (score < 60) {
      strength = 'medium';
      feedback.push('Password strength is medium. Good start!');
    } else if (score < 80) {
      strength = 'strong';
      feedback.push('Password is strong. Well done!');
    } else {
      strength = 'very-strong';
      feedback.push('Excellent! Your password is very strong.');
    }

    // Additional checks
    if (password.length < 12) {
      feedback.push('Consider using at least 12 characters for better security.');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      feedback.push('Add special characters for extra security.');
    }

    return { isValid: true, strength, feedback };
  }

  // Secure form submission helper
  static prepareSecureFormData(data: Record<string, any>): {
    sanitizedData: Record<string, any>;
    csrfToken: string;
    timestamp: string;
  } {
    const sanitizedData: Record<string, any> = {};
    
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string') {
        sanitizedData[key] = sanitizeInput(value);
      } else {
        sanitizedData[key] = value;
      }
    });

    return {
      sanitizedData,
      csrfToken: CSRFManager.generate(),
      timestamp: new Date().toISOString()
    };
  }
}

// Security middleware for API calls
export const securityMiddleware = {
  // Intercept and validate API requests
  interceptRequest: (url: string, options: RequestInit) => {
    // Add security headers
    const headers = new Headers(options.headers);
    headers.set('X-Requested-With', 'XMLHttpRequest');
    headers.set('X-Request-Timestamp', Date.now().toString());
    
    // Validate request size
    const body = options.body;
    if (body && typeof body === 'string' && body.length > 1024 * 1024) { // 1MB limit
      throw new Error('Request payload too large');
    }

    return {
      ...options,
      headers
    };
  },

  // Process API responses
  processResponse: async (response: Response) => {
    // Check for security headers in response
    const csp = response.headers.get('Content-Security-Policy');
    if (!csp && response.url.includes(window.location.origin)) {
      console.warn('Security: Missing CSP header in API response');
    }

    return response;
  }
};
