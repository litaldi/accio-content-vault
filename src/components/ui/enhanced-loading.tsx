
import React from 'react';
import { Loader2, Brain, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'brand' | 'minimal';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  variant = 'default',
  className 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  if (variant === 'brand') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Brain className={cn(sizeClasses[size], 'animate-pulse text-primary')} />
        <Sparkles className={cn(sizeClasses[size], 'animate-spin text-purple-500')} />
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('flex justify-center', className)}>
        <div className={cn(
          'border-2 border-muted rounded-full border-t-primary animate-spin',
          sizeClasses[size]
        )} />
      </div>
    );
  }

  return (
    <Loader2 className={cn(sizeClasses[size], 'animate-spin', className)} />
  );
};

interface LoadingStateProps {
  message?: string;
  submessage?: string;
  variant?: 'default' | 'brand' | 'minimal';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  submessage,
  variant = 'default',
  className
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <LoadingSpinner size="lg" variant={variant} className="mb-4" />
      <p className="text-lg font-medium text-foreground">{message}</p>
      {submessage && (
        <p className="text-sm text-muted-foreground mt-1">{submessage}</p>
      )}
    </div>
  );
};

interface SkeletonProps {
  className?: string;
  lines?: number;
  variant?: 'text' | 'avatar' | 'card';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className,
  lines = 1,
  variant = 'text'
}) => {
  if (variant === 'avatar') {
    return (
      <div className={cn('w-12 h-12 bg-muted rounded-full animate-pulse', className)} />
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        <div className="h-20 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className="h-4 bg-muted rounded animate-pulse"
          style={{ 
            width: i === lines - 1 ? '75%' : '100%' 
          }}
        />
      ))}
    </div>
  );
};
