
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SecureInput from '@/components/forms/SecureInput';

// Mock the security utils
jest.mock('@/utils/security', () => ({
  sanitizeInput: jest.fn((input) => input),
  validateEmail: jest.fn(() => ({ isValid: true, message: 'Valid email' })),
  validatePassword: jest.fn(() => ({ isValid: true, message: 'Valid password' }))
}));

describe('SecureInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render input field', () => {
    render(
      <SecureInput
        type="text"
        value=""
        onChange={jest.fn()}
        label="Test Input"
      />
    );

    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  it('should call onChange when input changes', () => {
    const handleChange = jest.fn();
    render(
      <SecureInput
        type="text"
        value=""
        onChange={handleChange}
        label="Test Input"
      />
    );

    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledWith('test value');
  });

  it('should show validation error', async () => {
    const mockValidateEmail = require('@/utils/security').validateEmail;
    mockValidateEmail.mockReturnValue({ isValid: false, message: 'Invalid email' });

    render(
      <SecureInput
        type="email"
        value="invalid-email"
        onChange={jest.fn()}
        label="Email"
        required
      />
    );

    const input = screen.getByLabelText('Email');
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it('should handle URL validation', async () => {
    render(
      <SecureInput
        type="url"
        value="https://example.com"
        onChange={jest.fn()}
        label="Website URL"
        required
      />
    );

    const input = screen.getByLabelText('Website URL');
    expect(input).toBeInTheDocument();
  });

  it('should show required field indicator', () => {
    render(
      <SecureInput
        type="text"
        value=""
        onChange={jest.fn()}
        label="Required Field"
        required
      />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <SecureInput
        type="text"
        value=""
        onChange={jest.fn()}
        label="Disabled Input"
        disabled
      />
    );

    const input = screen.getByLabelText('Disabled Input');
    expect(input).toBeDisabled();
  });
});
