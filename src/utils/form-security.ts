
import { z } from 'zod';
import { escapeHtml } from './security';

// Enhanced input validation schemas
export const secureEmailSchema = z.string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(254, "Email address is too long")
  .refine((email) => {
    // Additional validation for email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }, "Please enter a valid email format");

export const securePasswordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long")
  .refine((password) => {
    // Check for at least one uppercase, lowercase, number, and special character
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  }, "Password must contain uppercase, lowercase, number, and special character");

export const secureNameSchema = z.string()
  .trim()
  .min(1, "Name is required")
  .max(100, "Name is too long")
  .refine((name) => {
    // Only allow letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    return nameRegex.test(name);
  }, "Name can only contain letters, spaces, hyphens, and apostrophes");

// Form sanitization utility
export const sanitizeFormData = <T extends Record<string, any>>(data: T): T => {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Sanitize string inputs
      sanitized[key as keyof T] = escapeHtml(value.trim()) as T[keyof T];
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  
  return sanitized;
};

// Rate limiting for form submissions
export class FormRateLimiter {
  private submissions = new Map<string, number[]>();
  
  constructor(
    private maxSubmissions = 5,
    private windowMs = 60000 // 1 minute
  ) {}
  
  canSubmit(identifier: string): boolean {
    const now = Date.now();
    const submissions = this.submissions.get(identifier) || [];
    
    // Remove old submissions outside the window
    const validSubmissions = submissions.filter(time => now - time < this.windowMs);
    
    if (validSubmissions.length >= this.maxSubmissions) {
      return false;
    }
    
    validSubmissions.push(now);
    this.submissions.set(identifier, validSubmissions);
    return true;
  }
  
  reset(identifier: string): void {
    this.submissions.delete(identifier);
  }
}
