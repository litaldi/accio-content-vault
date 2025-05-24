
import React from 'react';
import { ProgressIndicator } from '@/components/ui/progress-indicator';

interface SaveContentProgressProps {
  isProcessing: boolean;
  saveProgress: number;
}

export const SaveContentProgress: React.FC<SaveContentProgressProps> = ({ 
  isProcessing, 
  saveProgress 
}) => {
  const saveSteps = [
    { id: 'input', title: 'Input Content', completed: saveProgress > 0, current: saveProgress === 1 },
    { id: 'analysis', title: 'AI Analysis', completed: saveProgress > 1, current: saveProgress === 2 },
    { id: 'tags', title: 'Tag Confirmation', completed: saveProgress > 2, current: saveProgress === 3 },
    { id: 'saved', title: 'Saved!', completed: saveProgress > 3, current: saveProgress === 4 }
  ];

  if (!isProcessing) return null;

  return (
    <div className="mb-8">
      <ProgressIndicator steps={saveSteps} currentStep={saveProgress} />
    </div>
  );
};
