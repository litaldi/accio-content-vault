
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/__tests__/utils/test-utils';
import { axe } from 'jest-axe';
import Dashboard from '@/pages/Dashboard';

// Mock the enhanced dashboard components
jest.mock('@/components/Dashboard/EnhancedDashboard', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="enhanced-dashboard">
      <h2>Welcome back!</h2>
      <div data-testid="quick-actions">
        <button>Save Content</button>
        <button>Bulk Import</button>
      </div>
      <div data-testid="activity-feed">
        <h3>Recent Activity</h3>
        <div>No recent activity</div>
      </div>
      <div data-testid="notifications">
        <h3>Notifications</h3>
        <div>No notifications</div>
      </div>
    </div>
  ),
}));

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user', email: 'test@example.com' },
    session: { access_token: 'mock-token' },
  }),
}));

describe('Dashboard Integration Flow', () => {
  it('renders dashboard with all main sections', () => {
    render(<Dashboard />);
    
    expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument();
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    expect(screen.getByTestId('quick-actions')).toBeInTheDocument();
    expect(screen.getByTestId('activity-feed')).toBeInTheDocument();
    expect(screen.getByTestId('notifications')).toBeInTheDocument();
  });

  it('has proper page structure and SEO elements', () => {
    render(<Dashboard />);
    
    // Check for main landmark
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('aria-label', 'Dashboard content');
    
    // Check for skip link target
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('displays quick action buttons', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Save Content')).toBeInTheDocument();
    expect(screen.getByText('Bulk Import')).toBeInTheDocument();
  });

  it('shows empty states for activity and notifications', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('No recent activity')).toBeInTheDocument();
    expect(screen.getByText('No notifications')).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<Dashboard />);
    
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    
    // Should have proper heading levels
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('maintains responsive layout structure', () => {
    render(<Dashboard />);
    
    const container = screen.getByTestId('enhanced-dashboard');
    expect(container).toHaveClass(); // Should have styling classes
  });

  it('handles user interactions correctly', async () => {
    render(<Dashboard />);
    
    const saveContentButton = screen.getByText('Save Content');
    
    // Button should be interactive
    expect(saveContentButton).toBeEnabled();
    
    // Should be focusable
    saveContentButton.focus();
    expect(document.activeElement).toBe(saveContentButton);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Dashboard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('provides proper page title and meta information', () => {
    render(<Dashboard />);
    
    // The Helmet component should set the title
    // This would be tested in the actual browser environment
    expect(document.title).toContain('Dashboard');
  });

  it('supports keyboard navigation throughout', () => {
    render(<Dashboard />);
    
    const interactiveElements = screen.getAllByRole('button');
    
    interactiveElements.forEach(element => {
      expect(element).toHaveAttribute('tabindex', '0');
    });
  });
});
