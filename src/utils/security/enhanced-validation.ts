
import { sanitizeInput, validateEmail, validatePassword, validateUrl, ValidationResult } from './core-security';
import DOMPurify from 'dompurify';

// Enhanced file validation with deeper security checks
export const validateFileUploadSecurity = (file: File): { isValid: boolean; errors: string[]; warnings: string[] } => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Allowed MIME types with stricter checking
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    'application/pdf', 'text/plain', 'text/markdown', 'text/csv',
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  
  // Maximum file sizes by type (in bytes)
  const maxSizes = {
    'image': 5 * 1024 * 1024,      // 5MB for images
    'document': 10 * 1024 * 1024,  // 10MB for documents
    'text': 1 * 1024 * 1024        // 1MB for text files
  };

  // Basic validation
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type "${file.type}" is not allowed`);
  }

  // Size validation based on file category
  const fileCategory = file.type.startsWith('image/') ? 'image' :
                      file.type.startsWith('text/') ? 'text' : 'document';
  
  if (file.size > maxSizes[fileCategory]) {
    errors.push(`File size exceeds limit for ${fileCategory} files (${Math.round(maxSizes[fileCategory] / 1024 / 1024)}MB)`);
  }

  // Filename security checks
  const suspiciousPatterns = [
    /\.(exe|bat|cmd|com|pif|scr|vbs|js|jar|app|deb|rpm)$/i,
    /\.\.|\/\.\./,  // Directory traversal
    /[<>:"|?*]/,    // Invalid filename characters
    /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i  // Windows reserved names
  ];

  suspiciousPatterns.forEach(pattern => {
    if (pattern.test(file.name)) {
      errors.push('Filename contains suspicious patterns');
    }
  });

  // Length checks
  if (file.name.length > 255) {
    errors.push('Filename too long (max 255 characters)');
  }

  if (file.name.length === 0) {
    errors.push('Filename cannot be empty');
  }

  // Additional security warnings
  if (file.type === 'image/svg+xml') {
    warnings.push('SVG files may contain executable code - will be sanitized');
  }

  if (file.size > 1024 * 1024) {
    warnings.push('Large file detected - may take longer to process');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Enhanced content validation with malware pattern detection
export const validateContentSecurity = (content: {
  title?: string;
  description?: string;
  url?: string;
  tags?: string[];
}): { isValid: boolean; errors: string[]; sanitized: typeof content; securityScore: number } => {
  const errors: string[] = [];
  const sanitized = { ...content };
  let securityScore = 100;

  // Malicious pattern detection
  const maliciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /expression\s*\(/gi,
    /import\s*\(/gi,
    /eval\s*\(/gi
  ];

  // Title validation
  if (content.title) {
    if (content.title.length > 200) {
      errors.push('Title too long (max 200 characters)');
      securityScore -= 10;
    }
    
    maliciousPatterns.forEach(pattern => {
      if (pattern.test(content.title!)) {
        errors.push('Title contains potentially malicious content');
        securityScore -= 30;
      }
    });
    
    sanitized.title = DOMPurify.sanitize(content.title, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });
  }

  // Description validation
  if (content.description) {
    if (content.description.length > 10000) {
      errors.push('Description too long (max 10,000 characters)');
      securityScore -= 15;
    }
    
    maliciousPatterns.forEach(pattern => {
      if (pattern.test(content.description!)) {
        errors.push('Description contains potentially malicious content');
        securityScore -= 30;
      }
    });
    
    sanitized.description = DOMPurify.sanitize(content.description, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li'],
      ALLOWED_ATTR: []
    });
  }

  // URL validation with enhanced security
  if (content.url) {
    const urlValidation = validateUrl(content.url);
    if (!urlValidation.isValid) {
      errors.push(urlValidation.message);
      securityScore -= 20;
    } else {
      // Additional URL security checks
      const suspiciousDomains = [
        /\.(tk|ml|ga|cf)$/i,
        /bit\.ly|tinyurl|t\.co/i,
        /localhost|127\.0\.0\.1|0\.0\.0\.0/i
      ];
      
      suspiciousDomains.forEach(pattern => {
        if (pattern.test(content.url!)) {
          errors.push('URL from suspicious or shortened domain');
          securityScore -= 25;
        }
      });
      
      sanitized.url = content.url;
    }
  }

  // Tags validation
  if (content.tags) {
    if (content.tags.length > 20) {
      errors.push('Too many tags (max 20)');
      securityScore -= 10;
    }
    
    sanitized.tags = content.tags
      .filter(tag => tag.trim().length > 0)
      .map(tag => {
        const cleanTag = DOMPurify.sanitize(tag.trim(), {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: []
        });
        
        if (cleanTag.length > 50) {
          errors.push(`Tag "${cleanTag.substring(0, 20)}..." too long (max 50 characters)`);
          securityScore -= 5;
        }
        
        return cleanTag;
      })
      .slice(0, 20);
  }

  return {
    isValid: errors.length === 0 && securityScore >= 50,
    errors,
    sanitized,
    securityScore: Math.max(0, securityScore)
  };
};

// Rate limiting with enhanced tracking
export class EnhancedRateLimiter {
  private attempts: Map<string, {
    count: number;
    resetTime: number;
    blocked: boolean;
    suspiciousActivity: boolean;
  }> = new Map();

  constructor(
    private maxAttempts: number,
    private windowMs: number,
    private blockDuration: number = 300000 // 5 minutes default block
  ) {}

  checkAttempt(identifier: string, operation: string = 'general'): {
    allowed: boolean;
    resetTime?: number;
    remainingAttempts?: number;
    securityAlert?: boolean;
  } {
    const now = Date.now();
    const key = `${identifier}-${operation}`;
    const userAttempts = this.attempts.get(key);

    if (!userAttempts || now > userAttempts.resetTime) {
      this.attempts.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
        blocked: false,
        suspiciousActivity: false
      });
      return {
        allowed: true,
        remainingAttempts: this.maxAttempts - 1
      };
    }

    if (userAttempts.blocked && now < userAttempts.resetTime) {
      return {
        allowed: false,
        resetTime: userAttempts.resetTime,
        securityAlert: userAttempts.suspiciousActivity
      };
    }

    userAttempts.count++;

    if (userAttempts.count >= this.maxAttempts) {
      userAttempts.blocked = true;
      userAttempts.resetTime = now + this.blockDuration;
      
      // Flag as suspicious if many rapid attempts
      if (userAttempts.count > this.maxAttempts * 2) {
        userAttempts.suspiciousActivity = true;
      }

      return {
        allowed: false,
        resetTime: userAttempts.resetTime,
        securityAlert: userAttempts.suspiciousActivity
      };
    }

    return {
      allowed: true,
      remainingAttempts: this.maxAttempts - userAttempts.count
    };
  }

  reset(identifier: string, operation: string = 'general'): void {
    const key = `${identifier}-${operation}`;
    this.attempts.delete(key);
  }

  getStatus(identifier: string, operation: string = 'general'): {
    attempts: number;
    blocked: boolean;
    timeUntilReset: number;
  } {
    const key = `${identifier}-${operation}`;
    const userAttempts = this.attempts.get(key);
    const now = Date.now();

    if (!userAttempts) {
      return { attempts: 0, blocked: false, timeUntilReset: 0 };
    }

    return {
      attempts: userAttempts.count,
      blocked: userAttempts.blocked,
      timeUntilReset: Math.max(0, userAttempts.resetTime - now)
    };
  }
}

// Global enhanced rate limiters
export const enhancedRateLimiters = {
  content: new EnhancedRateLimiter(5, 300000, 600000), // 5 per 5min, 10min block
  auth: new EnhancedRateLimiter(3, 900000, 1800000),   // 3 per 15min, 30min block
  api: new EnhancedRateLimiter(100, 60000, 300000),    // 100 per min, 5min block
  fileUpload: new EnhancedRateLimiter(10, 600000, 1800000) // 10 per 10min, 30min block
};
