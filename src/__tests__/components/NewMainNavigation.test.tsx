
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import OrganizedNavigation from '@/components/navigation/OrganizedNavigation';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <AccessibilityProvider>
        {children}
      </AccessibilityProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('OrganizedNavigation', () => {
  it('renders navigation items correctly', () => {
    render(
      <TestWrapper>
        <OrganizedNavigation />
      </TestWrapper>
    );

    expect(screen.getByText('Accio')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <OrganizedNavigation />
      </TestWrapper>
    );

    const navigation = screen.getByRole('banner');
    expect(navigation).toBeInTheDocument();

    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(mainNav).toBeInTheDocument();
  });

  it('toggles theme correctly', () => {
    render(
      <TestWrapper>
        <OrganizedNavigation />
      </TestWrapper>
    );

    const themeButton = screen.getByLabelText('Toggle theme');
    expect(themeButton).toBeInTheDocument();
    
    fireEvent.click(themeButton);
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('handles mobile menu toggle', () => {
    render(
      <TestWrapper>
        <OrganizedNavigation />
      </TestWrapper>
    );

    const mobileMenuButton = screen.getByLabelText('Open menu');
    expect(mobileMenuButton).toBeInTheDocument();
  });
});
