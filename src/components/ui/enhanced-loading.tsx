
import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'dots' | 'pulse' | 'sparkle';
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
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  if (variant === 'dots') {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-primary rounded-full animate-pulse",
              size === 'sm' && "h-1 w-1",
              size === 'md' && "h-1.5 w-1.5",
              size === 'lg' && "h-2 w-2",
              size === 'xl' && "h-3 w-3"
            )}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: '0.8s'
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn(
        "bg-primary rounded-full animate-pulse",
        sizeClasses[size],
        className
      )} />
    );
  }

  if (variant === 'sparkle') {
    return (
      <Sparkles className={cn(
        "animate-spin text-primary",
        sizeClasses[size],
        className
      )} />
    );
  }

  return (
    <Loader2 className={cn(
      "animate-spin text-primary",
      sizeClasses[size],
      className
    )} />
  );
};

interface LoadingStateProps {
  title?: string;
  description?: string;
  progress?: number;
  variant?: 'default' | 'card' | 'overlay';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = "Loading...",
  description,
  progress,
  variant = 'default',
  className
}) => {
  const baseClasses = "flex flex-col items-center justify-center gap-4 p-8";
  
  const variantClasses = {
    default: "",
    card: "bg-card border rounded-lg shadow-sm",
    overlay: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
  };

  return (
    <div className={cn(
      baseClasses,
      variantClasses[variant],
      className
    )}>
      <LoadingSpinner size="lg" variant="sparkle" />
      
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-muted-foreground max-w-md">{description}</p>
        )}
      </div>
      
      {typeof progress === 'number' && (
        <div className="w-full max-w-xs space-y-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
          <p className="text-xs text-center text-muted-foreground">
            {Math.round(progress)}% complete
          </p>
        </div>
      )}
    </div>
  );
};

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'avatar';
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  animation = 'pulse'
}) => {
  const baseClasses = "bg-muted";
  
  const variantClasses = {
    text: "h-4 w-full rounded",
    rectangular: "rounded-md",
    circular: "rounded-full",
    avatar: "h-10 w-10 rounded-full"
  };
  
  const animationClasses = {
    pulse: "animate-pulse",
    wave: "loading-pulse",
    none: ""
  };

  return (
    <div className={cn(
      baseClasses,
      variantClasses[variant],
      animationClasses[animation],
      className
    )} />
  );
};

// Preset skeleton layouts
export const ContentSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => (
  <div className="space-y-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton variant="avatar" />
          <div className="space-y-2 flex-1">
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
        </div>
        <Skeleton className="h-32 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
      </div>
    ))}
  </div>
);
