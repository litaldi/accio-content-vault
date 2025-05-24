
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Plus, Sparkles, Upload, Link, ArrowRight, Lightbulb, Zap, Brain, Target, Rocket, Star } from 'lucide-react';

interface ImprovedEmptyStateProps {
  onAddContent: () => void;
}

const ImprovedEmptyState: React.FC<ImprovedEmptyStateProps> = ({ onAddContent }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showMotivation, setShowMotivation] = useState(false);

  const quickActions = [
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

  const benefits = [
    { icon: <Brain className="h-4 w-4" />, text: "AI automatically categorizes and tags your content for easy discovery" },
    { icon: <Zap className="h-4 w-4" />, text: "Lightning-fast search finds exactly what you need in seconds" }, 
    { icon: <Sparkles className="h-4 w-4" />, text: "Cross-platform sync keeps your knowledge accessible everywhere" },
    { icon: <Target className="h-4 w-4" />, text: "Smart recommendations help you rediscover forgotten gems" }
  ];

  const motivationalQuotes = [
    "Knowledge is power, but organized knowledge is unstoppable! 🚀",
    "Every expert was once a beginner who never gave up learning 💡",
    "Your future self will thank you for organizing your knowledge today ⭐",
    "Small steps in learning lead to giant leaps in understanding 🎯"
  ];

  const currentQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="text-center max-w-5xl mx-auto">
        {/* Enhanced animated illustration */}
        <div className="relative mb-12">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl group">
            <BookOpen className="h-24 w-24 text-primary/70 animate-pulse transition-transform group-hover:scale-110 duration-500" />
            
            {/* Enhanced floating particles with better animations */}
            <div className="absolute top-12 right-16 w-4 h-4 bg-primary/40 rounded-full animate-bounce" />
            <div className="absolute bottom-16 left-12 w-3 h-3 bg-primary/50 rounded-full animate-bounce delay-300" />
            <div className="absolute top-20 left-12 w-2 h-2 bg-primary/30 rounded-full animate-bounce delay-700" />
            <div className="absolute bottom-12 right-20 w-3 h-3 bg-primary/35 rounded-full animate-bounce delay-1000" />
            
            {/* Dynamic sparkles with staggered animations */}
            <Sparkles className="absolute top-8 left-20 h-5 w-5 text-primary/60 animate-pulse delay-500" />
            <Sparkles className="absolute bottom-20 right-16 h-4 w-4 text-primary/50 animate-pulse delay-1200" />
            <Star className="absolute top-16 right-8 h-3 w-3 text-yellow-400 animate-pulse delay-800" />
            
            {/* Multiple orbital rings */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-pulse" />
            <div className="absolute inset-4 border border-primary/15 rounded-full animate-pulse delay-300" />
            <div className="absolute inset-8 border border-primary/10 rounded-full animate-pulse delay-600" />
          </div>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Improved messaging hierarchy */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Knowledge Journey
            </span>
            <span className="block text-3xl md:text-4xl font-semibold text-muted-foreground mt-3">
              Starts with One Piece of Content
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform scattered information into an organized, AI-powered knowledge hub. 
            <span className="font-semibold text-foreground block mt-2">
              Every expert was once a beginner who took the first step.
            </span>
          </p>
          
          {/* Motivational element */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-purple/10 rounded-full px-6 py-3 border border-primary/20 mb-8">
            <Rocket className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">{currentQuote}</span>
          </div>
        </div>

        {/* Enhanced primary action with more excitement */}
        <div className="mb-16">
          <EnhancedButton 
            onClick={onAddContent}
            variant="premium"
            size="xl"
            icon={<Plus className="h-6 w-6" />}
            rightIcon={<ArrowRight className="h-6 w-6" />}
            className="mb-4 group"
          >
            Start Your Knowledge Collection
          </EnhancedButton>
          
          <p className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            No setup required • Works instantly • Free forever
            <Sparkles className="h-4 w-4 text-primary" />
          </p>
        </div>

        {/* Enhanced quick actions grid */}
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

        {/* Enhanced benefits section */}
        <div className="bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded-3xl p-12 border border-border/50 backdrop-blur-sm mb-12">
          <div className="flex items-center justify-center mb-10">
            <div className="bg-primary/10 rounded-full p-4 mr-4">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">Why Users Love Accio</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start text-left p-6 rounded-2xl hover:bg-muted/30 transition-colors group">
                <div className="bg-primary/10 rounded-full p-3 mr-4 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  {benefit.icon}
                </div>
                <span className="text-base leading-relaxed font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced footer with social proof */}
        <div className="text-center space-y-6">
          <p className="text-muted-foreground mb-6 text-lg">
            Join thousands of learners building their knowledge empire
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Browser extension available
            </span>
            <span className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
              Mobile sharing supported
            </span>
            <span className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
              Offline access ready
            </span>
          </div>
          
          {/* Success stories teaser */}
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
            <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">💡 Success Story</p>
            <p className="text-sm text-green-600 dark:text-green-400 italic">
              "I went from scattered bookmarks to a searchable knowledge base in minutes. 
              Accio helped me organize 3 years of research effortlessly!" - Sarah K.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ImprovedEmptyState };
