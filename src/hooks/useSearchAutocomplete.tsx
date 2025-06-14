
import { useState, useCallback } from 'react';

export interface SearchSuggestion {
  id: string;
  query: string;
  type: 'recent' | 'trending' | 'smart';
  category?: string;
}

export const useSearchAutocomplete = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('recentSearches') || '[]');
    } catch {
      return [];
    }
  });

  const addRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    
    const trimmedQuery = query.trim();
    const updated = [trimmedQuery, ...recentSearches.filter(s => s !== trimmedQuery)].slice(0, 10);
    
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  }, []);

  const generateSuggestions = useCallback((query: string): SearchSuggestion[] => {
    const suggestions: SearchSuggestion[] = [];

    // Add recent searches
    if (query) {
      const matchingRecent = recentSearches
        .filter(search => search.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3);
      
      matchingRecent.forEach((search, index) => {
        suggestions.push({
          id: `recent-${index}`,
          query: search,
          type: 'recent'
        });
      });
    } else {
      // Show recent searches when no query
      recentSearches.slice(0, 5).forEach((search, index) => {
        suggestions.push({
          id: `recent-${index}`,
          query: search,
          type: 'recent'
        });
      });
    }

    // Add trending suggestions
    const trendingSuggestions = [
      'React patterns',
      'TypeScript guide',
      'Design systems',
      'API documentation',
      'JavaScript tutorials'
    ];

    if (query) {
      const matchingTrending = trendingSuggestions
        .filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 2);
      
      matchingTrending.forEach((suggestion, index) => {
        suggestions.push({
          id: `trending-${index}`,
          query: suggestion,
          type: 'trending'
        });
      });
    }

    return suggestions;
  }, [recentSearches]);

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    generateSuggestions
  };
};
