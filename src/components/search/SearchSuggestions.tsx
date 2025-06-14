
import React from 'react';
import { EnhancedSearchSuggestions } from './EnhancedSearchSuggestions';
import { SearchSuggestion } from '@/hooks/useSearchAutocomplete';

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  selectedIndex: number;
  onSuggestionClick: (suggestion: SearchSuggestion) => void;
  onClearRecentSearches?: () => void;
  className?: string;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = (props) => {
  return <EnhancedSearchSuggestions {...props} />;
};
