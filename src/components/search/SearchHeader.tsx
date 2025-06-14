
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, SortAsc, Grid3X3, List } from 'lucide-react';

interface SearchHeaderProps {
  totalResults: number;
  query: string;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onFiltersClick?: () => void;
  onSortClick?: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  totalResults,
  query,
  viewMode,
  onViewModeChange,
  onFiltersClick,
  onSortClick
}) => {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold">
            Search Results
            {query && (
              <span className="text-muted-foreground font-normal">
                {' '}for "{query}"
              </span>
            )}
          </h2>
          <p className="text-sm text-muted-foreground">
            {totalResults.toLocaleString()} result{totalResults !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onFiltersClick}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onSortClick}
          className="gap-2"
        >
          <SortAsc className="h-4 w-4" />
          Sort
        </Button>

        <div className="flex border rounded-lg">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="rounded-r-none"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
