
import React from 'react';
import { HelpCircle } from 'lucide-react';

export const HelpHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
      <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Find answers, get support, and learn how to make the most of Accio
      </p>
    </div>
  );
};
