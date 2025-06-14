
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Zap, Brain, Command } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';

export const HomeHeroSection: React.FC = () => {
  return (
    <section className="relative section-spacing overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-600/5" />
      <div className="relative container mx-auto px-4 max-w-6xl">
        <div className="text-center space-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Transform Knowledge Into{' '}
            <span className="text-primary">Intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            Accio's AI-powered platform automatically organizes your scattered information, 
            making it instantly searchable and actionable. Never lose important knowledge again.
          </p>
          
          {/* Enhanced Search Demo */}
          <div className="max-w-md mx-auto mb-12" data-tour="search-demo">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-xl blur-xl" />
              <div className="relative bg-background/95 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Search className="h-6 w-6" />
                  <span className="text-lg">Try: "productivity tips for remote work"</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <EnhancedButton 
              size="lg" 
              emphasis="high"
              showArrow
              asChild
            >
              <Link to="/register">Get Started Free</Link>
            </EnhancedButton>
            <EnhancedButton 
              variant="secondary" 
              size="lg"
              emphasis="medium"
              asChild
            >
              <Link to="/features">Explore Features</Link>
            </EnhancedButton>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-3">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-warning" />
                <span>Setup in 2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span>Enterprise-grade security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
