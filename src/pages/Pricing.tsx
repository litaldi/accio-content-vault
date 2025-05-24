
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';

const Pricing: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pricing - Accio Knowledge Library</title>
        <meta name="description" content="Simple, transparent pricing for Accio. Choose the plan that fits your needs." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground">
                Choose the plan that works best for you. Upgrade or downgrade at any time.
              </p>
            </div>
          </div>
        </div>
        
        <PricingSection />
        <CTASection />
      </div>
    </>
  );
};

export default Pricing;
