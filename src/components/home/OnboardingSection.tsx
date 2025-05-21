
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, FileText, Search, Tag } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Define the steps for onboarding
const onboardingSteps = [{
  title: "Save Content",
  description: "Save articles, webpages, and files with a single click using our browser extension or mobile app.",
  icon: <Link className="h-8 w-8 text-primary" aria-hidden="true" />,
  shortHint: "Browser extension included"
}, {
  title: "AI Tagging",
  description: "Accio automatically analyzes and tags your content for effortless organization.",
  icon: <Tag className="h-8 w-8 text-primary" aria-hidden="true" />,
  shortHint: "Powered by machine learning"
}, {
  title: "Upload Files",
  description: "Upload PDFs, images, and documents directly to your personal knowledge library.",
  icon: <FileText className="h-8 w-8 text-primary" aria-hidden="true" />,
  shortHint: "Supports multiple file types"
}, {
  title: "Smart Search",
  description: "Find exactly what you need with natural language search or specific keywords.",
  icon: <Search className="h-8 w-8 text-primary" aria-hidden="true" />,
  shortHint: "Semantic search capabilities"
}];

const OnboardingSection = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, threshold: 0.3 });
  
  // Auto-advance steps when autoAdvance is true and section is in view
  useEffect(() => {
    if (!autoAdvance || !isInView) return;
    
    const timer = setTimeout(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(0);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentStep, autoAdvance, isInView]);
  
  // Stop auto-advance when user interacts with steps
  const handleStepClick = useCallback((index: number) => {
    setAutoAdvance(false);
    setCurrentStep(index);
  }, []);
  
  const handleNextStep = useCallback(() => {
    setAutoAdvance(false);
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/register');
    }
  }, [currentStep, navigate]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStepClick(index);
    }
  }, [handleStepClick]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 bg-background" 
      aria-labelledby="onboarding-heading"
      id="onboarding-section"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 
          id="onboarding-heading" 
          className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-6'}`}
        >
          How Accio Works
        </h2>
        <p 
          className={`text-xl text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-500 delay-150 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-6'}`}
        >
          Your personal content library, organized by AI
        </p>
        
        <div className="mx-auto max-w-3xl">
          <Card 
            className={`overflow-hidden border-2 border-primary/10 shadow-md transition-all duration-500 delay-300 ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
          >
            <CardContent className="p-0">
              {/* Progress indicator */}
              <div 
                className="flex" 
                aria-hidden="true"
                role="presentation"
              >
                {onboardingSteps.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-1.5 flex-1 transition-colors duration-500 ${index <= currentStep ? "bg-primary" : "bg-muted"}`} 
                  />
                ))}
              </div>
              
              {/* Content */}
              <div 
                className="p-8 md:p-10" 
                aria-live="polite"
                tabIndex={0}
              >
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 transition-all duration-300 transform hover:scale-110" aria-hidden="true">
                  {onboardingSteps[currentStep].icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 transition-all duration-300">
                  {onboardingSteps[currentStep].title}
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto transition-all duration-300">
                  {onboardingSteps[currentStep].description}
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="lg" 
                        onClick={handleNextStep} 
                        aria-label={currentStep < onboardingSteps.length - 1 ? 
                          `Next: ${onboardingSteps[currentStep + 1]?.title || 'Get Started'}` : 
                          'Get Started with Accio'}
                        className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-sm hover:shadow-md transition-all"
                      >
                        {currentStep < onboardingSteps.length - 1 ? "Continue" : "Get Started"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {currentStep < onboardingSteps.length - 1 ? 
                        `Next: ${onboardingSteps[currentStep + 1]?.title}` : 
                        'Create your free account'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div 
          className={`grid grid-cols-1 md:grid-cols-4 gap-8 text-center mt-16 transition-all duration-500 delay-500 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-6'}`}
        >
          {onboardingSteps.map((step, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-lg border ${index === currentStep ? "border-primary bg-primary/5" : "border-border bg-card"} cursor-pointer transition-colors hover:border-primary/70 group`} 
              onClick={() => handleStepClick(index)} 
              onKeyDown={(e) => handleKeyDown(e, index)} 
              tabIndex={0} 
              role="button" 
              aria-selected={index === currentStep} 
              aria-label={`View ${step.title} details`}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" aria-hidden="true">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {step.description}
              </p>
              {step.shortHint && (
                <p className="text-xs text-primary/80 mt-2 italic">{step.shortHint}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
