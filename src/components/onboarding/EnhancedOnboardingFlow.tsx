
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, X, Sparkles, BookOpen, Search, Brain, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEnhancedOnboardingAnalytics } from '@/hooks/useEnhancedOnboardingAnalytics';
import { PersonalizationStep } from './PersonalizationStep';
import { TestimonialSection } from './TestimonialSection';
import { StepContent } from './StepContent';

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

interface EnhancedOnboardingFlowProps {
  onComplete: (preferences?: EnhancedUserPreferences) => void;
  onSkip: () => void;
}

interface EnhancedUserPreferences {
  role: string;
  primaryGoal: string;
  contentTypes: string[];
  appType: string;
  experienceLevel: string;
  mainObjective: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Accio',
    description: 'Your AI-powered knowledge companion',
    content: 'Transform scattered information into organized knowledge that works for you. Join thousands of creators building smarter workflows.',
    icon: <Sparkles className="h-8 w-8 text-white" />,
    benefits: [
      'Save content from any website instantly',
      'AI automatically organizes everything',
      'Find anything with smart search'
    ],
    cta: 'Let\'s get started',
    illustration: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop'
  },
  {
    id: 'save',
    title: 'Save Content Instantly',
    description: 'One-click saving from anywhere',
    content: 'Save articles, videos, PDFs, and more with our browser extension or by pasting URLs directly. Never lose important information again.',
    icon: <BookOpen className="h-8 w-8 text-white" />,
    benefits: [
      'Browser extension for one-click saving',
      'Mobile app for saving on the go',
      'Upload files directly to your library'
    ],
    cta: 'Show me how',
    illustration: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop'
  },
  {
    id: 'organize',
    title: 'AI Organization',
    description: 'Smart categorization without the work',
    content: 'Our AI reads and understands your content, automatically adding tags and categories. Spend time reading, not organizing.',
    icon: <Brain className="h-8 w-8 text-white" />,
    benefits: [
      'Automatic tagging and categorization',
      'Smart content recommendations',
      'Custom collections and folders'
    ],
    cta: 'See AI in action',
    illustration: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
  },
  {
    id: 'search',
    title: 'Find Anything Instantly',
    description: 'Natural language search that understands you',
    content: 'Search by keywords, topics, or even describe what you remember. Our AI understands context and finds exactly what you need.',
    icon: <Search className="h-8 w-8 text-white" />,
    benefits: [
      'Natural language queries',
      'Semantic search across all content',
      'Filter by date, type, or tags'
    ],
    cta: 'Try searching',
    illustration: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'
  }
];

export const EnhancedOnboardingFlow: React.FC<EnhancedOnboardingFlowProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [preferences, setPreferences] = useState<EnhancedUserPreferences>({
    role: '',
    primaryGoal: '',
    contentTypes: [],
    appType: '',
    experienceLevel: '',
    mainObjective: ''
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const analytics = useEnhancedOnboardingAnalytics();

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  const step = onboardingSteps[currentStep];

  useEffect(() => {
    analytics.trackOnboardingStarted();
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    analytics.trackStepCompleted(currentStep + 1, step.id);
  }, [currentStep, step.id, analytics]);

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowPersonalization(true);
      }
      setIsAnimating(false);
    }, 150);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
      setIsAnimating(false);
    }, 150);
  };

  const handleComplete = () => {
    const timeSpent = Date.now() - startTime;
    analytics.trackOnboardingCompleted({ ...preferences, timeSpent });
    onComplete(preferences);
  };

  const handleSkip = () => {
    analytics.trackOnboardingSkipped(currentStep + 1);
    onSkip();
  };

  if (showPersonalization) {
    return (
      <PersonalizationStep
        preferences={preferences}
        setPreferences={setPreferences}
        onComplete={handleComplete}
        onBack={() => setShowPersonalization(false)}
        onSkip={() => onComplete()}
        analytics={analytics}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header with trust signals */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">Accio</span>
            <Badge variant="secondary" className="animate-pulse">Setup</Badge>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>Trusted by 10,000+ creators</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip for now
            <X className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Enhanced Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress 
            value={progress} 
            className="h-3 transition-all duration-500 ease-out" 
          />
        </div>

        {/* Main Content */}
        <StepContent 
          step={step}
          onNext={handleNext}
          isAnimating={isAnimating}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mb-12">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0 || isAnimating}
            className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {/* Step indicators */}
          <div className="flex gap-2">
            {onboardingSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => !isAnimating && setCurrentStep(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentStep ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/50",
                  index < currentStep && "bg-primary/60"
                )}
                aria-label={`Go to step ${index + 1}`}
                disabled={isAnimating}
              />
            ))}
          </div>

          <div className="w-24" />
        </div>

        {/* Trust Signals / Testimonials */}
        <TestimonialSection />
      </div>
    </div>
  );
};
