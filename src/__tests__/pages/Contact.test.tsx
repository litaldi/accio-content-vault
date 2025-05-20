
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import { axe } from 'jest-axe';
import Contact from '@/pages/Contact';
import { useToast } from '@/hooks/use-toast';

// Mock the useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('Contact', () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  it('should render the contact form correctly', () => {
    render(<Contact />);
    
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('should display validation errors for empty fields', async () => {
    render(<Contact />);
    
    // Submit form without filling in any fields
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    // Expect validation errors
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  it('should display validation error for invalid email', async () => {
    render(<Contact />);
    
    // Fill in form with invalid email
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message.' } });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    // Expect email validation error
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('should successfully submit the form with valid data', async () => {
    const toastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      toast: toastMock,
    });
    
    render(<Contact />);
    
    // Fill in form with valid data
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message that is longer than 10 characters.' } });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    // Wait for form submission and success message
    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith({
        title: 'Message sent successfully!',
        description: "We'll get back to you as soon as possible.",
      });
    });
    
    // Check if success state is shown
    await waitFor(() => {
      expect(screen.getByText('Thank you for your message!')).toBeInTheDocument();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Contact />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
