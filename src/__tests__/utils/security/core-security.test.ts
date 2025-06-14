
import { 
  sanitizeInput, 
  validateEmail, 
  validatePassword, 
  validateUrl,
  isValidSecureUrl,
  UnifiedRateLimiter,
  CSRFManager,
  escapeHtml
} from '@/utils/security/core-security';

describe('Core Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags by default', () => {
      const input = '<script>alert("xss")</script>Hello<iframe></iframe>';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello');
    });

    it('should respect maxLength option', () => {
      const input = 'This is a very long string that exceeds limit';
      const result = sanitizeInput(input, { maxLength: 10 });
      expect(result).toBe('This is a ');
    });

    it('should strip JavaScript protocols', () => {
      const input = 'javascript:alert("xss")';
      const result = sanitizeInput(input);
      expect(result).not.toContain('javascript:');
    });

    it('should normalize whitespace', () => {
      const input = '  Multiple   spaces  \n\t  ';
      const result = sanitizeInput(input);
      expect(result).toBe('Multiple spaces');
    });

    it('should preserve HTML when allowHtml is true', () => {
      const input = '<p>Safe HTML</p>';
      const result = sanitizeInput(input, { allowHtml: true });
      expect(result).toBe('<p>Safe HTML</p>');
    });
  });

  describe('validateEmail', () => {
    it('should accept valid emails', () => {
      expect(validateEmail('user@example.com').isValid).toBe(true);
      expect(validateEmail('test.email+tag@domain.co.uk').isValid).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('invalid').isValid).toBe(false);
      expect(validateEmail('@domain.com').isValid).toBe(false);
      expect(validateEmail('user@').isValid).toBe(false);
      expect(validateEmail('user@domain').isValid).toBe(false);
    });

    it('should reject suspicious patterns', () => {
      expect(validateEmail('user..double@example.com').isValid).toBe(false);
      expect(validateEmail('user@domain@domain.com').isValid).toBe(false);
      expect(validateEmail('user@exam ple.com').isValid).toBe(false);
    });

    it('should handle length limits', () => {
      const tooLong = 'a'.repeat(250) + '@example.com';
      expect(validateEmail(tooLong).isValid).toBe(false);
      expect(validateEmail('a@b').isValid).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should accept strong passwords', () => {
      const result = validatePassword('StrongP@ssw0rd!');
      expect(result.isValid).toBe(true);
      expect(result.strength).toBeGreaterThanOrEqual(60);
    });

    it('should reject weak passwords', () => {
      expect(validatePassword('weak').isValid).toBe(false);
      expect(validatePassword('password').isValid).toBe(false);
      expect(validatePassword('12345678').isValid).toBe(false);
    });

    it('should require all character types', () => {
      expect(validatePassword('alllowercase').isValid).toBe(false);
      expect(validatePassword('ALLUPPERCASE').isValid).toBe(false);
      expect(validatePassword('NoNumbers!').isValid).toBe(false);
      expect(validatePassword('NoSpecial123').isValid).toBe(false);
    });

    it('should detect repeated characters', () => {
      const result = validatePassword('Aaaa1111!');
      expect(result.strength).toBeLessThanOrEqual(40);
    });
  });

  describe('validateUrl', () => {
    it('should accept valid URLs', () => {
      expect(validateUrl('https://example.com').isValid).toBe(true);
      expect(validateUrl('http://subdomain.example.com/path').isValid).toBe(true);
      expect(validateUrl('example.com').isValid).toBe(true);
    });

    it('should reject dangerous protocols', () => {
      expect(validateUrl('javascript:alert("xss")').isValid).toBe(false);
      expect(validateUrl('data:text/html,<script>').isValid).toBe(false);
      expect(validateUrl('ftp://example.com').isValid).toBe(false);
    });

    it('should reject suspicious hostnames', () => {
      expect(validateUrl('https://javascript.evil.com').isValid).toBe(false);
      expect(validateUrl('https://data.malicious.com').isValid).toBe(false);
    });
  });

  describe('UnifiedRateLimiter', () => {
    it('should allow requests within limit', () => {
      const limiter = new UnifiedRateLimiter(3, 60000);
      
      expect(limiter.canAttempt('user1').allowed).toBe(true);
      expect(limiter.canAttempt('user1').allowed).toBe(true);
      expect(limiter.canAttempt('user1').allowed).toBe(true);
    });

    it('should block requests over limit', () => {
      const limiter = new UnifiedRateLimiter(2, 60000);
      
      limiter.canAttempt('user2');
      limiter.canAttempt('user2');
      const result = limiter.canAttempt('user2');
      
      expect(result.allowed).toBe(false);
      expect(result.resetTime).toBeDefined();
    });

    it('should reset after time window', (done) => {
      const limiter = new UnifiedRateLimiter(1, 100);
      
      limiter.canAttempt('user3');
      const blocked = limiter.canAttempt('user3');
      expect(blocked.allowed).toBe(false);
      
      setTimeout(() => {
        const allowed = limiter.canAttempt('user3');
        expect(allowed.allowed).toBe(true);
        done();
      }, 150);
    });
  });

  describe('CSRFManager', () => {
    it('should generate and validate tokens', () => {
      const token = CSRFManager.generate();
      expect(typeof token).toBe('string');
      expect(token.length).toBe(64); // 32 bytes = 64 hex chars
      expect(CSRFManager.validate(token)).toBe(true);
    });

    it('should consume tokens only once', () => {
      const token = CSRFManager.generate();
      expect(CSRFManager.consume(token)).toBe(true);
      expect(CSRFManager.consume(token)).toBe(false);
    });

    it('should reject invalid tokens', () => {
      expect(CSRFManager.validate('invalid-token')).toBe(false);
      expect(CSRFManager.consume('invalid-token')).toBe(false);
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      const input = '<script>alert("xss")</script>';
      const expected = '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;';
      expect(escapeHtml(input)).toBe(expected);
    });

    it('should handle ampersands correctly', () => {
      expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    it('should handle mixed content', () => {
      const input = 'Price: $5 & "free" shipping';
      const expected = 'Price: $5 &amp; &quot;free&quot; shipping';
      expect(escapeHtml(input)).toBe(expected);
    });
  });
});
