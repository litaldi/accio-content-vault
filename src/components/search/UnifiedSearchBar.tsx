
import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, ArrowRight, Command, X, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSearchAutocomplete } from '@/hooks/useSearchAutocomplete';
import { voiceSearchService } from '@/services/voiceSearchService';

interface UnifiedSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
  showVoiceSearch?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const UnifiedSearchBar: React.FC<UnifiedSearchBarProps> = ({
  placeholder = "Search your knowledge...",
  onSearch,
  searchQuery: externalQuery,
  onSearchChange,
  className,
  showVoiceSearch = true,
  size = 'md'
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const query = externalQuery !== undefined ? externalQuery : internalQuery;
  const setQuery = onSearchChange || setInternalQuery;
  
  const { addRecentSearch, generateSuggestions, clearRecentSearches } = useSearchAutocomplete();
  const suggestions = generateSuggestions(query);

  const sizeClasses = {
    sm: 'h-9 text-sm',
    md: 'h-10 text-base', 
    lg: 'h-12 text-lg'
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Voice search setup
  useEffect(() => {
    if (!voiceSearchService.isSupported()) return;

    voiceSearchService.onRecognitionStart(() => setIsListening(true));
    voiceSearchService.onRecognitionEnd(() => setIsListening(false));
    voiceSearchService.onRecognitionResult((result) => {
      if (result.isFinal) {
        setQuery(result.transcript);
        handleSearch(result.transcript);
      }
    });
    voiceSearchService.onRecognitionError(() => setIsListening(false));
  }, [setQuery]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length > 0 || suggestions.length > 0);
    setSelectedIndex(-1);
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    addRecentSearch(searchQuery);
    
    if (externalQuery === undefined) {
      setQuery('');
    }
    
    setIsOpen(false);
    setSelectedIndex(-1);
    onSearch?.(searchQuery);
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      voiceSearchService.stopListening();
    } else {
      voiceSearchService.startListening({
        continuous: false,
        interimResults: true,
        language: 'en-US'
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSearch(suggestions[selectedIndex].query);
        } else {
          handleSearch(query);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(suggestions.length > 0)}
          className={cn("pl-10 pr-20", sizeClasses[size])}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          {showVoiceSearch && voiceSearchService.isSupported() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceSearch}
              className={cn(
                "h-6 w-6 p-0",
                isListening && "text-red-500 animate-pulse"
              )}
            >
              <Mic className="h-3 w-3" />
            </Button>
          )}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" />
            K
          </kbd>
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-full left-0 right-0 z-20 mt-1 max-h-64 overflow-hidden shadow-lg bg-background">
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li key={suggestion.id}>
                  <button
                    className={cn(
                      "w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-muted transition-colors",
                      selectedIndex === index && "bg-muted"
                    )}
                    onClick={() => handleSearch(suggestion.query)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {suggestion.type === 'recent' ? (
                      <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className="flex-1 truncate">{suggestion.query}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
              
              {suggestions.some(s => s.type === 'recent') && (
                <>
                  <hr className="my-2" />
                  <li>
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-muted transition-colors"
                      onClick={() => {
                        clearRecentSearches();
                        setIsOpen(false);
                      }}
                    >
                      Clear recent searches
                    </button>
                  </li>
                </>
              )}
            </ul>
          </Card>
        </>
      )}
    </div>
  );
};
