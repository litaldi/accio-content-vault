
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Search } from 'lucide-react';

interface SearchSuggestion {
  id: string;
  query: string;
  type: 'recent' | 'trending' | 'smart';
  description?: string;
}

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  selectedIndex: number;
  onSuggestionClick: (suggestion: SearchSuggestion) => void;
  onClearRecentSearches?: () => void;
  className?: string;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  selectedIndex,
  onSuggestionClick,
  onClearRecentSearches,
  className
}) => {
  if (suggestions.length === 0) return null;

  const getIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recent':
        return <Clock className="h-3 w-3" />;
      case 'trending':
        return <TrendingUp className="h-3 w-3" />;
      default:
        return <Search className="h-3 w-3" />;
    }
  };

  const getTypeLabel = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recent':
        return 'Recent';
      case 'trending':
        return 'Trending';
      default:
        return 'Suggested';
    }
  };

  return (
    <Card className={`absolute top-full mt-1 w-full z-20 shadow-lg ${className}`}>
      <CardContent className="p-2 max-h-80 overflow-y-auto">
        <div className="space-y-1">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                index === selectedIndex
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
              onClick={() => onSuggestionClick(suggestion)}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {getIcon(suggestion.type)}
                <span className="text-sm truncate">{suggestion.query}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {getTypeLabel(suggestion.type)}
              </Badge>
            </div>
          ))}
        </div>
        
        {onClearRecentSearches && suggestions.some(s => s.type === 'recent') && (
          <div className="border-t mt-2 pt-2">
            <button
              onClick={onClearRecentSearches}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-left p-1"
            >
              Clear recent searches
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
