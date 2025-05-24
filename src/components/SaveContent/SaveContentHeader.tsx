
import React from 'react';
import { Sparkles } from 'lucide-react';

interface SaveContentHeaderProps {
  isProcessing: boolean;
}

export const SaveContentHeader: React.FC<SaveContentHeaderProps> = ({ isProcessing }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Add New Content
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Transform any URL or file into organized, searchable knowledge with AI-powered insights
      </p>
    </div>
  );
};
