
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-gradient py-20 px-4" aria-labelledby="hero-heading">
      <div className="max-w-6xl mx-auto text-center">
        <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold text-white mb-6">
          Remember everything you discover online
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Accio organizes your online content with AI-powered tagging and powerful search.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate('/register')}
            className="bg-white text-primary hover:bg-white/90 focus-visible:ring-offset-primary"
          >
            Get Started - Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/login')}
            className="text-white border-white hover:bg-white/10 focus-visible:ring-offset-primary focus-visible:ring-white"
          >
            Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
