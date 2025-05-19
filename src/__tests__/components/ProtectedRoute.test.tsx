
import { render, screen } from '../utils/test-utils';
import { axe } from 'jest-axe';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Mock the required hooks and context
jest.mock('@/contexts/AuthContext');
jest.mock('@/hooks/use-toast');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <div data-testid="navigate-mock" />
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  it('should show loading state when authentication is loading', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
      isConfigured: true
    });
    
    render(<ProtectedRoute>Protected Content</ProtectedRoute>);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should show configuration message when Supabase is not configured', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
      isConfigured: false
    });
    
    render(<ProtectedRoute>Protected Content</ProtectedRoute>);
    
    expect(screen.getByText(/supabase configuration required/i)).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    const toastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      toast: toastMock,
    });
    
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
      isConfigured: true
    });
    
    render(<ProtectedRoute>Protected Content</ProtectedRoute>);
    
    expect(screen.getByTestId('navigate-mock')).toBeInTheDocument();
    expect(toastMock).toHaveBeenCalledWith({
      title: "Authentication required",
      description: "Please log in to access this page.",
      variant: "destructive",
    });
  });

  it('should render children when user is authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
      isLoading: false,
      isConfigured: true
    });
    
    render(<ProtectedRoute>Protected Content</ProtectedRoute>);
    
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should have no accessibility violations for loading state', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
      isConfigured: true
    });
    
    const { container } = render(<ProtectedRoute>Protected Content</ProtectedRoute>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations for configuration state', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
      isConfigured: false
    });
    
    const { container } = render(<ProtectedRoute>Protected Content</ProtectedRoute>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
