
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
  Brain,
  TrendingUp
} from 'lucide-react';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="text-center space-y-8" aria-labelledby="hero-heading">
      <div className="space-y-6">
        <Badge variant="secondary" className="mx-auto px-6 py-3 text-sm font-semibold bg-gradient-to-r from-green-50 to-blue-50 border-green-200 text-green-800 dark:from-green-900/30 dark:to-blue-900/30 dark:border-green-700 dark:text-green-200">
          <TrendingUp className="h-4 w-4 mr-2 text-green-600" aria-hidden="true" />
          #1 AI Knowledge Engine • Loved by 50,000+ Productivity Champions
        </Badge>
        
        <UnifiedTypography.H1 id="hero-heading" className="max-w-5xl mx-auto">
          Stop Losing Your Best Ideas.
          <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block mt-3">
            Start Building Your Knowledge Empire.
          </span>
        </UnifiedTypography.H1>
        
        <UnifiedTypography.Body size="lg" className="max-w-3xl mx-auto text-muted-foreground">
          Transform scattered bookmarks, forgotten tabs, and random notes into an 
          <span className="font-semibold text-primary"> AI-powered knowledge engine</span> that makes you 
          <span className="font-semibold text-foreground"> 10x more productive</span>. 
          Save anything, find everything, achieve the impossible.
        </UnifiedTypography.Body>
      </div>

      {/* Enhanced Key Benefits with stronger value props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-12">
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/40 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-all">
          <Zap className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div className="text-left">
            <p className="font-semibold text-green-800 dark:text-green-200">Reclaim 5+ Hours Weekly</p>
            <p className="text-sm text-green-600 dark:text-green-300">Stop searching. Start achieving.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/40 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all">
          <Brain className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div className="text-left">
            <p className="font-semibold text-blue-800 dark:text-blue-200">AI Does Everything</p>
            <p className="text-sm text-blue-600 dark:text-blue-300">Automatic genius-level organization</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/40 rounded-xl border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all">
          <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div className="text-left">
            <p className="font-semibold text-purple-800 dark:text-purple-200">Find Anything Instantly</p>
            <p className="text-sm text-purple-600 dark:text-purple-300">3-second search, guaranteed</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {user ? (
          <Button asChild size="lg" className="group px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              Continue Building Your Empire
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </Button>
        ) : (
          <>
            <Button asChild size="lg" className="group px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 hover:scale-105">
              <Link to="/register" className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                Claim My Free Knowledge Empire
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="px-10 py-4 text-lg font-semibold border-2 hover:bg-accent/50 hover:scale-105 transition-all">
              <Link to="/login">I'm Already Smart - Let Me In</Link>
            </Button>
          </>
        )}
      </div>

      {/* Enhanced trust indicators with marketing language */}
      <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
          <Shield className="h-4 w-4 text-green-500" />
          <span className="font-medium">Fort Knox-level security</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="font-medium">Ready in 30 seconds</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
          <CheckCircle className="h-4 w-4 text-purple-500" />
          <span className="font-medium">Free forever • Zero hassles</span>
        </div>
      </div>

      {/* Enhanced social proof with better positioning */}
      <div className="mt-12 p-8 bg-gradient-to-r from-muted/30 to-muted/50 rounded-2xl border border-border/50 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 font-semibold text-lg">4.9/5 from 2,500+ productivity champions</span>
        </div>
        <p className="text-muted-foreground italic text-lg leading-relaxed">
          "This isn't just a tool - it's like having a genius assistant for my brain! Accio transformed how I manage knowledge. I'm 10x more productive and never lose important information again." 
          <span className="font-semibold text-foreground block mt-2"> - Sarah Chen, Product Manager at Google</span>
        </p>
        
        {/* Added urgency element */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full text-orange-800 dark:text-orange-200 text-sm font-semibold animate-pulse">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Limited time: 50% off Pro plans • Join 50,000+ users
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
