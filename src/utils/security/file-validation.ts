
/**
 * File Upload Security Validation
 */

import type { ValidationResult } from './types';
import { sanitizeInput } from './core-security';

/**
 * Validate file upload for security
 */
export const validateFileUpload = (file: File): ValidationResult => {
  if (!file) {
    return { isValid: false, message: 'No file selected' };
  }

  const errors: string[] = [];

  // File size check (10MB limit)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    errors.push('File size must be less than 10MB');
  }

  if (file.size === 0) {
    errors.push('File cannot be empty');
  }

  // Allowed file types
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
    errors.push('File type not allowed. Supported: PDF, TXT, MD, CSV, JPG, PNG, GIF, WebP, JSON');
  }

  // Filename validation
  const sanitizedName = sanitizeFilename(file.name);
  if (sanitizedName.length === 0) {
    errors.push('Invalid filename');
  }

  const isValid = errors.length === 0;
  return {
    isValid,
    message: isValid ? 'File is valid' : errors.join(', '),
    errors: isValid ? undefined : errors
  };
};

/**
 * Sanitize filename for safe storage
 */
export const sanitizeFilename = (filename: string): string => {
  if (!filename || typeof filename !== 'string') return '';
  
  return sanitizeInput(filename)
    .replace(/[^a-zA-Z0-9.\-_]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^[._]+|[._]+$/g, '')
    .substring(0, 255);
};
