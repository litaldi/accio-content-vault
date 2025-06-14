
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink } from 'lucide-react';

interface SearchResultItem {
  id: string;
  title: string;
  description?: string;
  url?: string;
  tags?: string[];
  created_at?: string;
}

interface SearchResultsProps {
  results: SearchResultItem[];
  onResultClick?: (result: SearchResultItem) => void;
  className?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onResultClick,
  className
}) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No results found. Try adjusting your search terms.
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        {results.map((result) => (
          <Card
            key={result.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onResultClick?.(result)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{result.title}</h3>
                  {result.description && (
                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {result.description}
                    </p>
                  )}
                  
                  {result.tags && result.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {result.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {result.created_at && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(result.created_at).toLocaleDateString()}</span>
                      </div>
                    )}
                    {result.url && (
                      <div className="flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        <span>View source</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
