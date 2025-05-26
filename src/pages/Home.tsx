
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MarketingHeroSection from '@/components/home/MarketingHeroSection';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management</title>
        <meta name="description" content="Transform your knowledge into action with AI-powered content organization and discovery." />
      </Helmet>
      
      <div className="min-h-screen">
        <MarketingHeroSection />
        
        <section id="features-section" className="py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why Choose Accio?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-4">AI-Powered Organization</h3>
                <p className="text-muted-foreground">
                  Automatically organize and categorize your content using advanced AI algorithms.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-4">Smart Search</h3>
                <p className="text-muted-foreground">
                  Find exactly what you need with intelligent search that understands context.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your data is encrypted and secure with enterprise-grade privacy protection.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
