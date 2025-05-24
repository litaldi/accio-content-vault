
import { useState, useCallback } from 'react';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';

interface OptimisticAction<T> {
  optimisticUpdate: (data: T) => T;
  action: () => Promise<void>;
  revert?: (data: T) => T;
  successMessage?: string;
  errorMessage?: string;
}

export const useOptimisticUpdates = <T,>(initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useEnhancedToast();

  const executeOptimistic = useCallback(async ({
    optimisticUpdate,
    action,
    revert,
    successMessage = 'Action completed successfully',
    errorMessage = 'Something went wrong'
  }: OptimisticAction<T>) => {
    // Store original data for potential revert
    const originalData = data;
    
    // Apply optimistic update immediately
    setData(optimisticUpdate(data));
    setIsLoading(true);

    try {
      // Execute the actual action
      await action();
      
      // Show success feedback
      showSuccess(successMessage);
    } catch (error) {
      // Revert on error
      if (revert) {
        setData(revert(originalData));
      } else {
        setData(originalData);
      }
      
      // Show error feedback
      showError(errorMessage);
      
      console.error('Optimistic update failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [data, showSuccess, showError]);

  return {
    data,
    setData,
    isLoading,
    executeOptimistic
  };
};

// Example hook for specific use cases
export const useOptimisticLike = (initialLiked: boolean, initialCount: number) => {
  const { data, executeOptimistic, isLoading } = useOptimisticUpdates({
    liked: initialLiked,
    count: initialCount
  });

  const toggleLike = useCallback((likeAction: () => Promise<void>) => {
    executeOptimistic({
      optimisticUpdate: (current) => ({
        liked: !current.liked,
        count: current.liked ? current.count - 1 : current.count + 1
      }),
      action: likeAction,
      successMessage: data.liked ? 'Removed from favorites' : 'Added to favorites',
      errorMessage: 'Failed to update favorites'
    });
  }, [executeOptimistic, data.liked]);

  return {
    liked: data.liked,
    count: data.count,
    toggleLike,
    isLoading
  };
};
