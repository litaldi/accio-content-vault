
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import NewMainNavigation from '@/components/navigation/NewMainNavigation';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <AccessibilityProvider>
        {children}
      </AccessibilityProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('NewMainNavigation', () => {
  it('renders navigation items correctly', () => {
    render(
      <TestWrapper>
        <NewMainNavigation />
      </TestWrapper>
    );

    expect(screen.getByText('Accio')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <NewMainNavigation />
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
        <NewMainNavigation />
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
        <NewMainNavigation />
      </TestWrapper>
    );

    const mobileMenuButton = screen.getByLabelText('Open menu');
    expect(mobileMenuButton).toBeInTheDocument();
  });
});
