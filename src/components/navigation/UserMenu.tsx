
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';
import { 
  Search,
  Home, 
  User, 
  Settings, 
  LogOut,
  Sparkles
} from 'lucide-react';

interface UserMenuProps {
  isLoggedIn: boolean;
  user: any;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isLoggedIn, user, onLogout }) => {
  const navigate = useNavigate();
  const { announceToScreenReader } = useAccessibility();

  if (isLoggedIn) {
    return (
      <>
        {/* Quick Search Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            navigate('/search');
            announceToScreenReader('Opening search page');
          }}
          className={cn(
            "hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg transition-all duration-200",
            "hover:bg-accent/50 hover:text-accent-foreground",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "dark:hover:bg-accent/30"
          )}
          aria-label="Search your content"
        >
          <Search className="h-4 w-4" />
          <span className="hidden lg:inline text-sm font-medium">Search</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "relative h-9 w-9 rounded-full transition-all duration-200",
                "hover:bg-accent/50 hover:scale-105 active:scale-100",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                "dark:hover:bg-accent/30"
              )}
              aria-label={`User menu for ${user?.email || 'user'}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className={cn(
                  "bg-primary/10 text-primary font-semibold text-sm",
                  "dark:bg-primary/20 dark:text-primary"
                )}>
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className={cn(
              "w-56 bg-background border shadow-lg backdrop-blur-xl",
              "dark:bg-background/95 dark:border-border/40"
            )}
          >
            <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
              {user?.email || 'User'}
            </div>
            <DropdownMenuSeparator className="dark:bg-border/40" />
            <DropdownMenuItem 
              onClick={() => navigate('/dashboard')}
              className="cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30"
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate('/profile')}
              className="cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate('/settings')}
              className="cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="dark:bg-border/40" />
            <DropdownMenuItem 
              onClick={onLogout} 
              className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => {
          navigate('/login');
          announceToScreenReader('Opening sign in page');
        }}
        className={cn(
          "h-9 px-3 rounded-lg transition-all duration-200",
          "hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-primary",
          "dark:hover:bg-accent/30"
        )}
      >
        Sign In
      </Button>
      <Button 
        size="sm"
        onClick={() => {
          navigate('/register');
          announceToScreenReader('Opening sign up page');
        }}
        className={cn(
          "h-9 px-3 rounded-lg transition-all duration-200 shadow-sm",
          "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
          "hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary",
          "dark:shadow-primary/20 dark:hover:shadow-primary/30"
        )}
      >
        <Sparkles className="h-4 w-4 mr-1" />
        Try Demo
      </Button>
    </div>
  );
};

export default UserMenu;
