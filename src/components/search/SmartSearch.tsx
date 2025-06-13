
import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, Clock, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useDebounce } from '@/hooks/useDebounce';

interface SmartSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
}

interface SearchFilters {
  contentTypes: string[];
  tags: string[];
  dateRange: string;
  isSemanticSearch: boolean;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ 
  onSearch, 
  placeholder = "Search your knowledge..." 
}) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    contentTypes: [],
    tags: [],
    dateRange: 'all',
    isSemanticSearch: false
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery || filters.contentTypes.length > 0) {
      onSearch(debouncedQuery, filters);
    }
  }, [debouncedQuery, filters, onSearch]);

  const searchSuggestions = [
    { text: "AI articles from last month", icon: Sparkles },
    { text: "Development tutorials", icon: Tag },
    { text: "Recent bookmarks", icon: Clock }
  ];

  const contentTypes = [
    { id: 'article', label: 'Articles' },
    { id: 'video', label: 'Videos' },
    { id: 'document', label: 'Documents' },
    { id: 'bookmark', label: 'Bookmarks' }
  ];

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="pl-10 pr-12 h-12 text-base"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Button
            variant={filters.isSemanticSearch ? "default" : "ghost"}
            size="sm"
            onClick={() => handleFilterChange('isSemanticSearch', !filters.isSemanticSearch)}
            className="h-8"
          >
            <Sparkles className="h-3 w-3" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8">
                <Filter className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Content Types</h4>
                  <div className="space-y-2">
                    {contentTypes.map(type => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={filters.contentTypes.includes(type.id)}
                          onCheckedChange={(checked) => {
                            const newTypes = checked
                              ? [...filters.contentTypes, type.id]
                              : filters.contentTypes.filter(t => t !== type.id);
                            handleFilterChange('contentTypes', newTypes);
                          }}
                        />
                        <label htmlFor={type.id} className="text-sm">{type.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && query.length === 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg">
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground mb-2">Quick searches</div>
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion.text)}
                className="w-full text-left p-2 rounded hover:bg-muted flex items-center gap-2 text-sm"
              >
                <suggestion.icon className="h-3 w-3 text-muted-foreground" />
                {suggestion.text}
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Active Filters */}
      {(filters.contentTypes.length > 0 || filters.isSemanticSearch) && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.isSemanticSearch && (
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI Search
            </Badge>
          )}
          {filters.contentTypes.map(type => (
            <Badge key={type} variant="outline">
              {contentTypes.find(t => t.id === type)?.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
