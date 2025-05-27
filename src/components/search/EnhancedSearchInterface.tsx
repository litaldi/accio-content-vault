
import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Brain, 
  Sparkles, 
  Clock,
  TrendingUp,
  Lightbulb,
  Filter,
  X
} from 'lucide-react';
import { enhancedSearchService } from '@/services/enhancedSearchService';
import { SavedContent } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface SearchSuggestion {
  text: string;
  type: 'smart' | 'recent' | 'trending' | 'personal';
  category?: string;
}

interface EnhancedSearchInterfaceProps {
  content: SavedContent[];
  onResults: (results: any[]) => void;
  onQueryChange?: (query: string) => void;
  className?: string;
}

export const EnhancedSearchInterface: React.FC<EnhancedSearchInterfaceProps> = ({
  content,
  onResults,
  onQueryChange,
  className
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [queryAnalysis, setQueryAnalysis] = useState<any>(null);
  const { toast } = useToast();

  // Generate smart suggestions based on user content
  useEffect(() => {
    const smartSuggestions = enhancedSearchService.generateSmartSuggestions(content);
    const formattedSuggestions: SearchSuggestion[] = smartSuggestions.map((suggestion, index) => ({
      text: suggestion,
      type: index < 4 ? 'smart' : 'personal',
      category: suggestion.includes('recent') ? 'Recent' : 
               suggestion.includes('week') || suggestion.includes('month') ? 'Time-based' :
               'Topic-based'
    }));
    setSuggestions(formattedSuggestions);
  }, [content]);

  // Analyze query as user types
  useEffect(() => {
    if (query.length > 3) {
      const analysis = enhancedSearchService.analyzeQuery(query);
      setQueryAnalysis(analysis);
    } else {
      setQueryAnalysis(null);
    }
  }, [query]);

  const handleSearch = useCallback(async (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a search query or question",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    try {
      const results = await enhancedSearchService.performSearch(finalQuery, content);
      onResults(results);
      onQueryChange?.(finalQuery);
      
      toast({
        title: "Search complete!",
        description: `Found ${results.length} relevant results`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "Please try again with a different query",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
      setShowSuggestions(false);
    }
  }, [query, content, onResults, onQueryChange, toast]);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  const clearQuery = () => {
    setQuery('');
    setQueryAnalysis(null);
    setShowSuggestions(false);
  };

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'smart': return <Brain className="h-3 w-3 text-purple-600" />;
      case 'recent': return <Clock className="h-3 w-3 text-blue-600" />;
      case 'trending': return <TrendingUp className="h-3 w-3 text-green-600" />;
      default: return <Lightbulb className="h-3 w-3 text-yellow-600" />;
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Search
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Smart
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Search Input */}
          <div className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ask me anything... 'What did I save about React last week?' or 'Show me productivity articles'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 pr-10"
                />
                {query && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearQuery}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <Button
                onClick={() => handleSearch()}
                disabled={!query.trim() || isSearching}
                className="gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Query Analysis Display */}
          {queryAnalysis && (
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Filter className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Detected:</span>
              </div>
              <Badge variant="outline">{queryAnalysis.intent}</Badge>
              {queryAnalysis.timeframe && (
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {queryAnalysis.timeframe}
                </Badge>
              )}
              {queryAnalysis.contentType && (
                <Badge variant="outline">{queryAnalysis.contentType}</Badge>
              )}
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                {Math.round(queryAnalysis.confidence * 100)}% confidence
              </Badge>
            </div>
          )}

          {/* Smart Suggestions */}
          {(showSuggestions || !query) && suggestions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Smart suggestions:</span>
              </div>
              <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                {suggestions.slice(0, 6).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-3 text-left hover:bg-accent"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {getSuggestionIcon(suggestion.type)}
                      <span className="flex-1 text-sm">{suggestion.text}</span>
                      {suggestion.category && (
                        <Badge variant="secondary" className="text-xs">
                          {suggestion.category}
                        </Badge>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Search Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-2 flex items-center gap-1">
              <Brain className="h-4 w-4 text-blue-600" />
              AI Search Tips:
            </h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Ask questions: "What did I save about machine learning?"</li>
              <li>• Use time filters: "Show me articles from last week"</li>
              <li>• Specify content type: "Find programming videos I saved"</li>
              <li>• Natural language: "Help me find productivity tips"</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
