
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedLoadingProps {
  state: 'loading' | 'success' | 'error' | 'idle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  state,
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  if (state !== 'loading') {
    return null;
  }

  return (
    <Loader2 
      className={cn('animate-spin', sizeClasses[size], className)} 
      aria-label="Loading"
    />
  );
};
