
import React from 'react';
import { UnifiedSearchBar } from './UnifiedSearchBar';

interface OmniSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export const OmniSearchBar: React.FC<OmniSearchBarProps> = (props) => {
  return <UnifiedSearchBar {...props} />;
};
