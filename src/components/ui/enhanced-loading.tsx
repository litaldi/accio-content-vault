
import React from 'react';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedLoadingProps {
  state: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  state,
  message,
  size = 'md',
  className,
  children
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (state === 'idle') {
    return <>{children}</>;
  }

  const getIcon = () => {
    switch (state) {
      case 'loading':
        return <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />;
      case 'success':
        return <CheckCircle className={cn('text-green-500', sizeClasses[size])} />;
      case 'error':
        return <AlertCircle className={cn('text-destructive', sizeClasses[size])} />;
      default:
        return null;
    }
  };

  const getDefaultMessage = () => {
    switch (state) {
      case 'loading':
        return 'Loading...';
      case 'success':
        return 'Success!';
      case 'error':
        return 'Something went wrong';
      default:
        return '';
    }
  };

  return (
    <div 
      className={cn(
        'flex items-center justify-center gap-3 p-4',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={message || getDefaultMessage()}
    >
      {getIcon()}
      <span className={cn('font-medium', textSizeClasses[size])}>
        {message || getDefaultMessage()}
      </span>
    </div>
  );
};
