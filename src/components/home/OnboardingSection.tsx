
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, FileText, Search, Tag, Play, Pause, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
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
  shortHint: "One-click magic",
  color: "from-blue-500 to-blue-600",
  benefits: ["Browser extension", "Mobile sharing", "Instant capture"],
  stats: "Save in <1 second"
}, {
  title: "AI Tagging",
  description: "Accio automatically analyzes and tags your content for effortless organization using advanced AI.",
  icon: <Tag className="h-8 w-8 text-white" aria-hidden="true" />,
  shortHint: "Smart categorization",
  color: "from-purple-500 to-purple-600",
  benefits: ["Auto-categorization", "Smart labels", "Custom tags"],
  stats: "95% accuracy"
}, {
  title: "Upload Files",
  description: "Upload PDFs, images, and documents directly to your personal knowledge library with OCR support.",
  icon: <FileText className="h-8 w-8 text-white" aria-hidden="true" />,
  shortHint: "Multiple file types",
  color: "from-green-500 to-green-600",
  benefits: ["PDF support", "Image OCR", "Document analysis"],
  stats: "10MB max size"
}, {
  title: "Smart Search",
  description: "Find exactly what you need with natural language search, keyword matching, and semantic understanding.",
  icon: <Search className="h-8 w-8 text-white" aria-hidden="true" />,
  shortHint: "Semantic search",
  color: "from-orange-500 to-orange-600",
  benefits: ["Natural language", "Instant results", "Contextual search"],
  stats: "Find anything in ms"
}];

const OnboardingSection = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
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
      className="py-32 px-4 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden" 
      aria-labelledby="onboarding-heading"
      id="onboarding-section"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 
          id="onboarding-heading" 
          className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
        >
          How Accio Works
        </h2>
        <p 
          className={`text-xl md:text-2xl text-muted-foreground mb-20 max-w-3xl mx-auto transition-all duration-700 delay-200 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
        >
          Your personal content library, organized by AI in just 
          <span className="font-bold text-primary"> four simple steps</span>
        </p>
        
        <div className="mx-auto max-w-6xl">
          <Card 
            className={`overflow-hidden border-2 border-primary/20 shadow-2xl transition-all duration-700 delay-400 bg-gradient-to-br from-card to-card/95 relative ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'}`}
          >
            {/* Enhanced progress indicator with animations */}
            <div className="flex relative bg-gradient-to-r from-muted/10 via-muted/20 to-muted/10" aria-hidden="true" role="presentation">
              {onboardingSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`h-4 flex-1 transition-all duration-1000 relative overflow-hidden ${
                    index <= currentStep 
                      ? `bg-gradient-to-r ${step.color}` 
                      : "bg-muted/50"
                  }`} 
                >
                  {index === currentStep && (
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  )}
                </div>
              ))}
              
              {/* Enhanced play/pause control */}
              <div className="absolute -top-12 right-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlayPause}
                  className="h-10 w-10 p-0 rounded-full bg-background/95 backdrop-blur-sm hover:bg-background shadow-lg border border-border/50 group"
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  )}
                </Button>
              </div>
            </div>
            
            <CardContent className="p-16 md:p-20" aria-live="polite" tabIndex={0}>
              {/* Enhanced step visualization */}
              <div className={`mx-auto w-40 h-40 rounded-3xl bg-gradient-to-br ${onboardingSteps[currentStep].color} flex items-center justify-center mb-12 transition-all duration-500 transform hover:scale-110 shadow-2xl relative overflow-hidden group`} aria-hidden="true">
                {/* Animated background layers */}
                <div className="absolute inset-0 bg-white/20 rounded-3xl transform scale-0 group-hover:scale-100 transition-transform duration-500" />
                <div className="absolute inset-4 border-2 border-white/30 rounded-2xl animate-pulse" />
                
                <div className="relative z-10 transition-transform group-hover:rotate-12">
                  {onboardingSteps[currentStep].icon}
                </div>
                
                {/* Enhanced floating particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce delay-500" />
                <Sparkles className="absolute top-6 left-8 h-4 w-4 text-white/50 animate-pulse delay-1000" />
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-4 transition-all duration-300">
                    {onboardingSteps[currentStep].title}
                  </h3>
                  <div className="text-sm font-bold text-primary bg-primary/10 rounded-full px-4 py-2 inline-block mb-6">
                    {onboardingSteps[currentStep].stats}
                  </div>
                </div>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-300">
                  {onboardingSteps[currentStep].description}
                </p>
                
                {/* Enhanced benefits showcase */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {onboardingSteps[currentStep].benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 bg-gradient-to-r from-muted/50 to-muted/30 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:from-primary/10 hover:to-primary/5 hover:scale-105 group"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                
                {/* Enhanced action buttons */}
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
                          className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 px-12 py-4 text-lg font-semibold group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <span className="relative z-10">
                            {currentStep < onboardingSteps.length - 1 ? (
                              <>
                                Continue Journey
                                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                              </>
                            ) : (
                              <>
                                Start Building Your Library
                                <Sparkles className="ml-3 h-5 w-5 transition-transform group-hover:rotate-12" />
                              </>
                            )}
                          </span>
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
                      Previous Step
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Enhanced step navigation grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-4 gap-6 text-center mt-24 transition-all duration-700 delay-600 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
        >
          {onboardingSteps.map((step, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                index === currentStep 
                  ? "border-primary bg-primary/10 shadow-xl transform scale-105" 
                  : "border-border bg-card hover:border-primary/50 hover:shadow-lg hover:transform hover:scale-102"
              }`} 
              onClick={() => handleStepClick(index)} 
              onKeyDown={(e) => handleKeyDown(e, index)} 
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              tabIndex={0} 
              role="button" 
              aria-selected={index === currentStep} 
              aria-label={`View ${step.title} details`}
            >
              {/* Enhanced step number indicator */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center text-sm font-bold border border-border/50">
                {index + 1}
              </div>
              
              {/* Dynamic gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Enhanced step icon */}
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${step.color} shadow-xl relative z-10 overflow-hidden`} aria-hidden="true">
                <div className="absolute inset-0 bg-white/20 rounded-3xl transform scale-0 group-hover:scale-100 transition-transform duration-500" />
                <div className="scale-75 text-white relative z-10">
                  {step.icon}
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {step.description}
                </p>
                
                {step.shortHint && (
                  <div className="text-xs font-bold text-primary/80 bg-primary/10 rounded-full px-4 py-2 inline-block">
                    {step.shortHint}
                  </div>
                )}
              </div>

              {/* Hover effect indicator */}
              {(hoveredStep === index || index === currentStep) && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/80 animate-scale-in" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
