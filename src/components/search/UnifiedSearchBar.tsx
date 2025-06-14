
import React from 'react';
import { EnhancedUnifiedSearchBar } from './EnhancedUnifiedSearchBar';

interface UnifiedSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
  showVoiceSearch?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const UnifiedSearchBar: React.FC<UnifiedSearchBarProps> = (props) => {
  return <EnhancedUnifiedSearchBar {...props} />;
};
