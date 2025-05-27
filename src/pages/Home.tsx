
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import CleanHeroSection from '@/components/home/CleanHeroSection';
import UnifiedFeaturesSection from '@/components/features/UnifiedFeaturesSection';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management</title>
        <meta 
          name="description" 
          content="Transform your knowledge into action with AI-powered content organization, intelligent search, and seamless capture tools. Start building your knowledge empire today." 
        />
        <meta name="keywords" content="knowledge management, AI, content organization, search, productivity" />
        <link rel="canonical" href="https://accio.app" />
      </Helmet>
      
      <div className="min-h-screen">
        <CleanHeroSection />
        <UnifiedFeaturesSection />
        
        {/* Simple CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-blue-600/10">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Knowledge Workflow?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of professionals who've already revolutionized how they manage information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-all">
                <a href="/register">Start Free Trial</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/features">Learn More</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
