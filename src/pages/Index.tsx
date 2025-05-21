
import React, { useEffect, useRef } from 'react';
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
  const pageRef = useRef<HTMLDivElement>(null);

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

  // Add keyboard navigation for page sections
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to next/previous section with Alt + Arrow keys
      if (e.altKey) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const sections = document.querySelectorAll('section[id]');
          const currentIndex = Array.from(sections).findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top > 0 && rect.top < window.innerHeight / 2;
          });
          
          if (currentIndex >= 0 && currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const sections = document.querySelectorAll('section[id]');
          const currentIndex = Array.from(sections).findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top > 0 && rect.top < window.innerHeight / 2;
          });
          
          if (currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" ref={pageRef}>
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
        
        {/* Add preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Additional metadata to improve SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Helmet>
      
      <SkipToContent />
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow overflow-x-hidden" id="main-content">
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
