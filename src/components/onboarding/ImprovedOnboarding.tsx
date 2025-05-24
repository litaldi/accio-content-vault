
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImprovedOnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to Accio',
    description: 'Your personal knowledge library awaits',
    content: 'Transform how you save, organize, and rediscover content from across the web.',
    icon: '🎯',
    benefits: ['Never lose important content again', 'AI-powered organization', 'Instant search and discovery']
  },
  {
    id: 2,
    title: 'Save Content',
    description: 'Capture anything from the web',
    content: 'Save articles, videos, PDFs, and more with just one click.',
    icon: '📚',
    benefits: ['One-click saving', 'Multiple content types', 'Automatic metadata extraction']
  },
  {
    id: 3,
    title: 'AI Organization',
    description: 'Let AI organize your content',
    content: 'Our AI automatically tags and categorizes your saved content.',
    icon: '🤖',
    benefits: ['Smart tagging', 'Auto-categorization', 'Content recommendations']
  },
  {
    id: 4,
    title: 'Smart Search',
    description: 'Find anything instantly',
    content: 'Search by keywords, topics, or even describe what you remember.',
    icon: '🔍',
    benefits: ['Natural language search', 'Semantic understanding', 'Quick filters']
  }
];

export const ImprovedOnboarding: React.FC<ImprovedOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  const step = onboardingSteps[currentStep];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">Accio</span>
          <Badge variant="secondary">Setup</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onComplete}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="text-4xl mb-4">{step.icon}</div>
          <CardTitle className="text-2xl">{step.title}</CardTitle>
          <p className="text-muted-foreground">{step.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-lg">{step.content}</p>
          
          <div className="grid gap-3">
            {step.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {onboardingSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                index === currentStep ? "bg-primary" : "bg-muted",
                index < currentStep && "bg-primary/60"
              )}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={isCompleting}
          className="flex items-center gap-2"
        >
          {currentStep === onboardingSteps.length - 1 ? (
            isCompleting ? (
              <>Completing...</>
            ) : (
              <>Get Started</>
            )
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
