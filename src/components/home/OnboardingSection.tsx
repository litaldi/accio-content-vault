
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, FileText, Search, Tag, Play, Pause } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const onboardingSteps = [{
  title: "Save Content",
  description: "Save articles, webpages, and files with a single click using our browser extension or mobile app.",
  icon: <Link className="h-8 w-8 text-primary" aria-hidden="true" />,
  shortHint: "Browser extension included",
  color: "from-blue-500 to-blue-600"
}, {
  title: "AI Tagging",
  description: "Accio automatically analyzes and tags your content for effortless organization.",
  icon: <Tag className="h-8 w-8 text-primary" aria-hidden="true" />,
  shortHint: "Powered by machine learning",
  color: "from-purple-500 to-purple-600"
}, {
  title: "Upload Files",
  description: "Upload PDFs, images, and documents directly to your personal knowledge library.",
  icon: <FileText className="h-8 w-8 text-primary" aria-hidden="true" />,
  shortHint: "Supports multiple file types",
  color: "from-green-500 to-green-600"
}, {
  title: "Smart Search",
  description: "Find exactly what you need with natural language search or specific keywords.",
  icon: <Search className="h-8 w-8 text-primary" aria-hidden="true" />,
  shortHint: "Semantic search capabilities",
  color: "from-orange-500 to-orange-600"
}];

const OnboardingSection = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, threshold: 0.3 });
  
  // Auto-advance steps when autoAdvance is true and section is in view
  useEffect(() => {
    if (!autoAdvance || !isInView || !isPlaying) return;
    
    const timer = setTimeout(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(0);
      }
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [currentStep, autoAdvance, isInView, isPlaying]);
  
  const handleStepClick = useCallback((index: number) => {
    setAutoAdvance(false);
    setIsPlaying(false);
    setCurrentStep(index);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setAutoAdvance(true);
    }
  }, [isPlaying]);
  
  const handleNextStep = useCallback(() => {
    setAutoAdvance(false);
    setIsPlaying(false);
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/register');
    }
  }, [currentStep, navigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStepClick(index);
    }
  }, [handleStepClick]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-background to-muted/20" 
      aria-labelledby="onboarding-heading"
      id="onboarding-section"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 
          id="onboarding-heading" 
          className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-6'}`}
        >
          How Accio Works
        </h2>
        <p 
          className={`text-xl text-muted-foreground mb-16 max-w-2xl mx-auto transition-all duration-500 delay-150 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-6'}`}
        >
          Your personal content library, organized by AI in just four simple steps
        </p>
        
        <div className="mx-auto max-w-4xl">
          <Card 
            className={`overflow-hidden border-2 border-primary/20 shadow-2xl transition-all duration-500 delay-300 ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
          >
            <CardContent className="p-0">
              {/* Enhanced progress indicator */}
              <div className="flex relative" aria-hidden="true" role="presentation">
                {onboardingSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`h-2 flex-1 transition-all duration-700 ${
                      index <= currentStep 
                        ? `bg-gradient-to-r ${step.color}` 
                        : "bg-muted"
                    }`} 
                  />
                ))}
                {/* Play/Pause control */}
                <div className="absolute -top-8 right-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlayPause}
                    className="h-6 w-6 p-0 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              
              {/* Enhanced content */}
              <div className="p-12 md:p-16" aria-live="polite" tabIndex={0}>
                <div className={`mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br ${onboardingSteps[currentStep].color} flex items-center justify-center mb-8 transition-all duration-500 transform hover:scale-110 shadow-lg`} aria-hidden="true">
                  <div className="text-white">
                    {onboardingSteps[currentStep].icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-6 transition-all duration-300">
                  {onboardingSteps[currentStep].title}
                </h3>
                <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed transition-all duration-300">
                  {onboardingSteps[currentStep].description}
                </p>
                
                <div className="flex justify-center gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="lg" 
                          onClick={handleNextStep} 
                          aria-label={currentStep < onboardingSteps.length - 1 ? 
                            `Next: ${onboardingSteps[currentStep + 1]?.title || 'Get Started'}` : 
                            'Get Started with Accio'}
                          className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 px-8 py-3"
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

                  {currentStep > 0 && (
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-8 py-3"
                    >
                      Previous
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Enhanced step navigation */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-4 gap-6 text-center mt-20 transition-all duration-500 delay-500 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-6'}`}
        >
          {onboardingSteps.map((step, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
                index === currentStep 
                  ? "border-primary bg-primary/5 shadow-lg transform scale-105" 
                  : "border-border bg-card hover:border-primary/50 hover:shadow-md hover:transform hover:scale-102"
              }`} 
              onClick={() => handleStepClick(index)} 
              onKeyDown={(e) => handleKeyDown(e, index)} 
              tabIndex={0} 
              role="button" 
              aria-selected={index === currentStep} 
              aria-label={`View ${step.title} details`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${step.color}`} aria-hidden="true">
                <div className="text-white scale-75">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                {step.description}
              </p>
              {step.shortHint && (
                <p className="text-xs text-primary/80 font-medium italic">{step.shortHint}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
