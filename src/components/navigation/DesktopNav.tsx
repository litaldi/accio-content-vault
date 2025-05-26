
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Users, 
  Plus,
  Search,
  User,
  Settings,
  HelpCircle,
  FileText
} from 'lucide-react';

interface DesktopNavProps {
  isLoggedIn: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  const { announceToScreenReader } = useAccessibility();

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
    <nav 
      className="hidden md:flex items-center gap-1" 
      role="navigation" 
      aria-label="Main navigation"
    >
      {currentNavItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "hover:bg-accent hover:text-accent-foreground",
            isActiveLink(item.path) 
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "text-muted-foreground"
          )}
          aria-current={isActiveLink(item.path) ? 'page' : undefined}
          onClick={() => announceToScreenReader(`Navigating to ${item.label}`)}
        >
          <item.icon className="h-4 w-4" aria-hidden="true" />
          <span>{item.label}</span>
        </Link>
      ))}

      {/* More Menu for Additional Pages */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
            aria-label="More pages and options"
          >
            <FileText className="h-4 w-4" />
            <span>More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Utility Pages</DropdownMenuLabel>
          {utilityPages.map((page) => (
            <DropdownMenuItem key={page.path} asChild>
              <Link 
                to={page.path}
                className="flex items-center gap-2"
                onClick={() => announceToScreenReader(`Navigating to ${page.label}`)}
              >
                <page.icon className="h-4 w-4" />
                {page.label}
              </Link>
            </DropdownMenuItem>
          ))}
          {isLoggedIn && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default DesktopNav;
