
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Explicit import for matchers

/**
 * Helper function to test keyboard navigation through a series of elements
 * 
 * @param selectors Array of selectors or testIDs to navigate through
 * @param startIndex Optional starting index (defaults to 0)
 */
export async function testKeyboardNavigation(selectors: string[], startIndex = 0) {
  // First check if elements are in the document
  const elements = selectors.map(selector => {
    const element = screen.getByTestId(selector) || screen.getByLabelText(selector) || document.querySelector(selector);
    if (!element) {
      throw new Error(`Element with selector '${selector}' not found in document`);
    }
    return element as HTMLElement;
  });
  
  // Start with the element at startIndex
  elements[startIndex].focus();
  
  // Verify initial focus
  expect(document.activeElement).toBe(elements[startIndex]);
  
  // Navigate forward with Tab
  for (let i = startIndex; i < elements.length - 1; i++) {
    await userEvent.tab();
    expect(document.activeElement).toBe(elements[i + 1]);
  }
  
  // Navigate backward with Shift+Tab
  for (let i = elements.length - 1; i > startIndex; i--) {
    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(elements[i - 1]);
  }
}

/**
 * Tests that a component is keyboard operable
 * 
 * @param element The element to test
 * @param activationKeys Keys that should activate the element (e.g., Enter, Space)
 */
export async function testKeyboardOperability(element: HTMLElement, activationKeys = ['Enter', ' ']) {
  const mockFn = jest.fn();
  element.addEventListener('click', mockFn);
  
  // Focus the element
  element.focus();
  expect(document.activeElement).toBe(element);
  
  // Test each activation key
  for (const key of activationKeys) {
    await userEvent.keyboard(key);
    expect(mockFn).toHaveBeenCalled();
    mockFn.mockClear();
  }
  
  element.removeEventListener('click', mockFn);
}
