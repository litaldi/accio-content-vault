import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BarChart, FolderOpen, LogOut, Menu, Settings, X } from 'lucide-react';
import { useDirection } from '@/hooks/use-direction';
import { useBreakpoint } from '@/hooks/use-mobile';
import { createAccessibleId } from '@/lib/utils';

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const isLoggedIn = !!user;
  const { isRtl } = useDirection();
  const { isMobile } = useBreakpoint();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Create IDs for accessibility
  const mobileMenuId = createAccessibleId('mobile-menu');
  const userMenuId = createAccessibleId('user-menu');
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    } else {
      await signOut();
      navigate('/');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Handle keyboard navigation for the mobile menu
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background border-transparent'
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              A
            </div>
            <span className="text-2xl font-bold text-primary">Accio</span>
          </Link>
          
          {/* Desktop Navigation */}
          {isLoggedIn && (
            <nav className="hidden md:flex gap-6" aria-label="Main Navigation">
              {[
                { path: '/dashboard', label: 'Dashboard' },
                { path: '/collections', label: 'Collections' },
                { path: '/analytics', label: 'Analytics' }
              ].map(item => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive(item.path) 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <ModeToggle />
          
          {isLoggedIn ? (
            <>
              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls={mobileMenuId}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-8 w-8 rounded-full" 
                    aria-label="User menu"
                    id={userMenuId}
                  >
                    <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                      {user?.photoURL ? (
                        <AvatarImage src={(user as any).photoURL} alt="Profile" />
                      ) : null}
                      <AvatarFallback className="bg-primary/10 text-primary">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 animate-scale-in" aria-labelledby={userMenuId}>
                  <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                    {user?.email || 'Signed In User'}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer transition-colors">
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/collections')} className="cursor-pointer transition-colors">
                    <FolderOpen className={`${isRtl ? 'ml-2 rtl-mirror' : 'mr-2'} h-4 w-4`} />
                    <span>Collections</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/analytics')} className="cursor-pointer transition-colors">
                    <BarChart className={`${isRtl ? 'ml-2 rtl-mirror' : 'mr-2'} h-4 w-4`} />
                    <span>Analytics</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer transition-colors">
                    <Settings className={`${isRtl ? 'ml-2 rtl-mirror' : 'mr-2'} h-4 w-4`} />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer transition-colors text-destructive focus:text-destructive">
                    <LogOut className={`${isRtl ? 'ml-2 rtl-mirror' : 'mr-2'} h-4 w-4`} />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-sm transition-all"
              >
                <span>Log in</span>
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="text-sm transition-all hover:shadow-md"
              >
                <span>Sign up</span>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isLoggedIn && mobileMenuOpen && (
        <div 
          id={mobileMenuId}
          className="md:hidden bg-background border-b border-border py-4 px-6 shadow-lg"
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {[
              { path: '/dashboard', label: 'Dashboard' },
              { path: '/collections', label: 'Collections' },
              { path: '/analytics', label: 'Analytics' },
              { path: '/settings', label: 'Settings' },
            ].map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center py-2 px-3 rounded-md transition-colors ${
                  isActive(item.path) 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-foreground hover:bg-muted'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                <span>{item.label}</span>
              </Link>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
