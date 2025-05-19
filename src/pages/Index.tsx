
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/home/Hero';
import OnboardingSection from '@/components/home/OnboardingSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/home/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow" id="main-content">
        <Hero />
        <OnboardingSection />
        <FeaturesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
