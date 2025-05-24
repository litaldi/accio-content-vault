
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Sparkles, Shield, Zap } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetSection = document.querySelector('#onboarding-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      className="hero-gradient py-20 lg:py-32 px-4 animate-fade-in relative overflow-hidden" 
      aria-labelledby="hero-heading"
      id="hero-section"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Trust indicators */}
        <div className="flex justify-center items-center gap-6 mb-8 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Free to Start</span>
          </div>
        </div>

        <h1 
          id="hero-heading" 
          className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight max-w-5xl mx-auto tracking-tight"
        >
          Remember
          <span className="text-white/90 block md:inline md:ml-4">
            everything you discover
          </span>
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent block">
            online
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed">
          Accio helps you save, organize, and rediscover your valuable online content with 
          <span className="font-semibold text-white"> AI-powered tagging</span> and 
          <span className="font-semibold text-white"> intelligent search</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')} 
                  className="bg-white text-primary hover:bg-white/90 focus-visible:ring-offset-primary group shadow-xl transform transition-all hover:-translate-y-1 hover:shadow-2xl text-lg px-8 py-4 h-auto"
                >
                  <Sparkles className="mr-2 h-5 w-5" aria-hidden="true" />
                  Start Your Free Account
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>No credit card required • Free forever plan available</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/login')} 
            className="border-2 border-white/50 hover:bg-white/10 hover:border-white focus-visible:ring-offset-primary focus-visible:ring-white text-white backdrop-blur-sm transform transition-all hover:-translate-y-1 text-lg px-8 py-4 h-auto"
          >
            Sign In
          </Button>
        </div>

        {/* Social proof */}
        <div className="mb-12 text-white/70 text-sm">
          <p>Join thousands of users organizing their digital lives</p>
        </div>
        
        <div className="mt-16 animate-bounce">
          <a 
            href="#onboarding-section" 
            onClick={handleScroll}
            className="inline-flex flex-col items-center gap-3 text-white/90 hover:text-white transition-all duration-300 group"
            aria-label="Learn how Accio works"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="font-medium text-lg relative">
              See how it works
              <span 
                className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white/70 transform origin-left transition-transform duration-300 ${isHovering ? 'scale-x-100' : 'scale-x-0'}`} 
                aria-hidden="true"
              ></span>
            </span>
            <ChevronDown className="h-6 w-6 animate-bounce group-hover:animate-pulse" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
