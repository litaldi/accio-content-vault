
import { sanitizeInput, validateEmail, validatePassword, validateUrl, UnifiedRateLimiter } from './core-security';

// Enhanced security utilities for content validation
export class SecurityValidator {
  private static contentRateLimiter = new UnifiedRateLimiter(5, 300000); // 5 content submissions per 5 minutes
  private static apiRateLimiter = new UnifiedRateLimiter(100, 60000); // 100 API calls per minute

  // Validate content before submission
  static validateContentSubmission(content: {
    url?: string;
    title?: string;
    description?: string;
    content?: string;
    tags?: string[];
  }): { isValid: boolean; errors: string[]; sanitized: typeof content } {
    const errors: string[] = [];
    const sanitized = { ...content };

    // URL validation
    if (content.url) {
      const urlValidation = validateUrl(content.url);
      if (!urlValidation.isValid) {
        errors.push(urlValidation.message);
      } else {
        // Use the original URL if validation passes, as core-security validateUrl doesn't return sanitized value
        sanitized.url = content.url;
      }
    }

    // Title validation
    if (content.title) {
      if (content.title.length > 200) {
        errors.push('Title too long (max 200 characters)');
      }
      sanitized.title = sanitizeInput(content.title, { maxLength: 200, allowHtml: false });
    }

    // Description validation
    if (content.description) {
      if (content.description.length > 10000) {
        errors.push('Description too long (max 10,000 characters)');
      }
      sanitized.description = sanitizeInput(content.description, { maxLength: 10000, allowHtml: false });
    }

    // Content validation
    if (content.content) {
      if (content.content.length > 50000) {
        errors.push('Content too long (max 50KB)');
      }
      sanitized.content = sanitizeInput(content.content, { maxLength: 50000, allowHtml: true });
    }

    // Tags validation
    if (content.tags) {
      if (content.tags.length > 20) {
        errors.push('Too many tags (max 20)');
      }
      sanitized.tags = content.tags
        .filter(tag => tag.trim().length > 0)
        .map(tag => sanitizeInput(tag.trim(), { maxLength: 50, allowHtml: false }))
        .slice(0, 20);
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized
    };
  }

  // Check content submission rate limit
  static checkContentRateLimit(userId: string): { allowed: boolean; resetTime?: number } {
    return this.contentRateLimiter.canAttempt(userId);
  }

  // Check API rate limit
  static checkApiRateLimit(userId: string): { allowed: boolean; resetTime?: number } {
    return this.apiRateLimiter.canAttempt(userId);
  }

  // Enhanced password validation
  static validatePasswordSecurity(password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
  } {
    const result = validatePassword(password);
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^a-zA-Z0-9]/.test(password)) score += 20;
    if (password.length >= 16) score += 10;
    if (!/(.)\1{2,}/.test(password)) score += 10; // No repeated characters

    if (score < 40) {
      feedback.push('Password is too weak');
    } else if (score < 60) {
      feedback.push('Password strength is fair');
    } else if (score < 80) {
      feedback.push('Password is strong');
    } else {
      feedback.push('Excellent password strength');
    }

    if (password.length < 12) {
      feedback.push('Use at least 12 characters for better security');
    }

    return {
      isValid: result.isValid && score >= 40,
      score,
      feedback
    };
  }

  // Validate file uploads
  static validateFileUpload(file: File): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'text/plain', 'text/markdown',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      errors.push('File type not allowed');
    }

    if (file.size > maxSize) {
      errors.push('File size too large (max 10MB)');
    }

    // Check for suspicious file names
    if (file.name.includes('..') || /[<>:"|?*]/.test(file.name)) {
      errors.push('Invalid file name');
    }

    if (file.name.length > 255) {
      errors.push('File name too long');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
