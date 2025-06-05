
import { useState, useEffect, useMemo } from 'react';

interface SearchSuggestion {
  id: string;
  query: string;
  type: 'recent' | 'suggestion' | 'saved';
  timestamp?: number;
}

const RECENT_SEARCHES_KEY = 'accio-recent-searches';
const MAX_RECENT_SEARCHES = 10;

export const useSearchAutocomplete = () => {
  const [recentSearches, setRecentSearches] = useState<SearchSuggestion[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentSearches(parsed);
      }
    } catch (error) {
      console.warn('Failed to load recent searches:', error);
    }
  }, []);

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;

    const newSearch: SearchSuggestion = {
      id: `recent-${Date.now()}`,
      query: query.trim(),
      type: 'recent',
      timestamp: Date.now()
    };

    setRecentSearches(prev => {
      // Remove duplicate if exists
      const filtered = prev.filter(search => search.query !== query.trim());
      // Add new search at the beginning
      const updated = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      
      // Save to localStorage
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save recent searches:', error);
      }
      
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const generateSuggestions = (query: string): SearchSuggestion[] => {
    if (!query.trim()) return recentSearches;

    const queryLower = query.toLowerCase();
    
    // Filter recent searches that match
    const matchingRecent = recentSearches.filter(search =>
      search.query.toLowerCase().includes(queryLower)
    );

    // Generate smart suggestions based on query
    const smartSuggestions: SearchSuggestion[] = [];
    
    if (query.length >= 2) {
      // Content type suggestions
      const contentTypes = ['articles', 'videos', 'pdfs', 'images', 'notes'];
      contentTypes.forEach(type => {
        if (type.includes(queryLower)) {
          smartSuggestions.push({
            id: `suggestion-${type}`,
            query: `type:${type}`,
            type: 'suggestion'
          });
        }
      });

      // Common search patterns
      const patterns = [
        `"${query}"`, // Exact match
        `${query} tag:important`, // With tags
        `${query} created:today`, // Time-based
      ];

      patterns.forEach((pattern, index) => {
        if (pattern !== query) {
          smartSuggestions.push({
            id: `pattern-${index}`,
            query: pattern,
            type: 'suggestion'
          });
        }
      });
    }

    return [...matchingRecent, ...smartSuggestions].slice(0, 8);
  };

  return {
    recentSearches,
    suggestions,
    addRecentSearch,
    clearRecentSearches,
    generateSuggestions
  };
};
