
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/__tests__/utils/test-utils';
import SaveContent from '@/components/SaveContent';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('@/contexts/AuthContext');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Save Content End-to-End Flow', () => {
  const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com',
    created_at: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: mockUser,
      session: { access_token: 'mock-token' } as any,
      signIn: jest.fn(),
      signOut: jest.fn(),
      signUp: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
      isLoading: false,
      isConfigured: true,
    });
  });

  it('completes full save content workflow', async () => {
    const mockOnSaveContent = jest.fn();
    render(<SaveContent onSaveContent={mockOnSaveContent} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://example.com/article' },
    });

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Article' },
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'This is a test article description' },
    });

    // Add tags
    const tagInput = screen.getByLabelText(/tags/i);
    fireEvent.change(tagInput, { target: { value: 'react' } });
    fireEvent.keyDown(tagInput, { key: 'Enter' });

    fireEvent.change(tagInput, { target: { value: 'testing' } });
    fireEvent.click(screen.getByRole('button', { name: /\+/ }));

    // Verify tags were added
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /save content/i }));

    // Should show loading state
    expect(screen.getByText('Saving...')).toBeInTheDocument();

    // Wait for completion
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    expect(mockOnSaveContent).toHaveBeenCalledWith(
      'https://example.com/article',
      expect.arrayContaining([
        expect.objectContaining({ name: 'react' }),
        expect.objectContaining({ name: 'testing' }),
      ])
    );
  });

  it('handles validation errors properly', async () => {
    render(<SaveContent />);

    // Try to submit without required fields
    fireEvent.click(screen.getByRole('button', { name: /save content/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid url/i)).toBeInTheDocument();
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });

    // Should not navigate on validation error
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('handles tag management correctly', () => {
    render(<SaveContent />);

    const tagInput = screen.getByLabelText(/tags/i);
    
    // Add a tag
    fireEvent.change(tagInput, { target: { value: 'javascript' } });
    fireEvent.keyDown(tagInput, { key: 'Enter' });

    expect(screen.getByText('javascript')).toBeInTheDocument();

    // Remove the tag
    fireEvent.click(screen.getByLabelText(/remove javascript tag/i));
    expect(screen.queryByText('javascript')).not.toBeInTheDocument();
  });

  it('prevents duplicate tags', () => {
    render(<SaveContent />);

    const tagInput = screen.getByLabelText(/tags/i);
    
    // Add same tag twice
    fireEvent.change(tagInput, { target: { value: 'duplicate' } });
    fireEvent.keyDown(tagInput, { key: 'Enter' });
    
    fireEvent.change(tagInput, { target: { value: 'duplicate' } });
    fireEvent.keyDown(tagInput, { key: 'Enter' });

    // Should only appear once
    const duplicateTags = screen.getAllByText('duplicate');
    expect(duplicateTags).toHaveLength(1);
  });

  it('handles unauthenticated user appropriately', async () => {
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
      isConfigured: true,
    });

    render(<SaveContent />);

    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://example.com' },
    });

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save content/i }));

    await waitFor(() => {
      // Should show authentication error
      expect(screen.getByText(/authentication required/i)).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('supports keyboard navigation', () => {
    render(<SaveContent />);

    const urlInput = screen.getByLabelText(/url/i);
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const tagInput = screen.getByLabelText(/tags/i);
    const submitButton = screen.getByRole('button', { name: /save content/i });

    // Test tab order
    urlInput.focus();
    expect(document.activeElement).toBe(urlInput);

    // All inputs should be focusable
    [titleInput, descriptionInput, tagInput, submitButton].forEach(element => {
      element.focus();
      expect(document.activeElement).toBe(element);
    });
  });
});
