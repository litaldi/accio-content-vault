
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/home/HeroSection';
import FeaturesShowcase from '@/components/home/FeaturesShowcase';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Accio - Your AI-Powered Knowledge Companion</title>
        <meta name="description" content="Transform scattered information into organized knowledge with Accio's AI-powered platform. Save, organize, and rediscover everything that matters to you." />
        <meta name="keywords" content="knowledge management, AI organization, productivity, information management, digital library" />
        <meta property="og:title" content="Accio - Your AI-Powered Knowledge Companion" />
        <meta property="og:description" content="Transform scattered information into organized knowledge with AI-powered tools." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://accio.app" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <HeroSection />
        <FeaturesShowcase />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
    </>
  );
};

export default Index;
