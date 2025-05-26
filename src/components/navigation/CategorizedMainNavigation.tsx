
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { EnhancedThemeToggle } from '@/components/ui/enhanced-theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  FolderOpen, 
  BarChart3, 
  User, 
  LogOut,
  Sparkles,
  Brain,
  Search,
  Puzzle,
  Star,
  MessageCircle,
  Zap,
  Settings,
  ChevronDown,
  FileText,
  HelpCircle,
  Shield,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { copy } from '@/utils/copy';

export const CategorizedMainNavigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "See you soon!",
        description: "You've been signed out successfully.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Oops!",
        description: "There was an issue signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Core navigation (always visible)
  const coreNavItems = [
    { 
      to: '/', 
      label: 'Home', 
      icon: Home,
      description: 'Welcome to Accio'
    },
    { 
      to: '/features', 
      label: 'Features', 
      icon: Star,
      description: 'Explore our capabilities'
    },
    { 
      to: '/playground', 
      label: 'Try Demo', 
      icon: Puzzle,
      description: 'Interactive playground'
    }
  ];

  // Product features (authenticated users only)
  const productCategories = [
    {
      title: 'Dashboard',
      items: [
        { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, description: 'Your command center' },
        { to: '/analytics', label: 'Analytics', icon: BarChart3, description: 'Track insights' }
      ]
    },
    {
      title: 'Content',
      items: [
        { to: '/search', label: 'Search', icon: Search, description: 'Find knowledge' },
        { to: '/collections', label: 'Collections', icon: FolderOpen, description: 'Organize content' },
        { to: '/save', label: 'Save Content', icon: FileText, description: 'Add new content' }
      ]
    },
    {
      title: 'Tools',
      items: [
        { to: '/integrations', label: 'Integrations', icon: Zap, description: 'Connect your tools' },
        { to: '/account', label: 'Settings', icon: Settings, description: 'Account preferences' }
      ]
    }
  ];

  // Support navigation
  const supportNavItems = [
    { 
      to: '/contact', 
      label: 'Help & Support', 
      icon: HelpCircle,
      description: 'Get assistance'
    },
    { 
      to: '/privacy', 
      label: 'Privacy', 
      icon: Shield,
      description: 'Privacy policy'
    },
    { 
      to: '/terms', 
      label: 'Terms', 
      icon: FileText,
      description: 'Terms of service'
    }
  ];

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 border-b ${
      scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background'
    }`} role="banner">
      <nav className="container mx-auto px-4 max-w-7xl" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            aria-label="Accio - Go to homepage"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Brain className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Accio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Core Navigation */}
                {coreNavItems.map((item) => (
                  <NavigationMenuItem key={item.to}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.to}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm
                          hover:bg-accent/80 hover:text-accent-foreground
                          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                          ${isActiveRoute(item.to) 
                            ? 'bg-primary text-primary-foreground shadow-md' 
                            : 'text-muted-foreground hover:text-foreground'
                          }
                        `}
                        aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                        title={item.description}
                      >
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Product Mega Menu (for authenticated users) */}
                {user && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="gap-2 font-medium text-sm">
                      <LayoutDashboard className="h-4 w-4" />
                      Product
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[600px] gap-4 p-6">
                        <div className="grid grid-cols-3 gap-6">
                          {productCategories.map((category) => (
                            <div key={category.title} className="space-y-3">
                              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                {category.title}
                              </h4>
                              <ul className="space-y-2">
                                {category.items.map((item) => (
                                  <li key={item.to}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        to={item.to}
                                        className={`flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors ${
                                          isActiveRoute(item.to) ? 'bg-accent' : ''
                                        }`}
                                      >
                                        <item.icon className="h-4 w-4 text-muted-foreground" />
                                        <div className="flex flex-col">
                                          <span className="text-sm font-medium">{item.label}</span>
                                          <span className="text-xs text-muted-foreground">{item.description}</span>
                                        </div>
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}

                {/* Support Dropdown */}
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="gap-2 font-medium text-sm text-muted-foreground hover:text-foreground"
                      >
                        <HelpCircle className="h-4 w-4" />
                        Support
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48">
                      {supportNavItems.map((item) => (
                        <DropdownMenuItem key={item.to} asChild>
                          <Link
                            to={item.to}
                            className={`flex items-center gap-3 w-full ${
                              isActiveRoute(item.to) ? 'bg-accent' : ''
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                            <div className="flex flex-col">
                              <span className="font-medium">{item.label}</span>
                              <span className="text-xs text-muted-foreground">{item.description}</span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Auth & Theme */}
          <div className="hidden md:flex items-center gap-3">
            <EnhancedThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 hover:bg-accent/80"
                  >
                    <User className="h-4 w-4" />
                    Account
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    {copy.auth.signOut}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">{copy.auth.signIn}</Link>
                </Button>
                <Button size="sm" className="gap-2 shadow-lg" asChild>
                  <Link to="/register">
                    <Sparkles className="h-4 w-4" />
                    {copy.auth.getStarted}
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <EnhancedThemeToggle />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? copy.accessibility.closeMenu : copy.accessibility.openMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-xl z-50"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-6 space-y-1">
              {/* Core Navigation */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Explore
                </div>
                {coreNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg transition-all font-medium
                      hover:bg-accent/80 hover:text-accent-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                      ${isActiveRoute(item.to) 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
                    aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Product Navigation (for authenticated users) */}
              {user && productCategories.map((category) => (
                <div key={category.title} className="space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {category.title}
                  </div>
                  {category.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`
                        flex items-center gap-3 px-3 py-3 rounded-lg transition-all font-medium
                        hover:bg-accent/80 hover:text-accent-foreground
                        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                        ${isActiveRoute(item.to) 
                          ? 'bg-primary text-primary-foreground shadow-md' 
                          : 'text-muted-foreground hover:text-foreground'
                        }
                      `}
                      aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs opacity-70">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}

              {/* Support Navigation */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Support
                </div>
                {supportNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg transition-all font-medium
                      hover:bg-accent/80 hover:text-accent-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                      ${isActiveRoute(item.to) 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
                    aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t space-y-3">
                {user ? (
                  <>
                    <Button
                      className="w-full justify-start gap-3"
                      variant="outline"
                      asChild
                    >
                      <Link to="/account">
                        <Settings className="h-5 w-5" />
                        Account Settings
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className="w-full justify-start gap-3 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="h-5 w-5" />
                      {copy.auth.signOut}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                    >
                      <Link to="/login">{copy.auth.signIn}</Link>
                    </Button>
                    <Button 
                      className="w-full gap-2 shadow-lg"
                      asChild
                    >
                      <Link to="/register">
                        <Sparkles className="h-4 w-4" />
                        {copy.auth.getStarted}
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
