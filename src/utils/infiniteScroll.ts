
import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isLoading: boolean;
  threshold?: number;
}

export const useInfiniteScroll = (
  fetchMore: () => void,
  options: UseInfiniteScrollOptions
) => {
  const { hasNextPage, isLoading, threshold = 100 } = options;
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) {
      return;
    }
    
    const scrollPosition = window.innerHeight + window.pageYOffset;
    const documentHeight = document.documentElement.offsetHeight;
    
    if (scrollPosition >= documentHeight - threshold && hasNextPage && !isLoading) {
      setIsFetching(true);
    }
  }, [isFetching, hasNextPage, isLoading, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    
    fetchMore();
    setIsFetching(false);
  }, [isFetching, fetchMore]);

  return { isFetching };
};
