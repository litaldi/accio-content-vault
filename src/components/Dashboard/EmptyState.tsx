
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Plus, Sparkles, Upload, Link } from 'lucide-react';

interface EmptyStateProps {
  onAddContent: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddContent }) => {
  const quickActions = [
    {
      icon: <Link className="h-5 w-5" />,
      title: "Save a URL",
      description: "Paste any link to save an article or webpage",
      action: onAddContent
    },
    {
      icon: <Upload className="h-5 w-5" />,
      title: "Upload a file",
      description: "Add PDFs, images, or documents",
      action: onAddContent
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Animated illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center relative overflow-hidden">
            <BookOpen className="h-16 w-16 text-primary/60" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-primary/20 rounded-full animate-pulse" />
            <div className="absolute bottom-6 left-6 w-4 h-4 bg-primary/30 rounded-full animate-pulse delay-500" />
            <Sparkles className="absolute top-6 left-4 h-4 w-4 text-primary/40 animate-bounce delay-1000" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-foreground">
          Start Building Your Content Library
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Save your first piece of content to begin organizing your digital knowledge with AI-powered tagging.
        </p>

        {/* Primary action */}
        <Button 
          onClick={onAddContent}
          size="lg"
          className="mb-8 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="mr-2 h-5 w-5" />
          Save Your First Content
        </Button>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 border-2 hover:border-primary/50"
              onClick={action.action}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  {action.icon}
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help text */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <Sparkles className="inline h-4 w-4 mr-1" />
            Tip: You can also share content directly from other apps using the share button
          </p>
        </div>
      </div>
    </div>
  );
};

export { EmptyState };
