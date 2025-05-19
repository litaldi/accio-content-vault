
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, testAccessibility } from '../utils/accessibility';
import { Input } from '@/components/ui/input';
import '@testing-library/jest-dom'; // Explicit import for matchers

describe('Input Component', () => {
  it('should render correctly', () => {
    renderWithProviders(<Input placeholder="Test input" />);
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  it('should handle user input', async () => {
    renderWithProviders(<Input placeholder="Test input" />);
    const input = screen.getByPlaceholderText('Test input');
    
    await userEvent.type(input, 'Hello world');
    expect(input).toHaveValue('Hello world');
  });

  it('should pass accessibility tests', async () => {
    await testAccessibility(
      <div>
        <label htmlFor="test-input">Test Label</label>
        <Input id="test-input" aria-describedby="test-description" />
        <div id="test-description">This is a description</div>
      </div>
    );
  });
});
