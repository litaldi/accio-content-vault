
import React from 'react';
import { Brain, Zap, Sparkles, Target, Lightbulb } from 'lucide-react';

const benefits = [
  { icon: <Brain className="h-4 w-4" />, text: "AI automatically categorizes and tags your content for easy discovery" },
  { icon: <Zap className="h-4 w-4" />, text: "Lightning-fast search finds exactly what you need in seconds" }, 
  { icon: <Sparkles className="h-4 w-4" />, text: "Cross-platform sync keeps your knowledge accessible everywhere" },
  { icon: <Target className="h-4 w-4" />, text: "Smart recommendations help you rediscover forgotten gems" }
];

const BenefitsSection: React.FC = () => {
  return (
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
  );
};

export { BenefitsSection };
