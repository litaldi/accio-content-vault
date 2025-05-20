
import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const { t } = useTranslation()
  
  // Handle high contrast mode
  const toggleHighContrast = () => {
    document.documentElement.classList.toggle('high-contrast');
    // Store preference in localStorage
    const isHighContrast = document.documentElement.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast ? 'true' : 'false');
  }
  
  // Get current theme icon
  const getThemeIcon = () => {
    if (!mounted) return null;
    
    if (theme === 'light') {
      return <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />;
    }
    
    if (theme === 'dark') {
      return <Moon className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />;
    }
    
    return <Monitor className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />;
  };

  // Prevent hydration mismatch by only showing after mount
  React.useEffect(() => {
    setMounted(true)
    
    // Apply high contrast if saved in preferences
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    if (savedHighContrast) {
      document.documentElement.classList.add('high-contrast');
    }
  }, [])

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
          variant="ghost" 
          size="icon"
          aria-label={t('common.theme.change')}
          title={t('common.theme.current', { theme: theme || 'system' })}
          data-testid="theme-toggle"
          className="rounded-full hover:bg-secondary/80 transition-all duration-300"
        >
          {getThemeIcon()}
          <span className="sr-only">{t('common.theme.change')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px] p-2">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          aria-selected={theme === 'light'}
          data-testid="theme-light"
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer"
        >
          <Sun className="h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.light')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          aria-selected={theme === 'dark'}
          data-testid="theme-dark"
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer"
        >
          <Moon className="h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.dark')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          aria-selected={theme === 'system'}
          data-testid="theme-system"
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer"
        >
          <Monitor className="h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.system')}</span>
        </DropdownMenuItem>
        <div className="h-px my-2 bg-border"></div>
        <DropdownMenuItem 
          onClick={toggleHighContrast}
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer"
          data-testid="accessibility-contrast"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-4 w-4"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
            <path d="M12 2v20M2 12h20"></path>
          </svg>
          <span>{t('common.accessibility.highContrast', 'High contrast mode')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
