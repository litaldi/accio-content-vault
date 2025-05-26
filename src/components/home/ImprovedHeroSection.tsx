
import React from 'react';
import { ArrowRight, Search, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ImprovedHeroSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your Personal{' '}
            <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Knowledge Library
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Transform the internet into your curated knowledge base. Save, organize, 
            and rediscover content with AI-powered intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link to="/register" className="inline-flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
              <Link to="/features">
                Explore Features
              </Link>
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/80 border border-border/50">
              <Search className="h-6 w-6 text-primary flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-sm">Smart Search</h3>
                <p className="text-xs text-muted-foreground">Find anything instantly</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/80 border border-border/50">
              <BookOpen className="h-6 w-6 text-primary flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-sm">Auto-Organize</h3>
                <p className="text-xs text-muted-foreground">AI-powered categorization</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/80 border border-border/50">
              <Zap className="h-6 w-6 text-primary flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-sm">Quick Save</h3>
                <p className="text-xs text-muted-foreground">Save from anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImprovedHeroSection;
