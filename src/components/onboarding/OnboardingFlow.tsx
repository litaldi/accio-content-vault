
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, ArrowLeft, X, Sparkles, BookOpen, Search, Brain, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: React.ReactNode;
  benefits: string[];
  cta: string;
}

interface OnboardingFlowProps {
  onComplete: (preferences?: UserPreferences) => void;
  onSkip: () => void;
}

interface UserPreferences {
  role: string;
  primaryGoal: string;
  contentTypes: string[];
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Accio',
    description: 'Your AI-powered knowledge companion',
    content: 'Transform scattered information into organized knowledge that works for you.',
    icon: <Sparkles className="h-8 w-8 text-white" />,
    benefits: [
      'Save content from any website instantly',
      'AI automatically organizes everything',
      'Find anything with smart search'
    ],
    cta: 'Let\'s get started'
  },
  {
    id: 'save',
    title: 'Save Content Instantly',
    description: 'One-click saving from anywhere',
    content: 'Save articles, videos, PDFs, and more with our browser extension or by pasting URLs directly.',
    icon: <BookOpen className="h-8 w-8 text-white" />,
    benefits: [
      'Browser extension for one-click saving',
      'Mobile app for saving on the go',
      'Upload files directly to your library'
    ],
    cta: 'Show me how'
  },
  {
    id: 'organize',
    title: 'AI Organization',
    description: 'Smart categorization without the work',
    content: 'Our AI reads and understands your content, automatically adding tags and categories.',
    icon: <Brain className="h-8 w-8 text-white" />,
    benefits: [
      'Automatic tagging and categorization',
      'Smart content recommendations',
      'Custom collections and folders'
    ],
    cta: 'See AI in action'
  },
  {
    id: 'search',
    title: 'Find Anything Instantly',
    description: 'Natural language search that understands you',
    content: 'Search by keywords, topics, or even describe what you remember. Our AI understands context.',
    icon: <Search className="h-8 w-8 text-white" />,
    benefits: [
      'Natural language queries',
      'Semantic search across all content',
      'Filter by date, type, or tags'
    ],
    cta: 'Try searching'
  }
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    role: '',
    primaryGoal: '',
    contentTypes: []
  });

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  const step = onboardingSteps[currentStep];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowPersonalization(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(preferences);
  };

  if (showPersonalization) {
    return (
      <PersonalizationStep
        preferences={preferences}
        setPreferences={setPreferences}
        onComplete={handleComplete}
        onBack={() => setShowPersonalization(false)}
        onSkip={() => onComplete()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">Accio</span>
            <Badge variant="secondary">Setup</Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip for now
            <X className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content */}
        <Card className="mb-8 border-2 border-primary/20 shadow-xl">
          <CardContent className="p-12 text-center">
            {/* Icon */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-8 shadow-2xl">
              {step.icon}
            </div>

            {/* Content */}
            <h2 className="text-3xl font-bold mb-4">{step.title}</h2>
            <p className="text-xl text-muted-foreground mb-8">{step.description}</p>
            <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">{step.content}</p>

            {/* Benefits */}
            <div className="grid gap-4 mb-8 max-w-2xl mx-auto">
              {step.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 text-left">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button 
              size="lg" 
              onClick={handleNext}
              className="px-8 py-4 text-lg font-semibold"
            >
              {step.cta}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Navigation */}
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

          {/* Step indicators */}
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

          <div className="w-24" /> {/* Spacer for alignment */}
        </div>
      </div>
    </div>
  );
};

interface PersonalizationStepProps {
  preferences: UserPreferences;
  setPreferences: (prefs: UserPreferences) => void;
  onComplete: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const PersonalizationStep: React.FC<PersonalizationStepProps> = ({
  preferences,
  setPreferences,
  onComplete,
  onBack,
  onSkip
}) => {
  const roles = [
    { id: 'student', label: 'Student', icon: '🎓' },
    { id: 'researcher', label: 'Researcher', icon: '🔬' },
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'creator', label: 'Content Creator', icon: '✨' }
  ];

  const goals = [
    { id: 'research', label: 'Research & Learning', icon: '📚' },
    { id: 'work', label: 'Work & Productivity', icon: '⚡' },
    { id: 'personal', label: 'Personal Knowledge', icon: '🧠' },
    { id: 'sharing', label: 'Sharing & Collaboration', icon: '🤝' }
  ];

  const contentTypes = [
    { id: 'articles', label: 'Articles & Blogs' },
    { id: 'videos', label: 'Videos & Tutorials' },
    { id: 'research', label: 'Research Papers' },
    { id: 'social', label: 'Social Media Posts' },
    { id: 'documents', label: 'PDFs & Documents' },
    { id: 'images', label: 'Images & Screenshots' }
  ];

  const updatePreferences = (key: keyof UserPreferences, value: any) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const toggleContentType = (type: string) => {
    const current = preferences.contentTypes;
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    updatePreferences('contentTypes', updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="border-2 border-primary/20 shadow-xl">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Personalize Your Experience</h2>
              <p className="text-xl text-muted-foreground">
                Help us tailor Accio to your needs (optional)
              </p>
            </div>

            <div className="space-y-8">
              {/* Role Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What best describes you?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => updatePreferences('role', role.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-center",
                        preferences.role === role.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="text-2xl mb-2">{role.icon}</div>
                      <div className="font-medium">{role.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What's your primary goal?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => updatePreferences('primaryGoal', goal.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-center",
                        preferences.primaryGoal === goal.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="text-2xl mb-2">{goal.icon}</div>
                      <div className="font-medium">{goal.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Types */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What content do you usually save?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => toggleContentType(type.id)}
                      className={cn(
                        "p-3 rounded-lg border-2 transition-all text-left",
                        preferences.contentTypes.includes(type.id)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-12">
              <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button variant="ghost" onClick={onSkip}>
                Skip personalization
              </Button>

              <Button onClick={onComplete} className="flex items-center gap-2">
                Complete Setup
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
