
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Sparkles, 
  Mic,
  Clock,
  TrendingUp,
  BookOpen,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SearchSuggestion {
  query: string;
  type: 'recent' | 'trending' | 'smart';
  category: string;
}

interface NaturalLanguageSearchBarProps {
  onSearch?: (query: string, results: any[]) => void;
  className?: string;
}

export const NaturalLanguageSearchBar: React.FC<NaturalLanguageSearchBarProps> = ({
  onSearch,
  className
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([
    { query: "Show me recent programming tutorials", type: 'smart', category: 'Development' },
    { query: "Find articles about productivity tips", type: 'trending', category: 'Productivity' },
    { query: "What did I save about AI last week?", type: 'smart', category: 'AI/ML' },
    { query: "Learning resources for React", type: 'recent', category: 'Frontend' }
  ]);
  const { toast } = useToast();

  const handleSearch = async (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;

    setIsSearching(true);
    try {
      // Simulate AI-powered search processing
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Generate mock search results based on query
      const mockResults = [
        {
          id: '1',
          title: 'Understanding React Hooks',
          snippet: 'A comprehensive guide to using React hooks effectively...',
          relevance: 95,
          type: 'article'
        },
        {
          id: '2', 
          title: 'JavaScript ES6 Features',
          snippet: 'Modern JavaScript features every developer should know...',
          relevance: 88,
          type: 'tutorial'
        }
      ];

      onSearch?.(finalQuery, mockResults);
      
      toast({
        title: "Search Complete!",
        description: `Found ${mockResults.length} relevant results for "${finalQuery}"`,
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Please try again with a different query.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'recent': return <Clock className="h-3 w-3" />;
      case 'trending': return <TrendingUp className="h-3 w-3" />;
      default: return <Sparkles className="h-3 w-3" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'recent': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'trending': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Natural Language Search
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Ask me anything... 'Show me recent articles about React' or 'Find my saved AI tutorials'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pr-10"
                />
                <Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                    <Sparkles className="h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Search Suggestions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Try asking:</h4>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-3 text-left"
                  onClick={() => handleSearch(suggestion.query)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex items-center gap-2 flex-1">
                      {getSuggestionIcon(suggestion.type)}
                      <span className="text-sm">{suggestion.query}</span>
                    </div>
                    <Badge className={getSuggestionColor(suggestion.type)}>
                      {suggestion.category}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🔍 Search Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Use natural language: "Find my Python tutorials from last month"</li>
              <li>• Ask for specific content: "Show me bookmark about machine learning"</li>
              <li>• Search by topic: "What do I have on productivity and time management?"</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
