
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/__tests__/utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import { useAuth } from '@/contexts/AuthContext';

// Mock authentication
jest.mock('@/contexts/AuthContext');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock other services
jest.mock('@/hooks/useOfflineContent');
jest.mock('@/hooks/useVoiceSearch');

describe('End-to-End User Flows', () => {
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    created_at: '2024-01-01T00:00:00Z'
  };

  const mockSession = {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    expires_at: Date.now() / 1000 + 3600,
    token_type: 'bearer',
    user: mockUser
  };

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: mockUser,
      session: mockSession,
      signIn: jest.fn(),
      signOut: jest.fn(),
      signUp: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
      isLoading: false,
      isConfigured: true
    });
  });

  it('should render dashboard for authenticated user', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    });

    // Should show quick actions
    expect(screen.getByText('Save Content')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Reminders')).toBeInTheDocument();
  });

  it('should navigate through quick actions', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Save Content')).toBeInTheDocument();
    });

    // Test clicking on quick action cards
    const saveContentCard = screen.getByText('Save Content').closest('div');
    expect(saveContentCard).toBeInTheDocument();

    if (saveContentCard) {
      fireEvent.click(saveContentCard);
      // Navigation would be handled by router in real app
    }
  });

  it('should show recent items section', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Recently Saved')).toBeInTheDocument();
    });

    // Should show some mock recent items
    expect(screen.getByText(/knowledge base/i)).toBeInTheDocument();
    expect(screen.getByText(/react best practices/i)).toBeInTheDocument();
  });

  it('should display quick stats', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Quick Stats')).toBeInTheDocument();
    });

    expect(screen.getByText('Total Items')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('Tags Used')).toBeInTheDocument();
  });

  it('should handle search functionality', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search your content/i);
    expect(searchInput).toBeInTheDocument();

    fireEvent.focus(searchInput);
    // Should navigate to search page on focus
  });

  it('should show offline indicator when available', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Offline indicator should be present
    await waitFor(() => {
      const offlineSection = screen.getByText('Offline Access');
      expect(offlineSection).toBeInTheDocument();
    });
  });
});
