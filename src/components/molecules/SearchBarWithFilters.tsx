
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { useDebounce } from '@/utils/debounce';

interface SearchFilter {
  key: string;
  label: string;
  value: string;
}

interface SearchBarWithFiltersProps {
  onSearchChange: (query: string) => void;
  onFiltersChange: (filters: SearchFilter[]) => void;
  placeholder?: string;
  initialFilters?: SearchFilter[];
  isLoading?: boolean;
}

export const SearchBarWithFilters: React.FC<SearchBarWithFiltersProps> = ({
  onSearchChange,
  onFiltersChange,
  placeholder = "Search your knowledge...",
  initialFilters = [],
  isLoading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  
  const debouncedQuery = useDebounce(searchQuery, 300);

  React.useEffect(() => {
    onSearchChange(debouncedQuery);
  }, [debouncedQuery, onSearchChange]);

  const handleRemoveFilter = (filterToRemove: SearchFilter) => {
    const updatedFilters = activeFilters.filter(f => f.key !== filterToRemove.key);
    setActiveFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    onFiltersChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-12"
          disabled={isLoading}
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter.key} variant="secondary" className="gap-1">
              {filter.label}: {filter.value}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleRemoveFilter(filter)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAllFilters}
            className="text-xs text-muted-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
