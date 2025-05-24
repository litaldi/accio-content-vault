
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, ArrowRight, Sparkles, BookOpen, Globe, Camera, FileText, Link2, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedIllustration } from './EmptyState/AnimatedIllustration';
import { MotivationalHeader } from './EmptyState/MotivationalHeader';
import { BenefitsSection } from './EmptyState/BenefitsSection';

interface ImprovedEmptyStateProps {
  onAddContent: () => void;
}

const ImprovedEmptyState: React.FC<ImprovedEmptyStateProps> = ({ onAddContent }) => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const quickActions = [
    {
      id: 'save-url',
      title: 'Save a webpage',
      description: 'Paste any URL to save articles, blogs, or resources',
      icon: <Globe className="h-6 w-6" />,
      action: () => navigate('/save?type=url'),
      color: 'from-blue-500 to-blue-600',
      shortcut: '⌘+S'
    },
    {
      id: 'upload-file',
      title: 'Upload documents',
      description: 'PDFs, images, or any files you want to organize',
      icon: <Upload className="h-6 w-6" />,
      action: () => navigate('/save?type=file'),
      color: 'from-green-500 to-green-600',
      shortcut: '⌘+U'
    },
    {
      id: 'quick-note',
      title: 'Create a note',
      description: 'Capture thoughts, ideas, or quick reminders',
      icon: <FileText className="h-6 w-6" />,
      action: () => navigate('/save?type=note'),
      color: 'from-purple-500 to-purple-600',
      shortcut: '⌘+N'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <MotivationalHeader />
        </div>

        {/* Enhanced Animated Illustration */}
        <div className="mb-20 animate-fade-in delay-300">
          <AnimatedIllustration />
        </div>

        {/* Improved Quick Actions with Better UX */}
        <div className="mb-24 animate-fade-in delay-500">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose how you'd like to start
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Add your first piece of content in seconds. Everything is automatically organized with AI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {quickActions.map((action, index) => (
              <Card
                key={action.id}
                className={`group cursor-pointer transition-all duration-300 border-2 hover:border-primary/30 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/95 relative overflow-hidden ${
                  hoveredCard === action.id ? 'scale-105 shadow-2xl' : ''
                }`}
                onMouseEnter={() => setHoveredCard(action.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={action.action}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    action.action();
                  }
                }}
                aria-label={`${action.title}: ${action.description}`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Keyboard shortcut badge */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-background/90 backdrop-blur-sm text-xs font-mono px-2 py-1 rounded border border-border/50">
                    {action.shortcut}
                  </span>
                </div>

                <CardContent className="p-8 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-6 mx-auto text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                    <span className="font-medium mr-2">Get started</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Alternative entry point */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/save')}
              className="group border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 px-8 py-4 h-auto font-semibold transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
              Or use the full save form
              <Sparkles className="h-4 w-4 ml-3 text-primary/70 group-hover:text-primary transition-colors" />
            </Button>
          </div>
        </div>

        {/* Enhanced Benefits Section */}
        <div className="animate-fade-in delay-700">
          <BenefitsSection />
        </div>

        {/* Social proof and trust indicators */}
        <div className="text-center mt-20 animate-fade-in delay-900">
          <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-8 border border-border/50 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Free forever plan</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-500"></div>
                <span className="font-medium">Set up in 30 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ImprovedEmptyState };
