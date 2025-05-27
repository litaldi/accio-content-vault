
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowRight, 
  Sparkles, 
  Brain,
  Search,
  Bookmark,
  Zap,
  CheckCircle
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { user } = useAuth();

  const trustIndicators = [
    'Free forever plan',
    'No credit card needed', 
    'Start in 30 seconds'
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        {/* Badge */}
        <Badge variant="secondary" className="mb-6 text-sm">
          <Sparkles className="h-3 w-3 mr-2" />
          Join 10,000+ Knowledge Empire Builders
        </Badge>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Never Lose Another
          <span className="text-primary block">Brilliant Idea</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Transform scattered bookmarks and forgotten notes into a powerful knowledge system. 
          Our AI organizes everything so you can focus on using your insights to win.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {user ? (
            <>
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/dashboard">
                  Continue Building Your Empire
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/saved">View Your Library</Link>
              </Button>
            </>
          ) : (
            <>
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/register">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Building Your Empire
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/features">Show Me How It Works</Link>
              </Button>
            </>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{indicator}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
