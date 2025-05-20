
import * as React from "react"
import { Moon, Sun, Monitor, Accessibility } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslation } from "react-i18next"
import { useAccessibility } from "@/contexts/AccessibilityContext"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface ThemeToggleProps {
  initialHighContrast?: boolean;
}

export function ThemeToggle({ initialHighContrast = false }: ThemeToggleProps) {
  const { setTheme, theme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const { t } = useTranslation()
  const { toggleHighContrast, preferences } = useAccessibility();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  
  // Get current theme icon
  const getThemeIcon = () => {
    if (!mounted) return null;
    
    if (theme === 'light') {
      return <Sun className="h-[1.2rem] w-[1.2rem] transition-transform duration-500" aria-hidden="true" />;
    }
    
    if (theme === 'dark') {
      return <Moon className="h-[1.2rem] w-[1.2rem] transition-transform duration-500" aria-hidden="true" />;
    }
    
    return <Monitor className="h-[1.2rem] w-[1.2rem] transition-transform duration-500" aria-hidden="true" />;
  };

  // Handle keyboard interactions
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      buttonRef.current?.focus();
    }
  };

  // Prevent hydration mismatch by only showing after mount
  React.useEffect(() => {
    setMounted(true)
    
    // Check for system preference on initial load
    if (!localStorage.getItem('theme')) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [setTheme])

  if (!mounted) {
    // Server-side rendering - return empty button to maintain layout
    return (
      <Button variant="ghost" size="icon" disabled>
        <span className="sr-only">{t('common.theme.change')}</span>
        <div className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          ref={buttonRef}
          variant="ghost" 
          size="icon"
          aria-label={t('common.theme.change')}
          title={t('common.theme.current', { theme: theme || 'system' })}
          data-testid="theme-toggle"
          className="rounded-full hover:bg-secondary/80 transition-all duration-300 fine-glow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {getThemeIcon()}
          <span className="sr-only">{t('common.theme.change')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        ref={dropdownRef}
        align="end" 
        className="min-w-[200px] p-2 backdrop-blur-md bg-card/90 border border-border/40"
        onKeyDown={handleKeyDown}
        onEscapeKeyDown={() => buttonRef.current?.focus()}
        onInteractOutside={() => buttonRef.current?.focus()}
      >
        <DropdownMenuItem 
          onClick={() => {
            setTheme("light");
            localStorage.setItem('theme', 'light');
          }}
          aria-selected={theme === 'light'}
          data-testid="theme-light"
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer hover:bg-accent transition-colors focus:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        >
          <Sun className="h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.light')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            setTheme("dark");
            localStorage.setItem('theme', 'dark');
          }}
          aria-selected={theme === 'dark'}
          data-testid="theme-dark"
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer hover:bg-accent transition-colors focus:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        >
          <Moon className="h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.dark')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            setTheme("system");
            localStorage.removeItem('theme');
          }}
          aria-selected={theme === 'system'}
          data-testid="theme-system"
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer hover:bg-accent transition-colors focus:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        >
          <Monitor className="h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.system')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2 bg-border/50" />
        <DropdownMenuItem 
          onClick={toggleHighContrast}
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer hover:bg-accent transition-colors focus:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          data-testid="accessibility-contrast"
          aria-pressed={preferences.highContrast}
        >
          <Accessibility className="h-4 w-4" aria-hidden="true" />
          <span>{t('common.accessibility.highContrast', 'High contrast mode')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
