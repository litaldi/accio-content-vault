
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, Search, Sparkles, Trash2, ArrowRight } from 'lucide-react';
import { SearchSuggestion } from '@/hooks/useSearchAutocomplete';
import { cn } from '@/lib/utils';

interface EnhancedSearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  selectedIndex: number;
  onSuggestionClick: (suggestion: SearchSuggestion) => void;
  onClearRecentSearches?: () => void;
  className?: string;
}

export const EnhancedSearchSuggestions: React.FC<EnhancedSearchSuggestionsProps> = ({
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
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case 'trending':
        return <TrendingUp className="h-4 w-4 text-orange-500" />;
      case 'smart':
        return <Sparkles className="h-4 w-4 text-purple-500" />;
      default:
        return <Search className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTypeLabel = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recent':
        return 'Recent';
      case 'trending':
        return 'Trending';
      case 'smart':
        return 'AI Suggested';
      default:
        return 'Suggested';
    }
  };

  const getTypeBadgeVariant = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'trending':
        return 'default';
      case 'smart':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // Group suggestions by type
  const groupedSuggestions = suggestions.reduce((acc, suggestion, index) => {
    if (!acc[suggestion.type]) {
      acc[suggestion.type] = [];
    }
    acc[suggestion.type].push({ ...suggestion, originalIndex: index });
    return acc;
  }, {} as Record<string, Array<SearchSuggestion & { originalIndex: number }>>);

  return (
    <Card className={cn(
      "absolute top-full w-full z-50 shadow-xl border-border/60 bg-background/95 backdrop-blur-sm",
      className
    )}>
      <CardContent className="p-0 max-h-96 overflow-y-auto">
        <div className="divide-y divide-border/40">
          {Object.entries(groupedSuggestions).map(([type, typeSuggestions]) => (
            <div key={type} className="p-2">
              {/* Section Header */}
              <div className="flex items-center justify-between px-2 py-1 mb-1">
                <div className="flex items-center gap-2">
                  {getIcon(type as SearchSuggestion['type'])}
                  <span className="text-xs font-medium text-muted-foreground">
                    {getTypeLabel(type as SearchSuggestion['type'])}
                  </span>
                </div>
                {type === 'recent' && onClearRecentSearches && typeSuggestions.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearRecentSearches}
                    className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Suggestions */}
              <div className="space-y-1">
                {typeSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={cn(
                      "group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200",
                      "hover:bg-accent/80 active:bg-accent",
                      suggestion.originalIndex === selectedIndex && "bg-primary text-primary-foreground shadow-sm"
                    )}
                    onClick={() => onSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {getIcon(suggestion.type)}
                      <span className="text-sm truncate font-medium">
                        {suggestion.query}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Badge 
                        variant={getTypeBadgeVariant(suggestion.type)} 
                        className="text-xs"
                      >
                        {getTypeLabel(suggestion.type)}
                      </Badge>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer with Tips */}
        <div className="border-t border-border/40 p-3 bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
            <span className="font-mono">⌘K to focus</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
