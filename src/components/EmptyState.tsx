
import React from 'react';
import { AlertTriangle, FileQuestion, InboxIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type EmptyStateType = 'not-found' | 'no-data' | 'error';

interface EmptyStateProps {
  type?: EmptyStateType;
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-data',
  title,
  description,
  icon,
  action,
  secondaryAction
}) => {
  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'not-found':
        return <FileQuestion className="h-12 w-12 text-muted-foreground" aria-hidden="true" />;
      case 'error':
        return <AlertTriangle className="h-12 w-12 text-destructive" aria-hidden="true" />;
      case 'no-data':
      default:
        return <InboxIcon className="h-12 w-12 text-muted-foreground" aria-hidden="true" />;
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4" role="status">
      <div className="bg-muted/30 rounded-full p-4 mb-4">
        {getIcon()}
      </div>
      <h2 className="text-2xl font-semibold mt-4 mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action && (
            <Button onClick={action.onClick}>{action.label}</Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
