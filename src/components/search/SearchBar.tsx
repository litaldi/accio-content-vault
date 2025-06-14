
import React from 'react';
import { EnhancedUnifiedSearchBar } from './EnhancedUnifiedSearchBar';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
  showVoiceSearch?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'hero' | 'dashboard';
  showTips?: boolean;
}

/**
 * Unified search bar component that provides consistent search functionality
 * across the entire application
 */
export const SearchBar: React.FC<SearchBarProps> = (props) => {
  return <EnhancedUnifiedSearchBar {...props} />;
};

export default SearchBar;
