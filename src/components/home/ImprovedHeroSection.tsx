
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';

const ImprovedHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { preferences } = useAccessibility();
  const { isMobile } = useResponsiveDesign();

  return (
    <section 
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/20",
        "py-20 lg:py-32"
      )}
      aria-labelledby="hero-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full px-4 py-2 bg-accent/50 text-accent-foreground text-sm font-medium mb-8 border">
            <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>AI-Powered Knowledge Management</span>
          </div>

          {/* Main Heading */}
          <h1 
            id="hero-heading"
            className={cn(
              "font-extrabold tracking-tight text-balance leading-tight mb-6",
              isMobile 
                ? "text-4xl sm:text-5xl" 
                : "text-5xl lg:text-6xl xl:text-7xl",
              preferences.fontSize === 'large' && "text-5xl lg:text-7xl xl:text-8xl"
            )}
          >
            Stop Losing Your Best Ideas.{' '}
            <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Start Building Brilliance.
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className={cn(
              "text-muted-foreground leading-relaxed text-pretty mb-10",
              isMobile ? "text-lg" : "text-xl lg:text-2xl",
              "max-w-3xl mx-auto"
            )}
          >
            Transform scattered bookmarks into an AI-powered knowledge engine. 
            Save anything, find everything, achieve 10x productivity with intelligent organization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size={isMobile ? "default" : "lg"}
              className={cn(
                "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
                "shadow-lg hover:shadow-xl transition-all duration-300",
                "min-w-[200px]"
              )}
              onClick={() => navigate('/register')}
            >
              <span>Start Free Today</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size={isMobile ? "default" : "lg"}
              className={cn(
                "min-w-[200px] hover:bg-accent/50 transition-all duration-300"
              )}
              onClick={() => navigate('/demo')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>View Demo</span>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by 10,000+ professionals worldwide
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              {/* Placeholder for company logos */}
              <div className="h-8 w-20 bg-muted rounded" aria-label="Company logo" />
              <div className="h-8 w-20 bg-muted rounded" aria-label="Company logo" />
              <div className="h-8 w-20 bg-muted rounded" aria-label="Company logo" />
              <div className="h-8 w-20 bg-muted rounded" aria-label="Company logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImprovedHeroSection;
