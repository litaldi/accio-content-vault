
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import EnhancedHeroSection from '@/components/home/EnhancedHeroSection';
import ConsolidatedFeaturesSection from '@/components/features/ConsolidatedFeaturesSection';
import { SkipLink } from '@/components/ui/skip-link';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  Trophy,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleExploreFeatures = () => {
    navigate('/features');
  };

  return (
    <>
      <Helmet>
        <title>Accio - Transform Knowledge Into Wealth | AI-Powered Knowledge Management</title>
        <meta 
          name="description" 
          content="Never lose brilliant ideas again. Build your knowledge empire with AI-powered content organization, intelligent search, and seamless capture tools that understand how you think." 
        />
        <meta name="keywords" content="knowledge management, AI, content organization, search, productivity, knowledge wealth, note taking, research" />
        <link rel="canonical" href="https://accio.app" />
        <meta property="og:title" content="Accio - Transform Knowledge Into Wealth" />
        <meta property="og:description" content="Never lose brilliant ideas again. Build your knowledge empire with AI-powered content organization." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://accio.app" />
        <meta property="og:image" content="https://accio.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - Transform Knowledge Into Wealth" />
        <meta name="twitter:description" content="Never lose brilliant ideas again. Build your knowledge empire with AI-powered content organization." />
        <meta name="twitter:image" content="https://accio.app/og-image.jpg" />
      </Helmet>
      
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <div className="min-h-screen" id="main-content">
        <EnhancedHeroSection />
        <ConsolidatedFeaturesSection />
        
        {/* Social Proof Section */}
        <section className="py-16 bg-muted/30" aria-labelledby="social-proof-heading">
          <div className="container mx-auto px-4 text-center">
            <h2 id="social-proof-heading" className="text-2xl md:text-3xl font-bold mb-8">
              Trusted by Knowledge Professionals Worldwide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-4 p-6 bg-background rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50,000+</div>
                  <p className="text-muted-foreground">Active Users</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 bg-background rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">4.9/5</div>
                  <p className="text-muted-foreground">User Rating</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 bg-background rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">10M+</div>
                  <p className="text-muted-foreground">Items Saved</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20" aria-labelledby="benefits-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Accio for Your Knowledge Journey?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform scattered information into organized intelligence with features designed for the modern knowledge worker.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Brain,
                  title: "AI-Powered Organization",
                  description: "Let AI automatically categorize, tag, and connect your content for seamless discovery.",
                  benefits: ["Smart auto-tagging", "Content relationships", "Intelligent categorization"]
                },
                {
                  icon: Zap,
                  title: "Lightning-Fast Search",
                  description: "Find exactly what you need in seconds with our advanced semantic search technology.",
                  benefits: ["Natural language search", "Instant results", "Context-aware findings"]
                },
                {
                  icon: Sparkles,
                  title: "Seamless Capture",
                  description: "Save content from anywhere with our browser extension, mobile app, and quick capture tools.",
                  benefits: ["One-click saving", "Multi-platform sync", "Offline access"]
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-6">{benefit.description}</p>
                  <ul className="space-y-2">
                    {benefit.benefits.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section 
          className="py-24 bg-gradient-to-r from-primary/10 via-blue-600/10 to-purple-600/10"
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 id="cta-heading" className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Knowledge Into Wealth?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who've stopped losing brilliant ideas and started 
              building knowledge empires that drive real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90"
                aria-label={user ? "Go to your dashboard" : "Start building your knowledge empire today"}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {user ? "Go to Dashboard" : "Start Building Your Empire"}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleExploreFeatures}
                className="text-lg px-8 py-6 border-2 hover:bg-muted"
                aria-label="Discover your potential with Accio"
              >
                <Brain className="h-5 w-5 mr-2" />
                Explore Features
              </Button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Ready in 2 minutes</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
