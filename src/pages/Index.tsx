
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrganizedNavigation from '@/components/navigation/OrganizedNavigation';
import ValueProposition from '@/components/marketing/ValueProposition';
import SocialProof from '@/components/marketing/SocialProof';
import FeaturesShowcase from '@/components/marketing/FeaturesShowcase';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Users, Shield } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const navigate = useNavigate();
  
  // Safely use auth context with fallback
  let user = null;
  
  try {
    const authContext = useAuth();
    user = authContext.user;
  } catch (error) {
    console.warn('AuthProvider not available, page will work in guest mode');
  }
  
  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Accio - AI Knowledge Engine | Never Lose Important Information Again</title>
        <meta name="description" content="Transform information chaos into organized intelligence. Save anything from the web, let AI organize it perfectly, find what you need instantly. Join 10,000+ professionals who boosted productivity 5x." />
        <meta name="keywords" content="knowledge management, AI, productivity, information organization, content management, research tool, note taking, bookmarks, knowledge base" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://accio.app/" />
        <meta property="og:title" content="Accio - AI Knowledge Engine | Transform Information Chaos" />
        <meta property="og:description" content="Never lose important information again. AI-powered knowledge engine trusted by 10,000+ professionals to boost productivity 5x." />
        <meta property="og:image" content="https://accio.app/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://accio.app/" />
        <meta property="twitter:title" content="Accio - AI Knowledge Engine" />
        <meta property="twitter:description" content="Transform scattered information into organized intelligence. Save anything, find everything, achieve more." />
        <meta property="twitter:image" content="https://accio.app/twitter-image.jpg" />
        
        <link rel="canonical" href="https://accio.app/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="robots" content="index, follow" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Accio",
            "description": "AI-powered knowledge management platform",
            "url": "https://accio.app",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      {/* Navigation */}
      <OrganizedNavigation />

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* Hero Section with Value Proposition */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <ValueProposition />
          </div>
        </section>

        {/* Quick Access for Logged In Users */}
        {isLoggedIn && (
          <section className="py-16 bg-muted/20 border-b">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Welcome back! Quick access to your knowledge engine
                </h2>
                <p className="text-xl text-muted-foreground">
                  Jump right back into organizing and discovering insights
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { title: "Dashboard", desc: "View your latest activity", icon: TrendingUp, path: "/dashboard" },
                  { title: "Save Content", desc: "Add something new", icon: Sparkles, path: "/save" },
                  { title: "Search Library", desc: "Find what you need", icon: "🔍", path: "/search" },
                  { title: "Settings", desc: "Customize your experience", icon: "⚙️", path: "/settings" }
                ].map((action, index) => (
                  <div 
                    key={index}
                    onClick={() => navigate(action.path)}
                    className="p-6 bg-background rounded-xl border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {typeof action.icon === 'string' ? (
                          <span className="text-2xl">{action.icon}</span>
                        ) : (
                          <action.icon className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <h3 className="font-semibold mb-2">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Social Proof Section */}
        <SocialProof />
        
        {/* Features Showcase */}
        <FeaturesShowcase />

        {/* Final CTA Section */}
        {!isLoggedIn && (
          <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to eliminate information chaos forever?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join 10,000+ professionals who transformed their productivity with intelligent knowledge management.
                <strong className="block mt-2">Start free. Upgrade anytime. Cancel anytime.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')} 
                  className="bg-white text-primary hover:bg-white/95 text-lg px-8 py-4 font-semibold"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/demo')} 
                  className="border-white/50 text-white hover:bg-white/10 text-lg px-8 py-4 font-semibold"
                >
                  Watch Demo
                </Button>
              </div>
              <p className="text-sm opacity-75 mt-6">
                ✅ Free forever plan &nbsp;•&nbsp; ✅ No credit card required &nbsp;•&nbsp; ✅ Setup in 30 seconds
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Marketing Footer */}
      <MarketingFooter />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default Index;
