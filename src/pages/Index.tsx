
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import {
  HeroSection,
  OnboardingSection,
  FeaturesSection,
  AboutSection,
  PricingSection,
  ContactSection,
  FAQSection,
  CTASection
} from '@/components/home';

/**
 * Landing page component for the application
 * Features hero section, onboarding steps, feature highlights, and CTA sections
 */
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Accio - Remember Everything You Discover Online</title>
        <meta name="description" content="Accio organizes your online content with AI-powered tagging and powerful search." />
      </Helmet>
      
      <SkipToContent />
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow" id="main-content">
        <HeroSection />
        <OnboardingSection />
        <FeaturesSection />
        <AboutSection />
        <PricingSection />
        <ContactSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
