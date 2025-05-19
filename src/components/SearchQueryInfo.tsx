
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
        {isSemanticSearch ? (
          <span>Results for: <span className="text-primary">"{searchQuery}"</span></span>
        ) : (
          <span>Search results for: <span className="text-primary">"{searchQuery}"</span></span>
        )}
      </h2>
      <p className="text-muted-foreground">
        Found {resultsCount} {resultsCount === 1 ? 'item' : 'items'}
      </p>
    </div>
  );
};

export default SearchQueryInfo;
