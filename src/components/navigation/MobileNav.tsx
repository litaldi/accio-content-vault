
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  BarChart3, 
  Users, 
  Plus,
  Search,
  User,
  Settings,
  HelpCircle,
  Sparkles,
  LogOut
} from 'lucide-react';

interface MobileNavProps {
  isLoggedIn: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onLogout: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ 
  isLoggedIn, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  onLogout 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { preferences, announceToScreenReader } = useAccessibility();

  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/features', label: 'Features', icon: BookOpen },
    { path: '/pricing', label: 'Pricing', icon: BarChart3 },
    { path: '/about', label: 'About', icon: Users }
  ];

  const userNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/save', label: 'Save Content', icon: Plus },
    { path: '/collections', label: 'Collections', icon: BookOpen },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const utilityPages = [
    { path: '/search', label: 'Search', icon: Search },
    { path: '/help', label: 'Help', icon: HelpCircle }
  ];

  const currentNavItems = isLoggedIn ? userNavItems : publicNavItems;

  const isActiveLink = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent 
        side={preferences.language === 'he' || preferences.language === 'ar' ? 'left' : 'right'} 
        className="w-[300px]"
        id="mobile-navigation"
      >
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6" role="navigation" aria-label="Mobile navigation">
          {currentNavItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActiveLink(item.path) 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-accent"
              )}
              onClick={() => {
                setMobileMenuOpen(false);
                announceToScreenReader(`Navigating to ${item.label}`);
              }}
              aria-current={isActiveLink(item.path) ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
          
          {/* Mobile utility pages */}
          <div className="border-t pt-4">
            <div className="text-sm font-medium text-muted-foreground mb-2 px-3">More Pages</div>
            {utilityPages.map((page) => (
              <Link 
                key={page.path}
                to={page.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  announceToScreenReader(`Opening ${page.label} page`);
                }}
              >
                <page.icon className="h-5 w-5" />
                {page.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile-only additional options */}
          {isLoggedIn && (
            <div className="border-t pt-4">
              <div className="text-sm font-medium text-muted-foreground mb-2 px-3">Account</div>
              <Link 
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  announceToScreenReader('Opening profile page');
                }}
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
              <Link 
                to="/settings"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  announceToScreenReader('Opening settings page');
                }}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </div>
          )}
          
          {!isLoggedIn && (
            <div className="flex flex-col gap-2 pt-4 border-t">
              <Button 
                onClick={() => { 
                  navigate('/register'); 
                  setMobileMenuOpen(false);
                  announceToScreenReader('Opening sign up page');
                }}
                className="justify-start"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Try Demo
              </Button>
              <Button 
                variant="outline" 
                onClick={() => { 
                  navigate('/login'); 
                  setMobileMenuOpen(false);
                  announceToScreenReader('Opening sign in page');
                }}
                className="justify-start"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>
          )}

          {isLoggedIn && (
            <div className="pt-4 border-t">
              <Button 
                variant="destructive" 
                onClick={onLogout}
                className="w-full justify-start"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
