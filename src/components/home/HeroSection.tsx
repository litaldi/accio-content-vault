
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
  Sparkles,
  Zap,
  Brain
} from 'lucide-react';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="text-center space-y-8" aria-labelledby="hero-heading">
      <div className="space-y-6">
        <Badge variant="secondary" className="mx-auto px-6 py-3 text-sm font-semibold">
          <Star className="h-4 w-4 mr-2 text-yellow-500" aria-hidden="true" />
          #1 AI Knowledge Engine • Trusted by 50,000+ Professionals
        </Badge>
        
        <UnifiedTypography.H1 id="hero-heading" className="max-w-5xl mx-auto">
          Stop Losing Your Best Ideas.
          <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block mt-3">
            Start Building Brilliance.
          </span>
        </UnifiedTypography.H1>
        
        <UnifiedTypography.Body size="lg" className="max-w-3xl mx-auto text-muted-foreground">
          Transform scattered bookmarks, notes, and research into an 
          <span className="font-semibold text-primary"> AI-powered knowledge engine</span> that makes you 
          <span className="font-semibold text-foreground"> 10x more productive</span>. 
          Save anything, find everything, achieve more than you ever thought possible.
        </UnifiedTypography.Body>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-12">
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
          <Zap className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div className="text-left">
            <p className="font-semibold text-green-800 dark:text-green-200">Save 5+ Hours Weekly</p>
            <p className="text-sm text-green-600 dark:text-green-300">Never search for lost information again</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
          <Brain className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div className="text-left">
            <p className="font-semibold text-blue-800 dark:text-blue-200">AI Does the Work</p>
            <p className="text-sm text-blue-600 dark:text-blue-300">Automatic organization & smart tagging</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
          <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div className="text-left">
            <p className="font-semibold text-purple-800 dark:text-purple-200">Find Instantly</p>
            <p className="text-sm text-purple-600 dark:text-purple-300">Natural language search that just works</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {user ? (
          <Button asChild size="lg" className="group px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              Continue Building Your Knowledge Empire
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </Button>
        ) : (
          <>
            <Button asChild size="lg" className="group px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
              <Link to="/register" className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                Start My Free Knowledge Engine
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="px-10 py-4 text-lg font-semibold border-2 hover:bg-accent/50">
              <Link to="/login">I'm Already Smart - Sign Me In</Link>
            </Button>
          </>
        )}
      </div>

      {/* Trust indicators */}
      <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-500" />
          <span className="font-medium">Enterprise-grade security</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="font-medium">Ready in 30 seconds</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-purple-500" />
          <span className="font-medium">Free forever • No credit card</span>
        </div>
      </div>

      {/* Social proof */}
      <div className="mt-12 p-6 bg-muted/30 rounded-xl border">
        <div className="flex items-center justify-center gap-2 mb-3">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 font-semibold">4.9/5 from 2,500+ reviews</span>
        </div>
        <p className="text-muted-foreground italic">
          "Accio transformed how I manage knowledge. I'm 10x more productive and never lose important information again." 
          <span className="font-semibold"> - Sarah Chen, Product Manager at Google</span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
