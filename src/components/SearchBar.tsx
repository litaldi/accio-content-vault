
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { toast } = useToast();

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
    
    onSearch(searchQuery);
    
    // Track search for analytics
    console.log('Search query:', searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto animate-fade-in">
      <div className="flex w-full items-center space-x-2">
        <div className={`relative flex-grow transition-all duration-200 ${isFocused ? 'shadow-sm ring-2 ring-primary/20 rounded-md' : ''}`}>
          <Search className={`absolute left-2.5 top-2.5 h-4 w-4 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
          <Input
            type="text"
            placeholder="Search by tag or keyword..."
            className="w-full pl-9 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
        <Button 
          type="submit" 
          className="btn-with-icon interactive"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
