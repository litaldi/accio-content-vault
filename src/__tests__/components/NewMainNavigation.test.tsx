
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import MainNavigation from '@/components/navigation/MainNavigation';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <AccessibilityProvider>
        {children}
      </AccessibilityProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('MainNavigation', () => {
  it('renders navigation items correctly', () => {
    render(
      <TestWrapper>
        <MainNavigation />
      </TestWrapper>
    );

    expect(screen.getByText('Accio')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <MainNavigation />
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
        <MainNavigation />
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
        <MainNavigation />
      </TestWrapper>
    );

    const mobileMenuButton = screen.getByLabelText('Open navigation menu');
    expect(mobileMenuButton).toBeInTheDocument();
  });
});
