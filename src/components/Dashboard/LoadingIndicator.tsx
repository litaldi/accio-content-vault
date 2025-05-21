
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-12">
      <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" aria-hidden="true" />
      <p className="text-muted-foreground">Searching content...</p>
    </div>
  );
};

export default LoadingIndicator;
