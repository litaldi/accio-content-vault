
import React from 'react';
import { Loader2, AlertCircle, CheckCircle, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StateDisplayProps {
  type: 'loading' | 'error' | 'success' | 'empty';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const StateDisplay: React.FC<StateDisplayProps> = ({
  type,
  title,
  description,
  action,
  icon,
  className,
  size = 'md'
}) => {
  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'loading':
        return <Loader2 className="h-10 w-10 animate-spin text-primary" />;
      case 'error':
        return <AlertCircle className="h-10 w-10 text-destructive" />;
      case 'success':
        return <CheckCircle className="h-10 w-10 text-green-500" />;
      case 'empty':
        return <SearchX className="h-10 w-10 text-muted-foreground" />;
    }
  };

  const sizes = {
    sm: {
      padding: 'p-4',
      gap: 'gap-2',
      titleSize: 'text-lg',
      descSize: 'text-sm'
    },
    md: {
      padding: 'p-6',
      gap: 'gap-3',
      titleSize: 'text-xl',
      descSize: 'text-base'
    },
    lg: {
      padding: 'p-8',
      gap: 'gap-4',
      titleSize: 'text-2xl',
      descSize: 'text-lg'
    }
  };

  return (
    <div 
      role={type === 'error' ? 'alert' : 'status'}
      aria-busy={type === 'loading'}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        sizes[size].padding,
        sizes[size].gap,
        className
      )}
    >
      <div className="mb-2">
        {getIcon()}
      </div>
      <h3 className={cn("font-medium", sizes[size].titleSize)}>
        {title}
      </h3>
      {description && (
        <p className={cn("text-muted-foreground", sizes[size].descSize)}>
          {description}
        </p>
      )}
      {action && (
        <Button 
          onClick={action.onClick} 
          className="mt-4" 
          variant={type === 'error' ? "default" : "secondary"}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default StateDisplay;
