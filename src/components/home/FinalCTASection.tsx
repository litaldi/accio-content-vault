
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, ArrowRight, Star, Zap } from 'lucide-react';

const FinalCTASection = () => {
  const { user } = useAuth();

  if (user) return null;

  return (
    <section className="text-center space-y-8 py-20 bg-gradient-to-br from-primary/5 via-blue-50 to-purple-50 dark:from-primary/10 dark:via-blue-950/30 dark:to-purple-950/30 rounded-3xl border" aria-labelledby="cta-heading">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-800 dark:text-yellow-200 text-sm font-semibold">
          <Star className="h-4 w-4" />
          Limited Time: 50% Off Pro Plans
        </div>
        
        <UnifiedTypography.H2 id="cta-heading" className="max-w-3xl mx-auto">
          Your Future Self Will Thank You for Starting Today
        </UnifiedTypography.H2>
        
        <UnifiedTypography.Body size="lg" className="max-w-2xl mx-auto text-muted-foreground">
          Join 50,000+ professionals who've already transformed their productivity. 
          <span className="font-semibold text-foreground"> Start building your knowledge empire in just 30 seconds.</span>
        </UnifiedTypography.Body>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
        <Button asChild size="lg" className="group px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
          <Link to="/register" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            Yes, Make Me 10x Smarter!
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-accent/50">
          <Link to="/features" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Show Me the Magic First
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground font-medium">
          ✨ Free forever plan • No credit card required • Ready in 30 seconds
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          <span>💡 Save 5+ hours weekly</span>
          <span>🤖 AI does the organizing</span>
          <span>🔍 Find anything instantly</span>
          <span>🛡️ Enterprise security</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
