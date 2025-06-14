
import { 
  sanitizeInput, 
  validateEmail, 
  validatePassword,
  validateUrl,
  isValidSecureUrl
} from '@/utils/security';

describe('Security Utils', () => {
  describe('sanitizeInput', () => {
    it('should remove script tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello');
    });

    it('should handle normal text', () => {
      const input = 'Hello World';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello World');
    });

    it('should handle empty string', () => {
      const result = sanitizeInput('');
      expect(result).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      const result = validateEmail('test@example.com');
      expect(result.isValid).toBe(true);
    });

    it('should invalidate incorrect email', () => {
      const result = validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate strong password', () => {
      const result = validatePassword('StrongPass123!');
      expect(result.isValid).toBe(true);
    });

    it('should invalidate weak password', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateUrl', () => {
    it('should validate correct URL', () => {
      const result = validateUrl('https://example.com');
      expect(result.isValid).toBe(true);
    });

    it('should invalidate incorrect URL', () => {
      const result = validateUrl('not-a-url');
      expect(result.isValid).toBe(false);
    });
  });

  describe('isValidSecureUrl', () => {
    it('should validate HTTPS URL', () => {
      expect(isValidSecureUrl('https://example.com')).toBe(true);
    });

    it('should invalidate HTTP URL', () => {
      expect(isValidSecureUrl('http://example.com')).toBe(false);
    });
  });
});
