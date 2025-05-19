
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SearchQueryInfoProps {
  searchQuery: string;
  isSemanticSearch: boolean;
  resultsCount: number;
}

const SearchQueryInfo: React.FC<SearchQueryInfoProps> = ({ 
  searchQuery, 
  isSemanticSearch,
  resultsCount
}) => {
  if (!searchQuery) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All saved content</h2>
        <p className="text-muted-foreground">
          {resultsCount} {resultsCount === 1 ? 'item' : 'items'} in your collection
        </p>
      </div>
    );
  }
  
  return (
    <div className="mb-6" aria-live="polite">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h2 className="text-xl font-semibold">Search results</h2>
        <Badge variant={isSemanticSearch ? "default" : "outline"}>
          {isSemanticSearch ? 'Semantic' : 'Basic'} Search
        </Badge>
      </div>
      
      <p className="text-muted-foreground">
        Found {resultsCount} {resultsCount === 1 ? 'result' : 'results'} for{' '}
        <span className="font-medium text-foreground">"{searchQuery}"</span>
      </p>
    </div>
  );
};

export default SearchQueryInfo;
