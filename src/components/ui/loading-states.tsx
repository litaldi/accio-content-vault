
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  inline?: boolean;
}

export const LoadingSpinner: React.FC<LoadingStateProps> = ({
  className,
  size = 'md',
  text,
  inline = false
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const Component = inline ? 'span' : 'div';

  return (
    <Component 
      className={cn(
        'flex items-center justify-center',
        !inline && 'py-8',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <Loader2 
          className={cn('animate-spin text-primary', sizeClasses[size])} 
          aria-hidden="true"
        />
        {text && (
          <span className="text-sm text-muted-foreground font-medium">
            {text}
          </span>
        )}
      </div>
      <span className="sr-only">
        {text || 'Loading content, please wait'}
      </span>
    </Component>
  );
};

export const LoadingSkeleton: React.FC<{ className?: string; lines?: number }> = ({
  className,
  lines = 3
}) => (
  <div className={cn('space-y-3', className)} role="status" aria-label="Loading content">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={cn(
          'h-4 bg-muted rounded animate-pulse',
          i === lines - 1 && 'w-3/4' // Last line shorter
        )}
      />
    ))}
    <span className="sr-only">Loading content, please wait</span>
  </div>
);

export const LoadingCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 border border-border rounded-xl space-y-4', className)} role="status">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-muted rounded-full animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-muted rounded animate-pulse" />
      <div className="h-3 bg-muted rounded animate-pulse" />
      <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
    </div>
    <span className="sr-only">Loading card content</span>
  </div>
);
