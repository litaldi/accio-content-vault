
/**
 * Security utility types
 */

export interface ValidationResult {
  isValid: boolean;
  message: string;
  sanitizedValue?: string;
  strength?: number;
  errors?: string[];
  warnings?: string[];
}

export interface RateLimitResult {
  allowed: boolean;
  remaining?: number;
  resetTime?: number;
}

export interface SecurityConfig {
  maxAttempts: number;
  windowMs: number;
  blockDuration?: number;
}
