
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { UnifiedAuthModal } from '@/components/auth/UnifiedAuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, UserPlus, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const PrimaryNavigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signup' | 'login'>('signup');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    setAuthModalTab('signup');
    setAuthModalOpen(true);
  };

  const handleLogin = () => {
    setAuthModalTab('login');
    setAuthModalOpen(true);
  };

  const navigationItems = [
    { label: 'Features', href: '#features-section' },
    { label: 'Pricing', href: '#pricing-section' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '#faq-section' },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between px-4" role="navigation" aria-label="Primary navigation">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            aria-label="Accio - Go to homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg" aria-hidden="true">A</span>
            </div>
            <span className="text-xl font-bold text-primary">Accio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            
            {!user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogin}
                  className="flex items-center gap-2 text-sm font-medium"
                  aria-label="Log in to your account"
                >
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  <span>Log In</span>
                </Button>

                <Button
                  onClick={handleGetStarted}
                  size="sm"
                  className="flex items-center gap-2 text-sm font-medium"
                  aria-label="Get started with Accio"
                >
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  <span>Get Started</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden border-t bg-background/95 backdrop-blur"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="container px-4 py-4">
              <div className="flex flex-col gap-4">
                {/* Navigation Items */}
                <div className="flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      role="menuitem"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                {/* Mobile Actions */}
                <div className="pt-4 border-t">
                  {!user ? (
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        onClick={handleLogin}
                        className="w-full justify-start"
                        aria-label="Log in to your account"
                      >
                        <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
                        Log In
                      </Button>
                      <Button
                        onClick={handleGetStarted}
                        className="w-full justify-start"
                        aria-label="Get started with Accio"
                      >
                        <UserPlus className="h-4 w-4 mr-2" aria-hidden="true" />
                        Get Started
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigate('/dashboard');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full justify-start"
                      >
                        Dashboard
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          signOut();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full justify-start"
                      >
                        Sign Out
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Unified Auth Modal */}
      <UnifiedAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  );
};

export default PrimaryNavigation;
