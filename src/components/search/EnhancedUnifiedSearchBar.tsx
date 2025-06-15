
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Mic, 
  Filter, 
  Sparkles, 
  Clock, 
  TrendingUp,
  X,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchAutocomplete } from '@/hooks/useSearchAutocomplete';

interface EnhancedUnifiedSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
  showVoiceSearch?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'hero' | 'minimal';
  showTips?: boolean;
}

export const EnhancedUnifiedSearchBar: React.FC<EnhancedUnifiedSearchBarProps> = ({
  placeholder = "Search your knowledge... Try 'React tutorials' or 'articles from last week'",
  onSearch,
  searchQuery = '',
  onSearchChange,
  className,
  showVoiceSearch = true,
  size = 'md',
  variant = 'default',
  showTips = true
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { generateSuggestions, addRecentSearch } = useSearchAutocomplete();

  const suggestions = generateSuggestions(localQuery);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    onSearchChange?.(value);
    setShowSuggestions(value.length > 0);
  }, [onSearchChange]);

  const handleSearch = useCallback((query?: string) => {
    const searchTerm = query || localQuery;
    if (searchTerm.trim()) {
      addRecentSearch(searchTerm);
      onSearch?.(searchTerm);
      setShowSuggestions(false);
    }
  }, [localQuery, onSearch, addRecentSearch]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setLocalQuery(suggestion);
    handleSearch(suggestion);
    setShowSuggestions(false);
  }, [handleSearch]);

  const handleVoiceSearch = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) return;
    
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setLocalQuery(transcript);
      handleSearch(transcript);
    };

    recognition.start();
  }, [handleSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  }, [handleSearch]);

  const sizeClasses = {
    sm: 'h-9 text-sm',
    md: 'h-11 text-base',
    lg: 'h-14 text-lg'
  };

  const searchTips = [
    'Try "React tutorials from this month"',
    'Search "videos about machine learning"',
    'Find "articles tagged with productivity"'
  ];

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(localQuery.length > 0)}
          className={cn(
            'pl-10 pr-24',
            sizeClasses[size],
            variant === 'hero' && 'border-2 border-primary/20 bg-background/80 backdrop-blur-sm',
            variant === 'minimal' && 'border-none bg-muted/50'
          )}
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          {showVoiceSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceSearch}
              className={cn(
                'h-8 w-8 p-0',
                isListening && 'text-red-500 animate-pulse'
              )}
              disabled={isListening}
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="h-8 w-8 p-0"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
          <CardContent className="p-2">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.query)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md cursor-pointer"
              >
                {suggestion.type === 'recent' && <Clock className="h-4 w-4 text-muted-foreground" />}
                {suggestion.type === 'popular' && <TrendingUp className="h-4 w-4 text-muted-foreground" />}
                {suggestion.type === 'suggestion' && <Sparkles className="h-4 w-4 text-muted-foreground" />}
                
                <span className="flex-1">{suggestion.query}</span>
                
                <Badge variant="outline" className="text-xs">
                  {suggestion.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => setActiveFilters(prev => prev.filter(f => f !== filter))}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Search Tips */}
      {showTips && !localQuery && variant === 'hero' && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">Try these smart searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {searchTips.map((tip, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(tip.replace(/"/g, ''))}
                className="text-xs"
              >
                {tip}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
