
import React, { Suspense } from 'react';
import { SavedContent } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load ContentDetailView
const ContentDetailView = React.lazy(() => import('./ContentDetailView'));

interface LazyContentDetailViewProps {
  content: SavedContent;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Lazy-loaded wrapper for ContentDetailView
 * Only loads the component when it's needed (when isOpen is true)
 */
const LazyContentDetailView: React.FC<LazyContentDetailViewProps> = ({ content, isOpen, onClose }) => {
  // If the dialog isn't open, don't render anything
  if (!isOpen) return null;

  return (
    <Suspense 
      fallback={
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="space-y-4 w-full max-w-[500px]">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      }
    >
      <ContentDetailView content={content} isOpen={isOpen} onClose={onClose} />
    </Suspense>
  );
};

export default LazyContentDetailView;
