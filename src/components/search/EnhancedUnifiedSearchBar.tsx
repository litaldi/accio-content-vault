
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSearchAutocomplete } from '@/hooks/useSearchAutocomplete';
import { voiceSearchService } from '@/services/voiceSearchService';
import { SearchSuggestions } from './SearchSuggestions';
import { VoiceSearchButton } from './VoiceSearchButton';
import { SearchKeyboardShortcut } from './SearchKeyboardShortcut';
import { VoiceSearchFeedback } from './VoiceSearchFeedback';

interface EnhancedUnifiedSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
  showVoiceSearch?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'hero' | 'minimal';
}

export const EnhancedUnifiedSearchBar: React.FC<EnhancedUnifiedSearchBarProps> = ({
  placeholder = "Search your knowledge...",
  onSearch,
  searchQuery: externalQuery,
  onSearchChange,
  className,
  showVoiceSearch = true,
  size = 'md',
  variant = 'default'
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const query = externalQuery !== undefined ? externalQuery : internalQuery;
  const setQuery = onSearchChange || setInternalQuery;
  
  const { addRecentSearch, generateSuggestions, clearRecentSearches } = useSearchAutocomplete();
  const suggestions = generateSuggestions(query);

  const sizeClasses = {
    sm: 'h-9 text-sm px-3',
    md: 'h-12 text-base px-4', 
    lg: 'h-14 text-lg px-6'
  };

  const variantClasses = {
    default: 'bg-background border-border/60 hover:border-primary/40 focus-within:border-primary',
    hero: 'bg-background/95 backdrop-blur-sm border-border/30 shadow-lg hover:shadow-xl focus-within:shadow-xl transition-all duration-300',
    minimal: 'bg-muted/30 border-transparent hover:bg-background focus-within:bg-background'
  };

  // Keyboard shortcuts
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
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      <div className={cn(
        "relative group transition-all duration-200 rounded-xl border",
        variantClasses[variant],
        isFocused && "ring-2 ring-primary/20 ring-offset-2",
        isListening && "ring-2 ring-red-500/30 ring-offset-2"
      )}>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">
          <Search className={cn(
            "transition-colors duration-200",
            size === 'sm' && "h-4 w-4",
            size === 'md' && "h-5 w-5",
            size === 'lg' && "h-6 w-6",
            isFocused && "text-primary"
          )} />
        </div>

        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(suggestions.length > 0);
          }}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200",
            size === 'sm' && "pl-10 pr-20 h-9",
            size === 'md' && "pl-12 pr-24 h-12",
            size === 'lg' && "pl-14 pr-28 h-14",
            sizeClasses[size]
          )}
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className={cn(
                "h-6 w-6 p-0 hover:bg-muted/80 transition-colors duration-200",
                size === 'lg' && "h-8 w-8"
              )}
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </Button>
          )}

          {showVoiceSearch && voiceSearchService.isSupported() && (
            <VoiceSearchButton
              isListening={isListening}
              onVoiceSearch={handleVoiceSearch}
              size={size}
            />
          )}

          <SearchKeyboardShortcut size={size} />
        </div>

        {/* AI Suggestions Indicator */}
        {variant === 'hero' && (
          <div className="absolute -top-1 -right-1">
            <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
              <Sparkles className="h-3 w-3" />
              AI
            </div>
          </div>
        )}
      </div>

      {/* Search Suggestions */}
      {isOpen && suggestions.length > 0 && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <SearchSuggestions
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            onSuggestionClick={(suggestion) => handleSearch(suggestion.query)}
            onClearRecentSearches={clearRecentSearches}
            className="z-50 mt-2"
          />
        </>
      )}

      {/* Voice Search Feedback */}
      <VoiceSearchFeedback isVisible={isListening} />
    </div>
  );
};
