
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowRight,
  Star,
  Shield,
  Clock,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="text-center space-y-8" aria-labelledby="hero-heading">
      <div className="space-y-6">
        <Badge variant="secondary" className="mx-auto px-4 py-2">
          <Star className="h-3 w-3 mr-2" aria-hidden="true" />
          AI-Powered Knowledge Engine
        </Badge>
        
        <UnifiedTypography.H1 id="hero-heading" className="max-w-4xl mx-auto">
          Your Digital Knowledge,
          <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
            Perfectly Organized
          </span>
        </UnifiedTypography.H1>
        
        <UnifiedTypography.Body size="lg" className="max-w-3xl mx-auto">
          Transform how you save, organize, and access digital content. 
          Accio uses intelligent AI to help you never lose important information again,
          making your digital workspace more productive than ever.
        </UnifiedTypography.Body>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {user ? (
          <Button asChild size="lg" className="group px-8 py-3">
            <Link to="/dashboard" className="flex items-center gap-2">
              Go to Dashboard
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </Button>
        ) : (
          <>
            <Button asChild size="lg" className="group px-8 py-3">
              <Link to="/register" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Start Free Today
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="px-8 py-3">
              <Link to="/login">Sign In</Link>
            </Button>
          </>
        )}
      </div>

      {/* Trust indicators */}
      <div className="flex justify-center items-center gap-8 mt-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Bank-level security</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Setup in 2 minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>No credit card required</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
