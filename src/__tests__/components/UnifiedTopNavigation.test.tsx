
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import UnifiedTopNavigation from '@/components/navigation/UnifiedTopNavigation';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('UnifiedTopNavigation', () => {
  it('renders all navigation items correctly', () => {
    render(
      <TestWrapper>
        <UnifiedTopNavigation />
      </TestWrapper>
    );

    expect(screen.getByText('Accio')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', async () => {
    const { container } = render(
      <TestWrapper>
        <UnifiedTopNavigation />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(mainNav).toBeInTheDocument();

    const logo = screen.getByLabelText('Accio - Go to homepage');
    expect(logo).toBeInTheDocument();
  });

  it('handles mobile menu toggle correctly', () => {
    render(
      <TestWrapper>
        <UnifiedTopNavigation />
      </TestWrapper>
    );

    const mobileMenuButton = screen.getByLabelText('Open menu');
    fireEvent.click(mobileMenuButton);

    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(
      <TestWrapper>
        <UnifiedTopNavigation />
      </TestWrapper>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    homeLink.focus();
    expect(homeLink).toHaveFocus();

    fireEvent.keyDown(homeLink, { key: 'Tab' });
    const featuresLink = screen.getByRole('link', { name: /features/i });
    expect(featuresLink).toHaveFocus();
  });

  it('handles theme toggle correctly', async () => {
    render(
      <TestWrapper>
        <UnifiedTopNavigation />
      </TestWrapper>
    );

    const themeToggle = screen.getByLabelText(/switch to/i);
    fireEvent.click(themeToggle);

    await waitFor(() => {
      expect(themeToggle).toHaveAttribute('aria-label');
    });
  });
});
