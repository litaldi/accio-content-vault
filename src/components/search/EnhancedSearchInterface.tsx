
import React, { useState, useEffect, useRef } from 'react';
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
  Filter,
  X,
  ArrowRight,
  Brain,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SearchSuggestion {
  query: string;
  type: 'recent' | 'trending' | 'smart' | 'completion';
  category?: string;
  count?: number;
}

interface EnhancedSearchInterfaceProps {
  content?: any[];
  onResults?: (results: any[]) => void;
  onQueryChange?: (query: string) => void;
  className?: string;
}

export const EnhancedSearchInterface: React.FC<EnhancedSearchInterfaceProps> = ({
  content = [],
  onResults,
  onQueryChange,
  className
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Sample suggestions - in a real app, these would come from user history and AI
  const baseSuggestions: SearchSuggestion[] = [
    { query: "Show me recent programming tutorials", type: 'smart', category: 'Development' },
    { query: "Find articles about productivity tips", type: 'trending', category: 'Productivity', count: 12 },
    { query: "What did I save about AI last week?", type: 'smart', category: 'AI/ML' },
    { query: "Learning resources for React", type: 'recent', category: 'Frontend' },
    { query: "My bookmarks from yesterday", type: 'recent' },
    { query: "Articles I haven't read yet", type: 'smart', category: 'Reading List' }
  ];

  useEffect(() => {
    // Generate dynamic suggestions based on query
    if (query.length > 0) {
      const filtered = baseSuggestions.filter(s => 
        s.query.toLowerCase().includes(query.toLowerCase())
      );
      
      // Add completion suggestions
      const completions = [
        `${query} from last month`,
        `${query} with high ratings`,
        `${query} I haven't read`
      ].map(q => ({ query: q, type: 'completion' as const }));
      
      setSuggestions([...filtered, ...completions.slice(0, 2)]);
    } else {
      setSuggestions(baseSuggestions);
    }
  }, [query]);

  const handleSearch = async (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;

    setIsSearching(true);
    setShowSuggestions(false);
    
    try {
      // Simulate AI-powered search
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock intelligent search results
      const mockResults = [
        {
          id: '1',
          title: 'Understanding React Hooks',
          snippet: 'A comprehensive guide to using React hooks effectively in modern applications...',
          relevance: 95,
          type: 'article',
          tags: ['React', 'Hooks', 'JavaScript'],
          source: 'Medium',
          date: '2024-01-15',
          readTime: '8 min'
        },
        {
          id: '2', 
          title: 'JavaScript ES6 Features',
          snippet: 'Modern JavaScript features every developer should know including arrow functions...',
          relevance: 88,
          type: 'tutorial',
          tags: ['JavaScript', 'ES6', 'Programming'],
          source: 'Dev.to',
          date: '2024-01-10',
          readTime: '12 min'
        },
        {
          id: '3',
          title: 'My Learning Notes - React State',
          snippet: 'Personal notes on React state management patterns and best practices...',
          relevance: 92,
          type: 'note',
          tags: ['React', 'State Management', 'Notes'],
          source: 'Personal',
          date: '2024-01-12',
          readTime: '5 min'
        }
      ];

      onResults?.(mockResults);
      onQueryChange?.(finalQuery);
      
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

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.query);
    handleSearch(suggestion.query);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'recent': return <Clock className="h-3 w-3" />;
      case 'trending': return <TrendingUp className="h-3 w-3" />;
      case 'completion': return <ArrowRight className="h-3 w-3" />;
      default: return <Sparkles className="h-3 w-3" />;
    }
  };

  const getSuggestionStyle = (type: string) => {
    switch (type) {
      case 'recent': return 'border-blue-200 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:border-blue-800';
      case 'trending': return 'border-green-200 bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:border-green-800';
      case 'completion': return 'border-purple-200 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:border-purple-800';
      default: return 'border-orange-200 bg-orange-50 hover:bg-orange-100 dark:bg-orange-950 dark:border-orange-800';
    }
  };

  const quickFilters = [
    { id: 'articles', label: 'Articles', count: 45 },
    { id: 'notes', label: 'Notes', count: 23 },
    { id: 'videos', label: 'Videos', count: 12 },
    { id: 'recent', label: 'This Week', count: 8 },
    { id: 'unread', label: 'Unread', count: 15 }
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className={className}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Search
            <Badge variant="secondary" className="gap-1">
              <Zap className="h-3 w-3" />
              Natural Language
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
                  ref={inputRef}
                  placeholder="Ask me anything... 'Show my React tutorials from last month' or 'Find unread AI articles'"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    } else if (e.key === 'Escape') {
                      setShowSuggestions(false);
                    }
                  }}
                  className="pl-10 pr-10"
                  aria-label="Search your content with natural language"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setShowSuggestions(false);
                      inputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                onClick={() => handleSearch()}
                disabled={!query.trim() || isSearching}
                className="gap-2 min-w-[100px]"
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

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-lg shadow-lg max-h-80 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    {query ? 'Suggestions' : 'Try these searches:'}
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full text-left p-3 rounded-md transition-all duration-200 border ${getSuggestionStyle(suggestion.type)} focus:outline-none focus:ring-2 focus:ring-primary`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSuggestionClick(suggestion);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {getSuggestionIcon(suggestion.type)}
                        <span className="text-sm font-medium">{suggestion.query}</span>
                      </div>
                      {suggestion.category && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {suggestion.category}
                          </Badge>
                          {suggestion.count && (
                            <span className="text-xs text-muted-foreground">
                              {suggestion.count} items
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Filters */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Quick Filters:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilters.includes(filter.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleFilter(filter.id)}
                  className="gap-1 h-8"
                >
                  {filter.label}
                  <Badge variant="secondary" className="text-xs ml-1">
                    {filter.count}
                  </Badge>
                  {activeFilters.includes(filter.id) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Button>
              ))}
            </div>
            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilters([])}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear all filters
              </Button>
            )}
          </div>

          {/* Search Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg text-sm">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Search Tips:
            </h4>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• Use natural language: "Find my Python tutorials from last month"</li>
              <li>• Ask for specific content: "Show me bookmarks about machine learning"</li>
              <li>• Search by status: "Articles I haven't read yet" or "My recent notes"</li>
              <li>• Use time ranges: "Content saved this week" or "Old JavaScript resources"</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
