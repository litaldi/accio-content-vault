
import { z } from 'zod';

// URL validation schema
export const urlSchema = z.string()
  .trim()
  .min(1, "URL is required")
  .refine((url) => {
    try {
      const processedUrl = url.startsWith('http') ? url : `https://${url}`;
      new URL(processedUrl);
      return true;
    } catch {
      return false;
    }
  }, "Please enter a valid URL")
  .refine((url) => {
    // Additional security check - block javascript: and data: protocols
    const processedUrl = url.startsWith('http') ? url : `https://${url}`;
    return !processedUrl.toLowerCase().startsWith('javascript:') && 
           !processedUrl.toLowerCase().startsWith('data:');
  }, "Invalid URL protocol");

// Content validation
export const sanitizeContent = (content: string): string => {
  // Basic XSS prevention - remove potentially dangerous tags
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

// File validation
export const fileValidationSchema = z.object({
  size: z.number().max(10 * 1024 * 1024, "File size must be less than 10MB"),
  type: z.string().refine((type) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];
    return allowedTypes.includes(type);
  }, "File type not supported")
});
