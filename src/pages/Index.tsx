
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import EnhancedHeroSection from '@/components/home/EnhancedHeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import Footer from '@/components/Footer';

const Index = () => {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={!!user} onLogout={handleLogout} />
      
      <main className="flex-grow">
        <EnhancedHeroSection isLoggedIn={!!user} />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
