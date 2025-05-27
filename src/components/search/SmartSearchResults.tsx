
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Calendar,
  Tag,
  Brain,
  Star,
  Clock,
  FileText
} from 'lucide-react';
import { SavedContent } from '@/types';

interface SearchResult {
  content: SavedContent;
  relevanceScore: number;
  matchReason: string;
  highlightedTitle: string;
  highlightedDescription: string;
}

interface SmartSearchResultsProps {
  results: SearchResult[];
  query: string;
  className?: string;
}

export const SmartSearchResults: React.FC<SmartSearchResultsProps> = ({
  results,
  query,
  className
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 dark:bg-green-900';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
    return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'url': return <ExternalLink className="h-4 w-4" />;
      case 'note': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  if (results.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground mb-4">
          Try rephrasing your question or using different keywords
        </p>
        <div className="text-sm text-muted-foreground">
          <p>Tips for better results:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Use specific keywords from your content</li>
            <li>Try asking a question instead of just keywords</li>
            <li>Include time periods if relevant</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </h3>
        <Badge variant="outline" className="gap-1">
          <Brain className="h-3 w-3" />
          AI-Powered
        </Badge>
      </div>

      {results.map((result, index) => (
        <Card key={result.content.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg leading-6">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: result.highlightedTitle || result.content.title 
                    }}
                  />
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={`text-xs ${getRelevanceColor(result.relevanceScore)}`}>
                    <Star className="h-3 w-3 mr-1" />
                    {Math.round(result.relevanceScore)}% match
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {getContentTypeIcon(result.content.content_type)}
                    <span className="ml-1 capitalize">{result.content.content_type}</span>
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Match reason */}
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Brain className="h-3 w-3 text-primary" />
              <span className="font-medium">Why this matches:</span>
              <span>{result.matchReason}</span>
            </div>

            {/* Description */}
            {result.content.description && (
              <div 
                className="text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{ 
                  __html: result.highlightedDescription || result.content.description 
                }}
              />
            )}

            {/* Tags */}
            {result.content.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {result.content.tags.slice(0, 5).map((tag) => (
                  <Badge key={tag.id} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag.name}
                  </Badge>
                ))}
                {result.content.tags.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{result.content.tags.length - 5} more
                  </Badge>
                )}
              </div>
            )}

            {/* Footer with date and actions */}
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Saved {formatDate(result.content.created_at)}</span>
              </div>
              
              <div className="flex gap-2">
                {result.content.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={result.content.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Open
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
