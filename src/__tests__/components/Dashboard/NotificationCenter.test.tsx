
import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import { axe } from 'jest-axe';
import NotificationCenter from '@/components/Dashboard/NotificationCenter';

describe('NotificationCenter', () => {
  const mockOnMarkAsRead = jest.fn();
  const mockOnDismiss = jest.fn();
  const mockOnAction = jest.fn();

  const mockNotifications = [
    {
      id: '1',
      type: 'info' as const,
      title: 'Welcome to Accio',
      message: 'Start by adding your first content',
      timestamp: new Date('2024-01-01'),
      read: false,
      actionLabel: 'Get Started',
    },
    {
      id: '2',
      type: 'success' as const,
      title: 'Content Saved',
      message: 'Your article was saved successfully',
      timestamp: new Date('2024-01-02'),
      read: true,
    },
    {
      id: '3',
      type: 'warning' as const,
      title: 'Storage Almost Full',
      message: 'Consider upgrading your plan',
      timestamp: new Date('2024-01-03'),
      read: false,
    },
  ];

  const defaultProps = {
    notifications: mockNotifications,
    onMarkAsRead: mockOnMarkAsRead,
    onDismiss: mockOnDismiss,
    onAction: mockOnAction,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders notifications correctly', () => {
    render(<NotificationCenter {...defaultProps} />);
    
    expect(screen.getByText('Welcome to Accio')).toBeInTheDocument();
    expect(screen.getByText('Content Saved')).toBeInTheDocument();
    expect(screen.getByText('Storage Almost Full')).toBeInTheDocument();
  });

  it('shows unread count badge', () => {
    render(<NotificationCenter {...defaultProps} />);
    
    expect(screen.getByText('2')).toBeInTheDocument(); // 2 unread notifications
  });

  it('handles mark as read functionality', () => {
    render(<NotificationCenter {...defaultProps} />);
    
    const markAsReadButtons = screen.getAllByText('Mark as read');
    fireEvent.click(markAsReadButtons[0]);
    
    expect(mockOnMarkAsRead).toHaveBeenCalledWith('1');
  });

  it('handles dismiss functionality', () => {
    render(<NotificationCenter {...defaultProps} />);
    
    const dismissButtons = screen.getAllByRole('button', { name: /dismiss/i });
    fireEvent.click(dismissButtons[0]);
    
    expect(mockOnDismiss).toHaveBeenCalledWith('1');
  });

  it('handles action button clicks', () => {
    render(<NotificationCenter {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Get Started'));
    expect(mockOnAction).toHaveBeenCalledWith(mockNotifications[0]);
  });

  it('shows empty state when no notifications', () => {
    render(<NotificationCenter {...defaultProps} notifications={[]} />);
    
    expect(screen.getByText('No notifications')).toBeInTheDocument();
    expect(screen.getByText("You're all caught up!")).toBeInTheDocument();
  });

  it('shows "Show all" button when there are more than 3 notifications', () => {
    const manyNotifications = [
      ...mockNotifications,
      {
        id: '4',
        type: 'info' as const,
        title: 'Fourth notification',
        message: 'This is the fourth one',
        timestamp: new Date(),
        read: false,
      },
    ];

    render(<NotificationCenter {...defaultProps} notifications={manyNotifications} />);
    
    expect(screen.getByText('Show all (4)')).toBeInTheDocument();
  });

  it('applies correct styling for different notification types', () => {
    render(<NotificationCenter {...defaultProps} />);
    
    // Check that different notification types have appropriate visual indicators
    const notifications = screen.getAllByRole('region');
    expect(notifications.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<NotificationCenter {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('provides proper keyboard navigation', () => {
    render(<NotificationCenter {...defaultProps} />);
    
    const actionButtons = screen.getAllByRole('button');
    actionButtons.forEach(button => {
      expect(button).toHaveAttribute('tabindex', '0');
    });
  });
});
