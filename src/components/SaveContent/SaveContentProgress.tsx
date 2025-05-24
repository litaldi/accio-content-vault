
import React from 'react';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface SaveContentProgressProps {
  isProcessing: boolean;
  saveProgress: number;
}

const SaveContentProgress: React.FC<SaveContentProgressProps> = ({
  isProcessing,
  saveProgress,
}) => {
  if (!isProcessing) return null;

  const steps = [
    {
      id: 'fetch',
      title: 'Fetching Content',
      completed: saveProgress > 1,
      current: saveProgress === 1,
    },
    {
      id: 'analyze',
      title: 'AI Analysis',
      completed: saveProgress > 2,
      current: saveProgress === 2,
    },
    {
      id: 'save',
      title: 'Saving',
      completed: saveProgress > 3,
      current: saveProgress === 3,
    },
  ];

  return (
    <Card className="mb-8 border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
          <h3 className="font-medium">Processing your content...</h3>
        </div>
        
        <ProgressIndicator steps={steps} />
        
        <p className="text-sm text-muted-foreground mt-4 text-center">
          This usually takes just a few seconds
        </p>
      </CardContent>
    </Card>
  );
};

export default SaveContentProgress;
