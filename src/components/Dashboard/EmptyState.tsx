
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Plus, Sparkles, Upload, Link, ArrowRight, Lightbulb, Zap, Brain } from 'lucide-react';

interface EmptyStateProps {
  onAddContent: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddContent }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const quickActions = [
    {
      icon: <Link className="h-6 w-6" />,
      title: "Save a URL",
      description: "Paste any link to save articles, research, or webpages instantly",
      action: onAddContent,
      color: "from-blue-500 to-blue-600",
      shortcut: "Ctrl+V"
    },
    {
      icon: <Upload className="h-6 w-6" />, 
      title: "Upload Files",
      description: "Add PDFs, images, or documents to your personal library",
      action: onAddContent,
      color: "from-purple-500 to-purple-600",
      shortcut: "Drag & Drop"
    }
  ];

  const tips = [
    { icon: <Brain className="h-4 w-4" />, text: "AI automatically categorizes and tags your content" },
    { icon: <Zap className="h-4 w-4" />, text: "Use natural language search to find anything instantly" }, 
    { icon: <Sparkles className="h-4 w-4" />, text: "Access your library from any device with cloud sync" }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in">
      <div className="text-center max-w-4xl mx-auto">
        {/* Enhanced animated illustration */}
        <div className="relative mb-16">
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl group">
            <BookOpen className="h-20 w-20 text-primary/70 animate-pulse transition-transform group-hover:scale-110" />
            
            {/* Enhanced floating particles */}
            <div className="absolute top-8 right-10 w-3 h-3 bg-primary/30 rounded-full animate-bounce" />
            <div className="absolute bottom-10 left-10 w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-300" />
            <div className="absolute top-16 left-8 w-2 h-2 bg-primary/25 rounded-full animate-bounce delay-700" />
            
            {/* Dynamic sparkles */}
            <Sparkles className="absolute top-6 left-16 h-4 w-4 text-primary/50 animate-pulse delay-1000" />
            <Sparkles className="absolute bottom-16 right-12 h-3 w-3 text-primary/40 animate-pulse delay-1500" />
            
            {/* Orbital rings */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl animate-pulse" />
            <div className="absolute inset-2 border border-primary/10 rounded-3xl animate-pulse delay-500" />
          </div>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-full blur-2xl" />
        </div>

        {/* Improved messaging hierarchy */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text">
            Your Knowledge Hub
            <span className="block text-3xl md:text-4xl font-semibold text-muted-foreground mt-2">
              Awaits Your First Content
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform scattered bookmarks into an organized, AI-powered knowledge library. 
            <span className="font-medium text-foreground"> Start with any URL or file.</span>
          </p>
        </div>

        {/* Enhanced primary action */}
        <div className="mb-16">
          <Button 
            onClick={onAddContent}
            size="lg"
            className="px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 bg-gradient-to-r from-primary to-primary/90 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Plus className="mr-4 h-6 w-6 transition-transform group-hover:rotate-90 relative z-10" />
            <span className="relative z-10">Add Your First Content</span>
            <ArrowRight className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-2 relative z-10" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4 font-medium">
            ✨ No setup required • Works instantly
          </p>
        </div>

        {/* Enhanced quick actions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className={`cursor-pointer group transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden relative transform hover:scale-105 ${
                activeCard === index ? 'border-primary/50 shadow-xl' : 'hover:shadow-xl'
              }`}
              onClick={action.action}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Dynamic gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-all duration-500`} />
              
              <CardContent className="p-8 text-center relative z-10">
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${action.color} rounded-3xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 rounded-3xl transform scale-0 group-hover:scale-100 transition-transform duration-500" />
                  <div className="relative z-10">
                    {action.icon}
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  {action.description}
                </p>
                
                <div className="inline-flex items-center gap-2 text-xs font-bold text-primary/80 bg-primary/10 rounded-full px-3 py-1.5">
                  <Zap className="h-3 w-3" />
                  <span>{action.shortcut}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced tips section */}
        <div className="bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded-3xl p-10 border border-border/50 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/10 rounded-full p-3 mr-4">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Pro Tips to Get Started</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-muted/30 transition-colors">
                <div className="bg-primary/10 rounded-full p-3 mb-4">
                  {tip.icon}
                </div>
                <span className="text-sm leading-relaxed font-medium">{tip.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4 text-lg">
            Ready to organize your digital life?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Browser extension available
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
              Mobile sharing supported
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
              Works offline
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EmptyState };
