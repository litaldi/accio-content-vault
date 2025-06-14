import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, ArrowRight, Command, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSearchAutocomplete } from '@/hooks/useSearchAutocomplete';

interface SearchAutocompleteProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  placeholder = "Search your knowledge...",
  onSearch,
  searchQuery: externalQuery,
  onSearchChange,
  className
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  
  // Use external query if provided, otherwise use internal state
  const query = externalQuery !== undefined ? externalQuery : internalQuery;
  const setQuery = onSearchChange || setInternalQuery;
  
  const { addRecentSearch, generateSuggestions, clearRecentSearches } = useSearchAutocomplete();
  const suggestions = generateSuggestions(query);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global keyboard shortcut: Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length > 0 || suggestions.length > 0);
    setSelectedIndex(-1);
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    addRecentSearch(searchQuery);
    
    // Clear query if using internal state
    if (externalQuery === undefined) {
      setQuery('');
    }
    
    setIsOpen(false);
    setSelectedIndex(-1);
    onSearch?.(searchQuery);
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
          className="pl-10 pr-20"
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
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" />
            K
          </kbd>
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-full left-0 right-0 z-20 mt-1 max-h-64 overflow-hidden shadow-lg">
            <ul ref={listRef} className="py-2">
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
              
              {/* Clear recent searches option */}
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
