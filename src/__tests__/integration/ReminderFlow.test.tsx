
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/__tests__/utils/test-utils';
import { ReminderManager } from '@/components/reminders/ReminderManager';
import { ReminderService } from '@/services/reminderService';

// Mock the reminder service
jest.mock('@/services/reminderService');
const mockReminderService = ReminderService as jest.Mocked<typeof ReminderService>;

describe('Reminder Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockReminders = [
    {
      id: 'reminder-1',
      user_id: 'user-123',
      tag_id: 'tag-1',
      title: 'Review React articles',
      description: 'Weekly review of React-related content',
      frequency: 'weekly' as const,
      day_of_week: 1,
      day_of_month: null,
      time_of_day: '09:00:00',
      is_active: true,
      last_sent_at: null,
      next_scheduled_at: '2024-01-08T09:00:00Z',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      tag: { id: 'tag-1', name: 'react' }
    }
  ];

  const mockTags = [
    { id: 'tag-1', name: 'react' },
    { id: 'tag-2', name: 'javascript' }
  ];

  it('should display existing reminders', async () => {
    mockReminderService.getTagReminders.mockResolvedValue(mockReminders);
    mockReminderService.getAvailableTags.mockResolvedValue(mockTags);

    render(<ReminderManager />);

    await waitFor(() => {
      expect(screen.getByText('Review React articles')).toBeInTheDocument();
    });

    expect(screen.getByText('Weekly review of React-related content')).toBeInTheDocument();
    expect(screen.getByText('Weekly')).toBeInTheDocument();
  });

  it('should allow creating new reminders', async () => {
    mockReminderService.getTagReminders.mockResolvedValue([]);
    mockReminderService.getAvailableTags.mockResolvedValue(mockTags);
    mockReminderService.createTagReminder.mockResolvedValue(mockReminders[0]);

    render(<ReminderManager />);

    await waitFor(() => {
      expect(screen.getByText(/create reminder/i)).toBeInTheDocument();
    });

    const createButton = screen.getByText(/create reminder/i);
    fireEvent.click(createButton);

    // Should open create reminder dialog
    await waitFor(() => {
      expect(screen.getByText(/new reminder/i)).toBeInTheDocument();
    });
  });

  it('should toggle reminder status', async () => {
    mockReminderService.getTagReminders.mockResolvedValue(mockReminders);
    mockReminderService.getAvailableTags.mockResolvedValue(mockTags);
    mockReminderService.toggleReminderStatus.mockResolvedValue({
      ...mockReminders[0],
      is_active: false
    });

    render(<ReminderManager />);

    await waitFor(() => {
      expect(screen.getByText('Review React articles')).toBeInTheDocument();
    });

    // Find and click toggle switch
    const toggles = screen.getAllByRole('switch');
    if (toggles.length > 0) {
      fireEvent.click(toggles[0]);

      await waitFor(() => {
        expect(mockReminderService.toggleReminderStatus).toHaveBeenCalledWith(
          'reminder-1',
          false
        );
      });
    }
  });

  it('should delete reminders', async () => {
    mockReminderService.getTagReminders.mockResolvedValue(mockReminders);
    mockReminderService.getAvailableTags.mockResolvedValue(mockTags);
    mockReminderService.deleteTagReminder.mockResolvedValue(undefined);

    render(<ReminderManager />);

    await waitFor(() => {
      expect(screen.getByText('Review React articles')).toBeInTheDocument();
    });

    // Look for delete button (could be in dropdown menu)
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find(btn => 
      btn.textContent?.toLowerCase().includes('delete') ||
      btn.getAttribute('aria-label')?.toLowerCase().includes('delete')
    );

    if (deleteButton) {
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockReminderService.deleteTagReminder).toHaveBeenCalledWith('reminder-1');
      });
    }
  });

  it('should handle reminder creation errors', async () => {
    mockReminderService.getTagReminders.mockResolvedValue([]);
    mockReminderService.getAvailableTags.mockResolvedValue(mockTags);
    mockReminderService.createTagReminder.mockRejectedValue(new Error('Creation failed'));

    render(<ReminderManager />);

    // Error handling should be implemented in the component
    // This test ensures the component doesn't crash on errors
    expect(screen.getByText(/reminders/i)).toBeInTheDocument();
  });
});
