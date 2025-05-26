import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  FolderOpen, 
  BookmarkPlus, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  Sparkles,
  Brain
} from 'lucide-react';
import { copy } from '@/utils/copy';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "See you soon!",
        description: "You've been signed out successfully. Your knowledge awaits your return.",
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

  const navItems = [
    { 
      to: '/', 
      label: copy.navigation.home, 
      icon: Home,
      description: 'Discover the magic'
    },
    ...(user ? [
      { 
        to: '/dashboard', 
        label: copy.navigation.dashboard, 
        icon: LayoutDashboard,
        description: 'Your command center'
      },
      { 
        to: '/collections', 
        label: copy.navigation.collections, 
        icon: FolderOpen,
        description: 'Organized brilliance'
      },
      { 
        to: '/analytics', 
        label: copy.navigation.analytics, 
        icon: BarChart3,
        description: 'Track your growth'
      },
      { 
        to: '/profile', 
        label: copy.navigation.profile, 
        icon: User,
        description: 'Your genius profile'
      },
      { 
        to: '/settings', 
        label: copy.navigation.settings, 
        icon: Settings,
        description: 'Customize everything'
      }
    ] : [])
  ];

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            onClick={closeMenu}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Accio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
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
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle variant="icon" size="sm" />
            
            {user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:bg-accent/80"
                  asChild
                >
                  <Link to="/dashboard">
                    <BookmarkPlus className="h-4 w-4" />
                    {copy.navigation.saveContent}
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-2 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  {copy.auth.signOut}
                </Button>
              </>
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
            <ThemeToggle variant="icon" size="sm" />
            
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
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium
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

              {/* Mobile Theme Toggle */}
              <div className="pt-4 border-t">
                <ThemeToggle variant="iconText" size="sm" />
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-2 border-t space-y-3">
                {user ? (
                  <>
                    <Button
                      className="w-full justify-start gap-3"
                      variant="outline"
                      asChild
                      onClick={closeMenu}
                    >
                      <Link to="/dashboard">
                        <BookmarkPlus className="h-5 w-5" />
                        {copy.navigation.saveContent}
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleSignOut();
                        closeMenu();
                      }}
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
                      onClick={closeMenu}
                    >
                      <Link to="/login">{copy.auth.signIn}</Link>
                    </Button>
                    <Button 
                      className="w-full gap-2 shadow-lg"
                      asChild
                      onClick={closeMenu}
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
      </div>
    </nav>
  );
};

export default Navigation;
