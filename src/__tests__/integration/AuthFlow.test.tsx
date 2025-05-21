
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import { axe } from 'jest-axe';
import Login from '@/pages/Login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode, to: string }) => (
    <a href={to} data-testid={`link-${to.replace(/\//g, '')}`}>{children}</a>
  ),
}));

// Mock authentication context
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock toast
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('Authentication Flow', () => {
  const navigateMock = jest.fn();
  const signInMock = jest.fn();
  const toastMock = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mocks
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      signIn: signInMock,
      isLoading: false,
    });
    (useToast as jest.Mock).mockReturnValue({
      toast: toastMock,
    });
  });

  it('renders login form correctly', () => {
    render(<Login />);
    
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByTestId('link-register')).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    render(<Login />);
    
    // Try to submit with empty fields
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Wait for validation messages
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
    
    // Fill invalid email
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'not-an-email' } 
    });
    
    // Try to submit with invalid email
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('handles successful login and redirects', async () => {
    signInMock.mockResolvedValue({ user: { id: '123', email: 'test@example.com' } });
    
    render(<Login />);
    
    // Fill valid credentials
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'test@example.com' } 
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), { 
      target: { value: 'password123' } 
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Wait for redirect after successful login
    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles login error', async () => {
    signInMock.mockRejectedValue(new Error('Invalid credentials'));
    
    render(<Login />);
    
    // Fill credentials
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'test@example.com' } 
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), { 
      target: { value: 'wrong-password' } 
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Wait for error toast
    await waitFor(() => {
      expect(signInMock).toHaveBeenCalled();
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Authentication error',
          variant: 'destructive'
        })
      );
    });
  });

  it('redirects to dashboard if already logged in', async () => {
    // Mock user as already logged in
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
      signIn: signInMock,
      isLoading: false,
    });
    
    render(<Login />);
    
    // Should redirect immediately
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Login />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
