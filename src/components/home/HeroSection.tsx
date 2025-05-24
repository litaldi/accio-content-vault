
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Sparkles, Shield, Zap, Brain, Users, Star } from 'lucide-react';
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
        {/* Enhanced trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-white/90 text-sm">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
            <Shield className="h-4 w-4" />
            <span>Enterprise Security</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
            <Brain className="h-4 w-4" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
            <Users className="h-4 w-4" />
            <span>10,000+ Users</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>Free Forever Plan</span>
          </div>
        </div>

        <h1 
          id="hero-heading" 
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight max-w-6xl mx-auto tracking-tight"
        >
          <span className="inline-block animate-slide-up">Remember</span>
          <span className="text-white/95 block md:inline md:ml-4 animate-slide-up delay-150">
            everything you discover
          </span>
          <span className="bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent block animate-slide-up delay-300 relative">
            online
            <Sparkles className="absolute -top-4 -right-8 h-8 w-8 text-white/70 animate-pulse delay-1000" aria-hidden="true" />
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-16 max-w-4xl mx-auto leading-relaxed animate-fade-up delay-500">
          Accio transforms how you save, organize, and rediscover valuable online content with 
          <span className="font-semibold text-white relative">
            {" "}AI-powered intelligence
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-white/30 rounded-full animate-pulse delay-1000" />
          </span> and 
          <span className="font-semibold text-white"> lightning-fast search</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20 animate-fade-up delay-700">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')} 
                  className="bg-white text-primary hover:bg-white/95 focus-visible:ring-offset-primary group shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl text-xl px-12 py-6 h-auto font-bold relative overflow-hidden"
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <Sparkles className="mr-3 h-6 w-6 relative z-10 transition-transform group-hover:rotate-12" aria-hidden="true" />
                  <span className="relative z-10">Start Your Free Account</span>
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2 relative z-10" aria-hidden="true" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-primary border-primary/20 shadow-xl">
                <p className="font-medium">No credit card required • Free forever plan available</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/login')} 
            className="border-2 border-white/60 hover:bg-white/15 hover:border-white focus-visible:ring-offset-primary focus-visible:ring-white text-white backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-2 text-xl px-12 py-6 h-auto font-semibold"
          >
            Sign In
          </Button>
        </div>

        {/* Enhanced social proof */}
        <div className="mb-16 text-white/80 animate-fade-up delay-1000">
          <p className="text-lg mb-4">Trusted by thousands of knowledge workers worldwide</p>
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-white/90 font-medium">4.9/5 from 2,500+ reviews</span>
          </div>
        </div>
        
        <div className="mt-20 animate-bounce delay-1200">
          <a 
            href="#onboarding-section" 
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
            <ChevronDown className="h-7 w-7 animate-bounce group-hover:animate-pulse" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
