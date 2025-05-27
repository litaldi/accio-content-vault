
import React from 'react';
import { Sparkles } from 'lucide-react';

const MotivationalHeader: React.FC = () => {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
        Your knowledge journey
        <br />
        <span className="text-4xl md:text-5xl text-primary relative">
          starts here
          <Sparkles className="absolute -top-2 -right-8 h-8 w-8 text-primary/70 animate-pulse" />
        </span>
      </h1>
      
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Transform the web into your personal knowledge library. Save anything that matters, 
        let AI organize it perfectly, and find exactly what you need in seconds.
      </p>
      
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-full px-6 py-3 mx-auto w-fit">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="font-medium">Ready when you are • No setup required</span>
      </div>
    </div>
  );
};

export { MotivationalHeader };
