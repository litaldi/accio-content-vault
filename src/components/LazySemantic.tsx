
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load SemanticSearchBar component
const SemanticSearchBar = React.lazy(() => 
  import('./SemanticSearchBar')
);

interface LazySemanticProps {
  onSearch: (query: string, isSemanticSearch: boolean) => void;
}

/**
 * Lazy-loaded wrapper for SemanticSearchBar component
 * Only loads the more complex semantic search component when needed
 */
const LazySemantic: React.FC<LazySemanticProps> = ({ onSearch }) => {
  return (
    <Suspense fallback={
      <div className="w-full max-w-xl mx-auto animate-pulse">
        <div className="h-10 bg-muted rounded-md mb-3"></div>
        <div className="flex justify-between">
          <div className="h-5 w-36 bg-muted rounded-md"></div>
          <div className="h-9 w-24 bg-muted rounded-md"></div>
        </div>
      </div>
    }>
      <SemanticSearchBar onSearch={onSearch} />
    </Suspense>
  );
};

export default LazySemantic;
