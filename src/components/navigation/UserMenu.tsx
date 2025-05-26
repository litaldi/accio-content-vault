
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAccessibility } from '@/contexts/AccessibilityContext';
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
          className="hidden sm:flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Search your content"
        >
          <Search className="h-4 w-4" />
          <span className="hidden lg:inline">Search</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="relative h-8 w-8 rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`User menu for ${user?.email || 'user'}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
              {user?.email || 'User'}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
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
        className="focus-visible:ring-2 focus-visible:ring-primary"
      >
        Sign In
      </Button>
      <Button 
        size="sm"
        onClick={() => {
          navigate('/register');
          announceToScreenReader('Opening sign up page');
        }}
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Sparkles className="h-4 w-4 mr-1" />
        Try Demo
      </Button>
    </div>
  );
};

export default UserMenu;
