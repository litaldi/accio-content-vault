
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  Brain, 
  Menu, 
  X,
  BookOpen,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationMenuDemo } from './NavigationMenu';
import { AuthButtons } from './AuthButtons';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import NavigationLogo from './NavigationLogo';
import { useNavigation } from '@/hooks/use-navigation';
import { cn } from '@/lib/utils';
import { copy } from '@/utils/copy';
import { OmniSearchBar } from '@/components/search/OmniSearchBar';

export const CategorizedMainNavigation: React.FC = () => {
  const { scrolled } = useNavigation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/features', label: 'Features', icon: Zap },
    { to: '/playground', label: 'Playground', icon: BookOpen },
  ];

  const appNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/search', label: 'Search', icon: Search },
    { to: '/collections', label: 'Collections', icon: FolderOpen },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/intelligence', label: 'AI Intelligence', icon: Brain },
    { to: '/account', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
      scrolled && "shadow-sm"
    )}>
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <NavigationLogo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between ml-6">
          {/* Left side - Main navigation */}
          <div className="flex items-center gap-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.to}
                  asChild
                  variant={isActive(item.to) ? "default" : "ghost"}
                  size="sm"
                >
                  <Link to={item.to} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
            <NavigationMenuDemo />
          </div>
          
          {/* Center - Omni Search */}
          <div className="flex-1 max-w-md mx-6">
            <OmniSearchBar placeholder="Search everything... (⌘K)" compact />
          </div>

          {/* Right side - Auth and theme */}
          <div className="flex items-center gap-3">
            <AuthButtons isLoggedIn={false} />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container py-4 space-y-2">
            {/* Main navigation items */}
            <div className="space-y-1 mb-4">
              <h3 className="text-sm font-medium text-muted-foreground px-3">Main</h3>
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.to}
                    asChild
                    variant={isActive(item.to) ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to={item.to}>
                      <Icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            </div>

            {/* App navigation items */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground px-3">App</h3>
              {appNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.to}
                    asChild
                    variant={isActive(item.to) ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to={item.to}>
                      <Icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            </div>

            {/* Auth buttons */}
            <div className="pt-4 border-t">
              <AuthButtons isLoggedIn={false} mobile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
