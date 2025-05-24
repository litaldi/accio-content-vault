
import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { ImprovedCard, ImprovedCardContent } from '@/components/ui/improved-card';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  query,
  onQueryChange,
  placeholder = "Search for 'productivity articles' or 'What did I save about React?'"
}) => {
  return (
    <ImprovedCard className="mb-8 border-0 shadow-lg bg-background/80 backdrop-blur-sm">
      <ImprovedCardContent padding="lg">
        <div className="relative">
          <SearchIcon 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="pl-12 py-6 text-base border-0 bg-background/50 focus:bg-background transition-colors shadow-inner"
            aria-label="Search your content library"
          />
          {query && (
            <EnhancedButton
              variant="ghost"
              size="sm"
              onClick={() => onQueryChange('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              aria-label="Clear search"
            >
              Clear
            </EnhancedButton>
          )}
        </div>
      </ImprovedCardContent>
    </ImprovedCard>
  );
};
