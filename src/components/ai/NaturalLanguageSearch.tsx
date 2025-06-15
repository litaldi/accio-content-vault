import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, Lightbulb } from 'lucide-react';
import { SavedContent } from '@/types';
import { naturalLanguageService } from '@/services/naturalLanguageService';

interface NaturalLanguageSearchProps {
  allContent: SavedContent[];
  onSearch: (results: SavedContent[]) => void;
  className?: string;
}

export const NaturalLanguageSearch: React.FC<NaturalLanguageSearchProps> = ({
  allContent,
  onSearch,
  className
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [lastResults, setLastResults] = useState<any[]>([]);

  const suggestedQueries = naturalLanguageService.generateSuggestedQueries(allContent);

  const handleNaturalSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const results = naturalLanguageService.semanticSearch(query, allContent);
      setLastResults(results);
      onSearch(results.map(r => r.content));
    } catch (error) {
      console.error('Natural language search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestedQuery = (suggestedQuery: string) => {
    setQuery(suggestedQuery);
    // Auto-execute the search
    setTimeout(() => {
      handleNaturalSearch();
    }, 100);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Ask AI About Your Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="What do you want to know? e.g., 'Show me recent learning materials'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleNaturalSearch()}
            className="flex-1"
          />
          <Button 
            onClick={handleNaturalSearch}
            disabled={isSearching || !query.trim()}
            className="gap-2"
          >
            {isSearching ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Thinking...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Ask
              </>
            )}
          </Button>
        </div>

        {/* Suggested Queries */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lightbulb className="h-4 w-4" />
            Try asking:
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.slice(0, 4).map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestedQuery(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        {lastResults.length > 0 && (
          <div className="pt-3 border-t">
            <h4 className="text-sm font-medium mb-2">
              Found {lastResults.length} relevant items
            </h4>
            <div className="space-y-2">
              {lastResults.slice(0, 3).map((result, index) => (
                <div key={index} className="text-sm p-2 bg-muted/30 rounded">
                  <div className="font-medium">{result.content.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {result.matchReason} • {Math.round(result.relevanceScore)}% match
                  </div>
                </div>
              ))}
              {lastResults.length > 3 && (
                <div className="text-xs text-muted-foreground">
                  +{lastResults.length - 3} more results
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
