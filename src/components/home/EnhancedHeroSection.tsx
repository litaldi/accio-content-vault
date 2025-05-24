
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedHeroSection: React.FC = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" aria-hidden="true" />
      
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Transform your knowledge workflow
          </div>
          
          {/* Main heading */}
          <h1 
            id="hero-title"
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Your Personal{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              Knowledge Library
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Save any web content, organize with AI-powered tags, and find everything instantly. 
            Turn the internet into your personal research assistant.
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>AI-Powered Organization</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Instant Search</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button asChild size="lg" className="group">
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/features">
                Learn More
              </Link>
            </Button>
          </div>
          
          {/* Social proof */}
          <p className="text-sm text-muted-foreground pt-4">
            Join thousands of researchers, students, and professionals
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
