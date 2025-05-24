
import React from 'react';
import { Clock, TrendingUp, Search as SearchIcon, Tag, Sparkles } from 'lucide-react';
import { ImprovedCard, ImprovedCardContent } from '@/components/ui/improved-card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchSidebarProps {
  recentSearches: Array<{ query: string; results: number }>;
  tagSuggestions: Array<{ name: string; frequency: number; trending: boolean }>;
  onSearchClick: (query: string) => void;
  onTagClick: (tag: string) => void;
}

export const SearchSidebar: React.FC<SearchSidebarProps> = ({
  recentSearches,
  tagSuggestions,
  onSearchClick,
  onTagClick
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Recent Searches */}
      <ImprovedCard hover className="bg-background/80 backdrop-blur-sm">
        <ImprovedCardContent padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold text-lg">Recent Searches</h3>
          </div>
          <nav aria-label="Recent searches">
            <div className="space-y-3">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => onSearchClick(search.query)}
                  className={cn(
                    "flex items-center justify-between w-full p-3 rounded-lg",
                    "hover:bg-accent transition-colors text-left group",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  )}
                  aria-label={`Search for ${search.query}, ${search.results} results`}
                >
                  <div className="flex items-center gap-3">
                    <SearchIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                    <span className="font-medium">{search.query}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {search.results} results
                  </Badge>
                </button>
              ))}
            </div>
          </nav>
        </ImprovedCardContent>
      </ImprovedCard>

      {/* Tag Suggestions */}
      <ImprovedCard hover className="bg-background/80 backdrop-blur-sm">
        <ImprovedCardContent padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold text-lg">Popular Tags</h3>
          </div>
          <nav aria-label="Popular tags">
            <div className="space-y-3">
              {tagSuggestions.map((suggestion) => (
                <button
                  key={suggestion.name}
                  onClick={() => onTagClick(suggestion.name)}
                  className={cn(
                    "flex items-center justify-between w-full p-3 rounded-lg",
                    "hover:bg-accent transition-colors text-left group",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  )}
                  aria-label={`Filter by ${suggestion.name} tag, ${suggestion.frequency} items${suggestion.trending ? ', trending' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Tag className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                    <span className="font-medium">{suggestion.name}</span>
                    {suggestion.trending && (
                      <Sparkles className="h-3 w-3 text-primary" aria-label="Trending tag" />
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {suggestion.frequency} items
                  </Badge>
                </button>
              ))}
            </div>
          </nav>
        </ImprovedCardContent>
      </ImprovedCard>
    </div>
  );
};
