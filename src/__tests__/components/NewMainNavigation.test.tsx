
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <AccessibilityProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('ProfessionalNavigation', () => {
  it('renders navigation items correctly', () => {
    render(
      <TestWrapper>
        <ProfessionalNavigation />
      </TestWrapper>
    );

    expect(screen.getByText('Accio')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <ProfessionalNavigation />
      </TestWrapper>
    );

    const navigation = screen.getByRole('banner');
    expect(navigation).toBeInTheDocument();

    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(mainNav).toBeInTheDocument();
  });

  it('handles mobile menu toggle', () => {
    render(
      <TestWrapper>
        <ProfessionalNavigation />
      </TestWrapper>
    );

    const mobileMenuButton = screen.getByLabelText('Toggle mobile menu');
    expect(mobileMenuButton).toBeInTheDocument();
  });
});
