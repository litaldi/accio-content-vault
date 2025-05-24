
import { renderHook, act } from '@testing-library/react';
import { useArchiveService } from '@/services/archiveService';
import { useToast } from '@/hooks/use-toast';

// Mock useToast
jest.mock('@/hooks/use-toast');

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;

describe('useArchiveService', () => {
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToast.mockReturnValue({ 
      toast: mockToast,
      dismiss: jest.fn(),
      toasts: []
    });
    
    // Clear localStorage
    localStorage.clear();
  });

  it('should toggle archive status', async () => {
    const { result } = renderHook(() => useArchiveService());

    expect(result.current.isArchived('content-1')).toBe(false);

    await act(async () => {
      await result.current.toggleArchive('content-1');
    });

    expect(result.current.isArchived('content-1')).toBe(true);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Archived",
      description: "Content moved to archive",
    });

    await act(async () => {
      await result.current.toggleArchive('content-1');
    });

    expect(result.current.isArchived('content-1')).toBe(false);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Restored from archive",
      description: "Content is now visible in your library",
    });
  });

  it('should persist archived items to localStorage', async () => {
    const { result } = renderHook(() => useArchiveService());

    await act(async () => {
      await result.current.toggleArchive('content-1');
      await result.current.toggleArchive('content-2');
    });

    const archived = result.current.getArchived();
    expect(archived).toContain('content-1');
    expect(archived).toContain('content-2');

    const storedArchived = JSON.parse(localStorage.getItem('archived') || '[]');
    expect(storedArchived).toContain('content-1');
    expect(storedArchived).toContain('content-2');
  });

  it('should return correct archived status', async () => {
    const { result } = renderHook(() => useArchiveService());

    await act(async () => {
      await result.current.toggleArchive('content-1');
    });

    expect(result.current.isArchived('content-1')).toBe(true);
    expect(result.current.isArchived('content-2')).toBe(false);
  });

  it('should return all archived items', async () => {
    const { result } = renderHook(() => useArchiveService());

    await act(async () => {
      await result.current.toggleArchive('content-1');
      await result.current.toggleArchive('content-2');
      await result.current.toggleArchive('content-3');
    });

    const archived = result.current.getArchived();
    expect(archived).toHaveLength(3);
    expect(archived).toEqual(expect.arrayContaining(['content-1', 'content-2', 'content-3']));
  });
});
