
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import '@testing-library/jest-dom';

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
        <LanguageProvider>
          {children}
        </LanguageProvider>
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
  return results;
}

// Test specific element for accessibility
export async function testElementAccessibility(element: Element) {
  const results = await axe(element);
  expect(results).toHaveNoViolations();
  return results;
}

// Test page for keyboard navigation
export function testKeyboardNavigation(container: Element) {
  // Get all focusable elements
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  );
  
  // Check that at least one element is focusable
  expect(focusableElements.length).toBeGreaterThan(0);
  
  // Check that focusable elements are in a logical tab order
  const tabIndices = Array.from(focusableElements)
    .map(el => parseInt(el.getAttribute('tabindex') || '0', 10))
    .filter(index => index !== -1);
  
  // Either all elements should have tabindex="0" (natural order) 
  // or they should be in ascending order
  const isNaturalOrder = tabIndices.every(index => index === 0);
  const isAscending = tabIndices.every((index, i) => 
    i === 0 || index >= tabIndices[i - 1]
  );
  
  expect(isNaturalOrder || isAscending).toBeTruthy();
  
  return {
    focusableElements,
    tabIndices
  };
}
