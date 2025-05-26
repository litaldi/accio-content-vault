
import { z } from 'zod';
import { validateEmailEnhanced, validatePasswordComplexity, sanitizeInput, CSRFManager } from './unified-security';

// Re-export commonly used validation functions for backward compatibility
export const validateEmail = validateEmailEnhanced;
export const validatePassword = validatePasswordComplexity;
export const sanitizeTextInput = sanitizeInput;
export const generateCSRFToken = () => CSRFManager.generate();

// Rate limiting function
export const createRateLimit = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; lastAttempt: number }>();
  
  return (identifier: string): { allowed: boolean; resetTime?: number } => {
    const now = Date.now();
    const record = attempts.get(identifier);
    
    if (!record) {
      attempts.set(identifier, { count: 1, lastAttempt: now });
      return { allowed: true };
    }
    
    if (now - record.lastAttempt > windowMs) {
      attempts.set(identifier, { count: 1, lastAttempt: now });
      return { allowed: true };
    }
    
    if (record.count >= maxAttempts) {
      return { 
        allowed: false, 
        resetTime: record.lastAttempt + windowMs 
      };
    }
    
    attempts.set(identifier, { 
      count: record.count + 1, 
      lastAttempt: now 
    });
    
    return { allowed: true };
  };
};
