
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BarChart, FolderOpen, LogOut, Settings, User } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 border-b ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background border-transparent'}`}>
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <span className="text-2xl font-bold text-primary">Accio</span>
          </Link>
          
          {isLoggedIn && (
            <nav className="hidden md:flex gap-6">
              {[
                { path: '/dashboard', label: 'Dashboard' },
                { path: '/collections', label: 'Collections' },
                { path: '/analytics', label: 'Analytics' }
              ].map(item => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive(item.path) 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <ModeToggle />
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                  <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                    <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-scale-in">
                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer transition-colors">
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/collections')} className="cursor-pointer transition-colors">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  <span>Collections</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/analytics')} className="cursor-pointer transition-colors">
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer transition-colors">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer transition-colors text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-sm transition-all"
              >
                Log in
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="text-sm transition-all hover:shadow-md"
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
