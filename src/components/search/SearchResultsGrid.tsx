
import React from 'react';
import { SavedContent } from '@/types';
import { EnhancedCard, EnhancedCardContent, EnhancedCardDescription, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SearchResultsGridProps {
  results: SavedContent[];
  isLoading: boolean;
  query: string;
  onItemClick?: (item: SavedContent) => void;
}

export const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({
  results,
  isLoading,
  query,
  onItemClick
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <EnhancedCard key={i} className="animate-pulse">
            <EnhancedCardHeader>
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-full" />
            </EnhancedCardHeader>
            <EnhancedCardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        ))}
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No results found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((item) => (
          <EnhancedCard 
            key={item.id}
            variant="interactive"
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => onItemClick?.(item)}
          >
            <EnhancedCardHeader>
              <EnhancedCardTitle className="text-base line-clamp-2">
                {item.title}
              </EnhancedCardTitle>
              {item.description && (
                <EnhancedCardDescription className="line-clamp-3">
                  {item.description}
                </EnhancedCardDescription>
              )}
            </EnhancedCardHeader>
            
            <EnhancedCardContent className="space-y-3">
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge 
                      key={tag.id} 
                      variant="secondary" 
                      className="text-xs"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                  </span>
                </div>
                
                {item.url && (
                  <div className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    <span className="truncate max-w-20">
                      {new URL(item.url).hostname}
                    </span>
                  </div>
                )}
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        ))}
      </div>
    </div>
  );
};
