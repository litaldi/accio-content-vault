
/**
 * Security utility functions for input sanitization and validation
 */

/**
 * Sanitize HTML input to prevent XSS attacks
 */
export const sanitizeHtml = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

/**
 * Validate email format with enhanced security
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254 && email.length >= 5;
};

/**
 * Validate URL format and prevent dangerous protocols
 */
export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const parsedUrl = new URL(url);
    const allowedProtocols = ['http:', 'https:'];
    return allowedProtocols.includes(parsedUrl.protocol) && parsedUrl.hostname.length > 0;
  } catch {
    return false;
  }
};

/**
 * Validate password strength with comprehensive checks
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (password.length > 128) {
    return { isValid: false, message: 'Password must be less than 128 characters' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }

  // Check for common patterns
  const commonPatterns = [
    /(.)\1{2,}/, // Repeated characters
    /123456|654321|abcdef|qwerty|password/i, // Common sequences
  ];

  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      return { isValid: false, message: 'Password contains common patterns' };
    }
  }
  
  return { isValid: true, message: 'Password is strong' };
};

/**
 * Enhanced rate limiting helper for client-side
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  constructor(
    private maxAttempts: number = 5, 
    private windowMs: number = 60000,
    private cleanupInterval: number = 300000 // 5 minutes
  ) {
    // Periodic cleanup to prevent memory leaks
    setInterval(() => this.cleanup(), this.cleanupInterval);
  }
  
  canAttempt(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    this.attempts.set(identifier, recentAttempts);
    
    return recentAttempts.length < this.maxAttempts;
  }
  
  recordAttempt(identifier: string): void {
    const userAttempts = this.attempts.get(identifier) || [];
    userAttempts.push(Date.now());
    this.attempts.set(identifier, userAttempts);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [identifier, attempts] of this.attempts.entries()) {
      const recentAttempts = attempts.filter(time => now - time < this.windowMs);
      if (recentAttempts.length === 0) {
        this.attempts.delete(identifier);
      } else {
        this.attempts.set(identifier, recentAttempts);
      }
    }
  }
}

/**
 * Escape special characters for safe display
 */
export const escapeHtml = (text: string): string => {
  if (typeof text !== 'string') return '';
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Generate secure random token
 */
export const generateSecureToken = (length: number = 32): string => {
  if (length <= 0 || length > 256) {
    throw new Error('Token length must be between 1 and 256');
  }
  
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Content Security Policy meta tag generator
 */
export const getCSPMeta = (): string => {
  return "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self';";
};

/**
 * Enhanced file upload validation
 */
export const validateFileUpload = (file: File): { isValid: boolean; message: string } => {
  if (!file) {
    return { isValid: false, message: 'No file selected' };
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { isValid: false, message: 'File size must be less than 10MB' };
  }
  
  if (file.size === 0) {
    return { isValid: false, message: 'File cannot be empty' };
  }
  
  // Check allowed file types
  const allowedTypes = [
    'application/pdf',
    'text/plain',
    'text/markdown',
    'text/csv',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/json'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, message: 'File type not allowed. Supported: PDF, TXT, MD, CSV, JPG, PNG, GIF, WebP, JSON' };
  }

  // Additional filename validation
  const sanitizedName = sanitizeFilename(file.name);
  if (sanitizedName.length === 0) {
    return { isValid: false, message: 'Invalid filename' };
  }
  
  return { isValid: true, message: 'File is valid' };
};

/**
 * Sanitize filename for safe storage
 */
export const sanitizeFilename = (filename: string): string => {
  if (!filename || typeof filename !== 'string') return '';
  
  return filename
    .replace(/[^a-zA-Z0-9.\-_]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^[._]+|[._]+$/g, '')
    .substring(0, 255);
};

/**
 * Validate input length
 */
export const validateInputLength = (input: string, minLength: number = 0, maxLength: number = 1000): boolean => {
  if (typeof input !== 'string') return false;
  return input.length >= minLength && input.length <= maxLength;
};

/**
 * Detect and prevent potential SQL injection patterns
 */
export const containsSqlInjection = (input: string): boolean => {
  if (typeof input !== 'string') return false;
  
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
    /(--|\/\*|\*\/|;)/,
    /(\b(OR|AND)\b.*=.*)/i,
    /'.*OR.*'/i
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
};

/**
 * Simple input validation for common fields
 */
export const validateInput = {
  name: (name: string): boolean => {
    return validateInputLength(name, 1, 100) && !/[<>"]/.test(name);
  },
  
  username: (username: string): boolean => {
    return /^[a-zA-Z0-9_-]{3,30}$/.test(username);
  },
  
  phone: (phone: string): boolean => {
    return /^\+?[\d\s\-\(\)]{10,20}$/.test(phone);
  },
  
  url: (url: string): boolean => {
    return isValidUrl(url);
  }
};
