
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AccessibilityButton } from '@/components/accessibility/AccessibilityButton';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { 
  Home, 
  BookOpen, 
  Plus, 
  Search,
  BarChart3, 
  Settings,
  Menu, 
  X, 
  LogOut,
  Archive,
  Heart,
  FileText,
  Users,
  HelpCircle,
  Mail,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Star
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import SkipToContent from '@/components/SkipToContent';

interface MegaMenuCategory {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  items: {
    path: string;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const MegaMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const { preferences } = useAccessibility();
  const isLoggedIn = !!user;
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll handler
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  // Define mega menu categories for authenticated users
  const authenticatedCategories: MegaMenuCategory[] = [
    {
      title: 'Content',
      description: 'Manage your saved content',
      icon: BookOpen,
      items: [
        { path: '/dashboard', label: 'Dashboard', description: 'Your content overview', icon: Home },
        { path: '/save', label: 'Save Content', description: 'Add new items', icon: Plus },
        { path: '/search', label: 'Search', description: 'Find your content', icon: Search },
        { path: '/collections', label: 'Collections', description: 'Organize content', icon: Archive },
        { path: '/favorites', label: 'Favorites', description: 'Pinned items', icon: Heart }
      ]
    },
    {
      title: 'Analytics',
      description: 'Insights and performance',
      icon: BarChart3,
      items: [
        { path: '/analytics', label: 'Overview', description: 'Usage analytics', icon: TrendingUp },
        { path: '/analytics/content', label: 'Content Insights', description: 'Content performance', icon: FileText },
        { path: '/analytics/search', label: 'Search Analytics', description: 'Search patterns', icon: Search },
        { path: '/analytics/engagement', label: 'Engagement', description: 'User behavior', icon: Target }
      ]
    },
    {
      title: 'Account',
      description: 'Settings and preferences',
      icon: Settings,
      items: [
        { path: '/settings', label: 'Settings', description: 'Account preferences', icon: Settings },
        { path: '/settings/profile', label: 'Profile', description: 'Personal information', icon: Users },
        { path: '/settings/privacy', label: 'Privacy', description: 'Data controls', icon: Shield },
        { path: '/settings/subscription', label: 'Subscription', description: 'Plan management', icon: Star }
      ]
    }
  ];

  // Define mega menu categories for public users
  const publicCategories: MegaMenuCategory[] = [
    {
      title: 'Product',
      description: 'Learn about Accio',
      icon: Zap,
      items: [
        { path: '/features', label: 'Features', description: 'What we offer', icon: Star },
        { path: '/pricing', label: 'Pricing', description: 'Simple plans', icon: BarChart3 },
        { path: '/demo', label: 'Demo', description: 'Try it out', icon: Target },
        { path: '/integrations', label: 'Integrations', description: 'Connect your tools', icon: Plus }
      ]
    },
    {
      title: 'Company',
      description: 'About us and resources',
      icon: Users,
      items: [
        { path: '/about', label: 'About', description: 'Our story', icon: Users },
        { path: '/blog', label: 'Blog', description: 'Latest updates', icon: FileText },
        { path: '/contact', label: 'Contact', description: 'Get in touch', icon: Mail },
        { path: '/careers', label: 'Careers', description: 'Join our team', icon: Heart }
      ]
    },
    {
      title: 'Support',
      description: 'Help and resources',
      icon: HelpCircle,
      items: [
        { path: '/help', label: 'Help Center', description: 'Find answers', icon: HelpCircle },
        { path: '/faq', label: 'FAQ', description: 'Common questions', icon: FileText },
        { path: '/tutorials', label: 'Tutorials', description: 'Learn how to use', icon: BookOpen },
        { path: '/status', label: 'Status', description: 'System status', icon: TrendingUp }
      ]
    }
  ];

  const categories = isLoggedIn ? authenticatedCategories : publicCategories;

  const isActiveLink = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <>
      <SkipToContent />
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b",
          scrolled 
            ? 'bg-background/95 backdrop-blur-xl shadow-lg border-border/50' 
            : 'bg-background/80 backdrop-blur-sm border-transparent',
          preferences.highContrast && 'border-foreground bg-background'
        )}
        role="banner"
        aria-label="Main navigation"
      >
        <div className="container flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Logo */}
          <div className="flex items-center min-w-0">
            <Link 
              to="/" 
              className={cn(
                "flex items-center gap-2 sm:gap-3 transition-all duration-200 hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1",
                "group"
              )}
              aria-label="Accio - Go to homepage"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
                  <span className="text-primary-foreground font-bold text-lg sm:text-xl">A</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xl sm:text-2xl font-bold text-primary leading-none truncate">Accio</span>
                  <span className="text-xs text-muted-foreground leading-none hidden sm:block">Knowledge Library</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Mega Menu */}
          <nav 
            className="hidden lg:flex items-center gap-1" 
            role="navigation" 
            aria-label="Primary navigation"
            ref={dropdownRef}
          >
            {categories.map((category) => (
              <div key={category.title} className="relative">
                <Button
                  variant="ghost"
                  className={cn(
                    "group flex items-center gap-2 px-4 py-2 h-auto text-sm font-medium transition-all duration-200",
                    "hover:bg-accent/80 hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    "min-h-[44px]",
                    activeDropdown === category.title && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => setActiveDropdown(activeDropdown === category.title ? null : category.title)}
                  onMouseEnter={() => setActiveDropdown(category.title)}
                  aria-expanded={activeDropdown === category.title}
                  aria-haspopup="true"
                >
                  <category.icon className="h-4 w-4" aria-hidden="true" />
                  <span className="font-medium">{category.title}</span>
                </Button>

                {/* Mega Menu Dropdown */}
                {activeDropdown === category.title && (
                  <div 
                    className="absolute top-full left-0 w-80 bg-background border border-border rounded-lg shadow-xl mt-2 p-6 z-50"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <category.icon className="h-5 w-5" />
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                    </div>
                    
                    <div className="grid gap-2">
                      {category.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={cn(
                            "group flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                            "hover:bg-accent/80 hover:text-accent-foreground",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                            isActiveLink(item.path) && "bg-primary/10 text-primary"
                          )}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-sm">{item.label}</span>
                            <span className="text-xs text-muted-foreground">{item.description}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme and Accessibility Controls */}
            <div className="hidden sm:flex items-center gap-1">
              <AccessibilityButton />
              <ModeToggle />
            </div>

            {/* User Account or Auth */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "relative h-10 w-10 rounded-full transition-all duration-200",
                      "hover:scale-105 hover:shadow-md",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                    aria-label="Open user menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 bg-background border shadow-xl"
                  sideOffset={8}
                >
                  <DropdownMenuLabel className="font-medium">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                  className="text-sm font-medium px-4 min-h-[44px]"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  className="text-sm font-medium px-4 min-h-[44px] shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "lg:hidden h-10 w-10 transition-all duration-200",
                    "hover:bg-accent hover:scale-105 active:scale-95",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  )}
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </Button>
              </SheetTrigger>
              
              <SheetContent 
                side="right" 
                className="w-[320px] bg-background border-l overflow-y-auto"
              >
                <SheetHeader className="text-left border-b pb-4 mb-6">
                  <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">A</span>
                    </div>
                    Navigation
                  </SheetTitle>
                </SheetHeader>
                
                {/* Mobile Navigation Categories */}
                <div className="space-y-6">
                  {categories.map((category) => (
                    <div key={category.title} className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <category.icon className="h-4 w-4" />
                        {category.title}
                      </div>
                      <div className="space-y-1 pl-6">
                        {category.items.map((item) => (
                          <Link 
                            key={item.path}
                            to={item.path} 
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                              "hover:bg-accent/80 active:scale-95",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                              "min-h-[48px]",
                              isActiveLink(item.path) && "bg-primary/10 text-primary"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <item.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                            <div className="flex flex-col min-w-0">
                              <span className="font-medium text-sm">{item.label}</span>
                              <span className="text-xs text-muted-foreground">{item.description}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Mobile Theme Controls */}
                <div className="flex items-center gap-2 mt-6 pt-6 border-t">
                  <AccessibilityButton />
                  <ModeToggle />
                </div>
                
                {/* Mobile Auth Section */}
                <div className="mt-6 pt-6 border-t">
                  {!isLoggedIn ? (
                    <div className="flex flex-col gap-3">
                      <Button 
                        onClick={() => {
                          navigate('/register');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full justify-center shadow-lg hover:shadow-xl transition-all min-h-[48px]"
                      >
                        Get Started
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          navigate('/login');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full justify-center min-h-[48px]"
                      >
                        Sign In
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="ghost" 
                      onClick={handleLogout}
                      className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 min-h-[48px]"
                    >
                      <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                      Sign Out
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default MegaMenu;
