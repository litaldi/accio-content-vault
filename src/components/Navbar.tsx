
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BarChart, FolderOpen, LogOut, Settings, Menu } from 'lucide-react';
import { AccessibilityButton } from '@/components/accessibility/AccessibilityButton';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const isMobile = useIsMobile();
  
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

  const navigationLinks = [
    { path: '/about', label: 'About' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' }
  ];

  const renderNavigationLinks = () => (
    <>
      {navigationLinks.map(item => (
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
          {item.label}
          {isActive(item.path) && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" aria-hidden="true" />
          )}
        </Link>
      ))}
    </>
  );

  const renderMobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col gap-4 mt-8">
          <Link to="/" className="text-lg font-medium py-2 transition-colors hover:text-primary">
            Home
          </Link>
          {navigationLinks.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`text-lg font-medium py-2 transition-colors ${
                isActive(item.path) ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="text-lg font-medium py-2 transition-colors hover:text-primary">
                Dashboard
              </Link>
              <Link to="/collections" className="text-lg font-medium py-2 transition-colors hover:text-primary">
                Collections
              </Link>
              <Link to="/analytics" className="text-lg font-medium py-2 transition-colors hover:text-primary">
                Analytics
              </Link>
              <Link to="/settings" className="text-lg font-medium py-2 transition-colors hover:text-primary">
                Settings
              </Link>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="justify-start pl-0 text-lg font-medium text-destructive hover:text-destructive hover:bg-transparent"
              >
                Log out
              </Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );

  const renderDesktopNavigation = () => (
    <>
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <span className="text-2xl font-bold text-primary">Accio</span>
        </Link>
        
        {isLoggedIn ? (
          <nav className="hidden md:flex gap-6">
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
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" aria-hidden="true" />
                )}
              </Link>
            ))}
          </nav>
        ) : (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 grid grid-cols-2 gap-3">
                    <Link to="/pricing" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Pricing</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">View our pricing plans and options</p>
                    </Link>
                    <Link to="/faq" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">FAQ</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Get answers to common questions</p>
                    </Link>
                    <Link to="/contact" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Contact</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Get in touch with our support team</p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <AccessibilityButton />
        <ModeToggle />
        
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                  <AvatarFallback className="bg-primary/10 text-primary">{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-scale-in">
              <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer transition-colors">
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/collections')} className="cursor-pointer transition-colors">
                <FolderOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Collections</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/analytics')} className="cursor-pointer transition-colors">
                <BarChart className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Analytics</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer transition-colors">
                <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer transition-colors text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-sm transition-all"
            >
              Log in
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className="text-sm transition-all hover:shadow-md"
            >
              Sign up
            </Button>
          </div>
        )}
        
        {isMobile && renderMobileMenu()}
      </div>
    </>
  );

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background border-transparent'
      }`}
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {renderDesktopNavigation()}
      </div>
    </header>
  );
};

export default Navbar;
