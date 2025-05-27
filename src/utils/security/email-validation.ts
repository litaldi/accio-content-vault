
/**
 * Email Validation with Security Checks
 */

import { sanitizeHtml } from './input-validation';
import type { ValidationResult } from './input-validation';

export const validateEmailSecure = (email: string): ValidationResult => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }
  
  const sanitizedEmail = sanitizeHtml(email.toLowerCase().trim());
  
  // Basic format validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(sanitizedEmail)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  // Length validation
  if (sanitizedEmail.length > 254 || sanitizedEmail.length < 5) {
    return { isValid: false, message: 'Email address length is invalid' };
  }
  
  // Security pattern checks
  const suspiciousPatterns = [
    /\.{2,}/,
    /@.*@/,
    /\s/,
    /<|>/,
    /javascript:/i,
    /data:/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitizedEmail)) {
      return { isValid: false, message: 'Email contains invalid characters' };
    }
  }
  
  return { isValid: true, message: 'Valid email', sanitizedValue: sanitizedEmail };
};
