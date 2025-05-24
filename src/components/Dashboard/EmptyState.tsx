
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Plus, Sparkles, Upload, Link, ArrowRight, Lightbulb } from 'lucide-react';

interface EmptyStateProps {
  onAddContent: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddContent }) => {
  const quickActions = [
    {
      icon: <Link className="h-5 w-5" />,
      title: "Save a URL",
      description: "Paste any link to save articles, research, or webpages",
      action: onAddContent,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Upload className="h-5 w-5" />,
      title: "Upload Files", 
      description: "Add PDFs, images, or documents to your library",
      action: onAddContent,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const tips = [
    "Use natural language search to find content quickly",
    "AI will automatically tag your content for easy organization", 
    "Access your library from any device with cloud sync"
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        {/* Enhanced animated illustration */}
        <div className="relative mb-12">
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full flex items-center justify-center relative overflow-hidden shadow-lg">
            <BookOpen className="h-20 w-20 text-primary/70 animate-pulse" />
            
            {/* Floating particles */}
            <div className="absolute top-6 right-8 w-3 h-3 bg-primary/30 rounded-full animate-bounce" />
            <div className="absolute bottom-8 left-8 w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-300" />
            <div className="absolute top-12 left-6 w-2 h-2 bg-primary/25 rounded-full animate-bounce delay-700" />
            
            {/* Sparkle animations */}
            <Sparkles className="absolute top-8 left-12 h-4 w-4 text-primary/50 animate-pulse delay-1000" />
            <Sparkles className="absolute bottom-12 right-10 h-3 w-3 text-primary/40 animate-pulse delay-1500" />
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-full blur-xl" />
        </div>

        {/* Enhanced messaging */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
          Your Knowledge Hub Awaits
        </h2>
        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
          Start building your personal content library. Save, organize, and rediscover everything that matters to you with the power of AI.
        </p>

        {/* Primary action with enhanced styling */}
        <Button 
          onClick={onAddContent}
          size="lg"
          className="mb-12 px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-primary to-primary/90 group"
        >
          <Plus className="mr-3 h-6 w-6 transition-transform group-hover:rotate-90" />
          Add Your First Content
          <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>

        {/* Enhanced quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className="cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50 overflow-hidden relative"
              onClick={action.action}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <CardContent className="p-8 text-center relative z-10">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips section */}
        <div className="bg-muted/30 rounded-2xl p-8 border border-border/50">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-lg font-semibold">Pro Tips</h3>
          </div>
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle call-to-action footer */}
        <p className="text-sm text-muted-foreground mt-8 opacity-70">
          Start saving content from any device using our browser extension or mobile sharing
        </p>
      </div>
    </div>
  );
};

export { EmptyState };
