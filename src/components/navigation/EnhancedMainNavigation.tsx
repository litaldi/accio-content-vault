
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { 
  Brain,
  Home,
  Compass,
  FolderOpen,
  LayoutDashboard,
  Bookmark,
  BarChart3,
  User,
  Settings,
  LogOut,
  LogIn,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const EnhancedMainNavigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Successfully signed out!",
        description: "Come back soon to continue building your knowledge empire!",
      });
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const isActiveRoute = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const exploreLinks = [
    { to: '/', label: 'Home', icon: Home, description: 'Welcome to Accio' },
    { to: '/features', label: 'Discover', icon: Compass, description: 'Explore features' },
    { to: '/collections', label: 'Collections', icon: FolderOpen, description: 'Browse collections' }
  ];

  const workspaceLinks = user ? [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Your command center' },
    { to: '/saved', label: 'Saved Content', icon: Bookmark, description: 'Your saved items' },
    { to: '/analytics', label: 'Analytics', icon: BarChart3, description: 'Track your progress' }
  ] : [];

  const accountLinks = user ? [
    { to: '/profile', label: 'Profile', icon: User, description: 'Manage profile' },
    { to: '/settings', label: 'Settings', icon: Settings, description: 'App preferences' }
  ] : [];

  const NavGroup = ({ title, links, mobile = false }: { 
    title: string; 
    links: typeof exploreLinks; 
    mobile?: boolean;
  }) => (
    <div className={cn("space-y-2", mobile && "mb-6")}>
      {mobile && (
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
          {title}
        </h3>
      )}
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            isActiveRoute(link.to) 
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground",
            mobile ? "w-full" : ""
          )}
          aria-current={isActiveRoute(link.to) ? 'page' : undefined}
        >
          <link.icon className="h-4 w-4" aria-hidden="true" />
          <div className={mobile ? "" : "hidden lg:block"}>
            <div className="font-medium">{link.label}</div>
            {mobile && (
              <div className="text-xs opacity-70">{link.description}</div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Accio - Go to homepage"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
              <Brain className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Accio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Explore Group */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="gap-2">
                    <Compass className="h-4 w-4" />
                    Explore
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-64">
                      {exploreLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <link.icon className="h-4 w-4" />
                            <div className="text-sm font-medium">{link.label}</div>
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            {link.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Workspace Group - Only if user is logged in */}
                {user && workspaceLinks.length > 0 && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Workspace
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-64">
                        {workspaceLinks.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <link.icon className="h-4 w-4" />
                              <div className="text-sm font-medium">{link.label}</div>
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}

                {/* Account Group - Only if user is logged in */}
                {user && accountLinks.length > 0 && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="gap-2">
                      <User className="h-4 w-4" />
                      Account
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-64">
                        {accountLinks.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <link.icon className="h-4 w-4" />
                              <div className="text-sm font-medium">{link.label}</div>
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        ))}
                        <div className="border-t pt-3">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 w-full text-left p-3 rounded-md transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
                          >
                            <LogOut className="h-4 w-4" />
                            <span className="text-sm font-medium">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="gap-2"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>

            {/* Auth Actions */}
            {user ? (
              <Button
                size="sm"
                className="gap-2 shadow-sm"
                asChild
              >
                <Link to="/dashboard">
                  <Sparkles className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" className="gap-2 shadow-sm" asChild>
                  <Link to="/register">
                    <Sparkles className="h-4 w-4" />
                    Start Now
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background shadow-lg" role="navigation" aria-label="Mobile navigation">
            <div className="px-4 py-6 space-y-6">
              <NavGroup title="Explore" links={exploreLinks} mobile />
              {user && workspaceLinks.length > 0 && (
                <NavGroup title="Your Workspace" links={workspaceLinks} mobile />
              )}
              {user && accountLinks.length > 0 && (
                <NavGroup title="Account" links={accountLinks} mobile />
              )}

              <div className="pt-4 border-t space-y-3">
                {user ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-3 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" className="w-full justify-start gap-3" asChild>
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <LogIn className="h-5 w-5" />
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full justify-start gap-3 shadow-sm" asChild>
                      <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <Sparkles className="h-5 w-5" />
                        Start Now
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default EnhancedMainNavigation;
