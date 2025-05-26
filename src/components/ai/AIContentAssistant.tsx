
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, X } from 'lucide-react';

export const AIContentAssistant: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-20 right-6 z-40 h-12 w-12 rounded-full shadow-lg"
        size="icon"
        aria-label="Open AI Assistant"
      >
        <Brain className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-20 right-6 z-40 w-80 shadow-xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">AI Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            aria-label="Close AI Assistant"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          AI content analysis and recommendations will appear here when you save new content.
        </p>
      </CardContent>
    </Card>
  );
};
