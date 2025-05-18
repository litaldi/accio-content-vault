
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SemanticSearchBarProps {
  onSearch: (query: string, isSemanticSearch: boolean) => void;
}

const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSemanticSearch, setIsSemanticSearch] = useState<boolean>(true);
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
    
    onSearch(searchQuery, isSemanticSearch);
    
    // Track search for analytics
    console.log('Search query:', searchQuery, 'Semantic search:', isSemanticSearch);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
      <div className="flex flex-col w-full items-center space-y-2">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={isSemanticSearch ? "Ask a question about your content..." : "Search by tag or keyword..."}
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex items-center space-x-2">
            <label className="text-sm cursor-pointer">
              <input 
                type="checkbox"
                className="mr-1"
                checked={isSemanticSearch}
                onChange={(e) => setIsSemanticSearch(e.target.checked)}
              />
              Use semantic search
            </label>
          </div>
          <Button type="submit">Search</Button>
        </div>
      </div>
    </form>
  );
};

export default SemanticSearchBar;
