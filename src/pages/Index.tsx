
import React, { useEffect } from 'react';
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
  // Smooth scroll to section when URL has a hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Handle hash in URL on initial load
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Clean up
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Accio - Remember Everything You Discover Online</title>
        <meta name="description" content="Accio organizes your online content with AI-powered tagging and powerful search." />
        <meta name="keywords" content="content organizer, AI tagging, online bookmarks, save articles, bookmark manager" />
        <meta property="og:title" content="Accio - Remember Everything You Discover Online" />
        <meta property="og:description" content="Accio organizes your online content with AI-powered tagging and powerful search." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - Remember Everything You Discover Online" />
        <meta name="twitter:description" content="Accio organizes your online content with AI-powered tagging and powerful search." />
      </Helmet>
      
      <SkipToContent />
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow" id="main-content">
        <HeroSection />
        <OnboardingSection />
        <FeaturesSection />
        <AboutSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
