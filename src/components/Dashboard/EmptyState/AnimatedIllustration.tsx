
import React from 'react';
import { BookOpen, Sparkles, Star } from 'lucide-react';

const AnimatedIllustration: React.FC = () => {
  return (
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
  );
};

export { AnimatedIllustration };
