
import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, Tag, X, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'tag' | 'history' | 'suggestion';
  count?: number;
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
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mock suggestions - in real app, these would come from your API
  const suggestions: SearchSuggestion[] = [
    { id: '1', text: 'javascript', type: 'tag', count: 15 },
    { id: '2', text: 'react tutorial', type: 'history' },
    { id: '3', text: 'programming', type: 'tag', count: 23 },
    { id: '4', text: 'ai machine learning', type: 'history' },
    { id: '5', text: 'web development', type: 'suggestion' },
  ];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  );

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(query);
    }
  }, [query, onSearchChange]);

  const handleSearch = (searchTerm: string = query) => {
    if (!searchTerm.trim()) {
      toast({
        title: "Search query empty",
        description: "Please enter a search term",
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
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Voice search active",
          description: "Listening... Speak your search query",
        });
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSearch(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice search failed",
          description: "Please try typing your search instead",
          variant: "destructive",
        });
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      toast({
        title: "Voice search not supported",
        description: "Your browser doesn't support voice search",
        variant: "destructive",
      });
    }
  };

  const clearQuery = () => {
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
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
            className="pl-10 pr-20 border-0 shadow-none focus-visible:ring-0"
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
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`h-6 w-6 p-0 ${isListening ? 'text-red-500' : ''}`}
              onClick={handleVoiceSearch}
              title="Voice search"
            >
              <Mic className={`h-3 w-3 ${isListening ? 'animate-pulse' : ''}`} />
            </Button>
            
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
              filteredSuggestions.map((suggestion) => (
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
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedSearchBar;
