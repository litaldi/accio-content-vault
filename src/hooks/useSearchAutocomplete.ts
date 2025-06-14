
import { useState, useCallback, useMemo } from 'react';

interface SearchSuggestion {
  id: string;
  query: string;
  type: 'recent' | 'popular' | 'smart';
  category?: string;
  confidence?: number;
}

const STORAGE_KEY = 'accio_recent_searches';
const MAX_RECENT_SEARCHES = 10;

// Mock popular searches and smart suggestions
const POPULAR_SEARCHES = [
  'react hooks tutorial',
  'javascript best practices',
  'ai machine learning',
  'web development trends',
  'productivity tips',
  'design patterns',
  'data visualization',
  'mobile app development'
];

export const useSearchAutocomplete = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    
    const normalizedQuery = query.trim().toLowerCase();
    setRecentSearches(prev => {
      const filtered = prev.filter(search => search.toLowerCase() !== normalizedQuery);
      const updated = [query.trim(), ...filtered].slice(0, MAX_RECENT_SEARCHES);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Handle storage errors silently
      }
      
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Handle storage errors silently
    }
  }, []);

  const generateSuggestions = useCallback((query: string): SearchSuggestion[] => {
    const suggestions: SearchSuggestion[] = [];
    const normalizedQuery = query.toLowerCase().trim();

    // Add recent searches that match
    if (normalizedQuery.length > 0) {
      recentSearches
        .filter(search => search.toLowerCase().includes(normalizedQuery))
        .slice(0, 5)
        .forEach((search, index) => {
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

    // Add popular searches that match
    if (normalizedQuery.length > 0) {
      POPULAR_SEARCHES
        .filter(search => 
          search.toLowerCase().includes(normalizedQuery) &&
          !suggestions.some(s => s.query.toLowerCase() === search.toLowerCase())
        )
        .slice(0, 3)
        .forEach((search, index) => {
          suggestions.push({
            id: `popular-${index}`,
            query: search,
            type: 'popular'
          });
        });
    }

    // Generate smart suggestions based on query patterns
    if (normalizedQuery.length >= 2) {
      const smartSuggestions = generateSmartSuggestions(normalizedQuery);
      smartSuggestions.forEach((suggestion, index) => {
        if (!suggestions.some(s => s.query.toLowerCase() === suggestion.toLowerCase())) {
          suggestions.push({
            id: `smart-${index}`,
            query: suggestion,
            type: 'smart',
            confidence: 0.8
          });
        }
      });
    }

    return suggestions.slice(0, 8);
  }, [recentSearches]);

  const generateSmartSuggestions = (query: string): string[] => {
    const suggestions: string[] = [];
    
    // Programming-related suggestions
    if (/react|vue|angular|javascript|js|typescript|ts/.test(query)) {
      suggestions.push(
        `${query} best practices`,
        `${query} tutorial`,
        `${query} examples`
      );
    }
    
    // AI/ML suggestions
    if (/ai|artificial|machine|learning|ml|neural/.test(query)) {
      suggestions.push(
        `${query} applications`,
        `${query} research`,
        `${query} implementation`
      );
    }
    
    // Design suggestions
    if (/design|ui|ux|interface/.test(query)) {
      suggestions.push(
        `${query} principles`,
        `${query} trends`,
        `${query} tools`
      );
    }
    
    // General improvements
    if (query.length >= 3) {
      suggestions.push(
        `${query} guide`,
        `${query} tips`,
        `how to ${query}`
      );
    }
    
    return suggestions.slice(0, 3);
  };

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    generateSuggestions
  };
};
