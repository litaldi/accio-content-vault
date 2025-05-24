
import { 
  sanitizeInput, 
  validateSecureUrl, 
  getCSPDirectives,
  createClientRateLimit 
} from '@/utils/security-helpers';

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags by default', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello');
    });

    it('should escape HTML entities', () => {
      const input = '<div>Test & "quotes"</div>';
      const result = sanitizeInput(input);
      expect(result).toBe('&lt;div&gt;Test &amp; &quot;quotes&quot;&lt;/div&gt;');
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

  describe('getCSPDirectives', () => {
    it('should return proper CSP directives', () => {
      const csp = getCSPDirectives();
      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("script-src 'self'");
      expect(csp).toContain("frame-ancestors 'none'");
    });
  });

  describe('createClientRateLimit', () => {
    it('should allow requests within limit', () => {
      const rateLimit = createClientRateLimit(3, 60000); // 3 requests per minute
      
      expect(rateLimit('user1').allowed).toBe(true);
      expect(rateLimit('user1').allowed).toBe(true);
      expect(rateLimit('user1').allowed).toBe(true);
    });

    it('should block requests over limit', () => {
      const rateLimit = createClientRateLimit(2, 60000); // 2 requests per minute
      
      rateLimit('user2');
      rateLimit('user2');
      const result = rateLimit('user2');
      
      expect(result.allowed).toBe(false);
      expect(result.resetTime).toBeDefined();
    });

    it('should reset after time window', (done) => {
      const rateLimit = createClientRateLimit(1, 100); // 1 request per 100ms
      
      rateLimit('user3'); // First request
      const blocked = rateLimit('user3'); // Should be blocked
      expect(blocked.allowed).toBe(false);
      
      setTimeout(() => {
        const allowed = rateLimit('user3'); // Should be allowed after window
        expect(allowed.allowed).toBe(true);
        done();
      }, 150);
    });
  });
});
