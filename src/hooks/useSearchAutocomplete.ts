
import { useState, useCallback, useMemo } from 'react';

interface SearchSuggestion {
  id: string;
  query: string;
  type: 'recent' | 'suggestion' | 'popular';
}

interface UseSearchAutocompleteReturn {
  addRecentSearch: (query: string) => void;
  generateSuggestions: (query: string) => SearchSuggestion[];
  clearRecentSearches: () => void;
  getPopularSearches: () => string[];
}

const RECENT_SEARCHES_KEY = 'accio_recent_searches';
const MAX_RECENT_SEARCHES = 5;

export const useSearchAutocomplete = (): UseSearchAutocompleteReturn => {
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    
    const trimmedQuery = query.trim();
    setRecentSearches(prev => {
      const filtered = prev.filter(search => search !== trimmedQuery);
      const updated = [trimmedQuery, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {
        // Silently handle localStorage errors
      }
      
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // Silently handle localStorage errors
    }
  }, []);

  const getPopularSearches = useCallback(() => [
    'productivity tips',
    'react tutorial', 
    'javascript best practices',
    'design patterns',
    'ai tools'
  ], []);

  const generateSuggestions = useMemo(() => (query: string): SearchSuggestion[] => {
    const suggestions: SearchSuggestion[] = [];
    const lowerQuery = query.toLowerCase();

    // Add recent searches that match
    recentSearches
      .filter(search => search.toLowerCase().includes(lowerQuery))
      .forEach((search, index) => {
        suggestions.push({
          id: `recent-${index}`,
          query: search,
          type: 'recent'
        });
      });

    // Add popular searches that match
    if (query.length >= 2) {
      getPopularSearches()
        .filter(search => 
          search.toLowerCase().includes(lowerQuery) && 
          !suggestions.some(s => s.query === search)
        )
        .forEach((search, index) => {
          suggestions.push({
            id: `popular-${index}`,
            query: search,
            type: 'popular'
          });
        });
    }

    return suggestions.slice(0, 8);
  }, [recentSearches, getPopularSearches]);

  return {
    addRecentSearch,
    generateSuggestions,
    clearRecentSearches,
    getPopularSearches
  };
};
