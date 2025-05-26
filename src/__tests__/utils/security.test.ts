
import { 
  sanitizeInput, 
  validateSecureUrl, 
  UnifiedRateLimiter
} from '@/utils/unified-security';

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags by default', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello');
    });

    it('should respect maxLength option', () => {
      const input = 'This is a very long string';
      const result = sanitizeInput(input, { maxLength: 10 });
      expect(result).toBe('This is a ');
    });

    it('should strip JavaScript protocols', () => {
      const input = 'javascript:alert("xss")';
      const result = sanitizeInput(input);
      expect(result).not.toContain('javascript:');
    });
  });

  describe('validateSecureUrl', () => {
    it('should accept valid HTTPS URLs', () => {
      expect(validateSecureUrl('https://example.com')).toBe(true);
      expect(validateSecureUrl('https://subdomain.example.com/path')).toBe(true);
    });

    it('should accept valid HTTP URLs', () => {
      expect(validateSecureUrl('http://example.com')).toBe(true);
    });

    it('should reject dangerous protocols', () => {
      expect(validateSecureUrl('javascript:alert("xss")')).toBe(false);
      expect(validateSecureUrl('data:text/html,<script>alert("xss")</script>')).toBe(false);
      expect(validateSecureUrl('ftp://example.com')).toBe(false);
    });

    it('should handle URLs without protocol', () => {
      expect(validateSecureUrl('example.com')).toBe(true);
      expect(validateSecureUrl('subdomain.example.com/path')).toBe(true);
    });
  });

  describe('UnifiedRateLimiter', () => {
    it('should allow requests within limit', () => {
      const rateLimit = new UnifiedRateLimiter(3, 60000);
      
      expect(rateLimit.canAttempt('user1').allowed).toBe(true);
      expect(rateLimit.canAttempt('user1').allowed).toBe(true);
      expect(rateLimit.canAttempt('user1').allowed).toBe(true);
    });

    it('should block requests over limit', () => {
      const rateLimit = new UnifiedRateLimiter(2, 60000);
      
      rateLimit.canAttempt('user2');
      rateLimit.canAttempt('user2');
      const result = rateLimit.canAttempt('user2');
      
      expect(result.allowed).toBe(false);
      expect(result.resetTime).toBeDefined();
    });

    it('should reset after time window', (done) => {
      const rateLimit = new UnifiedRateLimiter(1, 100);
      
      rateLimit.canAttempt('user3');
      const blocked = rateLimit.canAttempt('user3');
      expect(blocked.allowed).toBe(false);
      
      setTimeout(() => {
        const allowed = rateLimit.canAttempt('user3');
        expect(allowed.allowed).toBe(true);
        done();
      }, 150);
    });
  });
});
