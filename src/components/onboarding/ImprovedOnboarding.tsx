
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles, BookOpen, Search, Tag } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to Accio',
    description: 'Your personal knowledge library awaits',
    icon: Sparkles,
    content: (
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Transform Your Research Workflow</h3>
        <p className="text-muted-foreground">
          Save any web content, organize it intelligently with AI, and find everything instantly. 
          Let's get you started on your knowledge journey.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary">AI-Powered</Badge>
          <Badge variant="secondary">Instant Search</Badge>
          <Badge variant="secondary">Smart Tags</Badge>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'Save Content',
    description: 'Learn how to save web pages and documents',
    icon: BookOpen,
    content: (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
          <BookOpen className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-center">Save Any Web Content</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
            <div>
              <p className="font-medium">Paste any URL</p>
              <p className="text-sm text-muted-foreground">Articles, blogs, research papers, documentation</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
            <div>
              <p className="font-medium">Upload files</p>
              <p className="text-sm text-muted-foreground">PDFs, images, and documents</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
            <div>
              <p className="font-medium">AI organizes everything</p>
              <p className="text-sm text-muted-foreground">Automatic tagging and categorization</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'Smart Organization',
    description: 'Discover AI-powered tagging and search',
    icon: Tag,
    content: (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
          <Tag className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-center">Intelligent Organization</h3>
        <div className="space-y-3">
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium text-sm">🏷️ Smart Tags</p>
            <p className="text-xs text-muted-foreground">AI automatically tags your content by topic, type, and relevance</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium text-sm">🔍 Semantic Search</p>
            <p className="text-xs text-muted-foreground">Find content by meaning, not just keywords</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium text-sm">📚 Collections</p>
            <p className="text-xs text-muted-foreground">Group related content into organized collections</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: 'Find Anything',
    description: 'Master the powerful search capabilities',
    icon: Search,
    content: (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
          <Search className="h-8 w-8 text-purple-500" />
        </div>
        <h3 className="text-xl font-semibold text-center">Instant Discovery</h3>
        <div className="space-y-3">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">Search examples:</p>
            <div className="space-y-2">
              <code className="bg-muted px-2 py-1 rounded text-xs">"machine learning tutorials"</code>
              <br />
              <code className="bg-muted px-2 py-1 rounded text-xs">tag:research</code>
              <br />
              <code className="bg-muted px-2 py-1 rounded text-xs">type:pdf</code>
            </div>
          </div>
          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm font-medium text-primary">Pro Tip</p>
            <p className="text-xs text-muted-foreground">Use natural language searches like "articles about React hooks" for best results</p>
          </div>
        </div>
      </div>
    )
  }
];

export const ImprovedOnboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    const current = onboardingSteps[currentStep];
    if (!completedSteps.includes(current.id)) {
      setCompletedSteps([...completedSteps, current.id]);
    }

    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const progressValue = ((currentStep + 1) / onboardingSteps.length) * 100;
  const currentStepData = onboardingSteps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="w-full max-w-2xl mx-auto p-6" role="dialog" aria-labelledby="onboarding-title">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 id="onboarding-title" className="text-lg font-semibold">
            {currentStepData.title}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
          <span>{Math.round(progressValue)}% complete</span>
        </div>
        <Progress 
          value={progressValue} 
          className="h-2"
          aria-label={`Onboarding progress: ${Math.round(progressValue)}% complete`}
        />
      </div>

      {/* Content */}
      <Card className="mb-6">
        <CardContent className="p-6">
          {currentStepData.content}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {currentStep > 0 && (
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              aria-label="Go to previous step"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            aria-label="Skip onboarding"
          >
            Skip
          </Button>
          <Button 
            onClick={handleNext}
            aria-label={currentStep === onboardingSteps.length - 1 ? "Complete onboarding" : "Go to next step"}
          >
            {currentStep === onboardingSteps.length - 1 ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Get Started
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Onboarding steps">
        {onboardingSteps.map((step, index) => (
          <button
            key={step.id}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              index === currentStep ? "bg-primary" : "bg-muted",
              completedSteps.includes(step.id) && "bg-green-500"
            )}
            onClick={() => setCurrentStep(index)}
            aria-label={`Go to step ${index + 1}: ${step.title}`}
            role="tab"
            aria-selected={index === currentStep}
          />
        ))}
      </div>
    </div>
  );
};
