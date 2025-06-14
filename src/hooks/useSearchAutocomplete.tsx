
import { useState, useCallback } from 'react';

interface SearchSuggestion {
  id: string;
  query: string;
  type: 'recent' | 'trending' | 'smart';
  description?: string;
}

export const useSearchAutocomplete = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    
    setRecentSearches(prev => {
      const newSearches = [query, ...prev.filter(s => s !== query)].slice(0, 5);
      try {
        localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      } catch {
        // Handle localStorage errors silently
      }
      return newSearches;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('recentSearches');
    } catch {
      // Handle localStorage errors silently
    }
  }, []);

  const generateSuggestions = useCallback((query: string): SearchSuggestion[] => {
    const suggestions: SearchSuggestion[] = [];
    
    // Add recent searches that match the query
    recentSearches
      .filter(search => 
        query === '' || search.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 3)
      .forEach(search => {
        suggestions.push({
          id: `recent-${search}`,
          query: search,
          type: 'recent'
        });
      });

    // Add smart suggestions based on common patterns
    if (query.length > 0) {
      const smartSuggestions = [
        `${query} from this week`,
        `${query} articles`,
        `${query} notes`,
        `recent ${query}`,
      ].filter(suggestion => 
        suggestion.toLowerCase() !== query.toLowerCase()
      ).slice(0, 2);

      smartSuggestions.forEach(suggestion => {
        suggestions.push({
          id: `smart-${suggestion}`,
          query: suggestion,
          type: 'smart'
        });
      });
    }

    // Add trending suggestions when query is empty
    if (query === '' && suggestions.length < 5) {
      const trendingSuggestions = [
        'What did I save today?',
        'Show me recent articles',
        'Find programming resources',
        'Learning materials'
      ];

      trendingSuggestions.slice(0, 5 - suggestions.length).forEach(suggestion => {
        suggestions.push({
          id: `trending-${suggestion}`,
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
