
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
        >
          {getThemeIcon()}
          <span className="sr-only">{t('common.theme.change')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          aria-selected={theme === 'light'}
          data-testid="theme-light"
        >
          <Sun className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.light')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          aria-selected={theme === 'dark'}
          data-testid="theme-dark"
        >
          <Moon className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.dark')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          aria-selected={theme === 'system'}
          data-testid="theme-system"
        >
          <Monitor className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.system')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
