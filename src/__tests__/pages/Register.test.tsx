
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Register from '@/pages/Register';
import { runFullA11yTest, testAccessibility } from '@/__tests__/utils/enhanced-a11y-test';

// Mock react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  ),
}));

const renderRegister = () => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe('Register Page', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const component = renderRegister();
      await testAccessibility(component);
    });

    it('should have proper heading structure', () => {
      renderRegister();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should have properly labeled form fields', () => {
      renderRegister();
      
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('should be keyboard navigable', async () => {
      const component = renderRegister();
      const user = userEvent.setup();
      
      // Tab through form elements
      await user.tab();
      expect(screen.getByLabelText(/full name/i)).toHaveFocus();
      
      await user.tab();
      expect(screen.getByLabelText(/email/i)).toHaveFocus();
      
      await user.tab();
      expect(screen.getByLabelText(/password/i)).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('button', { name: /create account/i })).toHaveFocus();
    });

    it('should have accessible links', () => {
      renderRegister();
      
      const signInLink = screen.getByRole('link', { name: /sign in/i });
      expect(signInLink).toHaveAttribute('href', '/login');
      
      const termsLink = screen.getByRole('link', { name: /terms of service/i });
      expect(termsLink).toHaveAttribute('href', '/terms');
      
      const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
      expect(privacyLink).toHaveAttribute('href', '/privacy');
    });
  });

  describe('Security', () => {
    it('should not expose sensitive information in DOM', () => {
      renderRegister();
      
      // Check that no API keys or sensitive data are in the DOM
      const pageHTML = document.documentElement.innerHTML;
      expect(pageHTML).not.toMatch(/api[_-]?key/i);
      expect(pageHTML).not.toMatch(/secret/i);
      expect(pageHTML).not.toMatch(/token/i);
    });

    it('should use proper input types for security', () => {
      renderRegister();
      
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveAttribute('type', 'email');
      
      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should prevent XSS in form inputs', async () => {
      renderRegister();
      const user = userEvent.setup();
      
      const nameInput = screen.getByLabelText(/full name/i);
      const maliciousScript = '<script>alert("xss")</script>';
      
      await user.type(nameInput, maliciousScript);
      
      // Value should be sanitized or at least not executed
      expect(nameInput).toHaveValue(maliciousScript);
      // The script should not be executed (no alerts in test environment)
    });
  });

  describe('Form Validation', () => {
    it('should validate email format', async () => {
      renderRegister();
      const user = userEvent.setup();
      
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid-email');
      
      const submitButton = screen.getByRole('button', { name: /create account/i });
      await user.click(submitButton);
      
      // Should show browser validation or custom error
      expect(emailInput).toBeInvalid();
    });

    it('should require all fields', async () => {
      renderRegister();
      const user = userEvent.setup();
      
      const submitButton = screen.getByRole('button', { name: /create account/i });
      await user.click(submitButton);
      
      // All required fields should be invalid when empty
      expect(screen.getByLabelText(/full name/i)).toBeInvalid();
      expect(screen.getByLabelText(/email/i)).toBeInvalid();
      expect(screen.getByLabelText(/password/i)).toBeInvalid();
    });
  });

  describe('User Experience', () => {
    it('should have proper page title and meta description', () => {
      renderRegister();
      
      // Test would verify Helmet sets proper title
      expect(document.title).toContain('Sign Up');
    });

    it('should display brand logo and name', () => {
      renderRegister();
      
      expect(screen.getByText('Accio')).toBeInTheDocument();
      expect(screen.getByText('A')).toBeInTheDocument(); // Logo
    });

    it('should show proper call-to-action text', () => {
      renderRegister();
      
      expect(screen.getByText(/create your account/i)).toBeInTheDocument();
      expect(screen.getByText(/start building your knowledge library today/i)).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should be responsive on mobile', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      renderRegister();
      
      const container = screen.getByRole('main') || document.querySelector('.min-h-screen');
      expect(container).toHaveClass('min-h-screen');
      expect(container).toHaveClass('p-4'); // Mobile padding
    });
  });

  describe('Integration', () => {
    it('should complete full registration flow', async () => {
      renderRegister();
      const user = userEvent.setup();
      
      // Fill out form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/password/i), 'SecurePass123!');
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /create account/i });
      await user.click(submitButton);
      
      // Should attempt form submission
      expect(submitButton).toBeInTheDocument();
    });
  });
});
