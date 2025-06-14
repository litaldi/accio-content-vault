
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url?: string;
  tags?: string[];
  created_at?: string;
  content_type?: string;
}

interface SearchResultsGridProps {
  results: SearchResult[];
  onResultClick?: (result: SearchResult) => void;
  loading?: boolean;
  className?: string;
}

export const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({
  results,
  onResultClick,
  loading = false,
  className
}) => {
  if (loading) {
    return (
      <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No results found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {results.map((result) => (
        <Card 
          key={result.id}
          className="group cursor-pointer hover:shadow-lg transition-all duration-200"
          onClick={() => onResultClick?.(result)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {result.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {result.description && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {result.description}
              </p>
            )}
            
            {result.tags && result.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {result.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="h-2 w-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {result.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{result.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {result.created_at && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(result.created_at).toLocaleDateString()}</span>
                </div>
              )}
              
              {result.url && (
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
