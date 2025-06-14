
import React from 'react';
import { Clock, Search, TrendingUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SearchSuggestion } from '@/hooks/useSearchAutocomplete';

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  selectedIndex: number;
  onSuggestionClick: (query: string) => void;
  onSuggestionHover: (index: number) => void;
  onClearRecentSearches: () => void;
  className?: string;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  selectedIndex,
  onSuggestionClick,
  onSuggestionHover,
  onClearRecentSearches,
  className
}) => {
  if (suggestions.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'recent':
        return Clock;
      case 'popular':
        return TrendingUp;
      default:
        return Search;
    }
  };

  const hasRecentSearches = suggestions.some(s => s.type === 'recent');

  return (
    <div className={cn(
      "absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-lg shadow-lg max-h-80 overflow-y-auto",
      className
    )}>
      <div className="p-2">
        {hasRecentSearches && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">Recent searches</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearRecentSearches}
              className="h-6 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        )}
        
        <div className="space-y-1">
          {suggestions.map((suggestion, index) => {
            const Icon = getIcon(suggestion.type);
            return (
              <button
                key={suggestion.id}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors",
                  "hover:bg-muted focus:bg-muted focus:outline-none",
                  selectedIndex === index && "bg-muted"
                )}
                onClick={() => onSuggestionClick(suggestion.query)}
                onMouseEnter={() => onSuggestionHover(index)}
              >
                <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="flex-1 truncate">{suggestion.query}</span>
                {suggestion.type === 'popular' && (
                  <span className="text-xs text-muted-foreground">Popular</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
