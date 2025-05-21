
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, FileText, Search, Tag } from 'lucide-react';

// Define the steps for onboarding
const onboardingSteps = [{
  title: "Save Content",
  description: "Save articles, webpages, and files with a single click.",
  icon: <Link className="h-8 w-8 text-primary" aria-hidden="true" />
}, {
  title: "AI Tagging",
  description: "Accio automatically tags your content for easy organization.",
  icon: <Tag className="h-8 w-8 text-primary" aria-hidden="true" />
}, {
  title: "Upload Files",
  description: "Upload PDFs and images directly to your collection.",
  icon: <FileText className="h-8 w-8 text-primary" aria-hidden="true" />
}, {
  title: "Smart Search",
  description: "Find content with keywords or natural language questions.",
  icon: <Search className="h-8 w-8 text-primary" aria-hidden="true" />
}];

const OnboardingSection = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  
  // Auto-advance steps when autoAdvance is true
  useEffect(() => {
    if (!autoAdvance) return;
    
    const timer = setTimeout(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(0);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentStep, autoAdvance]);
  
  // Stop auto-advance when user interacts with steps
  const handleStepClick = (index: number) => {
    setAutoAdvance(false);
    setCurrentStep(index);
  };
  
  const handleNextStep = () => {
    setAutoAdvance(false);
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/register');
    }
  };

  return (
    <section 
      className="py-16 px-4 bg-background" 
      aria-labelledby="onboarding-heading"
      id="onboarding-section"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 id="onboarding-heading" className="text-3xl font-bold mb-4">How Accio Works</h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Your personal content library, organized by AI
        </p>
        
        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden border-2 border-primary/10 shadow-sm">
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
                    className={`h-1 flex-1 transition-colors duration-300 ${index <= currentStep ? "bg-primary" : "bg-muted"}`} 
                  />
                ))}
              </div>
              
              {/* Content */}
              <div 
                className="p-8" 
                aria-live="polite"
                tabIndex={0}
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6" aria-hidden="true">
                  {onboardingSteps[currentStep].icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  {onboardingSteps[currentStep].title}
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  {onboardingSteps[currentStep].description}
                </p>
                <Button 
                  size="lg" 
                  onClick={handleNextStep} 
                  aria-label={currentStep < onboardingSteps.length - 1 ? 
                    `Next: ${onboardingSteps[currentStep + 1]?.title || 'Get Started'}` : 
                    'Get Started'}
                  className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {currentStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mt-16">
          {onboardingSteps.map((step, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-lg border ${index === currentStep ? "border-primary bg-primary/5" : "border-border bg-card"} cursor-pointer transition-colors hover:border-primary/70`} 
              onClick={() => handleStepClick(index)} 
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStepClick(index);
                }
              }} 
              tabIndex={0} 
              role="button" 
              aria-selected={index === currentStep} 
              aria-label={`View ${step.title} details`}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
