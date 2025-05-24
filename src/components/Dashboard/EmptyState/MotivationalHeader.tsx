
import React from 'react';
import { Rocket } from 'lucide-react';

const motivationalQuotes = [
  "Knowledge is power, but organized knowledge is unstoppable! 🚀",
  "Every expert was once a beginner who never gave up learning 💡",
  "Your future self will thank you for organizing your knowledge today ⭐",
  "Small steps in learning lead to giant leaps in understanding 🎯"
];

const MotivationalHeader: React.FC = () => {
  const currentQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
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
  );
};

export { MotivationalHeader };
