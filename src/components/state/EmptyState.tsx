
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { copy } from '@/utils/copy';

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
  type?: 'library' | 'search' | 'dashboard' | 'recent' | 'default';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon,
  action,
  secondaryAction,
  className,
  visual,
  type = 'default'
}) => {
  // Use predefined copy for common empty states
  const getContent = () => {
    switch (type) {
      case 'library':
        return {
          title: copy.emptyStates.library.title,
          description: copy.emptyStates.library.description,
          actionLabel: copy.emptyStates.library.action
        };
      case 'search':
        return {
          title: copy.emptyStates.search.title,
          description: copy.emptyStates.search.description,
          actionLabel: copy.emptyStates.search.action
        };
      case 'dashboard':
        return {
          title: copy.emptyStates.dashboard.title,
          description: copy.emptyStates.dashboard.description,
          actionLabel: copy.emptyStates.dashboard.action
        };
      case 'recent':
        return {
          title: copy.emptyStates.recent.title,
          description: copy.emptyStates.recent.description,
          actionLabel: copy.emptyStates.recent.action
        };
      default:
        return { title, description, actionLabel: action?.label };
    }
  };

  const content = getContent();

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-8 rounded-lg border border-dashed border-muted max-w-md mx-auto",
        className
      )}
      role="region"
      aria-label="Empty state"
    >
      {visual ? (
        <div className="mb-6 opacity-80">{visual}</div>
      ) : Icon ? (
        <div className="p-4 rounded-full bg-muted/50 mb-6">
          <Icon className="h-12 w-12 text-muted-foreground opacity-50" />
        </div>
      ) : null}
      
      <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
      
      {content.description && (
        <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
          {content.description}
        </p>
      )}
      
      <div className="flex flex-wrap gap-3 justify-center">
        {action && (
          <Button onClick={action.onClick}>
            {content.actionLabel}
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
