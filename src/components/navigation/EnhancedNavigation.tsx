
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { 
  Brain, 
  Menu, 
  X, 
  Home, 
  Zap, 
  HelpCircle, 
  Mail, 
  User,
  Settings,
  BarChart3,
  BookOpen,
  LogIn,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

const mainNavigation: NavigationItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Features', href: '/features', icon: Zap },
  { name: 'Help', href: '/help', icon: HelpCircle },
  { name: 'Contact', href: '/contact', icon: Mail },
];

const userNavigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Collections', href: '/collections', icon: BookOpen },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface EnhancedNavigationProps {
  isAuthenticated?: boolean;
  className?: string;
}

const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({
  isAuthenticated = false,
  className
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const NavLink: React.FC<{ item: NavigationItem; onClick?: () => void }> = ({ 
    item, 
    onClick 
  }) => (
    <Link
      to={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActivePath(item.href)
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
      aria-current={isActivePath(item.href) ? 'page' : undefined}
    >
      {item.icon && <item.icon className="h-4 w-4" />}
      {item.name}
    </Link>
  );

  return (
    <nav className={cn("border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">Accio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNavigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <NavLink item={item} />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              
              {isAuthenticated && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground">
                    Dashboard
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {userNavigation.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                isActivePath(item.href) && "bg-accent text-accent-foreground"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                {item.icon && <item.icon className="h-4 w-4" />}
                                <div className="text-sm font-medium leading-none">
                                  {item.name}
                                </div>
                              </div>
                              {item.description && (
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <Button variant="outline" asChild>
              <Link to="/profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container space-y-1 p-4">
            {/* Main Navigation */}
            <div className="space-y-1">
              {mainNavigation.map((item) => (
                <NavLink 
                  key={item.name} 
                  item={item}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </div>

            {/* User Navigation */}
            {isAuthenticated && (
              <>
                <div className="border-t pt-4 mt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Dashboard
                  </p>
                  <div className="space-y-1">
                    {userNavigation.map((item) => (
                      <NavLink 
                        key={item.name} 
                        item={item}
                        onClick={() => setIsMobileMenuOpen(false)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Auth Buttons */}
            <div className="border-t pt-4 mt-4 space-y-2">
              {isAuthenticated ? (
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" asChild>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default EnhancedNavigation;
