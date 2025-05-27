
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
  Zap
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { user } = useAuth();

  const features = [
    { icon: Brain, label: 'AI-Powered Organization' },
    { icon: Search, label: 'Smart Search' },
    { icon: Bookmark, label: 'Universal Saving' },
    { icon: Zap, label: 'Instant Access' },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        {/* Badge */}
        <Badge variant="secondary" className="mb-6 text-sm">
          <Sparkles className="h-3 w-3 mr-2" />
          Transform Your Knowledge Workflow
        </Badge>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Your AI-Powered
          <span className="text-primary block">Knowledge Engine</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Save, organize, and discover insights from any content with the power of artificial intelligence. 
          Turn information chaos into structured knowledge.
        </p>

        {/* Feature Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <feature.icon className="h-4 w-4 text-primary" />
              <span>{feature.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <>
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/saved">View Saved Items</Link>
              </Button>
            </>
          ) : (
            <>
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/register">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Now - Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/features">Explore Features</Link>
              </Button>
            </>
          )}
        </div>

        {/* Social Proof */}
        <p className="text-sm text-muted-foreground mt-8">
          Join 10,000+ professionals building their knowledge empires
        </p>
      </div>
    </section>
  );
};
