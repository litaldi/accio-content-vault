
/**
 * Comprehensive input validation and sanitization utilities
 * Following OWASP security guidelines
 */

// CSRF Token Generation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Enhanced text input sanitization
export const sanitizeTextInput = (input: string, maxLength: number = 1000): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>'"&]/g, (match) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entities[match] || match;
    })
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

// Email validation with security checks
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || email.length === 0) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  // Check for suspicious patterns
  if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
    return { isValid: false, error: 'Email format is invalid' };
  }
  
  return { isValid: true };
};

// Password strength validation
export const validatePassword = (password: string): { 
  isValid: boolean; 
  strength: 'weak' | 'medium' | 'strong';
  errors: string[];
} => {
  const errors: string[] = [];
  let score = 0;
  
  if (!password || password.length === 0) {
    return { isValid: false, strength: 'weak', errors: ['Password is required'] };
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else {
    score += 1;
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else {
    score += 1;
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else {
    score += 1;
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  } else {
    score += 1;
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  } else {
    score += 1;
  }
  
  const strength = score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong';
  const isValid = errors.length === 0 && score >= 4;
  
  return { isValid, strength, errors };
};

// Rate limiting for client-side protection
export const createRateLimit = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, number[]>();
  
  return (identifier: string): { allowed: boolean; resetTime?: number } => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier) || [];
    
    // Clean old attempts
    const validAttempts = userAttempts.filter(time => now - time < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      const oldestAttempt = Math.min(...validAttempts);
      return {
        allowed: false,
        resetTime: oldestAttempt + windowMs
      };
    }
    
    validAttempts.push(now);
    attempts.set(identifier, validAttempts);
    
    return { allowed: true };
  };
};

// URL validation with security checks
export const validateUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url || url.length === 0) {
    return { isValid: false, error: 'URL is required' };
  }
  
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    
    // Block dangerous protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'Only HTTP and HTTPS protocols are allowed' };
    }
    
    // Block local/private IPs in production
    if (import.meta.env.PROD) {
      const hostname = urlObj.hostname;
      if (hostname === 'localhost' || 
          hostname.startsWith('127.') || 
          hostname.startsWith('192.168.') ||
          hostname.startsWith('10.') ||
          hostname.match(/^172\.(1[6-9]|2\d|3[01])\./)) {
        return { isValid: false, error: 'Private IP addresses are not allowed' };
      }
    }
    
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
};
