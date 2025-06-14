
import React, { useState, useRef, useEffect } from 'react';
import { Search, Command, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSearchAutocomplete } from '@/hooks/useSearchAutocomplete';
import { voiceSearchService } from '@/services/voiceSearchService';
import { VoiceSearchButton } from './VoiceSearchButton';
import { SearchSuggestions } from './SearchSuggestions';

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
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          <VoiceSearchButton
            isListening={isListening}
            isSupported={showVoiceSearch && voiceSearchService.isSupported()}
            onClick={handleVoiceSearch}
          />
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
          <SearchSuggestions
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            onSuggestionClick={(suggestion) => handleSearch(suggestion.query)}
            onClearRecentSearches={clearRecentSearches}
            className="z-20"
          />
        </>
      )}
    </div>
  );
};
