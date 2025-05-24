
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, Sparkles, Target, Zap, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '@/hooks/useAccessibility';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  benefit: string;
  ctaText: string;
  estimatedTime: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'save',
    title: 'Save Your First Content',
    description: 'Start by saving a webpage, article, or document. Our AI will automatically organize it for you.',
    icon: Globe,
    benefit: 'Never lose track of important content again',
    ctaText: 'Save something now',
    estimatedTime: '30 seconds'
  },
  {
    id: 'organize',
    title: 'Review AI Tags',
    description: 'See how our AI categorized your content and customize tags to match your workflow.',
    icon: Target,
    benefit: 'Find anything instantly with smart organization',
    ctaText: 'Explore organization',
    estimatedTime: '1 minute'
  },
  {
    id: 'search',
    title: 'Try Smart Search',
    description: 'Use natural language to find your content. Ask questions like "articles about productivity".',
    icon: Zap,
    benefit: 'Discover connections you never knew existed',
    ctaText: 'Try searching',
    estimatedTime: '30 seconds'
  }
];

interface ImprovedOnboardingProps {
  onComplete: () => void;
  className?: string;
}

export const ImprovedOnboarding: React.FC<ImprovedOnboardingProps> = ({
  onComplete,
  className
}) => {
  const navigate = useNavigate();
  const { isReducedMotion } = useAccessibility();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  const step = onboardingSteps[currentStep];

  const handleNext = () => {
    if (isAnimating && !isReducedMotion) return;
    
    setIsAnimating(true);
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    
    setTimeout(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete();
      }
      setIsAnimating(false);
    }, isReducedMotion ? 0 : 300);
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleCTA = () => {
    switch (step.id) {
      case 'save':
        navigate('/save');
        break;
      case 'organize':
        navigate('/dashboard');
        break;
      case 'search':
        navigate('/dashboard?focus=search');
        break;
      default:
        handleNext();
    }
  };

  return (
    <div className={cn("max-w-2xl mx-auto p-6 space-y-8", className)}>
      {/* Progress Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Getting started • Step {currentStep + 1} of {onboardingSteps.length}</span>
        </div>
        
        <Progress 
          value={progress} 
          className="h-2"
          aria-label={`Onboarding progress: ${Math.round(progress)}% complete`}
        />
        
        {/* Step indicators */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {onboardingSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={cn(
                "w-10 h-10 rounded-full border-2 transition-all duration-200",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                index === currentStep && "border-primary bg-primary text-primary-foreground",
                index < currentStep && "border-green-500 bg-green-500 text-white",
                index > currentStep && "border-muted bg-background text-muted-foreground",
                index <= currentStep && "cursor-pointer hover:scale-105"
              )}
              aria-label={`Go to step ${index + 1}: ${onboardingSteps[index].title}`}
              aria-current={index === currentStep ? 'step' : undefined}
              disabled={index > currentStep}
            >
              {completedSteps.has(index) ? (
                <CheckCircle className="h-5 w-5 mx-auto" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <Card className={cn(
        "border-2 shadow-lg transition-all duration-300",
        !isReducedMotion && isAnimating && "scale-95 opacity-90"
      )}>
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className={cn(
            "w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg",
            !isReducedMotion && "hover:scale-110 transition-transform duration-200"
          )}>
            <step.icon className="h-10 w-10 text-white" />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Benefit highlight */}
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <p className="text-primary font-medium">
              ✨ {step.benefit}
            </p>
          </div>

          {/* Time estimate */}
          <div className="text-sm text-muted-foreground">
            Estimated time: {step.estimatedTime}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={handleCTA}
              size="lg"
              className="group px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <span>{step.ctaText}</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {currentStep < onboardingSteps.length - 1 ? (
              <Button
                variant="outline"
                onClick={handleNext}
                size="lg"
                className="px-8 py-3 text-base"
              >
                Skip for now
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleSkip}
                size="lg"
                className="px-8 py-3 text-base"
              >
                Finish setup
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional help */}
      <div className="text-center">
        <Button
          variant="link"
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip onboarding entirely
        </Button>
      </div>
    </div>
  );
};
