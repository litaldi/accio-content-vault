
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, ArrowRight, Star, Zap, Brain, Clock, Users } from 'lucide-react';

const FinalCTASection = () => {
  const { user } = useAuth();

  if (user) return null;

  return (
    <section className="text-center space-y-8 py-20 bg-gradient-to-br from-primary/5 via-blue-50 to-purple-50 dark:from-primary/10 dark:via-blue-950/30 dark:to-purple-950/30 rounded-3xl border relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30" />
      
      <div className="relative z-10 space-y-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full text-yellow-800 dark:text-yellow-200 text-sm font-semibold shadow-lg animate-pulse">
            <Star className="h-4 w-4" />
            🔥 Last chance: 50% OFF Pro Plans (24 hours left)
          </div>
          
          <UnifiedTypography.H2 id="cta-heading" className="max-w-4xl mx-auto">
            Your Future Self Will Thank You for Starting Today
            <span className="block text-primary mt-2">Join the Knowledge Revolution</span>
          </UnifiedTypography.H2>
          
          <UnifiedTypography.Body size="lg" className="max-w-2xl mx-auto text-muted-foreground">
            Join 50,000+ ambitious professionals who've already transformed their productivity. 
            <span className="font-semibold text-foreground"> Start building your knowledge empire in just 30 seconds.</span>
          </UnifiedTypography.Body>
        </div>

        {/* Enhanced social proof stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-4 bg-white/50 dark:bg-white/5 rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Champions</div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-white/5 rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-600">5+ hrs</div>
            <div className="text-sm text-muted-foreground">Saved Weekly</div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-white/5 rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-blue-600">3 sec</div>
            <div className="text-sm text-muted-foreground">Find Anything</div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-white/5 rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-purple-600">4.9★</div>
            <div className="text-sm text-muted-foreground">User Rating</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
          <Button asChild size="lg" className="group px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 hover:scale-105 animate-bounce">
            <Link to="/register" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              Yes! Make Me 10x Smarter
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-accent/50 hover:scale-105 transition-all">
            <Link to="/features" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Show Me the Magic First
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          <p className="text-sm text-muted-foreground font-medium">
            ✨ Free forever • Zero credit card hassles • Ready in 30 seconds
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Brain className="h-3 w-3" />
              AI does the organizing
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Save 5+ hours weekly
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Trusted by 50K+ pros
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Fort Knox security
            </span>
          </div>
          
          {/* Added testimonial snippet for conversion */}
          <div className="max-w-md mx-auto p-4 bg-white/30 dark:bg-white/5 rounded-lg backdrop-blur-sm border border-white/20">
            <p className="text-sm italic text-muted-foreground mb-2">
              "I wish I had found Accio years ago. It's completely transformed how I work."
            </p>
            <p className="text-xs font-semibold">- Emily R., Microsoft Research Director</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
