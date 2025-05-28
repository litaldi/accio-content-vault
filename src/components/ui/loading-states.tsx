
import React from 'react';
import { Loader2, FileText, Search, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin text-primary',
        sizeClasses[size],
        className
      )} 
      aria-hidden="true"
    />
  );
};

interface ContentLoadingProps {
  type: 'search' | 'content' | 'collections';
  message?: string;
}

export const ContentLoading: React.FC<ContentLoadingProps> = ({ 
  type, 
  message 
}) => {
  const config = {
    search: {
      icon: Search,
      defaultMessage: 'Searching your knowledge base...'
    },
    content: {
      icon: FileText,
      defaultMessage: 'Loading your content...'
    },
    collections: {
      icon: Folder,
      defaultMessage: 'Loading collections...'
    }
  };

  const { icon: Icon, defaultMessage } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <Icon className="h-8 w-8 text-muted-foreground" />
        <LoadingSpinner size="sm" className="absolute -top-1 -right-1" />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">
        {message || defaultMessage}
      </p>
    </div>
  );
};

export const SkeletonCard: React.FC = () => (
  <div className="p-4 border rounded-lg space-y-3 animate-pulse">
    <div className="h-4 bg-muted rounded w-3/4"></div>
    <div className="h-3 bg-muted rounded w-1/2"></div>
    <div className="flex space-x-2">
      <div className="h-5 bg-muted rounded-full w-16"></div>
      <div className="h-5 bg-muted rounded-full w-12"></div>
    </div>
  </div>
);
