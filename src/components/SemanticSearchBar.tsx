
import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SemanticSearchBarProps {
  onSearch: (query: string, isSemanticSearch: boolean) => void;
  initialQuery?: string;
  autoFocus?: boolean;
}

const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({ 
  onSearch, 
  initialQuery = '', 
  autoFocus = false 
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [isSemanticSearch, setIsSemanticSearch] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search query empty",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }
    
    onSearch(searchQuery, isSemanticSearch);
    
    // Track search for analytics
    console.log('Search query:', searchQuery, 'Semantic search:', isSemanticSearch);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto animate-fade-in">
      <div className="flex flex-col w-full items-center space-y-3">
        <div className={`relative w-full transition-all duration-200 ${isFocused ? 'shadow-sm ring-2 ring-primary/20 rounded-md' : ''}`}>
          <Search className={`absolute left-2.5 top-2.5 h-4 w-4 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
          <Input
            type="text"
            placeholder={isSemanticSearch ? "Ask a question about your content..." : "Search by tag or keyword..."}
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            aria-label="Search content"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground rounded-full p-0.5 transition-colors"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          )}
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 text-sm cursor-pointer group">
              <input 
                type="checkbox"
                className="accent-primary rounded"
                checked={isSemanticSearch}
                onChange={(e) => setIsSemanticSearch(e.target.checked)}
                aria-label="Use semantic search"
              />
              <span className="group-hover:text-primary transition-colors">Use semantic search</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-muted-foreground hover:text-foreground cursor-help">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Semantic search understands the meaning of your question rather than just matching keywords.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
          </div>
          <Button 
            type="submit" 
            className="btn-with-icon interactive"
          >
            {isSemanticSearch ? (
              <Sparkles className="h-4 w-4" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span>Search</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SemanticSearchBar;
