
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, ArrowRight } from 'lucide-react';

const FinalCTASection = () => {
  const { user } = useAuth();

  if (user) return null;

  return (
    <section className="text-center space-y-8 py-16" aria-labelledby="cta-heading">
      <div className="space-y-4">
        <UnifiedTypography.H2 id="cta-heading">
          Ready to Transform Your Digital Workspace?
        </UnifiedTypography.H2>
        <UnifiedTypography.Body size="lg" className="max-w-2xl mx-auto">
          Start organizing your knowledge with AI today. Join thousands of professionals 
          who trust Accio with their digital content.
        </UnifiedTypography.Body>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="group px-8 py-4">
          <Link to="/register" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            Start Free Trial
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="px-8 py-4">
          <Link to="/features">Learn More</Link>
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        No credit card required • 14-day free trial • Cancel anytime
      </p>
    </section>
  );
};

export default FinalCTASection;
