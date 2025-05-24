
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/__tests__/utils/test-utils';
import SaveContent from '@/pages/SaveContent';
import { useContentSaveService } from '@/services/contentSaveService';
import { useAuth } from '@/contexts/AuthContext';

// Mock dependencies
jest.mock('@/services/contentSaveService');
jest.mock('@/contexts/AuthContext');

const mockUseContentSaveService = useContentSaveService as jest.MockedFunction<typeof useContentSaveService>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('Content Saving Integration', () => {
  const mockSaveContent = jest.fn();
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
    jest.clearAllMocks();
    
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

    mockUseContentSaveService.mockReturnValue({
      saveContent: mockSaveContent
    });
  });

  it('should save content with URL and tags', async () => {
    const savedContent = {
      id: 'content-123',
      user_id: 'user-123',
      title: 'Test Article',
      url: 'https://example.com/article',
      description: 'Test description',
      file_url: '',
      created_at: '2024-01-01T00:00:00Z',
      tags: [
        { id: 'tag-1', name: 'test', auto_generated: false, confirmed: true }
      ]
    };

    mockSaveContent.mockResolvedValue(savedContent);

    render(<SaveContent />);

    // Fill in URL
    const urlInput = screen.getByPlaceholderText(/enter url/i);
    fireEvent.change(urlInput, { target: { value: 'https://example.com/article' } });

    // Fill in title
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    fireEvent.change(titleInput, { target: { value: 'Test Article' } });

    // Fill in description
    const descriptionInput = screen.getByPlaceholderText(/enter description/i);
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });

    // Add tag
    const tagInput = screen.getByPlaceholderText(/add tags/i);
    fireEvent.change(tagInput, { target: { value: 'test' } });
    fireEvent.keyDown(tagInput, { key: 'Enter', code: 'Enter' });

    // Submit form
    const saveButton = screen.getByText(/save content/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockSaveContent).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://example.com/article',
          title: 'Test Article',
          description: 'Test description',
          content_type: 'url'
        }),
        expect.arrayContaining([
          expect.objectContaining({
            name: 'test',
            auto_generated: false
          })
        ])
      );
    });
  });

  it('should handle save errors gracefully', async () => {
    mockSaveContent.mockRejectedValue(new Error('Save failed'));

    render(<SaveContent />);

    const urlInput = screen.getByPlaceholderText(/enter url/i);
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });

    const saveButton = screen.getByText(/save content/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockSaveContent).toHaveBeenCalled();
    });

    // Error handling should be in place (toast, error message, etc.)
    // This would depend on the actual implementation
  });

  it('should require authentication', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      session: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
      signUp: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
      isLoading: false,
      isConfigured: true
    });

    render(<SaveContent />);

    // Should redirect or show login prompt when not authenticated
    // This behavior depends on the ProtectedRoute implementation
  });
});
