
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddContent: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddContent }) => {
  return (
    <div className="py-12 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <Plus className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">No content yet</h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        Start by adding your first piece of content using the "Add New Content" button.
      </p>
      <Button onClick={onAddContent}>
        <div className="inline-flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add New Content
        </div>
      </Button>
    </div>
  );
};

export default EmptyState;
