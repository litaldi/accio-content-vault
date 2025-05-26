
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Sparkles, Shield, Zap, Brain, Users, Star, Play } from 'lucide-react';
import { copy } from '@/utils/copy';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MarketingHeroSection = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
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
      className="hero-gradient py-24 lg:py-32 px-4 animate-fade-in relative overflow-hidden" 
      aria-labelledby="hero-heading"
      id="hero-section"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-pulse delay-2000" aria-hidden="true"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Enhanced trust indicators with better spacing */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-16 text-white/90 text-sm">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/15 transition-colors">
            <Shield className="h-4 w-4" />
            <span className="font-medium">{copy.trust.security}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/15 transition-colors">
            <Brain className="h-4 w-4" />
            <span className="font-medium">AI-powered organization</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/15 transition-colors">
            <Users className="h-4 w-4" />
            <span className="font-medium">Trusted by {copy.social.userCount} users</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/15 transition-colors">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="font-medium">{copy.trust.freeTrial}</span>
          </div>
        </div>

        {/* Improved headline with better hierarchy */}
        <h1 
          id="hero-heading" 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight max-w-5xl mx-auto tracking-tight"
        >
          {copy.headlines.hero}
          <Sparkles className="inline-block ml-4 h-8 w-8 text-white/70 animate-pulse" aria-hidden="true" />
        </h1>
        
        {/* Enhanced value proposition */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-up delay-500">
          {copy.headlines.subhero}
        </p>

        {/* Enhanced CTA section with demo option */}
        <div className="flex flex-col items-center gap-8 mb-20 animate-fade-up delay-700">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/register')} 
                    className="bg-white text-primary hover:bg-white/95 focus-visible:ring-offset-primary group shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl text-lg px-10 py-4 h-auto font-bold relative overflow-hidden"
                  >
                    <Sparkles className="mr-3 h-5 w-5 relative z-10 transition-transform group-hover:rotate-12" aria-hidden="true" />
                    <span className="relative z-10">{copy.buttons.getStarted}</span>
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2 relative z-10" aria-hidden="true" />
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary border-primary/20 shadow-xl">
                  <p className="font-medium">{copy.trust.noCredit} • {copy.trust.freeTrial} • {copy.trust.setupTime}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setShowDemo(!showDemo)} 
              className="border-2 border-white/60 hover:bg-white/15 hover:border-white focus-visible:ring-offset-primary focus-visible:ring-white text-white backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-2 text-lg px-10 py-4 h-auto font-semibold group"
            >
              <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              See how it works
            </Button>
          </div>

          {/* Quick demo preview */}
          {showDemo && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-scale-in max-w-md">
              <div className="text-white/90 text-sm mb-4 text-center">
                <p className="font-semibold mb-2">Watch Accio in action:</p>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Save any webpage in one click</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>AI organizes everything automatically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Find anything with smart search</span>
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowDemo(false)}
                className="text-white/70 hover:text-white hover:bg-white/10 w-full"
              >
                Got it, thanks!
              </Button>
            </div>
          )}
        </div>

        {/* Enhanced social proof with better layout */}
        <div className="mb-20 text-white/80 animate-fade-up delay-1000">
          <p className="text-lg mb-6 font-medium">{copy.social.companies}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-white/90 font-medium text-lg">
              {copy.social.rating} from 2,500+ happy users
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="mt-20 animate-bounce delay-1200">
          <a 
            href="#features-section" 
            onClick={handleScroll}
            className="inline-flex flex-col items-center gap-4 text-white/90 hover:text-white transition-all duration-300 group"
            aria-label="Learn how Accio works"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="font-semibold text-xl relative">
              See how it works
              <span 
                className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white/70 transform origin-left transition-transform duration-300 ${isHovering ? 'scale-x-100' : 'scale-x-0'}`} 
                aria-hidden="true"
              ></span>
            </span>
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors">
              <ChevronDown className="h-6 w-6 animate-bounce group-hover:animate-pulse" aria-hidden="true" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MarketingHeroSection;
