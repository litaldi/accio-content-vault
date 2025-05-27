
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

// Enhanced Loading States
export const LoadingStates = {
  Spinner: ({ size = 'default', className, ...props }: 
    { size?: 'sm' | 'default' | 'lg' } & React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <Loader2 
        className={cn(
          "animate-spin text-primary",
          size === 'sm' && "h-4 w-4",
          size === 'default' && "h-6 w-6",
          size === 'lg' && "h-8 w-8"
        )} 
      />
    </div>
  ),
  
  Skeleton: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={cn(
        "animate-pulse rounded-md bg-muted/50",
        className
      )} 
      {...props}
    />
  ),
  
  Pulse: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={cn(
        "animate-pulse",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  ),
};

// Enhanced Status Messages
export const StatusMessage = ({ 
  type, 
  title, 
  message, 
  className, 
  onDismiss,
  ...props 
}: {
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  onDismiss?: () => void
} & React.HTMLAttributes<HTMLDivElement>) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };
  
  const styles = {
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400",
  };
  
  const Icon = icons[type];
  
  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border",
        styles[type],
        className
      )}
      role="alert"
      {...props}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="text-sm">{message}</div>
      </div>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity"
          aria-label="Dismiss message"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// Enhanced Progress Indicators
export const ProgressIndicator = ({ 
  steps, 
  currentStep, 
  className,
  ...props 
}: {
  steps: string[]
  currentStep: number
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("w-full", className)} {...props}>
    <div className="flex justify-between mb-4">
      {steps.map((step, index) => (
        <div 
          key={index}
          className={cn(
            "flex items-center",
            index < steps.length - 1 && "flex-1"
          )}
        >
          <div 
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
              index <= currentStep 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          <span 
            className={cn(
              "ml-2 text-sm font-medium transition-colors",
              index <= currentStep ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div 
              className={cn(
                "flex-1 h-0.5 mx-4 transition-colors",
                index < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

// Enhanced Empty States
export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className,
  ...props 
}: {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn(
      "flex flex-col items-center justify-center text-center py-12 px-6",
      className
    )}
    {...props}
  >
    {Icon && (
      <div className="mb-4 p-3 bg-muted rounded-full">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
    )}
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
    {action}
  </div>
);
