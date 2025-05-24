
/**
 * Input validation and sanitization utilities for security
 */

// HTML sanitization to prevent XSS
export const sanitizeHtml = (input: string): string => {
  // Create a temporary div to leverage browser's HTML parsing
  const temp = document.createElement('div');
  temp.textContent = input;
  return temp.innerHTML;
};

// Email validation with proper regex
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

// Password strength validation
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Generic text input sanitization
export const sanitizeTextInput = (input: string, maxLength: number = 1000): string => {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>'"&]/g, (match) => {
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entities[match] || match;
    });
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// File type validation for uploads
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

// File size validation (in bytes)
export const validateFileSize = (file: File, maxSizeBytes: number): boolean => {
  return file.size <= maxSizeBytes;
};

// Rate limiting helper for client-side
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);
    
    if (recentAttempts.length >= maxAttempts) {
      return false; // Rate limit exceeded
    }
    
    recentAttempts.push(now);
    attempts.set(identifier, recentAttempts);
    return true;
  };
};

// CSRF token generation for forms
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Secure headers validation
export const validateSecureHeaders = (): void => {
  // Check if running in secure context
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    console.warn('Application should be served over HTTPS in production');
  }
  
  // Check for security headers (for development awareness)
  if (typeof window !== 'undefined') {
    const headers = [
      'Content-Security-Policy',
      'X-Frame-Options', 
      'X-Content-Type-Options',
      'Referrer-Policy'
    ];
    
    headers.forEach(header => {
      // This is just for development awareness
      console.debug(`Security header check: ${header}`);
    });
  }
};
