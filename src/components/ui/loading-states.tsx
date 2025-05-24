
import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className,
  text 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
};

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  variant = 'rectangular' 
}) => {
  const variantClasses = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded'
  };

  return (
    <div
      className={cn(
        "animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted",
        variantClasses[variant],
        className
      )}
    />
  );
};

interface ContentSkeletonProps {
  count?: number;
  showImage?: boolean;
}

export const ContentSkeleton: React.FC<ContentSkeletonProps> = ({ 
  count = 3, 
  showImage = true 
}) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border rounded-lg p-6 space-y-4">
          <div className="flex gap-4">
            {showImage && (
              <Skeleton className="w-20 h-20 flex-shrink-0" variant="rectangular" />
            )}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" variant="text" />
              <Skeleton className="h-4 w-1/2" variant="text" />
              <div className="flex gap-2 mt-3">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  showLabel = true,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out rounded-full",
            variantClasses[variant]
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

interface ProcessingIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const ProcessingIndicator: React.FC<ProcessingIndicatorProps> = ({
  steps,
  currentStep,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-center">
        <Sparkles className="h-8 w-8 text-primary mx-auto mb-2 animate-pulse" />
        <h3 className="font-semibold text-lg">Processing your content...</h3>
        <p className="text-sm text-muted-foreground">This will only take a moment</p>
      </div>
      
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
              index < currentStep 
                ? "bg-green-500 text-white" 
                : index === currentStep 
                ? "bg-primary text-primary-foreground animate-pulse" 
                : "bg-muted text-muted-foreground"
            )}>
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className={cn(
              "text-sm transition-colors duration-300",
              index <= currentStep ? "text-foreground" : "text-muted-foreground"
            )}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
