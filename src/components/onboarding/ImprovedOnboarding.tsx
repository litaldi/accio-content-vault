
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { copy } from '@/utils/copy';

interface ImprovedOnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    id: 1,
    title: copy.onboarding.step1.title,
    description: copy.onboarding.step1.description,
    content: copy.onboarding.step1.tip,
    icon: '📚',
    benefits: [copy.benefits.saveAnything, copy.benefits.crossDevice, 'Works with any website']
  },
  {
    id: 2,
    title: copy.onboarding.step2.title,
    description: copy.onboarding.step2.description,
    content: copy.onboarding.step2.tip,
    icon: '🤖',
    benefits: [copy.benefits.smartTags, copy.benefits.aiOrganization, 'No manual work required']
  },
  {
    id: 3,
    title: copy.onboarding.step3.title,
    description: copy.onboarding.step3.description,
    content: copy.onboarding.step3.tip,
    icon: '🔍',
    benefits: [copy.benefits.findFast, 'Natural language search', 'Smart filters']
  },
  {
    id: 4,
    title: copy.onboarding.step4.title,
    description: copy.onboarding.step4.description,
    content: copy.onboarding.step4.tip,
    icon: '🎯',
    benefits: [copy.benefits.neverLose, copy.benefits.timeBack, copy.benefits.instantSync]
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
          <Badge variant="secondary">{copy.onboarding.welcome.subtitle}</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onComplete}
          className="text-muted-foreground hover:text-foreground"
          aria-label={copy.buttons.close}
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
          <div className="text-4xl mb-4" aria-hidden="true">{step.icon}</div>
          <CardTitle className="text-2xl">{step.title}</CardTitle>
          <p className="text-muted-foreground">{step.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-lg">{step.content}</p>
          
          <div className="grid gap-3">
            {step.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {copy.buttons.back}
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={isCompleting}
          className="flex items-center gap-2"
        >
          {currentStep === onboardingSteps.length - 1 ? (
            isCompleting ? copy.loading.loading : copy.buttons.finish
          ) : (
            <>
              {copy.buttons.next}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
