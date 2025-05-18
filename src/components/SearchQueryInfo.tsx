
import React from 'react';

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
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-2">
        {isSemanticSearch ? 'Results for: ' : 'Search results for: '}
        <span className="text-primary">"{searchQuery}"</span>
      </h2>
      <p className="text-muted-foreground">
        Found {resultsCount} {resultsCount === 1 ? 'item' : 'items'}
      </p>
    </div>
  );
};

export default SearchQueryInfo;
