
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Mic, 
  MicOff, 
  Filter, 
  X,
  Clock,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedUnifiedSearchBarProps {
  variant?: 'default' | 'hero' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showVoiceSearch?: boolean;
  className?: string;
}

export const EnhancedUnifiedSearchBar: React.FC<EnhancedUnifiedSearchBarProps> = ({
  variant = 'default',
  size = 'md',
  placeholder = 'Search your knowledge...',
  onSearch,
  searchQuery = '',
  onSearchChange,
  showVoiceSearch = false,
  className
}) => {
  const [query, setQuery] = useState(searchQuery);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock suggestions - in real app, these would come from API
  const suggestions = [
    { type: 'recent', text: 'React patterns', icon: Clock },
    { type: 'recent', text: 'TypeScript interfaces', icon: Clock },
    { type: 'trending', text: 'AI development', icon: TrendingUp },
    { type: 'smart', text: 'Show me articles about performance', icon: Sparkles },
  ];

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-9 text-sm';
      case 'lg': return 'h-14 text-lg';
      default: return 'h-11 text-base';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'hero': 
        return 'border-2 border-primary/20 bg-background/80 backdrop-blur-sm shadow-lg';
      case 'minimal': 
        return 'border-0 bg-muted/50';
      default: 
        return 'border border-border';
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    onSearchChange?.(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSearch = (searchTerm?: string) => {
    const term = searchTerm || query;
    if (term.trim()) {
      onSearch?.(term);
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSearch(transcript);
      };

      recognition.start();
    }
  };

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className={cn('relative w-full max-w-2xl mx-auto', className)}>
      <div className={cn(
        'relative flex items-center',
        getSizeClasses(),
        getVariantClasses(),
        'rounded-lg transition-all duration-200',
        isFocused && variant === 'hero' && 'ring-2 ring-primary/30 border-primary/40',
        isFocused && variant === 'default' && 'ring-2 ring-ring'
      )}>
        <Search className={cn(
          'absolute left-3 text-muted-foreground transition-colors',
          size === 'lg' ? 'h-5 w-5' : 'h-4 w-4',
          isFocused && 'text-primary'
        )} />
        
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(query.length > 0);
          }}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
            if (e.key === 'Escape') {
              setShowSuggestions(false);
              inputRef.current?.blur();
            }
          }}
          className={cn(
            'border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0',
            size === 'lg' ? 'pl-12 pr-20 text-lg' : 'pl-10 pr-16',
            getSizeClasses()
          )}
        />

        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => {
                setQuery('');
                onSearchChange?.('');
                setShowSuggestions(false);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          
          {showVoiceSearch && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'h-8 w-8 p-0',
                isListening && 'text-red-500 animate-pulse'
              )}
              onClick={startVoiceSearch}
              disabled={isListening}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => console.log('Open filters')}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
              Suggestions
            </div>
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1">{suggestion.text}</span>
                  <Badge variant="outline" className="text-xs">
                    {suggestion.type}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
