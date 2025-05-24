
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, ArrowLeft, X, Sparkles, BookOpen, Search, Brain, Zap, Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOnboardingAnalytics } from '@/hooks/useOnboardingAnalytics';

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

const testimonials = [
  {
    quote: "Accio transformed my research workflow. I can finally find that article I saved months ago!",
    author: "Sarah Chen",
    role: "UX Researcher",
    rating: 5
  },
  {
    quote: "The AI organization is incredible. It knows what I'm looking for before I do.",
    author: "Marcus Johnson",
    role: "Content Creator",
    rating: 5
  },
  {
    quote: "Perfect for academic research. Saves me hours every week organizing papers.",
    author: "Dr. Emily Rodriguez",
    role: "Professor",
    rating: 5
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

  const analytics = useOnboardingAnalytics();

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
      <EnhancedPersonalizationStep
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

        {/* Main Content with enhanced animations */}
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
              onClick={handleNext}
              className="px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 animate-fade-in animation-delay-500"
              disabled={isAnimating}
            >
              {step.cta}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>

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
        <Card className="bg-muted/30 border-muted animate-fade-in animation-delay-700">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Why creators love Accio</h3>
              <div className="flex justify-center items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9/5 from 2,000+ users</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <Quote className="h-5 w-5 text-primary mb-2" />
                  <p className="text-sm mb-3 italic">"{testimonial.quote}"</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface EnhancedPersonalizationStepProps {
  preferences: EnhancedUserPreferences;
  setPreferences: (prefs: EnhancedUserPreferences) => void;
  onComplete: () => void;
  onBack: () => void;
  onSkip: () => void;
  analytics: any;
}

const EnhancedPersonalizationStep: React.FC<EnhancedPersonalizationStepProps> = ({
  preferences,
  setPreferences,
  onComplete,
  onBack,
  onSkip,
  analytics
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

  const appTypes = [
    { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
    { id: 'saas', label: 'SaaS Application', icon: '🚀' },
    { id: 'community', label: 'Community Platform', icon: '👥' },
    { id: 'education', label: 'Educational Content', icon: '📖' },
    { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { id: 'other', label: 'Other', icon: '🔧' }
  ];

  const experienceLevels = [
    { id: 'designer', label: 'Designer', icon: '🎨' },
    { id: 'nocode', label: 'No-Code Builder', icon: '🧩' },
    { id: 'developer', label: 'Developer', icon: '💻' },
    { id: 'beginner', label: 'Complete Beginner', icon: '🌱' }
  ];

  const mainObjectives = [
    { id: 'build-quickly', label: 'Build something quickly', icon: '⚡' },
    { id: 'test-idea', label: 'Test an idea', icon: '🧪' },
    { id: 'learn', label: 'Learn by doing', icon: '📚' },
    { id: 'prototype', label: 'Create a prototype', icon: '🛠️' }
  ];

  const contentTypes = [
    { id: 'articles', label: 'Articles & Blogs' },
    { id: 'videos', label: 'Videos & Tutorials' },
    { id: 'research', label: 'Research Papers' },
    { id: 'social', label: 'Social Media Posts' },
    { id: 'documents', label: 'PDFs & Documents' },
    { id: 'images', label: 'Images & Screenshots' }
  ];

  const updatePreferences = (key: keyof EnhancedUserPreferences, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    analytics.trackStepCompleted(5, `personalization-${key}`);
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
      <div className="w-full max-w-5xl">
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
                        "p-4 rounded-lg border-2 transition-all text-center hover:scale-105",
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

              {/* App Type Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What kind of app are you building?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {appTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => updatePreferences('appType', type.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-center hover:scale-105",
                        preferences.appType === type.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What's your experience level?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => updatePreferences('experienceLevel', level.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-center hover:scale-105",
                        preferences.experienceLevel === level.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="text-2xl mb-2">{level.icon}</div>
                      <div className="font-medium">{level.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Objective */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What do you want to get out of Accio today?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mainObjectives.map((objective) => (
                    <button
                      key={objective.id}
                      onClick={() => updatePreferences('mainObjective', objective.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-center hover:scale-105",
                        preferences.mainObjective === objective.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="text-2xl mb-2">{objective.icon}</div>
                      <div className="font-medium">{objective.label}</div>
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
                        "p-4 rounded-lg border-2 transition-all text-center hover:scale-105",
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
                        "p-3 rounded-lg border-2 transition-all text-left hover:scale-105",
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
