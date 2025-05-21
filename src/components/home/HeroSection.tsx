
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section 
      className="hero-gradient py-20 lg:py-28 px-4 animate-fade-in" 
      aria-labelledby="hero-heading"
      id="hero-section"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
          Remember everything you discover online
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
          Accio helps you save, organize, and rediscover your valuable online content with AI-powered tagging and powerful search.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            onClick={() => navigate('/register')} 
            className="bg-white text-primary hover:bg-white/90 focus-visible:ring-offset-primary group shadow-lg transform transition-all hover:-translate-y-1"
          >
            Start Your Free Account
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/login')} 
            className="border-white hover:bg-white/10 focus-visible:ring-offset-primary focus-visible:ring-white text-sky-50 transform transition-all hover:-translate-y-1"
          >
            Log In
          </Button>
        </div>
        <div className="mt-8">
          <a 
            href="#onboarding-section" 
            className="inline-flex flex-col items-center gap-2 text-white/90 hover:text-white transition-colors group"
            aria-label="Learn how Accio works"
          >
            <span className="font-medium">Learn how Accio works</span>
            <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
