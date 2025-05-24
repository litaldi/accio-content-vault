
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, FileText, Search, Tag, Play, Pause, CheckCircle, ArrowRight } from 'lucide-react';
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
  icon: <Link className="h-8 w-8 text-white" aria-hidden="true" />,
  shortHint: "Browser extension included",
  color: "from-blue-500 to-blue-600",
  benefits: ["One-click saving", "Cross-platform support", "Instant capture"]
}, {
  title: "AI Tagging",
  description: "Accio automatically analyzes and tags your content for effortless organization.",
  icon: <Tag className="h-8 w-8 text-white" aria-hidden="true" />,
  shortHint: "Powered by machine learning",
  color: "from-purple-500 to-purple-600",
  benefits: ["Smart categorization", "Auto-tagging", "Custom labels"]
}, {
  title: "Upload Files",
  description: "Upload PDFs, images, and documents directly to your personal knowledge library.",
  icon: <FileText className="h-8 w-8 text-white" aria-hidden="true" />,
  shortHint: "Supports multiple file types",
  color: "from-green-500 to-green-600",
  benefits: ["PDF support", "Image OCR", "Document analysis"]
}, {
  title: "Smart Search",
  description: "Find exactly what you need with natural language search or specific keywords.",
  icon: <Search className="h-8 w-8 text-white" aria-hidden="true" />,
  shortHint: "Semantic search capabilities",
  color: "from-orange-500 to-orange-600",
  benefits: ["Natural language", "Instant results", "Contextual search"]
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
      className="py-32 px-4 bg-gradient-to-b from-background via-muted/20 to-background" 
      aria-labelledby="onboarding-heading"
      id="onboarding-section"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 
          id="onboarding-heading" 
          className={`text-5xl md:text-6xl font-bold mb-8 transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
        >
          How Accio Works
        </h2>
        <p 
          className={`text-2xl text-muted-foreground mb-20 max-w-3xl mx-auto transition-all duration-700 delay-200 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
        >
          Your personal content library, organized by AI in just four simple steps
        </p>
        
        <div className="mx-auto max-w-5xl">
          <Card 
            className={`overflow-hidden border-2 border-primary/20 shadow-2xl transition-all duration-700 delay-400 bg-gradient-to-br from-card to-card/95 ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'}`}
          >
            <CardContent className="p-0 relative">
              {/* Enhanced progress indicator */}
              <div className="flex relative bg-muted/20" aria-hidden="true" role="presentation">
                {onboardingSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`h-3 flex-1 transition-all duration-1000 ${
                      index <= currentStep 
                        ? `bg-gradient-to-r ${step.color}` 
                        : "bg-muted"
                    }`} 
                  />
                ))}
                
                {/* Play/Pause control */}
                <div className="absolute -top-10 right-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlayPause}
                    className="h-8 w-8 p-0 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-md border border-border/50"
                    aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              {/* Enhanced content */}
              <div className="p-16 md:p-20" aria-live="polite" tabIndex={0}>
                <div className={`mx-auto w-32 h-32 rounded-3xl bg-gradient-to-br ${onboardingSteps[currentStep].color} flex items-center justify-center mb-10 transition-all duration-500 transform hover:scale-110 shadow-2xl relative overflow-hidden group`} aria-hidden="true">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-white/20 rounded-3xl transform scale-0 group-hover:scale-100 transition-transform duration-500" />
                  <div className="relative z-10">
                    {onboardingSteps[currentStep].icon}
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-500" />
                </div>
                
                <h3 className="text-4xl font-bold mb-8 transition-all duration-300">
                  {onboardingSteps[currentStep].title}
                </h3>
                
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-300">
                  {onboardingSteps[currentStep].description}
                </p>
                
                {/* Benefits list */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {onboardingSteps[currentStep].benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-muted"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="lg" 
                          onClick={handleNextStep} 
                          aria-label={currentStep < onboardingSteps.length - 1 ? 
                            `Next: ${onboardingSteps[currentStep + 1]?.title || 'Get Started'}` : 
                            'Get Started with Accio'}
                          className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 px-12 py-4 text-lg font-semibold group"
                        >
                          {currentStep < onboardingSteps.length - 1 ? (
                            <>
                              Continue Journey
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </>
                          ) : (
                            <>
                              Start Building Your Library
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
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
                      className="px-12 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
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
          className={`grid grid-cols-1 md:grid-cols-4 gap-8 text-center mt-24 transition-all duration-700 delay-600 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
        >
          {onboardingSteps.map((step, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                index === currentStep 
                  ? "border-primary bg-primary/5 shadow-xl transform scale-105" 
                  : "border-border bg-card hover:border-primary/50 hover:shadow-lg hover:transform hover:scale-102"
              }`} 
              onClick={() => handleStepClick(index)} 
              onKeyDown={(e) => handleKeyDown(e, index)} 
              tabIndex={0} 
              role="button" 
              aria-selected={index === currentStep} 
              aria-label={`View ${step.title} details`}
            >
              {/* Step number */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${step.color} shadow-lg relative z-10`} aria-hidden="true">
                <div className="scale-75 text-white">
                  {step.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 relative z-10">{step.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4 relative z-10">
                {step.description}
              </p>
              
              {step.shortHint && (
                <p className="text-xs text-primary/80 font-semibold italic relative z-10 bg-primary/10 rounded-full px-3 py-1 inline-block">
                  {step.shortHint}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
