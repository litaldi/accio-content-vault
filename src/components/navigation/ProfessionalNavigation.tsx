
import React from 'react';
import { useNavigation } from '@/hooks/use-navigation';
import AccessibilityButton from '@/components/accessibility/AccessibilityButton';
import NavigationLogo from './NavigationLogo';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import NavigationActions from './NavigationActions';

const ProfessionalNavigation = () => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useNavigation();

  const mainNavItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavigationLogo />

          {/* Desktop Navigation */}
          <DesktopNavigation items={mainNavItems} />

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <AccessibilityButton variant="header" />
            <NavigationActions variant="desktop" />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <AccessibilityButton variant="header" />
            <MobileNavigation 
              items={mainNavItems}
              isOpen={isMobileMenuOpen}
              onOpenChange={setMobileMenuOpen}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ProfessionalNavigation;
