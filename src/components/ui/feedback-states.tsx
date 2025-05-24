
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  className?: string;
  action?: React.ReactNode;
}

export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({
  type,
  title,
  description,
  className,
  action
}) => {
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50 dark:bg-green-950',
      borderColor: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-600 dark:text-green-400',
      titleColor: 'text-green-800 dark:text-green-200'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50 dark:bg-red-950',
      borderColor: 'border-red-200 dark:border-red-800',
      iconColor: 'text-red-600 dark:text-red-400',
      titleColor: 'text-red-800 dark:text-red-200'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      titleColor: 'text-yellow-800 dark:text-yellow-200'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600 dark:text-blue-400',
      titleColor: 'text-blue-800 dark:text-blue-200'
    }
  };

  const { icon: Icon, bgColor, borderColor, iconColor, titleColor } = config[type];

  return (
    <div className={cn(
      "rounded-lg border p-4 animate-fade-in",
      bgColor,
      borderColor,
      className
    )}>
      <div className="flex gap-3">
        <Icon className={cn("h-5 w-5 flex-shrink-0", iconColor)} />
        <div className="flex-1">
          <h3 className={cn("font-medium text-sm", titleColor)}>
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <div className={cn(
      "text-center py-12 px-4 animate-fade-in",
      className
    )}>
      {icon && (
        <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action}
    </div>
  );
};

interface SuccessAnimationProps {
  message?: string;
  onComplete?: () => void;
  duration?: number;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  message = "Success!",
  onComplete,
  duration = 2000
}) => {
  React.useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [onComplete, duration]);

  return (
    <div className="text-center py-8 animate-bounce-in">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
        <CheckCircle className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
        {message}
      </h3>
      <div className="flex justify-center mt-4">
        <Sparkles className="h-5 w-5 text-green-500 animate-pulse" />
      </div>
    </div>
  );
};
