
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, BookOpen, Brain, Search, Download, Sparkles, CheckCircle } from 'lucide-react';
import { useGuidedTour } from '@/hooks/useGuidedTour';
import { GuidedTourOverlay } from '@/components/tour/GuidedTourOverlay';

interface ProgressiveOnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

const onboardingSteps = [
  {
    id: 'save-demo',
    title: 'Save Your First Item',
    description: 'Experience instant content capture',
    icon: BookOpen,
    benefits: ['One-click saving', 'Any content type', 'Instant organization'],
    demoContent: 'Try saving this sample article about AI productivity tips...',
    quickWin: true
  },
  {
    id: 'ai-demo',
    title: 'See AI in Action',
    description: 'Watch smart categorization happen',
    icon: Brain,
    benefits: ['Auto-tagging', 'Smart categories', 'Content analysis'],
    demoContent: 'Watch as AI automatically tags and organizes your content...',
    quickWin: true
  },
  {
    id: 'search-demo',
    title: 'Find Anything Instantly',
    description: 'Natural language search demo',
    icon: Search,
    benefits: ['Semantic search', 'Natural queries', 'Instant results'],
    demoContent: 'Search for "productivity tips for remote work"...',
    quickWin: true
  },
  {
    id: 'setup-complete',
    title: 'You\'re All Set!',
    description: 'Start building your knowledge base',
    icon: Sparkles,
    benefits: ['Browser extension', 'Mobile app', 'Team collaboration'],
    demoContent: 'Your personal knowledge engine is ready to use.',
    quickWin: false
  }
];

const tourSteps = [
  {
    id: 'save-button',
    target: '[data-tour="save-button"]',
    title: 'Save Content',
    content: 'Click here to save any webpage, article, or document to your library.',
    placement: 'bottom' as const
  },
  {
    id: 'ai-tags',
    target: '[data-tour="ai-tags"]',
    title: 'AI Tags',
    content: 'Our AI automatically adds relevant tags and categories to your content.',
    placement: 'top' as const
  },
  {
    id: 'search-bar',
    target: '[data-tour="search-bar"]',
    title: 'Smart Search',
    content: 'Use natural language to find exactly what you\'re looking for.',
    placement: 'bottom' as const
  }
];

export const ProgressiveOnboarding: React.FC<ProgressiveOnboardingProps> = ({
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedQuickWins, setCompletedQuickWins] = useState<string[]>([]);
  const [showDemoContent, setShowDemoContent] = useState(false);

  const tour = useGuidedTour({
    steps: tourSteps,
    onComplete: () => handleStepComplete(),
    onSkip: () => handleNext()
  });

  const step = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowDemoContent(false);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowDemoContent(false);
    }
  };

  const handleQuickWin = () => {
    if (step.quickWin) {
      setShowDemoContent(true);
      if (currentStep === 0) {
        // Start guided tour for the first step
        tour.start();
      } else {
        // Simulate quick win completion
        setTimeout(() => {
          handleStepComplete();
        }, 2000);
      }
    }
  };

  const handleStepComplete = () => {
    setCompletedQuickWins(prev => [...prev, step.id]);
    setShowDemoContent(false);
    setTimeout(handleNext, 1000);
  };

  const isStepCompleted = completedQuickWins.includes(step.id);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to Accio</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Let's get you started with a quick demonstration
            </p>
            <Progress value={progress} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {onboardingSteps.length}
            </p>
          </div>

          {/* Main Content */}
          <Card className="shadow-xl border-2 border-primary/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                {step.title}
                {isStepCompleted && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </CardTitle>
              <p className="text-lg text-muted-foreground">{step.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {step.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Demo Content */}
              {showDemoContent && (
                <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Demo in Progress</h4>
                        <p className="text-sm text-muted-foreground">{step.demoContent}</p>
                        
                        {/* Sample content for demo */}
                        <div className="mt-4 p-4 bg-background/50 rounded-lg border" data-tour="ai-tags">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="secondary">productivity</Badge>
                            <Badge variant="secondary">AI</Badge>
                            <Badge variant="secondary">remote-work</Badge>
                          </div>
                          <p className="text-sm">
                            "10 AI-Powered Productivity Tips for Remote Workers"
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>

                <Button variant="ghost" onClick={onSkip}>
                  Skip setup
                </Button>

                {step.quickWin && !isStepCompleted ? (
                  <Button onClick={handleQuickWin} className="flex items-center gap-2" data-tour="save-button">
                    Try it now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNext} 
                    className="flex items-center gap-2"
                    disabled={step.quickWin && !isStepCompleted}
                  >
                    {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Continue'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Step Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {onboardingSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep 
                    ? 'bg-primary scale-125' 
                    : index < currentStep 
                    ? 'bg-primary/60' 
                    : 'bg-muted'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tour Overlay */}
      <GuidedTourOverlay
        isVisible={tour.isVisible}
        currentStep={tour.currentStep}
        totalSteps={tour.totalSteps}
        stepData={tour.currentStepData}
        progress={tour.progress}
        onNext={tour.next}
        onPrev={tour.prev}
        onSkip={tour.skip}
        onComplete={tour.complete}
      />

      {/* Search Bar for Tour */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-80 z-50" data-tour="search-bar">
        <div className="bg-background border rounded-lg p-2 shadow-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Search your knowledge...</span>
          </div>
        </div>
      </div>
    </>
  );
};
