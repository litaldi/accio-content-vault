
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
import { useToast } from "@/hooks/use-toast"

interface ThemeToggleProps {
  initialHighContrast?: boolean;
}

export function ThemeToggle({ initialHighContrast = false }: ThemeToggleProps) {
  const { setTheme, theme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const { t } = useTranslation()
  const { toggleHighContrast, preferences } = useAccessibility();
  const { toast } = useToast();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  
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
    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'Tab':
        // If it's the last focusable element and not shifted, move focus back to the first element
        const focusableElements = dropdownRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (event.shiftKey && document.activeElement === firstElement) {
            // If shift+tab on the first element, move to the last
            event.preventDefault();
            lastElement.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            // If tab on the last element, move to the first
            event.preventDefault();
            firstElement.focus();
          }
        }
        break;
      default:
        break;
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (newTheme === "light" || newTheme === "dark") {
      localStorage.setItem('theme', newTheme);
    } else {
      localStorage.removeItem('theme');
    }
    
    toast({
      title: t('common.theme.changed'),
      description: t('common.theme.switchedTo', { theme: newTheme }),
    });
    
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  // Prevent hydration mismatch by only showing after mount
  React.useEffect(() => {
    setMounted(true)
    
    // Check for system preference on initial load
    if (!localStorage.getItem('theme') && mounted) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [setTheme, mounted])

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
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          ref={buttonRef}
          variant="ghost" 
          size="icon"
          aria-label={t('common.theme.change')}
          title={t('common.theme.current', { theme: theme || 'system' })}
          data-testid="theme-toggle"
          className="rounded-full hover:bg-secondary/80 transition-all duration-300 fine-glow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-expanded={isOpen}
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
        onEscapeKeyDown={() => {
          setIsOpen(false);
          buttonRef.current?.focus();
        }}
        onInteractOutside={() => {
          setIsOpen(false);
          buttonRef.current?.focus();
        }}
      >
        <DropdownMenuItem 
          onClick={() => handleThemeChange("light")}
          aria-selected={theme === 'light'}
          data-testid="theme-light"
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer hover:bg-accent transition-colors focus:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          role="menuitemradio"
          aria-checked={theme === 'light'}
        >
          <Sun className="h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.light')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("dark")}
          aria-selected={theme === 'dark'}
          data-testid="theme-dark"
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer hover:bg-accent transition-colors focus:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          role="menuitemradio"
          aria-checked={theme === 'dark'}
        >
          <Moon className="h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.dark')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("system")}
          aria-selected={theme === 'system'}
          data-testid="theme-system"
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer hover:bg-accent transition-colors focus:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          role="menuitemradio"
          aria-checked={theme === 'system'}
        >
          <Monitor className="h-4 w-4" aria-hidden="true" />
          <span>{t('common.theme.system')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2 bg-border/50" />
        <DropdownMenuItem 
          onClick={() => {
            toggleHighContrast();
            setIsOpen(false);
            buttonRef.current?.focus();
          }}
          className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer hover:bg-accent transition-colors focus:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          data-testid="accessibility-contrast"
          aria-pressed={preferences.highContrast}
          role="menuitemcheckbox"
          aria-checked={preferences.highContrast}
        >
          <Accessibility className="h-4 w-4" aria-hidden="true" />
          <span>{t('common.accessibility.highContrast', 'High contrast mode')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
