import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import { EnhancedNavigation } from '@/components/navigation/EnhancedNavigation';
import { ImprovedOnboarding } from '@/components/onboarding/ImprovedOnboarding';
import { EnhancedFeedback, useFeedback } from '@/components/feedback/EnhancedFeedback';
import { useAccessibility } from '@/hooks/useAccessibility';
import EnhancedHeroSection from '@/components/home/EnhancedHeroSection';
import {
  OnboardingSection,
  FeaturesSection,
  AboutSection,
  PricingSection,
  ContactSection,
  FAQSection,
  CTASection
} from '@/components/home';

/**
 * Enhanced landing page with improved UX/UI and accessibility
 */
const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { feedbacks, closeFeedback, showSuccess } = useFeedback();
  const { isKeyboardUser, isReducedMotion } = useAccessibility();

  // Smooth scroll to section when URL has a hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: isReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Handle hash in URL on initial load
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isReducedMotion]);

  // Enhanced keyboard navigation for page sections
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
            sections[currentIndex + 1].scrollIntoView({ 
              behavior: isReducedMotion ? 'auto' : 'smooth' 
            });
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const sections = document.querySelectorAll('section[id]');
          const currentIndex = Array.from(sections).findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top > 0 && rect.top < window.innerHeight / 2;
          });
          
          if (currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({ 
              behavior: isReducedMotion ? 'auto' : 'smooth' 
            });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isReducedMotion]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    showSuccess(
      "Welcome to Accio! 🎉",
      "You're all set to start building your knowledge library."
    );
  };

  const handleStartOnboarding = () => {
    setShowOnboarding(true);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isKeyboardUser ? 'keyboard-user' : ''} scroll-smooth-enhanced`} ref={pageRef}>
      <Helmet>
        <title>Accio - Your Personal Knowledge Library</title>
        <meta name="description" content="Transform the internet into your personal knowledge library. Save, organize, and find anything instantly with AI-powered tools." />
        <meta name="keywords" content="knowledge management, AI organization, content library, smart bookmarks, digital note-taking" />
        <meta property="og:title" content="Accio - Your Personal Knowledge Library" />
        <meta property="og:description" content="Transform the internet into your personal knowledge library with AI-powered organization." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - Your Personal Knowledge Library" />
        <meta name="twitter:description" content="Save, organize, and find anything instantly with AI-powered tools." />
        
        {/* Enhanced metadata for better SEO and accessibility */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//api.accio.dev" />
      </Helmet>
      
      <SkipToContent />
      <Navbar isLoggedIn={false} />
      
      {/* Enhanced Navigation with better positioning */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30 safe-area-inset">
        <EnhancedNavigation isLoggedIn={false} />
      </div>
      
      {/* Enhanced Feedback Container with better positioning */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md safe-area-inset">
        {feedbacks.map((feedback) => (
          <EnhancedFeedback
            key={feedback.id}
            feedback={feedback}
            onClose={() => closeFeedback(feedback.id)}
          />
        ))}
      </div>

      {/* Improved Onboarding Modal with better UX */}
      {showOnboarding && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 safe-area-inset"
          role="dialog"
          aria-labelledby="onboarding-title"
          aria-modal="true"
        >
          <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border">
            <ImprovedOnboarding onComplete={handleOnboardingComplete} />
          </div>
        </div>
      )}
      
      <main className="flex-grow overflow-x-hidden" id="main-content">
        {/* Use enhanced hero section */}
        <EnhancedHeroSection />
        
        {/* Keep existing sections but with improved spacing */}
        <div className="space-y-0">
          <OnboardingSection />
          <FeaturesSection />
          <AboutSection />
          <PricingSection />
          <FAQSection />
          <ContactSection />
          <CTASection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
