
import React from 'react';
import { Sparkles, BookOpen, Search, Tag } from 'lucide-react';

const AnimatedIllustration: React.FC = () => {
  return (
    <div className="relative w-80 h-80 mx-auto mb-12" aria-hidden="true">
      {/* Central knowledge hub */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
        <BookOpen className="h-12 w-12 text-white" />
      </div>
      
      {/* Floating elements representing content types */}
      <div className="absolute top-8 left-16 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
        <Tag className="h-8 w-8 text-white" />
      </div>
      
      <div className="absolute top-16 right-8 w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce delay-500">
        <Search className="h-7 w-7 text-white" />
      </div>
      
      <div className="absolute bottom-12 left-8 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce delay-1000">
        <Sparkles className="h-6 w-6 text-white" />
      </div>
      
      <div className="absolute bottom-16 right-16 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce delay-700">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M160 160 L80 60 M160 160 L240 80 M160 160 L60 240 M160 160 L240 240"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};

export { AnimatedIllustration };
