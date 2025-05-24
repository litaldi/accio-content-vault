
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Link, Target, Zap } from 'lucide-react';

interface QuickAction {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: () => void;
  color: string;
  shortcut: string;
  benefit: string;
}

interface QuickActionCardsProps {
  onAddContent: () => void;
}

const QuickActionCards: React.FC<QuickActionCardsProps> = ({ onAddContent }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const quickActions: QuickAction[] = [
    {
      icon: <Link className="h-6 w-6" />,
      title: "Save Your First Link",
      description: "Transform any webpage into searchable knowledge. Perfect for articles, research, and tutorials.",
      action: onAddContent,
      color: "from-blue-500 to-blue-600",
      shortcut: "Ctrl+S",
      benefit: "Instant organization"
    },
    {
      icon: <Upload className="h-6 w-6" />, 
      title: "Upload Documents",
      description: "Add PDFs, images, or documents. Our AI will extract and organize the content automatically.",
      action: onAddContent,
      color: "from-purple-500 to-purple-600",
      shortcut: "Drag & Drop",
      benefit: "Smart extraction"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
      {quickActions.map((action, index) => (
        <Card 
          key={index}
          className={`cursor-pointer group transition-all duration-500 border-2 hover:border-primary/50 overflow-hidden relative transform hover:scale-105 hover:rotate-1 ${
            activeCard === index ? 'border-primary/50 shadow-2xl scale-105' : 'hover:shadow-2xl'
          }`}
          onClick={action.action}
          onMouseEnter={() => setActiveCard(index)}
          onMouseLeave={() => setActiveCard(null)}
        >
          {/* Dynamic gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-15 transition-all duration-700`} />
          
          <CardContent className="p-8 text-center relative z-10">
            <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${action.color} rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/20 rounded-3xl transform scale-0 group-hover:scale-100 transition-transform duration-700" />
              <div className="relative z-10 transition-transform group-hover:scale-110">
                {action.icon}
              </div>
            </div>
            
            <h3 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors">
              {action.title}
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              {action.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary/80 bg-primary/10 rounded-full px-4 py-2">
                <Zap className="h-3 w-3" />
                <span>{action.shortcut}</span>
              </div>
              
              <div className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 rounded-full px-3 py-1">
                <Target className="h-3 w-3" />
                <span>{action.benefit}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { QuickActionCards };
