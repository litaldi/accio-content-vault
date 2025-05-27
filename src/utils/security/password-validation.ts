
/**
 * Password Validation with Security Checks
 */

import type { ValidationResult } from './input-validation';

export const validatePasswordSecure = (password: string): ValidationResult & { strength: number } => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required', strength: 0 };
  }

  let strength = 0;
  const requirements = [];

  // Length requirements
  if (password.length >= 8) {
    strength += 25;
  } else {
    requirements.push('at least 8 characters');
  }
  
  if (password.length > 128) {
    return { isValid: false, message: 'Password too long (max 128 characters)', strength: 0 };
  }

  // Character type requirements
  if (/[a-z]/.test(password)) {
    strength += 20;
  } else {
    requirements.push('a lowercase letter');
  }

  if (/[A-Z]/.test(password)) {
    strength += 20;
  } else {
    requirements.push('an uppercase letter');
  }

  if (/\d/.test(password)) {
    strength += 20;
  } else {
    requirements.push('a number');
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength += 15;
  } else {
    requirements.push('a special character');
  }

  // Check for common weak patterns
  const weakPatterns = [
    /(.)\1{2,}/,
    /123456|654321|password|qwerty|admin/i,
    /^[a-zA-Z]+$/,
    /^\d+$/
  ];

  for (const pattern of weakPatterns) {
    if (pattern.test(password)) {
      strength = Math.min(strength, 40);
      break;
    }
  }

  const isValid = strength >= 60 && requirements.length === 0;
  const message = isValid ? 'Password is strong' : `Password needs: ${requirements.join(', ')}`;

  return { isValid, message, strength };
};
