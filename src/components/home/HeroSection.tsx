
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section 
      className="hero-gradient py-20 px-4 animate-fade-in" 
      aria-labelledby="hero-heading"
      id="hero-section"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Remember everything you discover online
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Accio organizes your online content with AI-powered tagging and powerful search.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            onClick={() => navigate('/register')} 
            className="bg-white text-primary hover:bg-white/90 focus-visible:ring-offset-primary group"
          >
            Get Started - Free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/login')} 
            className="border-white hover:bg-white/10 focus-visible:ring-offset-primary focus-visible:ring-white text-sky-50"
          >
            Login
          </Button>
        </div>
        <div className="mt-8">
          <a 
            href="#onboarding-section" 
            className="inline-flex items-center gap-1 text-white/90 hover:text-white transition-colors"
            aria-label="Learn how Accio works"
          >
            <span>Learn how Accio works</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
