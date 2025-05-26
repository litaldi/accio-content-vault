
import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'text' | 'iconText';
  size?: 'sm' | 'default' | 'lg';
  align?: 'start' | 'center' | 'end';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'icon', 
  size = 'default',
  align = 'end'
}) => {
  const { theme, setTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      default:
        return 'System';
    }
  };

  if (variant === 'icon') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'}
            className="w-9 px-0 transition-all duration-200 hover:scale-105"
            aria-label={`Current theme: ${getThemeLabel()}. Click to change theme`}
          >
            <div className="transition-transform duration-200">
              {getThemeIcon()}
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={align} 
          className="min-w-[8rem] bg-background border shadow-lg"
        >
          <DropdownMenuItem 
            onClick={() => setTheme('light')} 
            className="gap-2 cursor-pointer transition-colors duration-200"
          >
            <Sun className="h-4 w-4" />
            <span>Light</span>
            {theme === 'light' && <span className="ml-auto text-xs text-primary">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme('dark')} 
            className="gap-2 cursor-pointer transition-colors duration-200"
          >
            <Moon className="h-4 w-4" />
            <span>Dark</span>
            {theme === 'dark' && <span className="ml-auto text-xs text-primary">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme('system')} 
            className="gap-2 cursor-pointer transition-colors duration-200"
          >
            <Monitor className="h-4 w-4" />
            <span>System</span>
            {theme === 'system' && <span className="ml-auto text-xs text-primary">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'iconText') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={size}
            className="gap-2 transition-all duration-200 hover:scale-105"
            aria-label={`Current theme: ${getThemeLabel()}. Click to change theme`}
          >
            <div className="transition-transform duration-200">
              {getThemeIcon()}
            </div>
            <span className="hidden sm:inline">{getThemeLabel()}</span>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={align} 
          className="min-w-[8rem] bg-background border shadow-lg"
        >
          <DropdownMenuItem 
            onClick={() => setTheme('light')} 
            className="gap-2 cursor-pointer transition-colors duration-200"
          >
            <Sun className="h-4 w-4" />
            <span>Light</span>
            {theme === 'light' && <span className="ml-auto text-xs text-primary">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme('dark')} 
            className="gap-2 cursor-pointer transition-colors duration-200"
          >
            <Moon className="h-4 w-4" />
            <span>Dark</span>
            {theme === 'dark' && <span className="ml-auto text-xs text-primary">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme('system')} 
            className="gap-2 cursor-pointer transition-colors duration-200"
          >
            <Monitor className="h-4 w-4" />
            <span>System</span>
            {theme === 'system' && <span className="ml-auto text-xs text-primary">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // text variant - simple toggle between light/dark
  return (
    <Button
      variant="ghost"
      size={size}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="gap-2 transition-all duration-200 hover:scale-105"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="transition-transform duration-200">
        {getThemeIcon()}
      </div>
      <span>{getThemeLabel()}</span>
    </Button>
  );
};

export default ThemeToggle;
