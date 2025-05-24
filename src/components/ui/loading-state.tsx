
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSpinner?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'md',
  className,
  showSpinner = true
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-center gap-3 p-6 text-muted-foreground",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {showSpinner && (
        <Loader2 className={cn("animate-spin", sizeClasses[size])} aria-hidden="true" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <span className="sr-only">Loading content, please wait.</span>
    </div>
  );
};
