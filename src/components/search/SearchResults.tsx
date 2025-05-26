
import React from 'react';
import { Content } from '@/types';
import { OptimizedCard } from '@/components/ui/optimized-card';

interface SearchResultsProps {
  results: Content[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return <p>Loading search results...</p>;
  }

  if (!results || results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <OptimizedCard key={result.id} interactive>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{result.title}</h3>
            <p className="text-sm text-muted-foreground">{result.description}</p>
            <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Read more
            </a>
          </div>
        </OptimizedCard>
      ))}
    </div>
  );
};

export default SearchResults;
