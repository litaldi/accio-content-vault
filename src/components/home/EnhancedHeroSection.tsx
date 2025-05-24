
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedTooltip } from '@/components/ui/enhanced-tooltip';
import { ArrowRight, ChevronDown, Sparkles, Shield, Zap, Brain, Users, Star, Play, CheckCircle } from 'lucide-react';
import { useAccessibility } from '@/hooks/useAccessibility';
import { cn } from '@/lib/utils';

const EnhancedHeroSection = () => {
  const navigate = useNavigate();
  const { isReducedMotion } = useAccessibility();
  const [isHovering, setIsHovering] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    "Save any webpage in one click",
    "AI organizes everything automatically", 
    "Find anything with smart search",
    "Works across all your devices"
  ];
  
  // Rotate features every 3 seconds
  useEffect(() => {
    if (isReducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isReducedMotion, features.length]);
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetSection = document.querySelector('#onboarding-section');
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: isReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  };

  const trustIndicators = [
    { icon: Shield, text: "Bank-level security", color: "from-blue-500 to-blue-600" },
    { icon: Brain, text: "AI-powered organization", color: "from-purple-500 to-purple-600" },
    { icon: Users, text: "Trusted by 10,000+ users", color: "from-green-500 to-green-600" },
    { icon: Star, text: "Free plan, always", color: "from-yellow-500 to-yellow-600" }
  ];
  
  return (
    <section 
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-primary via-primary/95 to-primary/90",
        "section-padding"
      )}
      aria-labelledby="hero-heading"
      id="hero-section"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10" aria-hidden="true" />
      
      {/* Animated background elements */}
      {!isReducedMotion && (
        <>
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-pulse delay-2000" aria-hidden="true" />
        </>
      )}
      
      <div className="max-w-7xl mx-auto text-center relative z-10 container-padding">
        {/* Enhanced trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-12 animate-fade-in">
          {trustIndicators.map((indicator, index) => (
            <EnhancedTooltip
              key={index}
              content={`Learn more about our ${indicator.text.toLowerCase()}`}
              variant="info"
            >
              <div className={cn(
                "flex items-center gap-2 bg-white/10 rounded-full px-4 py-2",
                "backdrop-blur-sm hover:bg-white/15 transition-all duration-300",
                "border border-white/20 hover:border-white/30",
                "cursor-pointer group"
              )}>
                <div className={cn(
                  "w-5 h-5 rounded-full bg-gradient-to-r flex items-center justify-center",
                  indicator.color
                )}>
                  <indicator.icon className="h-3 w-3 text-white" />
                </div>
                <span className="text-white/90 font-medium text-sm group-hover:text-white transition-colors">
                  {indicator.text}
                </span>
              </div>
            </EnhancedTooltip>
          ))}
        </div>

        {/* Improved headline with better typography */}
        <div className="space-y-6 mb-12">
          <h1 
            id="hero-heading" 
            className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight",
              "max-w-5xl mx-auto tracking-tight text-balance"
            )}
          >
            <span className={cn(
              "inline-block",
              !isReducedMotion && "animate-slide-up"
            )}>
              Turn the internet
            </span>
            <span className={cn(
              "text-white/95 block md:inline md:ml-4",
              !isReducedMotion && "animate-slide-up delay-150"
            )}>
              into your personal
            </span>
            <span className={cn(
              "bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent",
              "block relative",
              !isReducedMotion && "animate-slide-up delay-300"
            )}>
              knowledge library
              <Sparkles className={cn(
                "absolute -top-4 -right-8 h-8 w-8 text-white/70",
                !isReducedMotion && "animate-pulse delay-1000"
              )} aria-hidden="true" />
            </span>
          </h1>
          
          {/* Dynamic feature showcase */}
          <div className={cn(
            "text-lg md:text-xl text-white/80 font-medium h-8 flex items-center justify-center",
            !isReducedMotion && "animate-fade-up delay-500"
          )}>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className={cn(
                "transition-all duration-500",
                !isReducedMotion && "animate-fade-in"
              )}>
                {features[currentFeature]}
              </span>
            </div>
          </div>
        </div>
        
        {/* Enhanced value proposition */}
        <p className={cn(
          "text-lg md:text-xl lg:text-2xl text-white/95 mb-12",
          "max-w-4xl mx-auto leading-relaxed text-pretty",
          !isReducedMotion && "animate-fade-up delay-700"
        )}>
          Save any webpage, document, or file. Let AI organize everything perfectly.
          <span className="font-semibold text-white relative mx-2 inline-block">
            Find anything instantly
            <div className={cn(
              "absolute -bottom-1 left-0 w-full h-1 bg-white/30 rounded-full",
              !isReducedMotion && "animate-pulse delay-1000"
            )} />
          </span> 
          with natural language search.
        </p>

        {/* Enhanced CTA section */}
        <div className={cn(
          "flex flex-col items-center gap-8 mb-16",
          !isReducedMotion && "animate-fade-up delay-900"
        )}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <EnhancedTooltip
              content="No credit card • Forever free plan • Ready in 30 seconds"
              variant="info"
              size="lg"
            >
              <EnhancedButton
                size="xl"
                variant="premium"
                onClick={() => navigate('/register')}
                className="shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl"
                icon={<Sparkles className="h-5 w-5" />}
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Start building your library
              </EnhancedButton>
            </EnhancedTooltip>
            
            <EnhancedButton
              size="xl"
              variant="outline"
              onClick={() => setShowDemo(!showDemo)}
              className={cn(
                "border-2 border-white/60 hover:bg-white/15 hover:border-white",
                "text-white backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-2"
              )}
              icon={<Play className="h-4 w-4" />}
            >
              See how it works
            </EnhancedButton>
          </div>

          {/* Interactive demo preview */}
          {showDemo && (
            <div className={cn(
              "bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20",
              "max-w-md w-full mx-auto",
              !isReducedMotion && "animate-scale-in"
            )}>
              <div className="text-white/90 text-sm mb-4 text-center">
                <p className="font-semibold mb-4 text-lg">Watch Accio in action:</p>
                <div className="space-y-3 text-left">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === currentFeature ? "bg-green-400 scale-125" : "bg-white/50"
                      )} />
                      <span className={cn(
                        "transition-all duration-300",
                        index === currentFeature ? "text-white font-medium" : "text-white/70"
                      )}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <EnhancedButton
                size="sm"
                variant="ghost"
                onClick={() => setShowDemo(false)}
                className="text-white/70 hover:text-white hover:bg-white/10 w-full"
              >
                Got it, thanks!
              </EnhancedButton>
            </div>
          )}
        </div>

        {/* Enhanced social proof */}
        <div className={cn(
          "mb-16 text-white/80 space-y-6",
          !isReducedMotion && "animate-fade-up delay-1000"
        )}>
          <p className="text-lg font-medium">
            Loved by knowledge workers at companies like Google, Microsoft, and Netflix
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-white/90 font-medium text-lg">
              4.9 stars from 2,500+ happy users
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className={cn(
          "mt-16",
          !isReducedMotion && "animate-bounce delay-1200"
        )}>
          <a 
            href="#onboarding-section" 
            onClick={handleScroll}
            className={cn(
              "inline-flex flex-col items-center gap-4 text-white/90 hover:text-white",
              "transition-all duration-300 group focus-ring"
            )}
            aria-label="Learn how Accio works"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="font-semibold text-xl relative">
              See how it works
              <span 
                className={cn(
                  "absolute -bottom-1 left-0 w-full h-0.5 bg-white/70",
                  "transform origin-left transition-transform duration-300",
                  isHovering ? "scale-x-100" : "scale-x-0"
                )} 
                aria-hidden="true"
              />
            </span>
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors border border-white/20">
              <ChevronDown className={cn(
                "h-6 w-6",
                !isReducedMotion && "animate-bounce group-hover:animate-pulse"
              )} aria-hidden="true" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
