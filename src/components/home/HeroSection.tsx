
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
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
      className="hero-gradient py-20 lg:py-28 px-4 animate-fade-in relative" 
      aria-labelledby="hero-heading"
      id="hero-section"
    >
      {/* Visual gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" aria-hidden="true"></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 
          id="hero-heading" 
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto"
        >
          Remember everything you discover online
        </h1>
        <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto">
          Accio helps you save, organize, and rediscover your valuable online content with AI-powered tagging and powerful search.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')} 
                  className="bg-white text-primary hover:bg-white/90 focus-visible:ring-offset-primary group shadow-lg transform transition-all hover:-translate-y-1"
                >
                  Start Your Free Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>No credit card required</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/login')} 
            className="border-white hover:bg-white/10 focus-visible:ring-offset-primary focus-visible:ring-white text-sky-50 transform transition-all hover:-translate-y-1"
          >
            Log In
          </Button>
        </div>
        <div className="mt-12 animate-pulse">
          <a 
            href="#onboarding-section" 
            onClick={handleScroll}
            className="inline-flex flex-col items-center gap-2 text-white/90 hover:text-white transition-colors group"
            aria-label="Learn how Accio works"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="font-medium relative">
              Learn how Accio works
              <span 
                className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white/70 transform origin-left transition-transform duration-300 ${isHovering ? 'scale-x-100' : 'scale-x-0'}`} 
                aria-hidden="true"
              ></span>
            </span>
            <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
