
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import EnhancedHeroSection from '@/components/home/EnhancedHeroSection';
import ConsolidatedFeaturesSection from '@/components/features/ConsolidatedFeaturesSection';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Accio - Transform Knowledge Into Wealth</title>
        <meta 
          name="description" 
          content="Stop losing brilliant ideas. Build your knowledge empire with AI-powered content organization, intelligent search, and seamless capture tools that understand how you think." 
        />
        <meta name="keywords" content="knowledge management, AI, content organization, search, productivity, knowledge wealth" />
        <link rel="canonical" href="https://accio.app" />
      </Helmet>
      
      <div className="min-h-screen">
        <EnhancedHeroSection />
        <ConsolidatedFeaturesSection />
        
        {/* Enhanced CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-blue-600/10">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Stop Losing Valuable Knowledge?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of professionals who've transformed scattered information 
              into organized intelligence that drives results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-all">
                <a href="/register">Transform Your Knowledge Today</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/features">Discover the Power</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Free forever plan • No credit card required • Start in under 2 minutes
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
