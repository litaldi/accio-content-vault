
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, FileText, Search, Tag } from 'lucide-react';
import OnboardingStep from './OnboardingStep';

// Define the steps for onboarding
const onboardingSteps = [
  {
    title: "Save Content",
    description: "Save articles, webpages, and files with a single click.",
    icon: <Link className="h-8 w-8 text-primary" aria-hidden="true" />,
  },
  {
    title: "AI Tagging",
    description: "Accio automatically tags your content for easy organization.",
    icon: <Tag className="h-8 w-8 text-primary" aria-hidden="true" />,
  },
  {
    title: "Upload Files",
    description: "Upload PDFs and images directly to your collection.",
    icon: <FileText className="h-8 w-8 text-primary" aria-hidden="true" />,
  },
  {
    title: "Smart Search",
    description: "Find content with keywords or natural language questions.",
    icon: <Search className="h-8 w-8 text-primary" aria-hidden="true" />,
  }
];

const OnboardingSection = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="py-16 px-4 bg-background" aria-labelledby="onboarding-heading">
      <div className="max-w-6xl mx-auto text-center">
        <h2 id="onboarding-heading" className="text-3xl font-bold mb-4">How Accio Works</h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Your personal content library, organized by AI
        </p>
        
        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden border-2 border-primary/10">
            <CardContent className="p-0">
              {/* Progress indicator */}
              <div className="flex" aria-hidden="true">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 ${
                      index <= currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              
              {/* Content */}
              <div className="p-8" aria-live="polite">
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
                  aria-label={currentStep < onboardingSteps.length - 1 
                    ? `Next: ${onboardingSteps[currentStep + 1]?.title || 'Get Started'}` 
                    : 'Get Started'}
                >
                  <span>{currentStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 text-center mt-16">
          {onboardingSteps.map((step, index) => (
            <OnboardingStep 
              key={index}
              title={step.title}
              description={step.description}
              icon={step.icon}
              isSelected={index === currentStep}
              onClick={() => setCurrentStep(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
