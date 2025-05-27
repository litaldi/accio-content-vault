
import React from 'react';
import NavigationLogo from './NavigationLogo';
import DesktopNavigationMenu from './DesktopNavigationMenu';
import MobileNavigationMenu from './MobileNavigationMenu';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';

const MainNavigation: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mr-6">
          <NavigationLogo />
        </div>

        {/* Desktop Navigation */}
        <DesktopNavigationMenu />

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          <UserMenu />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto flex items-center space-x-2">
          <ThemeToggle />
          <MobileNavigationMenu />
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
