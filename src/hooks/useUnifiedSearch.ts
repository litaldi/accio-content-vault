
import { useState, useCallback, useMemo } from 'react';
import { SavedContent } from '@/types';
import { searchService } from '@/services/searchService';

interface SearchFilters {
  type?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

interface UseUnifiedSearchReturn {
  query: string;
  results: SavedContent[];
  isLoading: boolean;
  filters: SearchFilters;
  totalResults: number;
  hasMore: boolean;
  setQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  search: (searchQuery?: string) => void;
  clearResults: () => void;
}

export const useUnifiedSearch = (content: SavedContent[] = []): UseUnifiedSearchReturn => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SavedContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // Update search service content when content changes
  useMemo(() => {
    searchService.setContent(content);
  }, [content]);

  const search = useCallback((searchQuery?: string) => {
    const queryToUse = searchQuery || query;
    if (!queryToUse.trim() && Object.keys(filters).length === 0) {
      setResults([]);
      setTotalResults(0);
      setHasMore(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate async search
    setTimeout(() => {
      const searchResult = searchService.search(queryToUse, filters, {
        limit: 20,
        offset: 0
      });
      
      setResults(searchResult.items);
      setTotalResults(searchResult.total);
      setHasMore(searchResult.hasMore);
      setIsLoading(false);
    }, 300);
  }, [query, filters]);

  const clearResults = useCallback(() => {
    setResults([]);
    setTotalResults(0);
    setHasMore(false);
    setQuery('');
  }, []);

  return {
    query,
    results,
    isLoading,
    filters,
    totalResults,
    hasMore,
    setQuery,
    setFilters,
    search,
    clearResults
  };
};
