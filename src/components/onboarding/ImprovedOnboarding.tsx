
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Sparkles, Search, Tag, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Accio',
    description: 'Transform the internet into your personal knowledge library with AI-powered organization.',
    icon: Sparkles,
  },
  {
    id: 'save',
    title: 'Save Any Content',
    description: 'Bookmark websites, upload PDFs, or save text snippets. We support multiple content types.',
    icon: Bookmark,
    action: 'Try saving content'
  },
  {
    id: 'organize',
    title: 'AI-Powered Organization',
    description: 'Our AI automatically tags and categorizes your content, making it easy to find later.',
    icon: Tag,
  },
  {
    id: 'search',
    title: 'Natural Language Search',
    description: 'Ask questions in plain English and find exactly what you\'re looking for instantly.',
    icon: Search,
    action: 'Try semantic search'
  }
];

interface ImprovedOnboardingProps {
  onComplete: () => void;
}

export const ImprovedOnboarding: React.FC<ImprovedOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = onboardingSteps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Get Started with Accio</h1>
          <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
            Skip tour
          </Button>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6">
          {onboardingSteps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                  index < currentStep || completedSteps.has(index)
                    ? "bg-primary text-primary-foreground border-primary"
                    : index === currentStep
                    ? "border-primary text-primary bg-background"
                    : "border-muted-foreground/30 text-muted-foreground bg-background"
                )}
              >
                {index < currentStep || completedSteps.has(index) ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < onboardingSteps.length - 1 && (
                <div
                  className={cn(
                    "w-16 h-0.5 mx-2 transition-colors",
                    index < currentStep ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
            {currentStepData.description}
          </p>
          
          {currentStepData.action && (
            <div className="mb-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-primary mb-2">Quick Action:</p>
              <Button variant="outline" size="sm">
                {currentStepData.action}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          <Button onClick={handleNext} className="min-w-[120px]">
            {currentStep === onboardingSteps.length - 1 ? (
              'Get Started'
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
