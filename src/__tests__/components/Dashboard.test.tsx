
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import Dashboard from '@/pages/Dashboard';

// Mock the authentication context
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { email: 'test@example.com' },
    signOut: jest.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AccessibilityProvider>
            {component}
          </AccessibilityProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Dashboard', () => {
  test('renders welcome message', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });

  test('renders search functionality', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByPlaceholderText(/search your knowledge/i)).toBeInTheDocument();
  });

  test('renders quick actions', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
  });

  test('renders content stats', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText('Total Content')).toBeInTheDocument();
  });
});
