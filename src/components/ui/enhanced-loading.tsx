
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedLoadingProps {
  state: 'loading' | 'idle' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  state,
  size = 'md',
  className
}) => {
  if (state !== 'loading') return null;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin',
        sizeClasses[size],
        className
      )} 
    />
  );
};
