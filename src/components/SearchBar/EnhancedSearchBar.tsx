
import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, Tag, X, Sparkles, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { VoiceSearchButton } from '@/components/VoiceSearch/VoiceSearchButton';
import { VoiceSearchIndicator } from '@/components/VoiceSearch/VoiceSearchIndicator';
import { useVoiceSearch } from '@/hooks/useVoiceSearch';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'tag' | 'history' | 'suggestion' | 'ai-suggestion';
  count?: number;
  aiGenerated?: boolean;
}

interface EnhancedSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
  onSearch,
  placeholder = "Search by tag or keyword...",
  searchQuery = "",
  onSearchChange,
}) => {
  const [query, setQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<SearchSuggestion[]>([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Voice search integration
  const { isListening, transcript, isSupported } = useVoiceSearch({
    onTranscript: (text, isFinal) => {
      setQuery(text);
      if (isFinal && text.trim()) {
        handleSearch(text.trim());
      }
    },
    minConfidence: 0.6,
  });

  // Mock suggestions - in real app, these would come from your API
  const baseSuggestions: SearchSuggestion[] = [
    { id: '1', text: 'javascript', type: 'tag', count: 15 },
    { id: '2', text: 'react tutorial', type: 'history' },
    { id: '3', text: 'programming', type: 'tag', count: 23 },
    { id: '4', text: 'ai machine learning', type: 'history' },
    { id: '5', text: 'web development', type: 'suggestion' },
  ];

  // Generate AI-powered search suggestions
  const generateAISuggestions = async (searchTerm: string) => {
    if (searchTerm.length < 3) return;
    
    setIsGeneratingAI(true);
    try {
      // Simulate AI suggestion generation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const aiSugs: SearchSuggestion[] = [
        { id: 'ai-1', text: `${searchTerm} best practices`, type: 'ai-suggestion', aiGenerated: true },
        { id: 'ai-2', text: `${searchTerm} tutorial for beginners`, type: 'ai-suggestion', aiGenerated: true },
        { id: 'ai-3', text: `advanced ${searchTerm} techniques`, type: 'ai-suggestion', aiGenerated: true },
        { id: 'ai-4', text: `${searchTerm} vs alternatives`, type: 'ai-suggestion', aiGenerated: true },
      ];
      
      setAiSuggestions(aiSugs);
    } catch (error) {
      console.error('Failed to generate AI suggestions:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const allSuggestions = [...baseSuggestions, ...aiSuggestions];
  const filteredSuggestions = allSuggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  );

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(query);
    }
  }, [query, onSearchChange]);

  useEffect(() => {
    setQuery(transcript);
  }, [transcript]);

  useEffect(() => {
    if (query.length >= 3 && isFocused) {
      generateAISuggestions(query);
    } else {
      setAiSuggestions([]);
    }
  }, [query, isFocused]);

  const handleSearch = (searchTerm: string = query) => {
    if (!searchTerm.trim()) {
      toast({
        title: "Search query empty",
        description: "Please enter a search term or use voice search",
        variant: "destructive",
      });
      return;
    }
    
    onSearch(searchTerm);
    setShowSuggestions(false);
    
    // Save to search history
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [searchTerm, ...history.filter((h: string) => h !== searchTerm)].slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
    
    if (suggestion.aiGenerated) {
      toast({
        title: "AI Suggestion Used",
        description: "Searching with AI-generated query suggestion",
      });
    }
  };

  const clearQuery = () => {
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto space-y-2">
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <div className={`relative flex items-center transition-all duration-200 ${
          isFocused ? 'shadow-lg ring-2 ring-primary/20' : 'shadow-md'
        } rounded-lg bg-background border`}>
          <Search className={`absolute left-3 h-4 w-4 transition-colors duration-200 ${
            isFocused ? 'text-primary' : 'text-muted-foreground'
          }`} />
          
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className="pl-10 pr-32 border-0 shadow-none focus-visible:ring-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              // Delay hiding suggestions to allow clicks
              setTimeout(() => setShowSuggestions(false), 200);
            }}
          />
          
          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={clearQuery}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            
            {isSupported && (
              <VoiceSearchButton
                onTranscript={(text, isFinal) => {
                  setQuery(text);
                  if (isFinal && text.trim()) {
                    handleSearch(text.trim());
                  }
                }}
                size="sm"
              />
            )}
            
            <Button 
              type="submit" 
              size="sm"
              className="h-6 px-2"
            >
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Voice Search Indicator */}
      {isSupported && (isListening || transcript) && (
        <VoiceSearchIndicator
          isListening={isListening}
          transcript={transcript}
        />
      )}

      {/* Search Suggestions */}
      {showSuggestions && (filteredSuggestions.length > 0 || query.length === 0) && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg border">
          <CardContent className="p-2">
            {query.length === 0 ? (
              <>
                <div className="text-xs font-medium text-muted-foreground mb-2 px-2">Recent searches</div>
                {JSON.parse(localStorage.getItem('searchHistory') || '[]').slice(0, 3).map((historyItem: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted rounded cursor-pointer transition-colors"
                    onClick={() => handleSuggestionClick({ id: `history-${index}`, text: historyItem, type: 'history' })}
                  >
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{historyItem}</span>
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* Regular suggestions */}
                {filteredSuggestions.filter(s => !s.aiGenerated).map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted rounded cursor-pointer transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.type === 'tag' && <Tag className="h-3 w-3 text-primary" />}
                    {suggestion.type === 'history' && <Clock className="h-3 w-3 text-muted-foreground" />}
                    {suggestion.type === 'suggestion' && <Search className="h-3 w-3 text-muted-foreground" />}
                    
                    <span className="text-sm flex-1">{suggestion.text}</span>
                    
                    {suggestion.count && (
                      <Badge variant="outline" className="text-xs">
                        {suggestion.count}
                      </Badge>
                    )}
                  </div>
                ))}
                
                {/* AI Suggestions */}
                {filteredSuggestions.filter(s => s.aiGenerated).length > 0 && (
                  <>
                    <div className="border-t my-1" />
                    <div className="text-xs font-medium text-muted-foreground mb-2 px-2 flex items-center gap-1">
                      <Brain className="h-3 w-3 text-primary" />
                      AI Suggestions
                    </div>
                    {filteredSuggestions.filter(s => s.aiGenerated).map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted rounded cursor-pointer transition-colors"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-sm flex-1">{suggestion.text}</span>
                        <Badge variant="secondary" className="text-xs">
                          AI
                        </Badge>
                      </div>
                    ))}
                  </>
                )}
                
                {/* Loading AI suggestions */}
                {isGeneratingAI && (
                  <>
                    <div className="border-t my-1" />
                    <div className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground">
                      <Brain className="h-3 w-3 animate-pulse" />
                      <span className="text-xs">Generating AI suggestions...</span>
                    </div>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedSearchBar;
