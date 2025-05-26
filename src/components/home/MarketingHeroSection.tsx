
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Sparkles, Shield, Brain, Users, Star, Play } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MarketingHeroSection = () => {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetSection = document.querySelector('#features-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      className="relative py-24 lg:py-32 px-4 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden" 
      aria-labelledby="hero-heading"
      id="hero-section"
    >
      {/* Background effects - static, no animations */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-50" aria-hidden="true"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl opacity-30" aria-hidden="true"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl opacity-20" aria-hidden="true"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-16 text-white/90 text-sm">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/15 transition-colors focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2">
            <Shield className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium">Bank-level security</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/15 transition-colors focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2">
            <Brain className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium">AI-powered organization</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/15 transition-colors focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2">
            <Users className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium">Trusted by 10,000+ users</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/15 transition-colors focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2">
            <Star className="h-4 w-4 text-yellow-400" aria-hidden="true" />
            <span className="font-medium">Free plan, always</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 
          id="hero-heading" 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight max-w-5xl mx-auto tracking-tight"
        >
          <span className="inline-block">Stop losing your</span>
          <span className="text-white/95 block md:inline md:ml-4">
            best ideas.
          </span>
          <span className="bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent block relative">
            Start building brilliance.
          </span>
        </h1>
        
        {/* Value proposition */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform scattered bookmarks into an AI-powered knowledge engine. 
          Save anything, find everything, and
          <span className="font-semibold text-white relative mx-2">
            achieve 10x productivity
          </span> 
          with intelligent organization.
        </p>

        {/* CTA section */}
        <div className="flex flex-col items-center gap-8 mb-20">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/register')} 
                    className="bg-white text-primary hover:bg-white/95 focus-visible:ring-offset-primary group shadow-2xl text-lg px-10 py-4 h-auto font-bold relative overflow-hidden focus:ring-2 focus:ring-white focus:ring-offset-2"
                  >
                    <Sparkles className="mr-3 h-5 w-5 relative z-10" aria-hidden="true" />
                    <span className="relative z-10">Start building your library</span>
                    <ArrowRight className="ml-3 h-5 w-5 relative z-10" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary border-primary/20 shadow-xl">
                  <p className="font-medium">No credit card • Forever free plan • Ready in 30 seconds</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setShowDemo(!showDemo)} 
              className="border-2 border-white/60 hover:bg-white/15 hover:border-white focus-visible:ring-offset-primary focus-visible:ring-white text-white backdrop-blur-sm text-lg px-10 py-4 h-auto font-semibold group focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <Play className="mr-2 h-4 w-4" aria-hidden="true" />
              See how it works
            </Button>
          </div>

          {/* Demo preview */}
          {showDemo && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md" role="region" aria-labelledby="demo-heading">
              <div className="text-white/90 text-sm mb-4 text-center">
                <p id="demo-heading" className="font-semibold mb-2">Watch Accio in action:</p>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" aria-hidden="true"></div>
                    <span>Save any webpage in one click</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" aria-hidden="true"></div>
                    <span>AI organizes everything automatically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" aria-hidden="true"></div>
                    <span>Find anything with smart search</span>
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowDemo(false)}
                className="text-white/70 hover:text-white hover:bg-white/10 w-full focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                Got it, thanks!
              </Button>
            </div>
          )}
        </div>

        {/* Social proof */}
        <div className="mb-20 text-white/80">
          <p className="text-lg mb-6 font-medium">Loved by knowledge workers at companies like Google, Microsoft, and Netflix</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2" role="img" aria-label="5 star rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" aria-hidden="true" />
              ))}
            </div>
            <div className="text-white/90 font-medium text-lg">
              4.9 stars from 2,500+ happy users
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="mt-20">
          <a 
            href="#features-section" 
            onClick={handleScroll}
            className="inline-flex flex-col items-center gap-4 text-white/90 hover:text-white transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary rounded-lg"
            aria-label="Learn how Accio works"
          >
            <span className="font-semibold text-xl relative">
              See how it works
            </span>
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors">
              <ChevronDown className="h-6 w-6" aria-hidden="true" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MarketingHeroSection;
