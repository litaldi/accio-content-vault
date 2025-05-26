
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  Brain, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationMenuDemo } from './NavigationMenu';
import { AuthButtons } from './AuthButtons';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import NavigationLogo from './NavigationLogo';
import { useNavigation } from '@/hooks/use-navigation';
import { cn } from '@/lib/utils';
import { copy } from '@/utils/copy';
import { OmniSearchBar } from '@/components/search/OmniSearchBar';

export const CategorizedMainNavigation: React.FC = () => {
  const { scrolled } = useNavigation();
  const location = useLocation();

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
      scrolled && "shadow-sm"
    )}>
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <NavigationLogo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between ml-6">
          {/* Left side - Main navigation */}
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link to="/">{copy.navigation.home}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/features">{copy.navigation.features}</Link>
            </Button>
            <NavigationMenuDemo />
          </div>
          
          {/* Center - Omni Search */}
          <div className="flex-1 max-w-md mx-6">
            <OmniSearchBar placeholder="Search everything... (⌘K)" compact />
          </div>

          {/* Right side - Auth and theme */}
          <div className="flex items-center gap-3">
            <AuthButtons isLoggedIn={false} />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="border-t md:hidden">
        <div className="container py-2">
          <div className="grid grid-cols-2 gap-2">
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                {copy.navigation.home}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/search" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                {copy.navigation.search}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/collections" className="w-full">
                <FolderOpen className="mr-2 h-4 w-4" />
                {copy.navigation.collections}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/analytics" className="w-full">
                <BarChart3 className="mr-2 h-4 w-4" />
                {copy.navigation.analytics}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/account" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                {copy.navigation.settings}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/intelligence" className="w-full">
                <Brain className="mr-2 h-4 w-4" />
                {copy.navigation.intelligence}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
