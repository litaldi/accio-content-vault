
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  User, 
  Bookmark, 
  FolderOpen, 
  Plus, 
  Brain, 
  Settings, 
  Activity, 
  HelpCircle, 
  MessageCircle,
  Search,
  Menu,
  X,
  LogOut,
  Bell
} from 'lucide-react';

const InternalNavigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard Overview',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Your command center'
    },
    {
      label: 'Search Content',
      href: '/search',
      icon: Search,
      description: 'Find anything in your library'
    },
    {
      label: 'Quick Capture',
      href: '/save',
      icon: Plus,
      description: 'Save new content instantly'
    },
    {
      label: 'Saved Content',
      href: '/saved',
      icon: Bookmark,
      description: 'Your saved articles and resources'
    },
    {
      label: 'Collections',
      href: '/collections',
      icon: FolderOpen,
      description: 'Organized content groups'
    },
    {
      label: 'Activity Log',
      href: '/activity',
      icon: Activity,
      description: 'Track your learning journey'
    },
    {
      label: 'My Profile',
      href: '/profile',
      icon: User,
      description: 'Account settings and info'
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Customize your experience'
    },
    {
      label: 'Help Center',
      href: '/help',
      icon: HelpCircle,
      description: 'Get support and guidance'
    },
    {
      label: 'Contact',
      href: '/contact',
      icon: MessageCircle,
      description: 'Reach out to our team'
    }
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-background border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/dashboard" className="font-semibold text-lg">
            Accio
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/search" aria-label="Search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r min-h-screen">
        <div className="p-6 border-b">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            Accio
          </Link>
          {user && (
            <div className="mt-3 text-sm text-muted-foreground">
              Welcome back, {user.email?.split('@')[0]}
            </div>
          )}
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  hover:bg-accent hover:text-accent-foreground
                  ${isActiveRoute(item.href) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground'
                  }
                `}
                title={item.description}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-background border-r">
            <div className="p-4 border-b flex items-center justify-between">
              <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Brain className="h-4 w-4 text-primary-foreground" />
                </div>
                Accio
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                      hover:bg-accent hover:text-accent-foreground
                      ${isActiveRoute(item.href) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InternalNavigation;
