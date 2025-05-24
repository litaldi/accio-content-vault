
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: React.ReactNode;
  benefits: string[];
  cta: string;
  illustration?: string;
}

interface StepContentProps {
  step: OnboardingStep;
  onNext: () => void;
  isAnimating: boolean;
}

export const StepContent: React.FC<StepContentProps> = ({ step, onNext, isAnimating }) => {
  return (
    <Card className={cn(
      "mb-8 border-2 border-primary/20 shadow-xl transition-all duration-300",
      isAnimating ? "scale-95 opacity-80" : "scale-100 opacity-100"
    )}>
      <CardContent className="p-12 text-center">
        {/* Illustration */}
        {step.illustration && (
          <div className="w-full max-w-md mx-auto mb-8 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img 
              src={step.illustration} 
              alt={`${step.title} illustration`}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Enhanced Icon */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-8 shadow-2xl transform hover:scale-110 transition-all duration-300 group">
          <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {step.icon}
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold mb-4 animate-fade-in">{step.title}</h2>
        <p className="text-xl text-muted-foreground mb-8 animate-fade-in animation-delay-100">{step.description}</p>
        <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-200">{step.content}</p>

        {/* Enhanced Benefits */}
        <div className="grid gap-4 mb-8 max-w-2xl mx-auto">
          {step.benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg bg-muted/50 text-left transition-all duration-300 hover:bg-muted/70 hover:scale-102",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button 
          size="lg" 
          onClick={onNext}
          className="px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 animate-fade-in animation-delay-500"
          disabled={isAnimating}
        >
          {step.cta}
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};
