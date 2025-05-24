
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  visual?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon,
  action,
  secondaryAction,
  className,
  visual
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-8 rounded-lg border border-dashed border-muted",
        className
      )}
    >
      {visual ? (
        <div className="mb-6 opacity-80">{visual}</div>
      ) : Icon ? (
        <div className="p-4 rounded-full bg-muted mb-6">
          <Icon className="h-12 w-12 text-muted-foreground opacity-50" />
        </div>
      ) : null}
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      
      {description && (
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      )}
      
      <div className="flex flex-wrap gap-4 justify-center">
        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
        
        {secondaryAction && (
          <Button variant="outline" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
