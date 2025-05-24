
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, FileText, Sparkles, Zap, Globe, Upload } from 'lucide-react';

interface QuickActionCardsProps {
  onAddContent: () => void;
}

const QuickActionCards: React.FC<QuickActionCardsProps> = ({ onAddContent }) => {
  const quickActions = [
    {
      icon: <Link className="h-6 w-6" />,
      title: "Save a webpage",
      description: "Paste any URL and we'll capture it instantly",
      action: "Try with a URL",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Upload a document",
      description: "PDFs, images, and files become searchable",
      action: "Upload a file",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "See the magic",
      description: "Watch AI organize everything automatically",
      action: "Start exploring",
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Choose your first step
        </h3>
        <p className="text-muted-foreground text-lg">
          Pick any option below to see how Accio transforms your content
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {quickActions.map((action, index) => (
          <Card 
            key={index}
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 hover:-translate-y-2 bg-gradient-to-br from-card to-card/95 relative overflow-hidden"
            onClick={onAddContent}
          >
            {/* Gradient background overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            <CardContent className="p-8 text-center relative z-10">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {action.icon}
              </div>
              
              <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {action.title}
              </h4>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {action.description}
              </p>
              
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
              >
                {action.action}
                <Zap className="ml-2 h-4 w-4 group-hover:animate-pulse" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground italic">
          💡 Don't worry about organizing — our AI handles that part for you
        </p>
      </div>
    </div>
  );
};

export { QuickActionCards };
