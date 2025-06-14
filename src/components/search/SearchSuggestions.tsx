
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchSuggestion {
  id: string;
  query: string;
  type: 'recent' | 'suggestion' | 'popular';
}

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  selectedIndex: number;
  onSuggestionClick: (query: string) => void;
  onSuggestionHover: (index: number) => void;
  onClearRecentSearches: () => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  selectedIndex,
  onSuggestionClick,
  onSuggestionHover,
  onClearRecentSearches
}) => {
  const hasRecentSearches = suggestions.some(s => s.type === 'recent');

  return (
    <Card className="absolute top-full left-0 right-0 z-20 mt-1 max-h-64 overflow-hidden shadow-lg bg-background">
      <ul className="py-2">
        {suggestions.map((suggestion, index) => (
          <li key={suggestion.id}>
            <button
              className={cn(
                "w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-muted transition-colors",
                selectedIndex === index && "bg-muted"
              )}
              onClick={() => onSuggestionClick(suggestion.query)}
              onMouseEnter={() => onSuggestionHover(index)}
            >
              {suggestion.type === 'recent' ? (
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
              <span className="flex-1 truncate">{suggestion.query}</span>
              <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </li>
        ))}
        
        {hasRecentSearches && (
          <>
            <hr className="my-2" />
            <li>
              <button
                className="w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-muted transition-colors"
                onClick={onClearRecentSearches}
              >
                Clear recent searches
              </button>
            </li>
          </>
        )}
      </ul>
    </Card>
  );
};
