
import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import { axe } from 'jest-axe';
import SecureInput from '@/components/forms/SecureInput';

describe('SecureInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with label and placeholder', () => {
    render(
      <SecureInput
        value=""
        onChange={mockOnChange}
        label="Test Input"
        placeholder="Enter text"
      />
    );

    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('sanitizes input by default', () => {
    render(
      <SecureInput
        value=""
        onChange={mockOnChange}
        label="Test Input"
      />
    );

    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: '<script>alert("xss")</script>Hello' } });

    expect(mockOnChange).toHaveBeenCalledWith('Hello');
  });

  it('validates email format', () => {
    render(
      <SecureInput
        type="email"
        value=""
        onChange={mockOnChange}
        label="Email"
        required
      />
    );

    const input = screen.getByLabelText('Email');
    
    // Enter invalid email
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.blur(input);

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('validates URL format when validateUrl is true', () => {
    render(
      <SecureInput
        type="url"
        value=""
        onChange={mockOnChange}
        label="Website"
        validateUrl
        required
      />
    );

    const input = screen.getByLabelText('Website');
    
    // Enter invalid URL
    fireEvent.change(input, { target: { value: 'javascript:alert("xss")' } });
    fireEvent.blur(input);

    expect(screen.getByText('Please enter a valid and secure URL')).toBeInTheDocument();
  });

  it('shows success state for valid input', () => {
    render(
      <SecureInput
        type="email"
        value=""
        onChange={mockOnChange}
        label="Email"
        required
      />
    );

    const input = screen.getByLabelText('Email');
    
    // Enter valid email
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.blur(input);

    // Should show success indicator (check icon)
    expect(screen.getByTestId('check-circle') || screen.queryByRole('img', { hidden: true })).toBeTruthy();
  });

  it('respects maxLength constraint', () => {
    render(
      <SecureInput
        value=""
        onChange={mockOnChange}
        label="Short Input"
        maxLength={5}
      />
    );

    const input = screen.getByLabelText('Short Input');
    fireEvent.change(input, { target: { value: '123456789' } });

    expect(mockOnChange).toHaveBeenCalledWith('12345');
  });

  it('shows security shield icon when sanitize is enabled', () => {
    render(
      <SecureInput
        value=""
        onChange={mockOnChange}
        label="Secure Input"
        sanitize
      />
    );

    // Shield icon should be present
    expect(screen.getByTestId('shield') || screen.queryByRole('img', { hidden: true })).toBeTruthy();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <SecureInput
        value=""
        onChange={mockOnChange}
        label="Accessible Input"
        required
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('provides proper ARIA attributes', () => {
    render(
      <SecureInput
        value=""
        onChange={mockOnChange}
        label="Test Input"
        required
      />
    );

    const input = screen.getByLabelText('Test Input');
    
    // Should have required attribute
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-required', 'true');
  });
});
