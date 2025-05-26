
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Search, FolderOpen, Loader2 } from 'lucide-react';
import { copy } from '@/utils/copy';

interface EmptyStateProps {
  type: 'noContent' | 'noResults' | 'noCollections' | 'loading';
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, onAction }) => {
  const getIcon = () => {
    switch (type) {
      case 'noContent':
        return <FileText className="h-12 w-12 text-muted-foreground" />;
      case 'noResults':
        return <Search className="h-12 w-12 text-muted-foreground" />;
      case 'noCollections':
        return <FolderOpen className="h-12 w-12 text-muted-foreground" />;
      case 'loading':
        return <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />;
    }
  };

  const getTitle = () => {
    return copy.emptyStates[type].title;
  };

  const getDescription = () => {
    return copy.emptyStates[type].description;
  };

  const getActionText = () => {
    return copy.emptyStates[type].action;
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{getTitle()}</h3>
            <p className="text-muted-foreground">{getDescription()}</p>
          </div>
          {type !== 'loading' && getActionText() && (
            <Button onClick={onAction}>
              {getActionText()}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
