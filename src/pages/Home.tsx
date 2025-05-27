
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import EnhancedHeroSection from '@/components/home/EnhancedHeroSection';
import ConsolidatedFeaturesSection from '@/components/features/ConsolidatedFeaturesSection';
import { SkipLink } from '@/components/ui/skip-link';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Accio - Transform Knowledge Into Wealth</title>
        <meta 
          name="description" 
          content="Never lose brilliant ideas again. Build your knowledge empire with AI-powered content organization, intelligent search, and seamless capture tools that understand how you think." 
        />
        <meta name="keywords" content="knowledge management, AI, content organization, search, productivity, knowledge wealth" />
        <link rel="canonical" href="https://accio.app" />
        <meta property="og:title" content="Accio - Transform Knowledge Into Wealth" />
        <meta property="og:description" content="Never lose brilliant ideas again. Build your knowledge empire with AI-powered content organization." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://accio.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - Transform Knowledge Into Wealth" />
        <meta name="twitter:description" content="Never lose brilliant ideas again. Build your knowledge empire with AI-powered content organization." />
      </Helmet>
      
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <div className="min-h-screen" id="main-content">
        <EnhancedHeroSection />
        <ConsolidatedFeaturesSection />
        
        <section 
          className="py-24 bg-gradient-to-r from-primary/10 to-blue-600/10"
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Knowledge Into Wealth?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join 50,000+ professionals who've stopped losing brilliant ideas and started 
              building knowledge empires that drive real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild 
                className="shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                aria-label="Start building your knowledge empire today"
              >
                <a href="/register">Start Building Your Empire</a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                aria-label="Discover your potential with Accio"
              >
                <a href="/features">Discover Your Potential</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Free forever plan • No credit card required • Ready in 2 minutes
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
