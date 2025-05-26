
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export const QAButton: React.FC = () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        className="bg-background shadow-lg"
        onClick={() => console.log('QA Button clicked - Development mode')}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        QA
      </Button>
    </div>
  );
};
