
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter } from 'react-router-dom';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

interface TestWrapperProps {
  children: React.ReactNode;
}

// Wrapper component for providing common context providers
export const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
};

// Custom render function with providers
export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: TestWrapper, ...options });
}

// Test component for accessibility
export async function testAccessibility(ui: React.ReactElement) {
  const { container } = renderWithProviders(ui);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
